INQQtt.prototype.razorSharp = function(inqweapon, successes){
  if(inqweapon.has('Razor Sharp') && successes >= 2){
    inqweapon.Penetration.Multiplier *= 2;
  }
}
