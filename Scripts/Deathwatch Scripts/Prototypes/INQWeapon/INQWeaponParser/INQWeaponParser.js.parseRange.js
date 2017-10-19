INQWeaponParser.prototype.parseRange = function(content){
  var regex = "^\\s*(?:"
  regex += "(\\d+)\\s*k?(?:|m|metres|meters)";
  regex += "|";
  regex += "(?:SB|Strength\\s*Bonus)\\s*x?\\s*(\\d*)\s*k?(?:|m|metres|meters)";
  regex += "|";
  regex += "(\\d*)\\s*k?(?:|m|metres|meters)\\s*x?\\s*(?:PR|Psy\\s*Rating)\\s*x?\\s*(\\d*)";
  regex += "|"
  regex += "Self"
  regex += ")\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    if(matches[1] != null){
      this.Range = Number(matches[1]);
    }
    if(matches[2] != null){
      this.Range = matches[2] + "SB";
    }
    if(matches[3] != null){
      this.Range = matches[3] + "PR";
    }
    if(matches[4] != null){
      this.Range = 0;
    }
  } else {
    whisper("Invalid Range");
  }
}
