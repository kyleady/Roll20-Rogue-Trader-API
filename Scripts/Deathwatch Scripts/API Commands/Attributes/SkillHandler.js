//allows players to roll against a skill they may or may not have
  //matches[1] - skill name
  //matches[2] - skill subgroup
  //matches[3] - modifier sign
  //matches[4] - modifier absolute value
  //matches[5] - alternate characteristic
function skillHandler(matches, msg){
  //store the input variables
  var gmwhisper = matches[1];
  var skillName = matches[2];
  var skillSubgroup = matches[3];
  if(matches[4]){
    var modifier = Number(matches[4] + matches[5]);
  } else {
    var modifier = 0;
  }
  var stat = matches[6];

  //determine the actual name of the skill
  //and use its defaultStat
  _.each(INQSkill.skills, function(skill){
    if(RegExp("^" + INQSkill.toRegex(skill) + "$", "i").test(skillName)){
      skillName = skill.Name;
      if(!stat){
        stat = skill.DefaultStat;
      }
    }
  });
  //determine the actual name of the characteristic
  _.each(INQSkill.characteristics, function(characteristic){
    if(RegExp("^" + INQSkill.toRegex(characteristic) + "$", "i").test(stat)){
      stat = characteristic.Name;
    }
  });

  //let each character take the skill check
  eachCharacter(msg, function(character, graphic){
    //parse this character
    var inqcharacter = new INQCharacter(character, graphic);
    //determine if the character has this skill
    var skill = inqcharacter.has(skillName, "Skills");
    if(!skill){
      //the character does not have this skill
      modifier += -20;
    //the character has a skill with subgroups
    } else if(skill.length > 0){
      //did the user provide a subgroup?
      if(skillSubgroup){
        //does the character have the given subgroup?
        var regex = "^\\s*";
        regex += INQSkill.toRegex({Name: skillSubgroup});
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
        modifier += subgroupModifier;
      } else {
        //the skill needs a subgroup but the user didn't supply one
        whisper("Please specify a subgroup for *" + getLink(skillName) + "*", {speakingTo: msg.playerid, gmEcho: true});
        //skip to the next character
        return;
      }
    //the skill was found, and there is no need to match subgroups
    } else {
      //apply the skill's modifier
      modifier += skill.Bonus;
    }
    //turn the modifier into text
    if(modifier >= 0){
      var modifierSign = "+";
    } else {
      var modifierSign = "-";
    }
    modifierAbsValue = Math.abs(modifier).toString();
    //create a fake msg to select this character alone
    fakeMsg = {
      playerid: msg.playerid,
      selected: [graphic]
    };
    //note the skill being rolled in the template
    options = {
      display: [{
        Title: "Skill",
        Content: getLink(skillName)
      }]
    }
    //show the subgroup as well if it exists
    if(skillSubgroup){
      options.display.push({
        Title: "Group",
        Content: skillSubgroup.trim().toTitleCase().replace(/\s\s+/g, " ")
      });
    }
    //call upon the stat handler to make the actual roll
    statRoll(["", gmwhisper, stat, modifierSign, modifierAbsValue], fakeMsg, options);
  });
}

on("ready", function(){
  var regex = "^!\\s*";
  regex += "(gm|)\\s*";
  regex += INQSkill.regex("skills") + "\\s*";
  regex += "(?:\\(([^\\(\\)]+)\\))?\\s*";
  regex += "(?:(\\+|-)\\s*(\\d+))?\\s*";
  regex += "(?:\\|\\s*";
  regex += INQSkill.regex("characteristics");
  regex += "\\s*)?\\s*";
  regex += "$";

  CentralInput.addCMD(RegExp(regex, "i"), INQSkill.skillHandler, true);
});
