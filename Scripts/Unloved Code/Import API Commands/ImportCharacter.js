charImport = {}
function importCharacter(matches, msg) {
  var isPlayer = matches[1];
  var charType = matches[2].toLowerCase();
  var charPhrase = matches[3];
  var charObjs = suggestCMD('!import ' + isPlayer + ' ' + charType + ' $', charPhrase, msg.playerid, 'character');
  if(!charObjs) return;
  var charObj = charObjs[0];
  charObj.get('bio', function(importText){
    if(!importText) return whisper('Bio is empty.');
    var character = {};
    switch(charType) {
      case 'character':
        character = new INQCharacter(importText);
      break;
      case 'vehicle':
        character = new INQVehicle(importText);
      break;
      default:
        return whisper('Unknown character type.');
    }

    character.Name = charObj.get('name');
    character.toCharacterObj(isPlayer, charObj.id);
    if(isPlayer) charObj.set('gmnotes', importText);
    whisper('*' + getLink(charObj) + '* has been imported. Note that attributes will not be shown until the character sheet has been closed and opened again.');
  });
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*import\s*(|player)\s*(character|vehicle)\s+(\S.*)\s*$/i, importCharacter);
});
