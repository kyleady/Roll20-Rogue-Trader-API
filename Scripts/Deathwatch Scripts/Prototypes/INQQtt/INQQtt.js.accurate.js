INQQtt.prototype.accurate = function(){
  var mode = this.inquse.mode;
  var inqweapon = this.inquse.inqweapon;
  var modifiers = this.inquse.modifiers;
  var successes = this.inquse.inqtest ? this.inquse.inqtest.Successes : undefined;
  if(!inqweapon.has('Accurate')) return;
  var aimmed = false;
  for(var modifier of modifiers){
    if(/^\s*(<em>\s*)?Aim(\s*<\/em>)?\s*$/i.test(modifier.Name)) {
      aimmed = true;
      break;
    }
  }

  if(!aimmed) return;
  if(successes == undefined){
    log('Accurate')
    modifiers.push({Name: 'Accurate', Value: 10});
  } else {
    if(mode != 'Single') return;
    const twoSuccesses = Math.floor(successes / 2);
    const bonus = Math.max(Math.min(twoSuccesses, 2), 0);
    log(`Accurate(${bonus})`)
    inqweapon.Damage.DiceNumber += bonus;
  }
}
