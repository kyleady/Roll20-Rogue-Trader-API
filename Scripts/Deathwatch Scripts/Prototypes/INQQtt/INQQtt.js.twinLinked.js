INQQtt.prototype.twinLinked = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Twin-linked')){
    this.inquse.ammoMultiplier *= 2;
    this.inquse.maxHitsMultiplier *= 2;
    if(this.inquse.mode == 'Single') this.inquse.mode = 'Semi';
  }
}
