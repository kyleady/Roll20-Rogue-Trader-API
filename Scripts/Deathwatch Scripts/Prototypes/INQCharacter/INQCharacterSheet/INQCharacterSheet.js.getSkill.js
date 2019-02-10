INQCharacterSheet.prototype.getSkill = function(skill_name, modifier_name) {
  let modifier = -20;
  for(let count = 1; count <= 4; count++) {
    modifier += Number(attributeValue(`${modifier_name}${count}`, {
      characterid: this.characterid,
      graphicid: this.graphicid,
      CHARACTER_SHEET: this.options.CHARACTER_SHEET
    }));
  }

  const inqlink = new INQLink(skill_name);
  inqlink.Bonus = modifier;
  return inqlink;
}
