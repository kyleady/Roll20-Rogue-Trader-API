INQAttack_old = INQAttack_old || {};
INQAttack_old.skillBonus = function(){
  var bonus = 0;
  //is there a skill to search for?
  if(INQAttack_old.inqweapon.FocusSkill){
    //check the character for the skill
    var skill = INQAttack_old.inqcharacter.has(INQAttack_old.inqweapon.FocusSkill, "Skills");
    if(!skill){
      bonus = -20;
    } else if(skill.length > 0){
      //did the user provide a subgroup?
      if(INQAttack_old.inqweapon.FocusSkillGroup){
        //does the character have the given subgroup?
        var regex = "^\\s*";
        regex += INQAttack_old.inqweapon.FocusSkillGroup.replace(/(-|\s+)/g,"(-|\\s+)");
        regex += "\\s*$";
        var re = RegExp(regex, "i");
        var matchingSubgroup = false;
        var subgroupModifier = -20;
        _.each(skill, function(subgroup){
          if(re.test(subgroup.Name) || /^\s*all\s*$/i.test(subgroup.Name)){
            //overwrite the subgroup's modifier if it is better
            if(subgroup.Bonus > subgroupModifier){
              subgroupModifier = subgroup.Bonus;
            }
          }
        });
        //if the character does not have a matching subgroup, give them a flat -20 modifier
        bonus = subgroupModifier;
      } else {
        whisper("Psychic Power did not provide a skill group.", {speakingTo: INQAttack_old.msg.playerid, gmEcho: true});
        bonus = -20;
      }
    //the skill was found, and there is no need to match subgroups
    } else {
      //the skill was not found
      bonus = skill.Bonus;
    }
  }
  return bonus;
}
