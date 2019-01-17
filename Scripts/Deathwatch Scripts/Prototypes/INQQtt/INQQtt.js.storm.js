INQQtt.prototype.storm = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Storm')) return;
  log('Storm')
  this.inquse.ammoMultiplier++;
  this.inquse.hitsMultiplier++;
  this.inquse.maxHitsMultiplier++;
}
