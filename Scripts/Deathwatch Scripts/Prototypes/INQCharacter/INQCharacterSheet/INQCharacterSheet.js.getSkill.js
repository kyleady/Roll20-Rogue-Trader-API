INQCharacterSheet.prototype.getSkill = function(skill_name, group_name, modifier_name) {
  //should add in logic for custom default characteristic
  modifier_name = modifier_name || group_name || skill_name;
  let modifier = -20;
  for(let count = 1; count <= 4; count++) {
    modifier += Number(attributeValue(`${modifier_name}${count}`, {
      characterid: this.characterid,
      graphicid: this.graphicid
    }));
  }

  let text = skill_name;
  if(group_name) text += `(${group_name})`;
  const inqlink = new INQLink(text);
  inqlink.Bonus = modifier;
  return inqlink;
}
