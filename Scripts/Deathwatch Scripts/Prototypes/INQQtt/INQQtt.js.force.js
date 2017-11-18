INQQtt.prototype.force = function(){
  if(inqweapon.has('Force')){
    var PR = this.inquse.inqcharacter.Attributes.PR;
    this.inquse.inqweapon.Damage.Modifier += PR;
    this.inquse.inqweapon.Penetration.Modifier += PR;
  }
}
