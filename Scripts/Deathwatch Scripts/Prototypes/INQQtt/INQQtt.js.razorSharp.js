INQQtt.prototype.razorSharp = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.test.Successes;
  if(inqweapon.has('Razor Sharp') && successes >= 2){
    inqweapon.Penetration.Multiplier *= 2;
  }
}
