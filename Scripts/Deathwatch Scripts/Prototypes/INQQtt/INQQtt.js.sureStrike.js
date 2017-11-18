INQQtt.prototype.sureStrike = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Sure Strike', 'Talents')
  && /called/i.test(this.options.RoF)
  && inqweapon.Class == 'Melee'){
    this.inquse.modifiers.push({Name: 'Sure Strike', Value: 10});
  }
}
