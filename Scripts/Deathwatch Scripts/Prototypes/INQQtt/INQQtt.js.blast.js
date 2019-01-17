INQQtt.prototype.blast = function(){
  var inqweapon = this.inquse.inqweapon;
  var inquse = this.inquse;
  var blast = inqweapon.has('Blast');
  if(!blast) return;
  var total = this.getTotal(blast);
  log(`Blast(${total})`);
  inquse.hordeDamageMultiplier *= total;

}
