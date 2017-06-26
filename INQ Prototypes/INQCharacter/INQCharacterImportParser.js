function INQCharacterImportParser(){
  var StatNames = ["WS", "BS", "S", "T", "Ag", "It", "Per", "Wp", "Fe"];
  var ArmourNames = ["Armour_H", "Armour_RA", "Armour_LA", "Armour_B", "Armour_RL", "Armour_LL"];

  this.parse = function(text){
    //split the input by line
    var lines = text.split(/\s*<br>\s*/);
    //disect each line into label and content (by the colon)
    var labeled = [];
    var unlabeled = [];
    _.each(lines,function(line){
      if(line.match(/:/g)){
        //disect the content by label
        var label = line.substring(0,line.indexOf(":"));
        var content = line.substring(line.indexOf(":")+1);
        labeled.push({label: label, content: content});
      } else {
        //this line is not labeled
        //check if we can add this to the last labeled line
        if(labeled.length > 0){
          //attach this to the last bit of content
          labeled[labeled.length-1].content += " " + line;
        } else {
          //there is no label to attach this content to
          unlabeled.push(line);
        }
      }
    });

    //interpret the lines
    this.interpretLabeled(labeled);
    this.interpretUnlabeled(unlabeled);
    //do final adjustments
    this.adjustBonus();
    this.adjustWeapons();
    this.calcAttributes();
  }

  this.interpretLabeled = function(labeled){
    for(var i = 0; i < labeled.length; i++){
      //step through every known label, testing each one
      labeled[i].content = labeled[i].content.replace(/\s*\.\s*$/, "");
      log(labeled[i])
      this.processLine(labeled[i]);
    }
  }

  this.processLine = function(line){
    if(/^\s*(skills|talents|traits|gear|psychic powers)\s*$/i.test(line.label)){
      this.interpretList(line.content, line.label.match(/^\s*(skills|talents|traits|gear|psychic powers)\s*$/i));
    } else if(/^\s*move(ment)?\s*$/i.test(line.label)){
      this.interpretMovement(line.content);
    } else if(/^\s*armour\s*$/i.test(line.label)){
      this.interpretArmour(line.content);
    } else if(/^\s*wounds\s*$/i.test(line.label)){
      this.interpretWounds(line.content);
    } else if(/^\s*weapons?\s*$/i.test(line.label)){
      this.interpretWeapons(line.content);
    //delete instances of TotalTB
    } else if(!/^\s*total\s*TB\s*$/i.test(line.label)){
      //if we made it to this point, then inpret the label as a unique special rule
      this.SpecialRules.push({ Name: line.label, Rule: line.content});
    }
  }

  this.interpretUnlabeled = function(unlabeled){
    //search unlabled content for unnaturals and characteristics
    var addedLines = 0;
    for(var i = 0; i < unlabeled.length; i++){
      //only accept lines that are purely numbers, spaces, and parenthesies
      if(unlabeled[i].match(/^[—–-\s\d\(\)]+$/)){
        //are we free to fill out the unnaturals?
        if(addedLines == 0){
          this.interpretBonus(unlabeled[i]);
        //are we free to fill out the characteristics?
        } else if(addedLines == 1) {
          this.interpretCharacteristics(unlabeled[i]);
        } else {
          whisper("Too many numical lines. Stats and Unnatural Stats are likely inaccurate.");
        }
        //a numerical line has been interpreted
        addedLines++;
      }
    };

    //if only one numerical line was added, assume the only one added was the statline
    if(addedLines == 1){
      this.switchBonusOut();
    }
  }

  //While Dark Heresy typically lists T Bonus, I want to be sure I get Fatigue right
  //further, Fate Points are listed as a Trait: Touched by the Fates.
  this.calcAttributes = function(){
    this.Attributes.Fatigue = this.bonus("T");
    var fate = this.has("Touched by the Fates", "Traits");
    if(fate){
      this.Attributes.Fate = fate.Bonus;
    }
  }

  //Dark Heresy records the total damage for weapons in their Damage Base
  //including Str Bonus for Melee Weapons and talents
  this.adjustWeapons = function(){
    for(var i = 0; i < this.List.Weapons.length; i++){
      var weapon = this.List.Weapons[i];
      if(weapon.Class == "Melee"){
        weapon.DamageBase -= this.bonus("S");
        if(weapon.has("Fist")){
          weapon.DamageBase -= this.bonus("S");
        }
        if(this.has("Crushing Blow")){
          weapon.DamageBase -= 2;
        }
      } else if(this.has("Mighty Shot")){
        weapon.DamageBase -= 2;
      }
      weapon.Name = weapon.Name.toTitleCase();
    }
  }

  //Dark Heresy records the total characteristic values, while I need to know
  //just the Unnatural characteristics
  this.adjustBonus = function(){
    for(var i = 0; i < StatNames.length; i++){
      if(this.Attributes["Unnatural " + StatNames[i]] > 0){
        this.Attributes["Unnatural " + StatNames[i]] -= Math.floor(this.Attributes[StatNames[i]]/10);
      }
    }
  }

  this.switchBonusOut = function(){
    for(var i = 0; i < StatNames.length; i++){
      this.Attributes[StatNames[i]] = this.Attributes["Unnatural " + StatNames[i]];
      this.Attributes["Unnatural " + StatNames[i]] = 0;
    }
  }

  this.interpretCharacteristics = function(line){
    //save every number found
    var stat = line.match(/(\d+|–\s*–|—)/g);
    //correlate the numbers with the named stats
    for(var i = 0; i < StatNames.length; i++){
      //default to "0" when no number is given for a stat
      if(Number(stat[i])){
        this.Attributes[StatNames[i]] = Number(stat[i]);
      } else {
        this.Attributes[StatNames[i]] = 0;
      }
    }
  }

  this.interpretBonus = function(line){
    //save every number found
    var bonus = line.match(/(\d+|-)/g);
    //correlate the numbers with the named stats
    for(var i = 0; i < StatNames.length; i++){
      //default to "0" when no number is given for a stat
      if(Number(bonus[i])){
        this.Attributes["Unnatural " + StatNames[i]] = Number(bonus[i]);
      } else {
        this.Attributes["Unnatural " + StatNames[i]] = 0;
      }
    }
  }

  //disects a list
  this.interpretList = function(content,matches){
    //use the label to determine which List this is
    var group = matches[1].toTitleCase();
    //remove any occurance of a grammatical 'and' in the list
    content = content.replace(/,\s+and\s+/g, ', ');
    //replace commas that are outside parenthesies with semicolon
    var parenthesiesDepth = 0;
    content = content.split('');
    for(var i = 0; i < content.length; i++){
      if(content[i] == "("){
        parenthesiesDepth++;
      } else if(content[i] == ")"){
        parenthesiesDepth--;
      } else if(content[i] == "," && parenthesiesDepth <= 0){
        content[i] = ";";
      }
    }
    content = content.join('');
    //clean out any skill characteristic suggestions
    content = content.replace(/\((?:WS|BS|S|T|Ag|Per|WP|Int|Fel)\)/g, '');
    //create a pattern for items in the list
    var inqlink = new INQLinkParser();
    var itemregex = new RegExp(inqlink.regex(),"g");
    //create a list of all the items
    var itemList = content.match(itemregex);
    //break up each item into its parts and save those parts
    for(var i = 0; i < itemList.length; i++){
      var inqlink = new INQLink(itemList[i]);
      this.List[group].push(inqlink);
    }
  }

  //disects the character's movement
  this.interpretMovement = function(content){
    //record each number listed for movement
    var movement = content.match(/\d+/g);
    for(var i = 0; i < 4 && i < movement.length; i++){
      switch(i){
        case 0:
          this.Movement.Half = movement[i];
        break;
        case 1:
          this.Movement.Full = movement[i];
        break;
        case 2:
          this.Movement.Charge = movement[i];
        break;
        case 3:
          this.Movement.Run = movement[i];
        break;
      }
    }
  }

  //discects the character's armour
  this.interpretArmour = function(content){
    //find numbers associated with names
    var armourmatches = content.match(/\d*\s*(?:all|body|head|arms|legs)\s*:?\s*\d*/gi);
    if(armourmatches == undefined){return;}
    //step through the matches and disect out the name and number
    for(var i = 0; i < armourmatches.length; i++){
      //make the armour value into a number
      var armourvalue = armourmatches[i].match(/\d+/);
      if(armourvalue == undefined){continue;}
      armourvalue = Number(armourvalue[0]);
      var armourname = armourmatches[i].match(/(?:all|body|head|arms|legs)/i)[0].toLowerCase();
      switch(armourname){
        case "head":
          this.Attributes["Armour_H"] += armourvalue;
        break;
        case "arms":
          this.Attributes["Armour_RA"] += armourvalue;
          this.Attributes["Armour_LA"] += armourvalue;
        break;
        case "body":
          this.Attributes["Armour_B"] += armourvalue;
        break;
        case "legs":
          this.Attributes["Armour_RL"] += armourvalue;
          this.Attributes["Armour_LL"] += armourvalue;
        break;
        case "all":
          for(var i = 0; i < ArmourNames.length; i++){
            this.Attributes[ArmourNames[i]] += armourvalue;
          }
        break;
      }
    }
  }

  //record the Wounds
  this.interpretWounds = function(content){
    if(/\d+/.test(content)){
      this.Attributes["Wounds"] = content.match(/\d+/)[0];
    } else {
      whisper("Wounds is not a number.");
    }
  }

  //record the weapons
  this.interpretWeapons = function(content){
    //replace parenthesies that are inside parenthesies with square brackets
    var parenthesiesDepth = 0;
    content = content.split('');
    for(var i = 0; i < content.length; i++){
      if(content[i] == "("){
        if(parenthesiesDepth > 0){
          content[i] = "[";
        }
        parenthesiesDepth++;
      } else if(content[i] == ")"){
        parenthesiesDepth--;
        if(parenthesiesDepth > 0){
          content[i] = "]";
        }
      }
    }
    content = content.join('');
    //separate each weapon out
    var inqlink = new INQLinkParser();
    var re = RegExp(inqlink.regex(), "gi");
    var weaponMatches = content.match(re);
    //parse the weapons
    re = RegExp(inqlink.regex(), "i");
    for(var i = 0; i < weaponMatches.length; i++){
      var weapon = new INQWeapon(weaponMatches[i]);
      weapon.Name = weapon.Name.replace(/(?:^| )or /, "").replace(",", "");
      this.List.Weapons.push(weapon);
    }
  }
}
