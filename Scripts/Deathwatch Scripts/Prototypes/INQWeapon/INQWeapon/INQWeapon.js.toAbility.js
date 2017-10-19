//turns the weapon prototype into text for use within a character's macros
INQWeapon.prototype.toAbility = function(inqcharacter, ammo, options){
  var output = "!useWeapon ";
  //start with the weapon's exact name
  output += this.Name;
  //create the options hash
  var options = options || {};
  //include a toHit modifier unless the weapon auto hits
  //include RoF options unless it auto hits
  if(!this.has("Spray") || this.Class == "Psychic"){
    options.Modifier = "?{Modifier|0}";

    var rates = [];
    //if single, add Called Shot as well
    if(this.Single || !(this.Semi || this.Full) ){
      rates.push("Single");
      //psychic attacks cannot make called shots
      if(this.Class != "Psychic"){
        rates.push("Called Shot");
        if(this.Class == "Melee"){
          rates.push("All Out Attack");
        }
      }
    }
    if(this.Semi){
      rates.push("Semi Auto(" + this.Semi.toString() + ")");
    }
    if(this.Full){
      rates.push("Full Auto(" + this.Full.toString() + ")");
    }
    if(inqcharacter && this.Class == "Melee"){
      if(inqcharacter.has("Swift Attack", "Talents")){
        rates.push("Swift Attack");
      }
      if(inqcharacter.has("Lightning Attack", "Talents")){
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
    } else if(rates.length == 1){
      options.RoF = rates[0];
    }
  }
  //allow the player to specify their effective psy rating
  //but only for psychic powers
  if(inqcharacter && this.Class == "Psychic"){
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

  //custom weapons need all of their unique details stored in the ability
  if(options.custom){
    for(var k in this){
      if(typeof this[k] != 'function'){
        if(this[k] == this.__proto__[k]){continue;}
        if(typeof this[k] == 'object'){
          if(Array.isArray(this[k])){
            var specialRules = "";
            _.each(this[k], function(rule){
              specialRules += rule.toNote(true) + ", ";
            });
            specialRules = specialRules.replace(/, $/,"");
            options[k] = specialRules;
          } else {
            options[k] = this[k].toNote(true);
          }
        } else {
          options[k] = this[k].toString();
        }
      }
    }
  }
  //allow the player to specify if they are firing on Maximal
  if(this.has("Maximal")){
    if(!options.Special){
      options.Special = "?{Fire on Maximal?|Use Maximal|}";
    } else {
      options.Special += ", ?{Fire on Maximal?|Use Maximal|}";
    }
  }
  output += JSON.stringify(options);
  return output;
}
