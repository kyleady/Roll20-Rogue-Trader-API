INQQtt.prototype.sharpshooter = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Sharpshooter', 'Talents')
  && /called/i.test(this.options.RoF)
  && inqweapon.isRanged()){
    this.inquse.modifiers.push({Name: 'Sharpshooter', Value: 10});
  }
}
