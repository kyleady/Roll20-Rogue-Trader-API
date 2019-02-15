INQCharacterSheet.prototype.createRepeating = function() {
  this.createList(this.List.Skills, this.createSkill);

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
    'repeating_gears_$$_Gears': inqlink.toNote(true)
  }));
  this.createList(this.List.Talents, inqlink => ({
    'repeating_talents_$$_Talents': inqlink.toNote(true)
  }));
  this.createList(this.List.Traits, inqlink => ({
    'repeating_abilities_$$_Abilities': inqlink.toNote(true)
  }));
  this.createList(this.SpecialRules, inqrule => ({
    'repeating_sabilities_$$_SpecialTitleRe': inqrule.Name,
    'repeating_sabilities_$$_othernotesRe': inqrule.Rule || inqrule.Content
  }));
}
