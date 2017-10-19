INQWeaponParser.prototype.parsePenetration = function(content){
  var regex = "^\\s*";
  regex += "(\\d*\\s*x?\\s*PR|\\d+)";
  regex += "\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    if(Number(matches[1])){
      this.Penetration = Number(matches[1]);
    } else {
      this.Penetration = matches[1].replace(/[ x]/gi,"");
    }
  } else {
    whisper("Invalid Penetration");
  }
}
