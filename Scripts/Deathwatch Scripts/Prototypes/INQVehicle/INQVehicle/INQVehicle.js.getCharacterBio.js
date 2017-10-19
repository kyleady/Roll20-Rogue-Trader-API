//create a character object from the prototype
INQVehicle.prototype.getCharacterBio = function(){
  //create the gmnotes of the character
  var gmnotes = "";

  //write down the vehicle details
  for(var k in this.Bio){
    gmnotes += "<strong>" + k + "</strong>: ";
    gmnotes += this.Bio[k] + "<br>";
  }

  //display every list
  for(var list in this.List){
    //starting with the name of the list
    gmnotes += "<br>";
    gmnotes += "<u><strong>" + list + "</strong></u>";
    gmnotes += "<br>";
    //make a note for each item in the list
    _.each(this.List[list], function(item){
      gmnotes += item + "<br>";
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
