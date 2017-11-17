INQQtt.prototype.maximal = function(inqweapon){
  if(inqweapon.has('Use Maximal')){
    this.shotsMultiplier           *= 3;
    inqweapon.Range.Multiplier     *= 1.33;
    inqweapon.Damage.DiceNumber    += Math.round(inqweapon.Damage.DiceNumber / 2);
    inqweapon.Damage.Modifier      += Math.round(inqweapon.Damage.Modifier / 4);
    inqweapon.Penetration.Modifier += Math.round(inqweapon.Penetration.Modifier / 5);
    inqweapon.set({Special: 'Recharge'});
    for(var quality of inqweapon.Special){
      if(quality.Name == 'Blast'){
        for(var i = 0; i < quality.Groups.length; i++){
          var formula = new INQFormula(quality.Groups[i]);
          formula.Modifier += Math.round(formula.Modifier);
          quality.Groups[i] = formula.toNote();
        }
      }
    }
    inqweapon.removeQuality('Use Maximal')
  } else {
    inqweapon.removeQuality('Maximal');
  }
}
