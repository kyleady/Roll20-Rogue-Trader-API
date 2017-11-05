INQWeaponParser.prototype.parseRange = function(content){
  var kilo = /km/i.test(content);
  content = content.replace(/k?m/i, '');
  this.Range = new INQFormula(content);
  if(kilo) this.Range.Multiplier *= 1000;
}
