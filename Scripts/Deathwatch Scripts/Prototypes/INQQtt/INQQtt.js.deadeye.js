INQQtt.prototype.deadeye = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(inqcharacter.has(/Dead\s*Eye\s*(Shot)?/i, 'Talents')
  && /called/i.test(RoF)
  && inqweapon.isRanged()){
    this.inquse.modifiers.push({Name: 'Deadeye', Value: 10});
  }
}
