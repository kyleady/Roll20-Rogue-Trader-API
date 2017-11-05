INQWeaponParser.prototype.parseReload = function(content){
  var matches = content.match(/^\s*(Free|Half|Full|\d+\s*Full)\s*$/i);
  if(matches){
    if(matches[1].toLowerCase() == "free"){
      this.Reload = 0;
    } else if(matches[1].toLowerCase() == "half"){
      this.Reload = 0.5;
    } else if(matches[1].toLowerCase() == "full"){
      this.Reload = 1;
    } else {
      matches = matches[1].match(/\d+/i);
      this.Reload = Number(matches[0]);
    }
  } else {
    whisper("Invalid Reload");
  }
}
