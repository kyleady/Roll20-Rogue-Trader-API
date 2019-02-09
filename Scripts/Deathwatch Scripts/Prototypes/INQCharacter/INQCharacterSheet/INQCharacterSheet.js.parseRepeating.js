INQCharacterSheet.prototype.parseRepeating = function() {
  this.List.Skills            = this.getSkills();
  this.List["Psychic Powers"] = this.getList(/^repeating_psypowers_[^_]+_PsyName2?$/);
  this.List.Weapons           = this.getList(/^repeating_(ranged|melee)weapons_[^_]+_(Ranged|melee)weaponname$/);
  this.List.Gear              = this.getList(/^repeating_gears_[^_]+_Gears$/);
  this.List.Talents           = this.getList(/^repeating_talents_[^_]+_Talents$/);
  this.List.Traits            = this.getList(/^repeating_abilities_[^_]+_Abilities$/);
  this.SpecialRules           = this.getSpecialRules();
}
