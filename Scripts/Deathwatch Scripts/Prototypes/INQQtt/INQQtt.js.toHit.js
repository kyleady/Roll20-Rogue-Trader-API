INQQtt.prototype.toHit = function(){
  var inqweapon = this.inquse.inqweapon;
  var toHit = inqweapon.has(/To\s*Hit/i);
  var modifiers = this.inquse.modifiers;
  if(!toHit) return;
  var total = this.getTotal(toHit, -100);
  log(`To Hit(${total})`);
  modifiers.push({Name: 'Weapon', Value: total});
}
