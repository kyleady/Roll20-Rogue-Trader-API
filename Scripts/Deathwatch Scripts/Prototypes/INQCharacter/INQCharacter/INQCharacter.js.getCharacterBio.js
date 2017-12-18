INQCharacter.prototype.getCharacterBio = function(){
  //create the gmnotes of the character
  var gmnotes = '';

  //Movement
  //present movement in the form of a table
  var table = [[], []];
  for(var move in this.Movement){
    table[0].push(move);
    table[1].push(this.Movement[move]);
  }

  gmnotes += this.getTable(table);

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
