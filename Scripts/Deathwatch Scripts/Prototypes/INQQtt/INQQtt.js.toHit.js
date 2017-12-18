INQQtt.prototype.toHit = function(){
  var inqweapon = this.inquse.inqweapon;
  var toHit = inqweapon.has(/To\s*Hit/i);
  var modifiers = this.inquse.modifiers;
  if(toHit){
    var total = this.getTotal(toHit);
    modifiers.push({Name: 'Weapon', Value: total});
  }
}
