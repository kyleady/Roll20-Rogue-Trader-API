INQQtt.prototype.overcharge = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Use Overcharge')){
    this.inquse.ammoMultiplier *= 3;
    inqweapon.set({Special: 'Concussive(2), Devastating(2), Overheats, Recharge'});
    inqweapon.removeQuality('Use Overcharge')
  } else {
    inqweapon.removeQuality('Overcharge');
  }
}
