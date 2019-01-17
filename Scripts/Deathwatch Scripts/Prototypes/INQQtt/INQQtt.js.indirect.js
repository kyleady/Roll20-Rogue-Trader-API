INQQtt.prototype.indirect = function(){
  var inqweapon = this.inquse.inqweapon;
  var modifiers = this.inquse.modifiers;
  var indirect = inqweapon.has('Indirect');
  if(!indirect) return;
  var total = this.getTotal(indirect);
  log(`Indirect(${total})`);
  this.inquse.indirect = total;
  modifiers.push({Name: 'Indirect', Value: -10});
}
