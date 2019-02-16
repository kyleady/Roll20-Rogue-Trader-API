INQCharacter.prototype.has = function(ability, list){
  var strMatch = typeof ability == 'string';
  if(list == undefined){
    whisper("Which List are you searching?");
    return undefined;
  }
  var info = [];
  _.each(this.List[list], function(rule){
    if((strMatch && rule.Name == ability)
    || (!strMatch && ability.test(rule.Name))){
      var newRules = [];
      if(rule.Groups.length > 0){
        _.each(rule.Groups, function(subgroups){
          _.each(subgroups.split(/\s*,\s*/), function(subgroup){
            newRules.push({
              Name:  subgroup,
              Bonus: rule.Bonus,
              Characteristic: rule.Characteristic
            });
          });
        });
      } else {
        newRules.push({
          Name: 'all',
          Bonus: rule.Bonus,
          Characteristic: rule.Characteristic
        });
      }
      _.each(newRules, function(newRule){
        if(list == 'Skills'){
          _.each(info, function(oldRule){
            if(newRule.Name == oldRule.Name){
              if(newRule.Bonus > oldRule.Bonus) oldRule.Bonus = newRule.Bonus;
              newRule.Repeat = true;
            }
          });
        }
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

  if(info.length == 0) return undefined;
  log(`Has ${ability} in ${list}`);
  log(info);
  if(info.length == 1 && info[0].Name == 'all') return {Bonus: info[0].Bonus, Characteristic: info[0].Characteristic};
  return info;
}
