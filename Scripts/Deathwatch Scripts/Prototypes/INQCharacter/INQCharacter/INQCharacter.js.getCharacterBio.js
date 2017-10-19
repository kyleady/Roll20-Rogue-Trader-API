INQCharacter.prototype.getCharacterBio = function(){
  //create the gmnotes of the character
  var gmnotes = "";

  //Movement
  //present movement in the form of a table
  gmnotes += "<table><tbody>";
  gmnotes += "<tr>"
  for(var move in this.Movement){
    gmnotes += "<td><strong>" + move + "</strong></td>";
  }
  gmnotes += "</tr>"
  gmnotes += "<tr>"
  for(var move in this.Movement){
    gmnotes += "<td>" + this.Movement[move] + "</td>";
  }
  gmnotes += "</tr>";
  gmnotes += "</tbody></table>";

  //display every list
  for(var list in this.List){
    //starting with the name of the list
    gmnotes += "<br>";
    gmnotes += "<u><strong>" + list + "</strong></u>";
    gmnotes += "<br>";
    //make a note for each item in the list
    _.each(this.List[list], function(item){
      gmnotes += item.toNote() + "<br>";
    });
  }

  //tack on any Special Rules
  _.each(this.SpecialRules, function(rule){
    gmnotes += "<br>";
    gmnotes += "<strong>" + rule.Name + "</strong>: ";
    gmnotes += rule.Rule;
    gmnotes += "<br>";
  });

  return gmnotes;
}
