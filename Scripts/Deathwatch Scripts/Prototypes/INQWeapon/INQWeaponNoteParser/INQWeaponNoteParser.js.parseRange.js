INQWeaponNoteParser.prototype.parseRange = function(detail){
  var kilo = /km/i.test(detail);
  detail = detail.replace(/k?m/i, '');
  this.Range = new INQFormula(detail);
  if(kilo) this.Range.Multiplier *= 1000;
}
