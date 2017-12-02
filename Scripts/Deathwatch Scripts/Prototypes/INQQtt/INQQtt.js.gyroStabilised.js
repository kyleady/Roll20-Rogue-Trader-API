INQQtt.prototype.gyroStabilised = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var range = this.inquse.range;
  var modifiers = this.inquse.modifiers;
  var braced = this.inquse.braced;
  if(inqweapon.has(/Gyro(-|\s*)Stabilised/i)){
    if(range == 'Extended' && !inqcharacter.has('Marksman', 'Talents')){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 10});
    } else if(range == 'Extreme'){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 20});
    }

    if(!braced && inqweapon.Class == 'Heavy'){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 10});
    }
  }
}
