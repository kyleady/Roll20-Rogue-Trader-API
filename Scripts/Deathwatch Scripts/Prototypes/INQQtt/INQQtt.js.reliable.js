INQQtt.prototype.reliable = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Reliable')) return;
  log('Reliable');
  this.inquse.jamsAt = 100;
}
