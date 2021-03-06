//get the type of character.
//currently supported: character, vehicle, starship
function characterType(characterid){
  //if the target has Structural Integrity, they are a vehicle
  if(findObjs({_type: 'attribute', _characterid: characterid, name: 'Structural Integrity'}).length > 0){
    return 'vehicle';
  //if the target has Hull, they are a starship
  } else if(findObjs({_type: 'attribute', _characterid: characterid, name: 'Hull'}).length > 0) {
    return 'starship';
  //by default the character is assumed to be a normal character
  } else {
    return 'character';
  }
}
