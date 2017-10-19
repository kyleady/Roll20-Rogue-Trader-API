INQWeaponParser.prototype.parseClip = function(content){
  var matches = content.match(/^\s*(\d+)\s*$/);
  if(matches){
    this.Clip = Number(matches[1]);
  } else {
    whisper("Invalid Clip")
  }
}
