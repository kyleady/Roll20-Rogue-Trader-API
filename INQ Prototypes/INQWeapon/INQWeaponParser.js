//takes the handout object of a weapon and turns it into the INQWeapon Prototype
function INQWeaponParser(){
  //the text that will be parsed
  this.Text = "";

  //parse out the weapon stats
  this.parseClass = function(){
    var regex = "<(?:strong|em)>\\s*Class\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(Melee|Pistol|Basic|Heavy)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Class = matches[1].toTitleCase();
    }
  }
  this.parseRange = function(){
    var regex = "<(?:strong|em)>\\s*Range\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(?:"
    regex += "(\\d+)k?m";
    regex += "|";
    regex += "(?:SB|Strength\\s*Bonus)\\s*x\\s*(\\d+)"
    regex += ")";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      if(matches[1]){
        this.Range = Number(matches[1]);
      }
      if(matches[2]){
        this.Range = Number("-" + matches[2])
      }
    }
  }
  this.parseRoF = function(){
    var matches = this.Text.match(/<(?:strong|em)>\s*(RoF|Rate of Fire)\s*<\/(?:strong|em)>\s*:\s*(S|-)\s*\/\s*(\d+|-)\s*\/(\d+|-)\s*(<br>|\n\$)/i);
    var regex = "<(?:strong|em)>\\s*(?:RoF|Rate of Fire)\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(S|-)\\s*";
    regex += "\\/\\s*(\\d+|-)\\s*";
    regex += "\\s*\\/\\s*(\\d+|-)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Single = matches[1].toLowerCase() == "s";
      if(matches[2] != "-"){
        this.Semi = Number(matches[2]);
      }
      if(matches[3] != "-"){
        this.Full = Number(matches[3]);
      }
    }
  }
  this.parseDamage = function(){
    var link = new INQLinkParser();
    var regex = "<(?:strong|em)>\\s*(?:Dam|Damage)\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(?:(PR|\\d+)\\s*x\\s*)?";
    regex += "(\\d+|)\\s*D\\s*(\\d+)";
    regex += "(?:\\s*(\\+|-)\\s*(\\d+|PR))?";
    regex += "(" + link.regex() + ")";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      if(matches[1]){
        if(matches[1].toLowerCase() == "pr"){
          this.DiceMultiplier = "PR";
        } else {
          this.DiceMultiplier = Number(matches[1]);
        }
      }
      if(matches[2] == ""){
        this.DiceNumber = 1;
      } else {
        this.DiceNumber = Number(matches[2]);
      }
      this.DiceType = Number(matches[3]);
      if(matches[4] && matches[5]){
        if(matches[5].toLowerCase() == "pr"){
          this.DamageBase = "PR"
        } else {
          this.DamageBase = Number(matches[4] + matches[5]);
        }
      }
      if(matches[6]){
        this.DamageType = new INQLink(matches[6]);
      }
    }
  }
  this.parsePenetration = function(){
    var regex = "<(?:strong|em)>\\s*(?:Pen|Penetration)\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(PR|\\d+)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      if(matches[1].toLowerCase() == "pr"){
        this.Penetration = "PR";
      } else {
        this.Penetration = Number(matches[1]);
      }
    }
  }
  this.parseClip = function(){
    var regex = "<(?:strong|em)>\\s*Clip\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(\\d+)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Clip = Number(matches[1]);
    }
  }
  this.parseReload = function(){
    var regex = "<(?:strong|em)>\\s*(?:Reload|Rld)\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(Free|Half|Full|d+\s+Full)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      if(matches[1].toLowerCase() == "free"){
        this.Reload = 0;
      } else if(matches[1].toLowerCase() == "half"){
        this.Reload = 0.5;
      } else if(matches[1].toLowerCase() == "full"){
        this.Reload = 1;
      } else {
        matches = matches[1].match(/d+/i);
        this.Reload = Number(matches[0]);
      }
    }
  }
  this.parseSpecialRules = function(){
    var link = new INQLinkParser();
    var regex = "<(?:strong|em)>\\s*Special\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "\\s*(?:-|((?:" + link.regex() + "\\s*,?\\s*)+))";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches && matches[1]){
      var rules = [];
      this.Special = _.map(matches[1].split(","), function(rule){
        return new INQLink(rule);
      });
    }
  }
  this.parseWeight = function(){
    var regex = "<(?:strong|em)>\\s*Weight\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(\\d+)\\s*kgs?";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Weight = Number(matches[1]);
    }
  }
  this.parseRequisition = function(){
    var regex = "<(?:strong|em)>\\s*Requisition\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(\\d+)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Requisition = Number(matches[1]);
    }
  }
  this.parseRenown = function(){
    var regex = "<(?:strong|em)>\\s*Renown\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(-|Initiate|Respected|Distinguished|Famed|Hero)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      if(matches[1] == "-"){
        this.Renown = "Initiate";
      } else {
        this.Renown = matches[1].toTitleCase();
      }
    }
  }
  this.parseAvailability = function(){
    var regex = "<(?:strong|em)>\\s*Availability\\s*<\\/(?:strong|em)>\\s*:\\s*";
    regex += "(Ubiquitous|Abundant|Plentiful|Common|Average|Scarce|Rare|Very\s*Rare|Extremely\s*Rare|Near\s*Unique|Unique)";
    regex += "\\s*(?:<br>|\n|$)";
    var re = new RegExp(regex, "i");
    var matches = this.Text.match(re);
    if(matches){
      this.Availability = matches[1].toTitleCase();
    }
  }
  //use all of the above parsing functions to transform text into the INQWeapon prototype
  this.parse = function(obj){
    //save the object details
    this.ObjType = obj.get("_type");
    this.ObjID   = obj.id;

    //save the weapon's name
    this.Name = obj.get("name");

    //get the weapon text that will be parsed for details
    var WeaponNotes = "";
    obj.get("notes", function(notes){
      WeaponNotes = notes;
    });

    //skip the bio of the weapon and only save the details
    var matches = WeaponNotes.match(/(<(?:em|strong)>.*)$/i);
    if(matches){
      this.Text = matches[1];
    }

    //parse all the details of the weapon
    this.parseClass();
    this.parseRange();
    this.parseRoF();
    this.parseDamage();
    this.parsePenetration();
    this.parseClip();
    this.parseReload();
    this.parseSpecialRules();
    this.parseWeight();
    this.parseRequisition();
    this.parseRenown();
    this.parseAvailability();

    this.Text = "";
  }
}
