//imports a weapon from text and converts it into an ability for the selected characters

//matches[1]: weapon name
//matches[2]: weapon details
function importWeapon(matches, msg){
  //be sure at least one character is selected
  if(msg.selected == undefined || msg.selected.length != 1){
    return whisper('Please select one character.');
  }
  //convert the text into an INQWeapon
  var name = matches[1];
  var details = matches[2].replace('(','[').replace(')',']');
  var weapon = new INQWeapon(name + '(' + details + ')');

  //give each selected character a custom weapon
  var customWeapon = {custom: true};
  eachCharacter(msg, function(character, graphic){
    new INQCharacter(character, graphic, function(inqcharacter) {
      createObj('ability', {
        characterid: character.id,
        name: name,
        action: weapon.toAbility(inqcharacter, customWeapon),
        istokenaction: true
      });

      whisper('*' + character.get('name') + '* has been given a(n) *' + name + '*');
    });
  });
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*import\s*weapon\s+(.*?)\((.*?)\)\s*$/i, importWeapon);
});
