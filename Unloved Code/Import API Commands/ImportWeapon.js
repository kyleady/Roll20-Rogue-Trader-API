//imports a weapon from text and converts it into an ability for the selected characters

//matches[1]: weapon name
//matches[2]: weapon details
function importWeapon(matches, msg){
  //be sure at least one character is selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    whisper("Please select a character.");
    return;
  }
  //convert the text into an INQWeapon
  var details = matches[2].replace("(","[").replace(")","]");
  var inqweapon = new INQWeapon(matches[1] + "(" + details + ")");

  //give each selected character a custom weapon
  var customWeapon = new Hash();
  customWeapon.custom = "true";
  eachCharacter(msg, function(character, graphic){
    var inqcharacter = new INQCharacter(character, graphic);
    createObj("ability", {
      characterid: character.id,
      name: inqweapon.Name,
      action: inqweapon.toAbility(inqcharacter, undefined, customWeapon),
      istokenaction: true
    });

    whisper("*" + character.get("name") + "* has been given a(n) *" + inqweapon.Name + "*");
  });
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*import\s*weapon\s+(.*?)\((.*?)\)\s*$/, importWeapon);
});
