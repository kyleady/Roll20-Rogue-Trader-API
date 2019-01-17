INQQtt.prototype.independent= function(){
  var inqweapon = this.inquse.inqweapon;
  var SB = this.inquse.SB;
  if(!inqweapon.has('Independent')) return;
  log(`Independent(${-1 * SB})`);
  inqweapon.Damage.Modifier -= SB;
}
