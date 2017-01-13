//the prototype for weapons
function INQWeapon(obj){

  //default weapon stats
  this.Class          = "Melee";
  this.Range          = 0;
  this.Single         = true;
  this.Semi           = 0;
  this.Full           = 0;
  this.DiceType       = 10;
  this.DiceNumber     = 0;
  this.DiceMultiplier = 1;
  this.DamageBase     = 0;
  this.DamageType     = new INQLink("I");
  this.Penetration    = 0;
  this.Clip           = 0;
  this.Reload         = -1;
  this.Special        = [];
  this.Weight         = 0;
  this.Requisition    = 0;
  this.Renown         = "";
  this.Availability   = "";
  this.FocusModifier  = 0;
  this.FocusStat      = "Wp";

  //allow the user to immediately parse a weapon in the constructor
  if(obj != undefined){
    Object.setPrototypeOf(this, new INQWeaponParser());
    this.parse(obj);
    Object.setPrototypeOf(this, new INQWeapon());
  }

  //check if the weapon has an inqlink with the given name
  //return the inqlink if found
  //if nothing was found, return undefined
  this.has = function(ability){
    var inqlink = undefined;
    _.each(this.Special, function(rule){
      if(rule.Name == ability){
        inqlink = rule;
      }
    });
    return inqlink;
  }

  //functions that take input from the character wielding the weapon
  this.setSB = function(strBonus){
    //only add the strength bonus to melee weapons
    if(this.Class == "Melee"){
      this.DamageBase += strBonus;
      //fist weapons add the SB twice
      if(this.has("Fist")){
        this.DamageBase += strBonus;
      }
    }

    //replace every instance of SB with the strength bonus of the character
    var strStats = ["Range"];
    for(var i = 0; i < strStats.length; i++){
      //these should be strings, waiting to be transformed into integers
      if(typeof this[strStats[i]] == 'string'){
        //does this stat rely on the strength bonus?
        if(/SB/.test(this[strStats[i]])){
          //find the Strength Bonus coefficient
          var coefficient = 1;
          var matches = this[strStats[i]].match(/\d+/);
          if(matches){
            coefficient = Number(matches[0]);
          }
          //transform the string formula into an integer
          this[strStats[i]] = coefficient * strBonus;
        }
      }
    }
  }

  //replace every instance of PR with the effectove psy rating of the character
  this.setPR = function(effectivePR){
    //start with the basic stats of the weapon
    var psyStats = ["Range", "DiceMultiplier", "DamageBase", "Penetration", "Semi", "Full"];
    for(var i = 0; i < psyStats.length; i++){
      //these should be strings, waiting to be transformed into integers
      if(typeof this[psyStats[i]] == 'string'){
        //does this stat rely on Psy Rating?
        if(/PR/.test(this[psyStats[i]])){
          //find the Psy Rating coefficient
          var coefficient = 1;
          var matches = this[psyStats[i]].match(/\d+/);
          if(matches){
            coefficient = Number(matches[0]);
          }
          //transform the string formula into an integer
          this[psyStats[i]] = coefficient * effectivePR
        }
      }
    }
    //next check every group value of every special rule
    this.Special = _.map(this.Special, function(rule){
      rule.Groups = _.map(rule.Groups, function(group){
        if(/^\s*\d*\s*PR\s*$/.test(group)){
          //find the Psy Rating coefficient in this group
          var coefficient = 1;
          var matches = group.match(/\d+/);
          if(matches){
            coefficient = Number(matches[0]);
          }
          //do the multiplication but keep it as a string
          group = (coefficient * effectivePR).toString();
        }
        return group;
      });
      return rule;
    });
  }

  //prototype -> text functions

  //turns the weapon prototype into text for use within a character's macros
  this.toAbility = function(inqcharacter, ammo, options){
    var output = "!useWeapon ";
    //start with the weapon's exact name
    output += this.Name;
    //create the options hash
    var options = options || new Hash();
    //include a toHit modifier unless the weapon auto hits
    //include RoF options unless it auto hits
    if(!this.has("Spray")){
      options.Modifier = "?{Modifier|0}";

      var rates = [];
      //if single, add Called Shot as well
      if(this.Single){
        rates.push("Single");
        //psychic attacks cannot make called shots
        if(this.Class != "Psychic"){
          rates.push("Called Shot");
        }
      }
      if(this.Semi){
        rates.push("Semi Auto(" + this.Semi.toString() + ")");
      }
      if(this.Full){
        rates.push("Full Auto(" + this.Full.toString() + ")");
      }
      if(rates.length == 0){
        rates.push("Single");
        //psychic attacks cannot make called shots
        if(this.Class != "Psychic"){
          rates.push("Called Shot");
        }
      }
      if(this.Class == "Melee"){
        if(inqcharacter.has("Swift Attack")){
          rates.push("Swift Attack");
        }
        if(inqcharacter.has("Lightning Attack")){
          rates.push("Lightning Attack");
        }
      }
      //if only one option, don't give the user a choice
      if(rates.length > 1){
        options.RoF = "?{Rate of Fire|";
        _.each(rates, function(rate){
          options.RoF += rate + "|";
        });
        options.RoF = options.RoF.replace(/\|$/,"");
        options.RoF += "}";
      }
    }
    //allow the player to specify their effective psy rating
    //but only for psychic powers
    if(this.Class == "Psychic"){
      //by default offer their base PsyRating
      options.EffectivePR = "?{Effective PsyRating|@{" + inqcharacter.Name + "|PR}}";
    }
    //allow the player to specify the ammo they are using
    if(ammo){
      if(ammo.length == 1){
        options.Ammo = ammo[0];
      } else if (ammo.length > 1){
        options.Ammo = "?{Special Ammunition|"
        _.each(ammo, function(choice){
          options.Ammo += choice + "|"
        });
        options.Ammo = options.Ammo.replace(/\|$/,"");
        options.Ammo += "}";
      }
    }
    output += options.toString();
    return output;
  }

  //turns the weapon prototype into text for an NPC's notes
  this.toNote = function(){
    var output = "";
    //The output will aim for the following format (ignorning fields that are irrelevant)
    //Name (Class; Range; RoF; Damage Damage Type; Pen; Clip; Reload; Special Rules)
    //begin with the name
    output += this.Name;
    //detail the weapon
    output += " (";
    //weapon class
    output += this.Class + "; ";
    //is this a ranged weapon?
    if(this.Range > 0){
      //what units are we using?
      if(this.Range < 1000){
        output += this.Range.toString() + "m; ";
      } else {
        output += Math.round(this.Range/1000).toString() + "km; ";
      }
    //is this a thrown weapon?
    } else if(this.Range < 0){
      output += "SB x " + (this.Range*-1).toString() + "; ";
    }
    //does this weapon have a Rate of Fire?
    if(this.Single > 0 || this.Semi > 0 || this.Full > 0){
      if(this.Single){
        output += "S";
      } else {
        output += "-";
      }
      output += "/";
      if(this.Semi > 0){
        output += this.Semi.toString();
      } else {
        output += "-";
      }
      output += "/";
      if(this.Full > 0){
        output += this.Full.toString();
      } else {
        output += "-";
      }
      output += "; ";
    }
    //damage section
    //damage multiplier
    if(this.DiceMultiplier == "PR" || this.DiceMultiplier > 1){
      output += this.DiceMultiplier + " x ";
    }
    //damage roll
    if(this.DiceNumber > 0){
      output += this.DiceNumber.toString();
      output += "D" + this.DiceType.toString();
    }
    //damage base
    if(this.DamageBase > 0){
      output += "+" + this.DamageBase.toString();
    } else if(this.DamageBase < 0){
      output += this.DamageBase.toString();
    }
    //damage type
    output += " " + GetLink(this.DamageType) + "; ";
    //Penetration
    output += "Pen " + this.Penetration.toString();
    //Clip
    if(this.Clip > 0){
      output += "Clip " + this.Clip.toString() + "; ";
    }
    //Reload
    if(this.Reload == 0){
      output += "Reload Free; ";
    } else if(this.Reload == 0.5){
      output += "Reload Half; ";
    } else if(this.Reload == 1){
      output += "Reload Full; ";
    } else {
      output += "Reload " + Math.floor(this.Reload).toString() + " Full; ";
    }
    //Special Rules
    _.each(this.Special, function(rule){
      output += GetLink(rule.Name);
      if(rule.Value >= 0){
        output += "[" + rule.Value + "]";
      }
      output += "; ";
    });
    //get rid of the last separator "; "
    output = output.replace(/;\s*$/,"");
    //close up the notes
    output += ")";
    //return the note in text form
    return output;
  }
};
