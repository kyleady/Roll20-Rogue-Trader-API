function INQTest(options){
  if(typeof options != 'object') options = {};
  this.Modifiers = [];

  this.Characteristic = '';
  this.PartyStat = false;
  this.Skill = '';
  this.Subgroup = '';

  this.Die = -1;
  this.Successes = -1;
  this.Failures = -1;

  this.Stat = undefined;
  this.Unnatural = undefined;

  this.setSubgroup(options.skill);
  this.setSkill(options.skill);
  this.setCharacteristic(options.characteristic);
  this.addModifier(options.modifier);
  this.getStats(options.inqcharacter);
  this.getSkillModifier(options.inqcharacter);
}
