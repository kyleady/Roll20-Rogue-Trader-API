INQQtt.prototype.accurate = function(){
  var mode = this.inquse.mode;
  var inqweapon = this.inquse.inqweapon;
  var modifiers = this.inquse.modifiers;
  var successes = this.inquse.test.Successes;
  if(mode == 'Single' && inqweapon.has('Accurate')){
    if(!successes){
      for(var modifier of modifiers){
        if(/^\s*Aim\s*$/i.test(modifier.Name)) {
          modifiers.push({Name: 'Accurate', Value: 10});
          break;
        }
      }
    } else {
      inqweapon.Damage.DiceNumber += Math.min(successes, 2);
    }
  }
}
