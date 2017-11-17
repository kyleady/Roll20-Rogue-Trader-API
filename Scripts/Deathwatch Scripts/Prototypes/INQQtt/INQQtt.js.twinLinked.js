INQQtt.prototype.twinLinked = function(inqweapon){
  if(inqweapon.has("Twin-linked")){
    this.modifiers.push({Name: 'Twin-linked', Value: 20});
    this.shotsMultiplier *= 2;
    this.maxHitsMultiplier *= 2;
  }
}
