INQWeaponParser.prototype.parseAvailability = function(content){
  var regex = "^\\s*";
  regex += "(Ubiquitous|Abundant|Plentiful|Common|Average|Scarce|Rare|Very\s*Rare|Extremely\s*Rare|Near\s*Unique|Unique)";
  regex += "\\s*$";
  var re = new RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    this.Availability = matches[1].toTitleCase();
  } else {
    whisper("Invalid Availability")
  }
}
