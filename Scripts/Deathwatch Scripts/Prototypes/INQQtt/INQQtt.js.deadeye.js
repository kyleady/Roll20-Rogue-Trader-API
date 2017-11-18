INQQtt.prototype.deadeye = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Dead Eye Shot', 'Talents')
  && /called/i.test(this.options.RoF)
  && inqweapon.isRanged()){
    this.inquse.modifiers.push({Name: 'Deadeye', Value: 10});
  }
}
