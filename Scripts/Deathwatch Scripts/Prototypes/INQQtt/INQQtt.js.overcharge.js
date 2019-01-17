INQQtt.prototype.overcharge = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Use Overcharge')) return inqweapon.removeQuality('Overcharge');
  log('Overcharge');
  this.inquse.ammoMultiplier += 2;
  inqweapon.set({Special: 'Concussive(2), Devastating(2), Overheats, Recharge'});
  inqweapon.removeQuality('Use Overcharge');
}
