INQQtt.prototype.marksman = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var modifiers = this.inquse.modifiers;
  var range = this.inquse.range;
  if(!inqcharacter.has('Marksman', 'Talents')) return;
  if(!inqweapon.isRanged()) return;
  log('Marksman')
  if(/^Long/i.test(range)) {
    modifiers.push({Name: 'Marksman', Value: 10});
  } else if(/^Extended/i.test(range)) {
    modifiers.push({Name: 'Marksman', Value: 20});
  } else if(/^Extreme/i.test(range)) {
    modifiers.push({Name: 'Marksman', Value: 30});
  }
}
