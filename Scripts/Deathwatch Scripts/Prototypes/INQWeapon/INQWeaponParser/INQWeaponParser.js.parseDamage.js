INQWeaponParser.prototype.parseDamage = function(content){
  var link = new INQLinkParser();
  var regex = "^\\s*";
  regex += "(?:(\\d*\\s*x?\\s*PR|\\d+)\\s*x\\s*)?";
  regex += "(\\d*)\\s*D\\s*(\\d+)";
  regex += "(?:\\s*(\\+|-)\\s*(\\d+|\\d*\\s*x?\\s*PR))?";
  regex += "(" + link.regex() + ")";
  regex += "\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    if(matches[1]){
      if(Number(matches[1])){
        this.DiceMultiplier = Number(matches[1]);
      } else {
        this.DiceMultiplier = matches[1].replace(/[ x]/gi,"");
      }
    }
    if(matches[2] == ""){
      this.DiceNumber = 1;
    } else {
      this.DiceNumber = Number(matches[2]);
    }
    this.DiceType = Number(matches[3]);
    if(matches[4] && matches[5]){
      if(Number(matches[5])){
        this.DamageBase = Number(matches[4] + matches[5]);
      } else {
        this.DamageBase = matches[5].replace(/[ x]/gi,"");
      }
    }
    if(matches[6]){
      this.DamageType = new INQLink(matches[6]);
    }
  } else {
    whisper("Invalid Damage");
  }
}
