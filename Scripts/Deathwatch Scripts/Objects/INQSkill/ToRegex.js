INQSkill = INQSkill || {};
//creates a string regex out of a skill/characteristic and all of its alternate names
INQSkill.toRegex = function(skill){
  var output = "";
  if(skill.Alternates){
    output = "(?:";
  }
  output += skill.Name.replace(/[- ]/, "(?:\\s*|-)");
  //include any alternate names as well
  if(skill.Alternates){
      output += "|";
    _.each(skill.Alternates, function(alternate){
      output += alternate.replace(/[- ]/, "(?:\\s*|-)");
      output += "|";
    });
    output = output.replace(/\|$/, "");
    output += ")";
  }
  return output;
}
