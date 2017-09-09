//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

INQAttack.detailTheCharacter = function(character, graphic){
  INQAttack.inqcharacter = undefined;
  if(characterType(character) != 'character' && !playerIsGM(INQAttack.msg.playerid)){
    var pilot = defaultCharacter(INQAttack.msg.playerid);
    if(pilot != undefined){
      INQAttack.inqcharacter = new INQCharacter(pilot);
      INQAttack.inqcharacter.ObjID = character.id;
      INQAttack.inqcharacter.GraphicID = graphic.id;
    }
  }
  if(INQAttack.inqcharacter == undefined){
    INQAttack.inqcharacter = new INQCharacter(character, graphic);
  }
  log("INQAttack.inqcharacter.ObjID")
  log(INQAttack.inqcharacter.ObjID)
  log("INQAttack.inqcharacter.GraphicID")
  log(INQAttack.inqcharacter.GraphicID)
}
