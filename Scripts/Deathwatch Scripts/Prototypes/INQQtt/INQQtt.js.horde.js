INQQtt.prototype.horde = function() {
  var inquse = this.inquse;
  var inqtest = inquse.inqtest;
  var inqcharacter = inquse.inqcharacter;
  var inqweapon = inquse.inqweapon;
  var inqtarget = inquse.inqtarget;
  var modifiers = inquse.modifiers;
  var Damage = inquse.inqweapon.Damage;
  var RoF = inquse.options.RoF;
  if(inqtest && inqtest.Successes != undefined) {
    if(/X/i.test(inqweapon.DamageType.Name)) inquse.hordeDamage++;
    if(/All\s*Out/i.test(RoF)) {
      var hDam = 1;
      hDam += Math.floor(inqtest.Successes/2);
      inquse.hordeDamageMultiplier *= hDam;
    }

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
