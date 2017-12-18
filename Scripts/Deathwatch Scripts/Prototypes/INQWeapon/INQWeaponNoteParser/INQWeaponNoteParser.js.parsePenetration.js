INQWeaponNoteParser.prototype.parsePenetration = function(detail){
  detail = detail.replace(/^Pen(etration)?:?/i, '');
  this.Penetration = new INQFormula(detail);
}
