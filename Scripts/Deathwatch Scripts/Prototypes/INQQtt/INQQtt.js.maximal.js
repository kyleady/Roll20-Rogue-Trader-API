INQQtt.prototype.maximal = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Use Maximal')){
    this.inquse.ammoMultiplier    *= 3;
    inqweapon.Range.Multiplier     *= 1.33;
    inqweapon.Damage.DiceNumber    += Math.round(inqweapon.Damage.DiceNumber / 2);
    inqweapon.Damage.Modifier      += Math.round(inqweapon.Damage.Modifier / 4);
    inqweapon.Penetration.Modifier += Math.round(inqweapon.Penetration.Modifier / 5);
    inqweapon.set({Special: 'Recharge'});
    var blast = inqweapon.has('Blast');
    if(blast){
      var total = this.getTotal(blast);
      total = Math.ceil(total/2);
      inqweapon.set({Special: 'Blast(' + total + ')'});
    }

    inqweapon.removeQuality('Use Maximal')
  } else {
    inqweapon.removeQuality('Maximal');
  }
}
