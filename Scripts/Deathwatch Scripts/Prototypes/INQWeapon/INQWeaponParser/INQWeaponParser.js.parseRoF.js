INQWeaponParser.prototype.parseRoF = function(content){
  var regex = "^\\s*";
  regex += "(S|-)";
  regex += "\\s*\\/\\s*";
  regex += "(\\d+|-|\\d*\\s*x?\\s*PR)";
  regex += "\\s*\\/\\s*";
  regex += "(\\d+|-|\\d*\\s*x?\\s*PR)";
  regex += "\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    this.Single = matches[1].toUpperCase() == "S";
    if(matches[2] == "-"){
      this.Semi = 0;
    } else if(Number(matches[2])){
      this.Semi = Number(matches[2]);
    } else {
      this.Semi = matches[2].replace(/[ x]/gi,"");
    }
    if(matches[3] == "-"){
      this.Full = 0;
    } else if(Number(matches[3])){
      this.Full = Number(matches[3]);
    } else {
      this.Full = matches[3].replace(/[ x]/gi,"");
    }
  } else {
    whisper("Invalid RoF");
  }
}
