INQUse.prototype.loadCharacter = function(character, graphic, callback) {
  var pilot;
  if(character && characterType(character) != 'character' && !playerIsGM(this.playerid)){
    pilot = defaultCharacter(this.playerid);
  }

  if(pilot){
    this.inqcharacter = new INQCharacter(pilot, undefined, function(inqcharacter){
      inqcharacter.ObjID = character.id;
      inqcharacter.GraphicID = graphic.id;
      callback(true);
    });
  } else if (character) {
    this.inqcharacter = new INQCharacter(character, graphic, function(){
      callback(true);
    });
  } else {
    callback(true);
  }
}
