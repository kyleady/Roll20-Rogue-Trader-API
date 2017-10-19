INQWeaponNoteParser.prototype.parseRange = function(detail){
  this.Range = Number(detail.match(/^(\d+)\s*k?m$/)[1]);
}
