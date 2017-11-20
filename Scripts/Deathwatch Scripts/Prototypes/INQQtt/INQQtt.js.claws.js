INQQtt.prototype.claws = function(){
  var inqweapon = this.inquse.inqweapon;
  var successes = this.inquse.test.Successes;
  var claws = inqweapon.has('Claws');
  if(claws){
    var additionalDamage = 0;
    for(var value of claws){
      if(Number(value.Name)) additionalDamage = Number(value.Name);
    }

    if(!additionalDamage) additionalDamage = 2;
    inqweapon.Damage.Modifier += 2 * Successes;
  }
}
