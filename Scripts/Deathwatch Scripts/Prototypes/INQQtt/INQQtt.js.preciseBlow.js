INQQtt.prototype.preciseBlow = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Precise Blow', 'Talents')
  && /called/i.test(this.options.RoF)
  && inqweapon.isRanged()){
    this.inquse.modifiers.push({Name: 'Precise Blow', Value: 10});
  }
}
