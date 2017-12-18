INQDamage.prototype.ignoreNaturalArmour = function(armour) {
  var ina = Number(this.Ina.get('current')) > 0;
  if(ina && this.targetType == 'character') {
    var na = this.inqcharacter.has('Natural Armour', 'Traits');
    if(Array.isArray(na)) {
      var inqqtt = new INQQtt({PR: 0, SB: 0});
      var total = inqqtt.getTotal(na, 0);
      armour -= total;
    } else if(na) {
      return 0;
    }
  }

  return armour;
}
