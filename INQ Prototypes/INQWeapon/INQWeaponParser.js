//takes the handout object of a weapon and turns it into the INQWeapon Prototype
function INQWeaponParser(){
  //the individual rule parsing functions
  this.parseClass = function(content){
    var matches = content.match(/^\s*(melee|pistol|basic|heavy|psychic)\s*$/i);
    if(matches){
      this.Class = matches[1].toTitleCase();
    } else {
      whisper("Invalid Class");
    }
  }
  this.parseRange = function(content){
    var regex = "^\\s*(?:"
    regex += "(\\d+)\\s*k?(?:|m|metres|meters)";
    regex += "|";
    regex += "(?:SB|Strength\\s*Bonus)\\s*x?\\s*(\\d*)\s*k?(?:|m|metres|meters)";
    regex += "|";
    regex += "(\\d*)\\s*k?(?:|m|metres|meters)\\s*x?\\s*(?:PR|Psy\\s*Rating)\\s*x?\\s*(\\d*)";
    regex += ")\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      if(matches[1] != null){
        this.Range = Number(matches[1]);
      }
      if(matches[2] != null){
        this.Range = matches[2] + "SB";
      }
      if(matches[3] != null){
        this.Range = matches[3] + "PR";
      }
    } else {
      whisper("Invalid Range");
    }
  }
  this.parseRoF = function(content){
    var regex = "^\\s*";
    regex += "(S|-)";
    regex += "\\s*\\/\\s*";
    regex += "(\\d+|-|\\d*\\s*x\\s*PR)";
    regex += "\\s*\\/\\s*";
    regex += "(\\d+|-|\\d*\\s*x\\s*PR)";
    regex += "\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      this.Single = matches[1].toUpperCase() == "S";
      if(matches[2] == "-"){
        this.Semi = 0;
      } else if(Number(matches[2])){
        this.Semi = Number(matches[2]);
      } else {
        this.Semi = matches[2].replace(/[ x]/gi,"");
      }
      if(matches[3] == "-"){
        this.Full = 0;
      } else if(Number(matches[3])){
        this.Full = Number(matches[3]);
      } else {
        this.Full = matches[3].replace(/[ x]/gi,"");
      }
    } else {
      whisper("Invalid RoF");
    }
  }
  this.parseDamage = function(content){
    var link = new INQLinkParser();
    var regex = "^\\s*";
    regex += "(?:(\\d*\\s*x?\\s*PR|\\d+)\\s*x\\s*)?";
    regex += "(\\d*)\\s*D\\s*(\\d+)";
    regex += "(?:\\s*(\\+|-)\\s*(\\d+|\\d*\\s*x?\\s*PR))?";
    regex += "(" + link.regex() + ")";
    regex += "\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      if(matches[1]){
        if(Number(matches[1])){
          this.DiceMultiplier = Number(matches[1]);
        } else {
          this.DiceMultiplier = matches[1].replace(/[ x]/gi,"");
        }
      }
      if(matches[2] == ""){
        this.DiceNumber = 1;
      } else {
        this.DiceNumber = Number(matches[2]);
      }
      this.DiceType = Number(matches[3]);
      if(matches[4] && matches[5]){
        if(Number(matches[5])){
          this.DamageBase = Number(matches[4] + matches[5]);
        } else {
          this.DamageBase = matches[5].replace(/[ x]/gi,"");
        }
      }
      if(matches[6]){
        this.DamageType = new INQLink(matches[6]);
      }
    } else {
      whisper("Invalid Damage");
    }
  }
  this.parsePenetration = function(content){
    var regex = "^\\s*";
    regex += "(\\d*\\s*x?\\s*PR|\\d+)";
    regex += "\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      if(Number(matches[1])){
        this.Penetration = Number(matches[1]);
      } else {
        this.Penetration = matches[1].replace(/[ x]/gi,"");
      }
    } else {
      whisper("Invalid Penetration");
    }
  }
  this.parseClip = function(content){
    var matches = content.match(/^\s*(\d+)\s*$/);
    if(matches){
      this.Clip = Number(matches[1]);
    } else {
      whisper("Invalid Clip")
    }
  }
  this.parseReload = function(content){
    var matches = content.match(/^\s*(Free|Half|Full|\d+\s+Full)\s*$/i);
    if(matches){
      if(matches[1].toLowerCase() == "free"){
        this.Reload = 0;
      } else if(matches[1].toLowerCase() == "half"){
        this.Reload = 0.5;
      } else if(matches[1].toLowerCase() == "full"){
        this.Reload = 1;
      } else {
        matches = matches[1].match(/\d+/i);
        this.Reload = Number(matches[0]);
      }
    } else {
      whisper("Invalid Reload");
    }
  }
  this.parseSpecialRules = function(content){
    var link = new INQLinkParser();
    var regex = "^\\s*(?:-|((?:" + link.regex() + ",)*" + link.regex()  + "))$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      if(matches[1]){
        this.Special = _.map(matches[1].split(","), function(rule){
          return new INQLink(rule);
        });
      }
    } else {
      whisper("Invalid Special Rules")
    }
  }
  this.parseWeight = function(content){
    var matches = content.match(/^\s*(\d+)\s*(?:kg)?s?\s*$/i);
    if(matches){
      this.Weight = Number(matches[1]);
    } else {
      whisper("Invalid Weight")
    }
  }
  this.parseRequisition = function(content){
    var matches = content.match(/^\s*(\d+)\s*$/);
    if(matches){
      this.Requisition = Number(matches[1]);
    } else {
      whisper("Invalid Requisition")
    }
  }
  this.parseRenown = function(content){
    var regex = "^\\s*";
    regex += "(-|Initiate|Respected|Distinguished|Famed|Hero)";
    regex += "\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      if(matches[1] == "-"){
        this.Renown = "Initiate";
      } else {
        this.Renown = matches[1].toTitleCase();
      }
    } else {
      whisper("Invalid Renown")
    }
  }
  this.parseAvailability = function(content){
    var regex = "^\\s*";
    regex += "(Ubiquitous|Abundant|Plentiful|Common|Average|Scarce|Rare|Very\s*Rare|Extremely\s*Rare|Near\s*Unique|Unique)";
    regex += "\\s*$";
    var re = new RegExp(regex, "i");
    var matches = content.match(re);
    if(matches){
      this.Availability = matches[1].toTitleCase();
    } else {
      whisper("Invalid Availability")
    }
  }
  //use all of the above parsing functions to transform text into the INQWeapon prototype
  this.parse = function(obj){
    //parse out the content of a handout
    this.Content = new INQParser(obj);
    //save the non-text details of the handout
    this.Name = obj.get("name");
    this.ObjID = obj.id;
    this.ObjType = obj.get("_type");

    //parse all the rules of the weapon based on the rule name
    for(var i = 0; i < this.Content.Rules.length; i++){
      var name = this.Content.Rules[i].Name;
      var content = this.Content.Rules[i].Content;
      if(/class/i.test(name)){
        this.parseClass(content);
      } else if(/^\s*range\s*$/i.test(name)){
        this.parseRange(content);
      } else if(/^\s*(rof|rate\s+of\s+fire)\s*$/i.test(name)){
        this.parseRoF(content);
      } else if(/^\s*dam(age)?\s*$/i.test(name)){
        this.parseDamage(content);
      } else if(/^\s*pen(etration)?\s*$/i.test(name)){
        this.parsePenetration(content);
      } else if(/^\s*clip\s*$/i.test(name)){
        this.parseClip(content);
      } else if(/^\s*reload\s*$/i.test(name)){
        this.parseReload(content);
      } else if(/^\s*special\s*(rules)?\s*$/i.test(name)){
        this.parseSpecialRules(content);
      } else if(/^\s*weight\s*$/i.test(name)){
        this.parseWeight(content);
      } else if(/^\s*req(uisition)?\s*$/i.test(name)){
        this.parseRequisition(content);
      } else if(/^\s*renown/i.test(name)){
        this.parseRenown(content);
      } else if(/^\s*availability/i.test(name)){
        this.parseAvailability(content);
      }
    }

    delete this.Content;
  }
}
