INQQtt.prototype.sureStrike = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(inqcharacter.has('Sure Strike', 'Talents')
  && /called/i.test(RoF)
  && inqweapon.Class == 'Melee'){
    this.inquse.modifiers.push({Name: 'Sure Strike', Value: 10});
  }
}
