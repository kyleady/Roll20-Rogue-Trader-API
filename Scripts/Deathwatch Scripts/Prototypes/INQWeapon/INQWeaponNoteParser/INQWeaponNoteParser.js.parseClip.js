INQWeaponNoteParser.prototype.parseClip = function(detail){
  this.Clip = Number(detail.match(/^Clip\s*(\d+)$/)[1]);
}
