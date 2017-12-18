INQQtt.prototype.hordeDmg = function(){
  var inqweapon = this.inquse.inqweapon;
  var hordeDmg = inqweapon.has(/Horde\s*(Dmg|Dam(age)?)/i);
  if(hordeDmg){
    var total = this.getTotal(hordeDmg);
    this.inquse.hordeDamageMultiplier += total;
  }
}
