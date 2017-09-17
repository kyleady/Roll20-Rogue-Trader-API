INQSkill = INQSkill || {};
//create an OR regex out of a list within INQSkill
INQSkill.regex = function(group){
  group = INQSkill[group] || INQSkill.skills;
  var output = "("
  _.each(group, function(item){
    //let spaces and dashes be interchangeable
    output += INQSkill.toRegex(item);
    output += "|";
  });
  //remove the last OR
  output = output.replace(/\|$/, "");
  output += ")";
  return output;
}
