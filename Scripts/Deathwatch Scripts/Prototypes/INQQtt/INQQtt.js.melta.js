INQQtt.prototype.melta = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  if(inqweapon.has('Melta') && /(Point Blank|Short)/i.test(range)){
    inqweapon.Penetration.Multiplier *= 2;
  }
}
