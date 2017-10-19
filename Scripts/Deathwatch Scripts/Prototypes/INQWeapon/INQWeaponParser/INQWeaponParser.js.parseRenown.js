INQWeaponParser.prototype.parseRenown = function(content){
  var regex = "^\\s*";
  regex += "(-|Initiate|Respected|Distinguished|Famed|Hero)";
  regex += "\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    if(matches[1] == "-"){
      this.Renown = "Initiate";
    } else {
      this.Renown = matches[1].toTitleCase();
    }
  } else {
    whisper("Invalid Renown")
  }
}
