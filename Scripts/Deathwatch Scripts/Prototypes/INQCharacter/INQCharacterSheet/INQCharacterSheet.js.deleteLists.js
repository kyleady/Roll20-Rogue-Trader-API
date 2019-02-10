INQCharacterSheet.prototype.deleteLists = function() {
  this.deleteList(/^repeating_advancedskills_[^_]+_advancedskill(name|box)(|1|2|3|4)$/);
  this.deleteList(/^repeating_psypowers_[^_]+_PsyName2?$/);
  this.deleteList(/^repeating_(ranged|melee)weapons_[^_]+_(Ranged|melee)weaponname$/);
  this.deleteList(/^repeating_gears_[^_]+_Gears$/);
  this.deleteList(/^repeating_talents_[^_]+_Talents$/);
  this.deleteList(/^repeating_abilities_[^_]+_Abilities$/);
  this.deleteList(/^repeating_sabilities_([^_]+)_(SpecialTitle|othernotes)Re$/);
}
