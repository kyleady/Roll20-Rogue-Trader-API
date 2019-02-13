INQCharacterSheet.prototype.createRepeating = function() {
  this.createList(this.List.Skills, (inqlink) => {
    let skill_name = inqlink.Name;
    if(inqlink.Groups[0]) skill_name += `(${inqlink.Groups[0]})`;
    const modifier1 = inqlink.Bonus >= 0  ? 20 : 0;
    const modifier2 = inqlink.Bonus >= 10 ? 10 : 0;
    const modifier3 = inqlink.Bonus >= 20 ? 10 : 0;
    const modifier4 = inqlink.Bonus >= 30 ? 10 : 0;
    return {
      'repeating_advancedskills_$$_advancedskillname': skill_name,
      'repeating_advancedskills_$$_advancedskillbox1': modifier1,
      'repeating_advancedskills_$$_advancedskillbox2': modifier2,
      'repeating_advancedskills_$$_advancedskillbox3': modifier3,
      'repeating_advancedskills_$$_advancedskillbox4': modifier4
    }
  });

  const left_psychic = [];
  const right_psychic = [];
  for(let count = 0; count < this.List["Psychic Powers"].length; count++) {
    let target_list = count % 2 ? right_psychic : left_psychic;
    target_list.push(this.List["Psychic Powers"][count]);
  }
  this.createList(left_psychic, inqlink => ({
    'repeating_psypowers_$$_PsyName': inqlink.Name
  }));
  this.createList(right_psychic, inqlink => ({
    'repeating_psypowers_$$_PsyName2': inqlink.Name
  }));

  const melee_weapons = [];
  const ranged_weapons = [];
  _.each(this.List.Weapons, (inqweapon) => {
    let target_list = inqweapon.Class == 'Melee' ? melee_weapons : ranged_weapons;
    target_list.push(inqweapon);
  });
  this.createList(melee_weapons, inqweapon => ({
    'repeating_meleeweapons_$$_meleeweaponname': inqweapon.Name
  }));
  this.createList(ranged_weapons, inqweapon => ({
    'repeating_rangedweapons_$$_Rangedweaponname': inqweapon.Name
  }));

  this.createList(this.List.Gear,inqlink => ({
    'repeating_gears_$$_Gears': inqlink.Name
  }));
  this.createList(this.List.Talents, inqlink => ({
    'repeating_talents_$$_Talents': inqlink.Name
  }));
  this.createList(this.List.Traits, inqlink => ({
    'repeating_abilities_$$_Abilities': inqlink.Name
  }));
  this.createList(this.SpecialRules, inqrule => ({
    'repeating_sabilities_$$_SpecialTitleRe': inqrule.Name,
    'repeating_sabilities_$$_othernotesRe': inqrule.Rule || inqrule.Content
  }));
}
