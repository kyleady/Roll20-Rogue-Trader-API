INQTest.prototype.getSkillModifier = function(inqcharacter){
  if(!this.Skill || !inqcharacter) return;
  var modifier = -20;
  let characteristic = undefined;
  var skill = inqcharacter.has(this.Skill, 'Skills');
  if(skill){
    if(skill.length > 0){
      if(this.Subgroup){
        var re = toRegex(this.Subgroup);
        _.each(skill, function(subgroup){
          if(re.test(subgroup.Name) || /\s*all\s*/.test(subgroup.Name)){
            if(subgroup.Bonus > modifier) {
              modifier = subgroup.Bonus;
              characteristic = subgroup.Characteristic;
            }
          }
        });
      } else {
        return whisper('Please specify a subgroup for *' + getLink(this.Skill) + '*');
      }
    } else {
      modifier = skill.Bonus;
      characteristic = skill.Characteristic;
    }
  }

  this.addModifier({Name: 'Skill', Value: modifier});
  this.setCharacteristic(characteristic);
}
