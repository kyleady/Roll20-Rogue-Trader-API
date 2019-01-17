INQQtt.prototype.melta = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  if(!inqweapon.has('Melta')) return;
  if(!/^(Point Blank|Short)/i.test(range)) return;
  log('Melta');
  inqweapon.Penetration.Multiplier *= 2;
}
