//check if the character has an inqlink with the given name
//and within the given list
//if there are no subgroups for the inqlink, just return {Bonus}
//if there are, return the inqlink's subgroups with a bonus for each
//if nothing was found, return undefined
INQCharacter.prototype.has = function(ability, list){
  if(list == undefined){
    whisper("Which List are you searching?");
    return undefined;
  }
  var info = [];
  _.each(this.List[list], function(rule){
    if(rule.Name == ability){
      //does the found skill have subgroups?
      var newRules = [];
      if(rule.Groups.length > 0){
        //the inklink has subgroups and each will need their own bonus
        _.each(rule.Groups, function(subgroups){
          _.each(subgroups.split(/\s*,\s*/), function(subgroup){
            newRules.push({
              Name:  subgroup,
              Bonus: rule.Bonus
            });
          });
        });
      } else {
        //the inqlink does not have subgroups
        newRules.push({
          Name: 'all',
          Bonus: rule.Bonus
        });
      }
      _.each(newRules, function(newRule){
        _.each(info, function(oldRule){
          if(newRule.Name == oldRule.Name){
            if(newRule.Bonus > oldRule.Bonus) oldRule.Bonus = newRule.Bonus;
            newRule.Repeat = true;
          }
        });
        if(!newRule.Repeat) info.push(newRule);
      });
    }
  });
  var highestAll = -99999;
  _.each(info, function(oldRule){
    if(oldRule.Name == 'all' && oldRule.Bonus > highestAll) highestAll = oldRule.Bonus;
  });
  _.each(info, function(oldRule){
    if(highestAll > oldRule.Bonus) oldRule.Bonus = highestAll;
  });


  if(info.length == 1 && info[0].Name == 'all') return {Bonus: info[0].Bonus};
  if(info.length == 0) return undefined;
  return info;
}
