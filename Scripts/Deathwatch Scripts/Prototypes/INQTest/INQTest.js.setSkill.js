INQTest.prototype.setSkill = function(input){
  if(!input) return false;
  input = input.replace(/\(.*\)/, '');
  if(this.setCharacteristic(input)) return true;
  var skills = INQTest.skills();
  for(var skill of skills){
    if(toRegex(skill).test(input)){
      this.Skill = skill.Name;
      this.Characteristic = skill.DefaultStat;
      return true;
    }
  }

  return false;
}
