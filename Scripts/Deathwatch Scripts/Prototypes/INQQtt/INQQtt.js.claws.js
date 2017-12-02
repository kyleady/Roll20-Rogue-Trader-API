INQQtt.prototype.claws = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.test.Successes;
  if(successes <= 0) return;
  var claws = inqweapon.has('Claws');
  if(claws){
    var total = this.getTotal(claws);
    inqweapon.Damage.Modifier += total * successes;
  }
}
