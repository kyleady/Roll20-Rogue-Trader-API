INQCharacterSheet.prototype.getSkill = function(skill_name, modifier_name) {
  const options = {
    characterid: this.characterid,
    graphicid: this.graphicid,
    CHARACTER_SHEET: this.options.CHARACTER_SHEET
  };

  let modifier = -20;
  for(let count = 1; count <= 4; count++) {
    modifier += Number(attributeValue(`${modifier_name}box${count}`, options));
  }

  const inqlink = new INQLink(skill_name);
  inqlink.Bonus = modifier;
  inqlink.Characteristic = attributeValue(`${modifier_name}characteristic`, options);
  return inqlink;
}
