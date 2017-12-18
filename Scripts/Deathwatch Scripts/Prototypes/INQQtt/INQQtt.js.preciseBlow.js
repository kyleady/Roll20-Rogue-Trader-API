INQQtt.prototype.preciseBlow = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(inqcharacter.has('Precise Blow', 'Talents')
  && /called/i.test(RoF)
  && inqweapon.Class == 'Melee'){
    this.inquse.modifiers.push({Name: 'Precise Blow', Value: 10});
  }
}
