INQWeapon.prototype.toAbility = function(inqcharacter, options, ammo){
  if(typeof options != 'object') options = {};
  this.set(options);
  var output = '!useWeapon ';
  output += this.Name;
  if(!this.has('Spray') || this.Class == 'Psychic') options.modifiers = '?{Modifier|0}';
  var rates = [];
  if(this.Single || (this.Semi.onlyZero() && this.Full.onlyZero())){
    rates.push('Single');
    if(this.Class != 'Psychic' && !this.has('Spray')) rates.push('Called Shot');
    if(this.Class == 'Melee') rates.push('All Out Attack');
  }

  if(!this.Semi.onlyZero()) rates.push('Semi Auto(' + this.Semi + ')');
  if(!this.Full.onlyZero()) rates.push('Full Auto(' + this.Full + ')');
  if(inqcharacter && this.Class == 'Melee'){
    if(inqcharacter.has('Swift Attack', 'Talents')) rates.push('Swift Attack');
    if(inqcharacter.has('Lightning Attack', 'Talents')) rates.push('Lightning Attack');
  }

  if(rates.length > 1){
    options.RoF = '?{Rate of Fire|';
    _.each(rates, rate => options.RoF += rate + '|');
    options.RoF = options.RoF.replace(/\|$/,'');
    options.RoF += '}';
  } else if(rates.length == 1){
    options.RoF = rates[0];
  }

  if(inqcharacter && this.Class == 'Psychic') {
    if(inqcharacter.has('Unbound Psyker', 'Traits')) {
      options.FocusStrength = '?{Focus Strength|Unfettered|Push|True}';
    } else {
      options.FocusStrength = '?{Focus Strength|Fettered|Unfettered|Push}';
    }

    options.BonusPR = '?{Bonus Psy Rating|0}';
  }

  if(ammo){
    if(ammo.length == 1){
      options.Ammo = ammo[0];
    } else if (ammo.length > 1){
      options.Ammo = '?{Special Ammunition|'
      _.each(ammo, choice => options.Ammo += choice + '|');
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

  if(this.has('Overcharge')){
    if(!options.Special){
      options.Special = '';
    } else {
      options.Special += ', ';
    }

    options.Special += '?{Fire on Overcharge?|Use Overcharge|}';
  }

  if(!this.Damage.onlyZero() && GAME_OWNER != 'Abhinav') options.target = '@{target|token_id}';
  output += JSON.stringify(options);
  return output;
}
