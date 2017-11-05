INQWeapon.prototype.toAbility = function(inqcharacter, options, ammo){
  var output = '!useWeapon ';
  output += this.Name;
  if(typeof options != 'object') options = {};
  if(!this.has('Spray') || this.Class == 'Psychic'){
    options.Modifier = '?{Modifier|0}';
    var rates = [];
    if(this.Single || (this.Semi.onlyZero() && this.Full.onlyZero())){
      rates.push('Single');
      if(this.Class != 'Psychic'){
        rates.push('Called Shot');
        if(this.Class == 'Melee') rates.push('All Out Attack');
      }
    }

    if(!this.Semi.onlyZero()) rates.push('Semi Auto(' + this.Semi + ')');
    if(!this.Full.onlyZero()) rates.push('Full Auto(' + this.Full + ')');
    if(inqcharacter && this.Class == 'Melee'){
      if(inqcharacter.has('Swift Attack', 'Talents')) rates.push('Swift Attack');
      if(inqcharacter.has('Lightning Attack', 'Talents')) rates.push('Lightning Attack');
    }

    if(rates.length > 1){
      options.RoF = '?{Rate of Fire|';
      _.each(rates, function(rate){
        options.RoF += rate + '|';
      });
      options.RoF = options.RoF.replace(/\|$/,'');
      options.RoF += '}';
    } else if(rates.length == 1){
      options.RoF = rates[0];
    }
  }

  if(inqcharacter && this.Class == 'Psychic') {
    options.EffectivePR = '?{Effective PsyRating|@{' + inqcharacter.Name + '|PR}}';
  }

  if(ammo){
    if(ammo.length == 1){
      options.Ammo = ammo[0];
    } else if (ammo.length > 1){
      options.Ammo = '?{Special Ammunition|'
      _.each(ammo, function(choice){
        options.Ammo += choice + '|'
      });
      options.Ammo = options.Ammo.replace(/\|$/,'');
      options.Ammo += '}';
    }
  }

  if(options.custom){
    for(var k in this){
      if(typeof this[k] != 'function'){
        if(this[k] == this.__proto__[k]){continue;}
        if(typeof this[k] == 'object'){
          if(Array.isArray(this[k])){
            var specialRules = '';
            _.each(this[k], function(rule){
              specialRules += rule.toNote(true) + ', ';
            });
            specialRules = specialRules.replace(/, $/,'');
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

  if(this.has('Maximal')){
    if(!options.Special){
      options.Special = '?{Fire on Maximal?|Use Maximal|}';
    } else {
      options.Special += ', ?{Fire on Maximal?|Use Maximal|}';
    }
  }

  output += JSON.stringify(options);
  return output;
}
