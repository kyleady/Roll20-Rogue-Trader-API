INQQtt.prototype.gyroStabilised = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  var modifiers = this.inquse.modifiers;
  var braced = this.inquse.braced;
  if(inqweapon.has('Gyro-Stabilised')){
    if(range == 'Extended'){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 10});
    } else if(range == 'Extreme'){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 20});
    }

    if(!braced){
      modifiers.push({Name: 'Gyro-Stabilised', Value: 10});
    }
  }
}
