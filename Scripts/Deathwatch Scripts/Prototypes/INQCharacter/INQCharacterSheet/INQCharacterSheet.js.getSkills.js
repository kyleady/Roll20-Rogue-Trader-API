INQCharacterSheet.prototype.getSkills = function() {
  const skills = [];
  const base_skills = [
    "Acrobatics",
    "Athletics",
    "Awareness",
    "Charm",
    "Command",
    "Commerce",
    "Deceive",
    "Inquiry",
    "Interrogation",
    "Intimidate",
    "Logic",
    "Medicae",
    "Psyniscience",
    "Scrutiny",
    "Security",
    "Stealth",
    "Survival"
  ];
  skills.push(this.getSkill("Tech Use", undefined, "TechUse"));
  skills.push(this.getSkill("Sleight Of Hand", undefined, "SleightOfHand"));
  for (let skill_name of base_skills) {
    skills.push(this.getSkill(skill_name));
  }

  const navigation_groups = [
    "Surface",
    "Warp",
    "Stellar"
  ];
  for(let group_name of navigation_groups) {
    skills.push(this.getSkill("Navigate", group_name));
  }

  skills.push(this.getSkill("Operate", "Surface", "OSurface"));
  const operate_groups = [
    "Aeronautica",
    "Voidship"
  ];
  for(let group_name of navigation_groups) {
    skills.push(this.getSkill("Operate", group_name));
  }

  const custom_groups = [
    {
      'count': 3,
      'modifier_name': 'Language',
      'skill_name': 'Linguistics'
    },
    {
      'count': 4,
      'modifier_name': 'Trade',
      'skill_name': 'Trade'
    },
    {
      'count': 4,
      'modifier_name': 'Common',
      'skill_name': 'Common Lore'
    },
    {
      'count': 6,
      'modifier_name': 'Scholastic',
      'skill_name': 'Scholastic Lore'
    },
    {
      'count': 6,
      'modifier_name': 'Forbidden',
      'skill_name': 'Forbidden Lore'
    }
  ];
  const counters = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th"
  ];
  for (let custom_group of custom_groups) {
    let modifier_name = custom_group['modifier_name'];
    let skill_name = custom_group['skill_name'];
    for (let count = 1; count <= 6; count++) {
      if(count >= custom_group['count']) break;
      let counter = counters[count];
      let group_name = getAttrByName(this.characterid, `${counter}${modifier_name}`);
      if(!group_name) continue;
      skills.push(this.getSkill(skill_name, group_name, `${counter}${modifier_name}`));
    }
  }

  const extra_skills = this.getRepeating(/^repeating_advancedskills_[^_]+_advancedskillname$/);
  for (let extra_skill of extra_skills) {
    let skill_name = extra_skill.get('current');
    let modifier_name = extra_skill.get('name').replace(/name$/, 'box');
    skills.push(this.getSkill(skill_name, undefined, modifier_name));
  }

  return skills;
}
