INQQtt.prototype.unreliable = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Unreliable')) return;
  log('Unreliable');
  this.inquse.jamsAt = 91;
}
