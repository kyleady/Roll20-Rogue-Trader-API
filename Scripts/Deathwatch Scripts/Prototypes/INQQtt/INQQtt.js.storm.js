INQQtt.prototype.storm = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Storm')){
    this.inquse.ammoMultiplier++;
    this.inquse.hitsMultiplier++;
  }
}
