INQQtt.prototype.storm = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Storm')){
    this.inquse.ammoMultiplier *= 2;
    this.inquse.hitsMultiplier *= 2;
  }
}
