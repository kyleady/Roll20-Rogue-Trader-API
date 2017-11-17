INQQtt.prototype.accurate = function(inqweapon, mode, successes){
  if(mode == 'Single' && inqweapon.has('Accurate')){
    for(var modifier of this.modifiers){
      if(/^\s*Aim\s*$/i.test(modifier.Name)) {
        this.modifiers.push({Name: 'Accurate', Value: 10});
        break;
      }
    }
    inqweapon.Damage.DiceNumber += Math.min(successes, 2);
  }
}
