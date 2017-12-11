INQQtt.prototype.accurate = function(){
  var mode = this.inquse.mode;
  var inqweapon = this.inquse.inqweapon;
  var modifiers = this.inquse.modifiers;
  var successes;
  if(this.inquse.inqtest) successes = this.inquse.inqtest.Successes;
  if(mode == 'Single' && inqweapon.has('Accurate')){
    var aimmed = false;
    for(var modifier of modifiers){
      if(/^\s*(<em>\s*)?Aim(\s*<\/em>)?\s*$/i.test(modifier.Name)) {
        aimmed = true;
        break;
      }
    }

    if(!aimmed) return;
    if(successes == undefined){
      modifiers.push({Name: 'Accurate', Value: 10});
    } else {
      var twoSuccesses = Math.floor(successes / 2);
      inqweapon.Damage.DiceNumber += Math.max(Math.min(twoSuccesses, 2), 0);
    }
  }
}
