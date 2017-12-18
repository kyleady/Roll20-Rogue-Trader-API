//allows the gm to create a new roll20 character sheet that represents a brand
//new character.
//matches[1], if == player then the details of the character will be put in the bio instead of the gmnotes
//matches[2] is the type of character to make (character, vehicle, starship)
function newCharacter(matches, msg){

  var charactertype = undefined;
  var character = undefined;
  //allow the new character to be player owned
  var playerOwned = /^\s*player\s*/i.test(matches[1]);

  //allow the character type to be a vehicle
  if(/^\s*vehicle\s*/i.test(matches[2])){
    charactertype = "Vehicle";
    character = new INQVehicle();
  }

  //allow the character type to be a starship
  if(/^\s*star\s*ship\s*/i.test(matches[2])){
    charactertype = "Starship";
    character = new INQStarship();
  }

  //by default, create a new character
  if(charactertype == undefined){
    charactertype = "Character";
    character = new INQCharacter();
  }

  //find a unique name for the character
  var counter = 0;
  var characterName = "New " + charactertype;
  do {
   counter++;
   if(counter > 1){
     characterName = "New " + charactertype + " " + counter.toString();
   }
   duplicateCharacters = findObjs({
     _type: "character",
     name: characterName
   });
 } while(duplicateCharacters.length > 0);

  //save the unique name
  character.Name = characterName;

  //turn the INQ object into a character sheet
  character.toCharacterObj(playerOwned);

  //report the success
  whisper(character.toLink() + " was created.");
}

//waits until CentralInput has been initialized
on("ready",function(){
  CentralInput.addCMD(/^!\s*new\s*(|player)\s*(character|vehicle|starship)\s*$/i,newCharacter);
});
