INQQtt.prototype.razorSharp = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.inqtest.Successes;
  if(!inqweapon.has('Razor Sharp')) return;
  if(successes <= 2) return;
  log('Razor Sharp');
  inqweapon.Penetration.Multiplier *= 2;
}
