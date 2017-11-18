INQQtt.prototype.storm = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Storm')){
    this.inquse.shotsMultiplier *= 2;
    this.inquse.hitsMultiplier *= 2;
  }
}
