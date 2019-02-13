INQCharacterSheet.prototype.getSkills = function() {
  const skills = [];
  const extra_skills = this.getRepeating(/^repeating_advancedskills_[^_]+_advancedskillname$/);
  for (let extra_skill of extra_skills) {
    let skill_name = extra_skill.get('current');
    let modifier_name = extra_skill.get('name').replace(/name$/, '');
    skills.push(this.getSkill(skill_name, modifier_name));
  }

  return skills;
}
