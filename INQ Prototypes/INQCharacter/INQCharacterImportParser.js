function INQCharacterImportParser(){
  var StatNames = ["WS", "BS", "S", "T", "Ag", "It", "Per", "Wp", "Fe"];

  this.parse = function(text){
    var parser = new INQImportParser(this);
    parser.getList(/^\s*skills\s*$/i, ["List", "Skills"]);
    parser.getList(/^\s*talents\s*$/i, ["List", "Talents"]);
    parser.getList(/^\s*traits\s*$/i, ["List", "Traits"]);
    parser.getList(/^\s*gear\s*$/i, ["List", "Gear"]);
    parser.getList(/^\s*psychic\s+powers\s*$/i, ["List", "Psychic Powers"]);
    parser.getNumber(/^\s*move(ment)?\s*$/i, ["Movement", ["Half", "Full", "Charge", "Run"]]);
    parser.getNumber(/^\s*wounds\s*$/i, ["Attributes", "Wounds"]);
    parser.getNothing(/^\s*total\s+TB\s*$/i);
    parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
    parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
      Armour_H:  /\s*head\s*/i,
      Armour_RA: /\s*arms\s*/i,
      Armour_LA: /\s*arms\s*/i,
      Armour_B:  /\s*body\s*/i,
      Armour_RL: /\s*legs\s*/i,
      Armour_LL: /\s*legs\s*/i
    }]);
    var unlabeled = parser.parse(text);

    this.interpretUnlabeled(unlabeled);
    //do final adjustments
    this.adjustBonus();
    this.adjustWeapons();
    this.calcAttributes();
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
}
