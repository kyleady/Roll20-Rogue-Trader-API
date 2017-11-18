INQQtt.prototype.twinLinked = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has("Twin-linked")){
    this.inquse.modifiers.push({Name: 'Twin-linked', Value: 20});
    this.inquse.shotsMultiplier *= 2;
    this.inquse.maxHitsMultiplier *= 2;
  }
}
