//check if the character has an inqlink with the given name
//and within the given list
//if there are no subgroups for the inqlink, just return {Bonus}
//if there are, return the inqlink's subgroups with a bonus for each
//if nothing was found, return undefined
INQVehicle.prototype.has = function(ability, list){
  var info = undefined;
  if(list == undefined){
    list = "Vehicle Traits";
  }
  _.each(this.List[list], function(rule){
    if(rule.Name == ability){
      //if we have not found the rule yet
      if(info == undefined){
        //does the found skill have subgroups?
        if(rule.Groups.length > 0){
          //the inklink has subgroups and each will need their own bonus
          info = [];
          _.each(rule.Groups, function(subgroup){
            info.push({
              Name:  subgroup,
              Bonus: rule.Bonus
            });
          });
        } else {
          //the inqlink does not have subgroups
          info = {
            Bonus: rule.Bonus
          };
        }
      //if the rule already has been found
      //AND the rule has subgroups
      //AND the previously found rule had subgroups
      } else if(rule.Groups.length > 0 && info.length > 0){
        //add the new found subgroups in with their own bonuses
        _.each(rule.Groups, function(){
          info.push({
            Name:  subgroup,
            Bonus: rule.Bonus
          });
        });
      }
    }
  });
  return info;
}
