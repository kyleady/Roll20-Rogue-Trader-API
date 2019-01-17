INQQtt.prototype.powerField = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Power Field')) return;
  log('Power Field');
  this.inquse.hordeDamage++;
}
