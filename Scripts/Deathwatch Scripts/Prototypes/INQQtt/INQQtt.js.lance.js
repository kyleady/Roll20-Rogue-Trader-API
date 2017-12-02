INQQtt.prototype.lance = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.test.Successes;
  if(successes <= 0) return;
  if(inqweapon.has('Lance')){
    inqweapon.Penetration.Multiplier *= 1 + successes;
  }
}
