INQWeaponParser.prototype.parsePenetration = function(content){
  content = content.replace(/^Pen(etration)?:?/i, '');
  this.Penetration = new INQFormula(content);
}
