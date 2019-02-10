INQCharacterSheet.prototype.getSpecialRules = function() {
  const title_re = /^repeating_sabilities_([^_]+)_SpecialTitleRe$/;
  const titles = this.getRepeating(title_re);
  const options = {
    characterid: this.characterid,
    graphicid: this.graphicid,
    CHARACTER_SHEET: this.options.CHARACTER_SHEET
  };
  const specialRules = [];
  titles.forEach((title) => {
    const matches = title.get('name').match(title_re);
    const rule_id = matches[1];
    specialRules.push({
      Name: title.get('current'),
      Rule: attributeValue(`repeating_sabilities_${rule_id}_othernotesRe`, options)
    });
  });

  return specialRules;
}
