INQWeaponParser.prototype.parseFocusPower = function(content){
  var regex = "^\\s*"
  regex += "(Opposed)?\\s*"
  regex += "\\w+\\s*"
  regex += "\\((\\+|-|–)\\s*(\\d+)\\)\\s*";

  regex += "("
  regex += "Weapon\\s+Skill|";
  regex += "Ballistic\\s+Skill|";
  regex += "Strength|";
  regex += "Toughness|";
  regex += "Agility|";
  regex += "Intelligence|";
  regex += "Perception|";
  regex += "Willpower|";
  regex += "Fellowship|";
  regex += "Corruption|";
  regex += "Psyniscience";
  regex += ")"

  regex += "\\s*Test\\s*$"
  var re = RegExp(regex, "i");
  var matches = content.match(re);
  if(matches){
    this.Class = "Psychic";
    if(matches[1]){
      this.Opposed = true;
    }
    this.FocusModifier = Number(matches[2].replace("–","-") + matches[3]);
    if(/Weapon\s+Skill/i.test(matches[4])){
      this.FocusStat = "WS";
    } else if(/Ballistic\s+Skill/i.test(matches[4])){
      this.FocusStat = "BS";
    } else if(/Strength/i.test(matches[4])){
      this.FocusStat = "S";
    } else if(/Toughness/i.test(matches[4])){
      this.FocusStat = "T";
    } else if(/Agility/i.test(matches[4])){
      this.FocusStat = "Ag";
    } else if(/Intelligence/i.test(matches[4])){
      this.FocusStat = "It";
    } else if(/Perception/i.test(matches[4])){
      this.FocusStat = "Per";
    } else if(/Willpower/i.test(matches[4])){
      this.FocusStat = "Wp";
    } else if(/Fellowship/i.test(matches[4])){
      this.FocusStat = "Fe";
    } else if(/Corruption/i.test(matches[4])){
      this.FocusStat = "Corruption";
    } else if(/Psyniscience/i.test(matches[4])){
      this.FocusStat  = "Per";
      this.FocusSkill = "Psyniscience";
    }
  } else {
    whisper("Invalid Focus Power")
  }
}
