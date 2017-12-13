INQQtt.prototype.horde = function() {
  var inquse = this.inquse;
  var inqtest = inquse.inqtest;
  var inqcharacter = inquse.inqcharacter;
  var inqtarget = inquse.inqtarget;
  var modifiers = inquse.modifiers;
  var Damage = inquse.inqweapon.Damage;
  if(inqtest && inqtest.Successes != undefined) {
    if(!inquse.horde) return;
    var max = Math.floor(inquse.horde/10);
    max = Math.min(max, 2);
    Damage.DiceNumber += Math.min(inqtest.Successes, max);
  } else {
    if(modifiers == undefined) return;
    if(inqcharacter) {
      inquse.horde = inqcharacter.calcHorde();
      if(inquse.horde) modifiers.push({Name: 'Horde', Value: Math.min(inquse.horde, 20)});
    }

    if(inqtarget) {
      var tHorde = inqtarget.calcHorde();
      if(!tHorde) return;
      tHorde = Math.floor(tHorde/10) * 10;
      modifiers.push({Name: 'Horde', Value: tHorde});
    }
  }
}
