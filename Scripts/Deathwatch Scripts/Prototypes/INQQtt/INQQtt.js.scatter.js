INQQtt.prototype.scatter = function() {
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  if(!inqweapon.has('Scatter')) return;
  log('Scatter');
  if(/^Point Blank/i.test(range)){
    inqweapon.Damage.DiceNumber += 2;
  } else if(/^(Long|Extended|Extreme|Impossible)/.test(range)){
    inqweapon.set({Special: 'Primitive'});
  }
}
