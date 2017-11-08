INQWeaponParser.prototype.parseClip = function(content){
  var matches = content.match(/^\s*(\d*)(|-|–|—)\s*$/);
  if(matches){
    if(matches[1]){
      this.Clip = Number(matches[1]);
    } else {
      this.Clip = 0;
    }

  } else {
    whisper('Invalid Clip')
  }
}
