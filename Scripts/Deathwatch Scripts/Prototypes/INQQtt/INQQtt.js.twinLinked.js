INQQtt.prototype.twinLinked = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Twin-linked')) return;
  log('Twin-linked')
  this.inquse.ammoMultiplier++;
  this.inquse.maxHitsMultiplier++;
  if(this.inquse.mode == 'Single') this.inquse.mode = 'Semi';
}
