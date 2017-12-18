INQQtt.prototype.sharpshooter = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(inqcharacter.has('Sharpshooter', 'Talents')
  && /called/i.test(RoF)
  && inqweapon.isRanged()){
    this.inquse.modifiers.push({Name: 'Sharpshooter', Value: 10});
  }
}
