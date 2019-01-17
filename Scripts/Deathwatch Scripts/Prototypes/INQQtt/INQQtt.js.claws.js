INQQtt.prototype.claws = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.inqtest.Successes;
  var claws = inqweapon.has('Claws');
  if(!claws) return;
  var total = this.getTotal(claws);
  log(`Claws(${total})`)
  if(successes <= 0) return;
  inqweapon.Damage.Modifier += total * successes;
}
