INQQtt.prototype.devastating = function(){
  var inqweapon = this.inquse.inqweapon;
  var devastating = inqweapon.has('Devastating');
  if(!devastating) return;
  var total = this.getTotal(devastating);
  log(`Devastating(${total})`);
  this.inquse.hordeDamageMultiplier += total;
}
