INQQtt.prototype.lance = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.inqtest.Successes;
  if(successes <= 0) return;
  if(!inqweapon.has('Lance')) return;
  log(`Lance(${1+successes})`);
  inqweapon.Penetration.Multiplier *= 1 + successes;
}
