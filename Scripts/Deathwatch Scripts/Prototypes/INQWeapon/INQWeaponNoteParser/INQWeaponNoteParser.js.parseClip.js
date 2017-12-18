INQWeaponNoteParser.prototype.parseClip = function(detail){
  var matches = detail.match(/^Clip\s*(\d*)(|-|–|—)$/i);
  if(matches[1]) this.Clip = Number(matches[1]);
  if(matches[2]) this.Clip = 0;
}
