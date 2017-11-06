INQWeapon.prototype.toAbility = function(inqcharacter, options, ammo){
  if(typeof options != 'object') options = {};
  this.set(options);
  var output = '!useWeapon ';
  output += this.Name;
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

  if(options.custom) options.custom = this.toNote(true);

  if(this.has('Maximal')){
    if(!options.Special){
      options.Special = '';
    } else {
      options.Special += ', ';
    }
    options.Special += '?{Fire on Maximal?|Use Maximal|}';
  }

  output += JSON.stringify(options);
  return output;
}
