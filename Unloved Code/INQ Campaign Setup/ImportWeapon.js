//imports a weapon from text and converts it into an ability for the selected characters

//matches[1]: weapon name
//matches[2]: weapon details
function importWeapon(matches, msg){
  //be sure at least one character is selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    whisper("Please select a character.");
    return;
  }
  //prepare to convert the text into an INQWeapon
  var inqweapon = new INQWeapon();
  inqweapon.Name = matches[1].trim();
  var details = matches[2].split(";");

  //parse each detail of the weapon
  _.each(details, function(detail){
    detail = detail.trim();

    //Class
    if(/^(melee|pistol|basic|heavy)$/i.test(detail)){
      inqweapon.Class = detail.toTitleCase();

    //Range
    } else if(/^\d+\s*k?m$/i.test(detail)){
      inqweapon.Range = Number(detail.match(/^(\d+)\s*k?m$/)[1]);

    //Rate of Fire
    } else if(/^(S|-)\s*\/\s*(\d+|-)\s*\/\s*(\d+|-)$/.test(detail)){
      var RoFmatches = detail.match(/^(S|-)\s*\/\s*(\d+|-)\s*\/\s*(\d+|-)$/);
      inqweapon.Single = RoFmatches[1] == "S";
      if(RoFmatches[2] != "-"){
        inqweapon.Semi = Number(RoFmatches[2]);
      }
      if(RoFmatches[3] != "-"){
        inqweapon.Full = Number(RoFmatches[3]);
      }

      //RoF means not a Melee weapon
      if(inqweapon.Class == "Melee"){
        inqweapon.Class = "Basic";
      }

    //Damage
    } else if(/^\d*\s*D\s*\d+\s*\+?\s*\d*\s*(I|R|E|X|)$/.test(detail)) {
      var DamageMatches = detail.match(/^(\d*)\s*D\s*(\d+)\s*\+?\s*(\d*)\s*(I|R|E|X|)$/);
      if(DamageMatches[1] != ""){
        inqweapon.DiceNumber = Number(DamageMatches[1]);
      } else {
        inqweapon.DiceNumber = 1;
      }

      inqweapon.DiceType = Number(DamageMatches[2]);

      if(DamageMatches[3] != ""){
        inqweapon.DamageBase = Number(DamageMatches[3]);
      }
      if(DamageMatches[4] != ""){
        inqweapon.DamageType = new INQLink(DamageMatches[4]);
      }

    //Penetration
    } else if(/^Pen(etration)?:?\s*\d+$/.test(detail)){
      inqweapon.Penetration = Number(detail.match(/^Pen(?:etration)?\:?\s*(\d+)$/)[1]);

    //Clip
  } else if(/^Clip\s*\d+$/i.test(detail)) {
      inqweapon.Clip = Number(detail.match(/^Clip\s*(\d+)$/)[1]);

    //Reload
  } else if(/^(?:Reload|Rld):?\s*(\d*)\s*(Free|Half|Full)$/i.test(detail)) {
      var ReloadMatches = detail.match(/^(?:Reload|Rld):?\s*(\d*)\s*(Free|Half|Full)$/i);
      switch(ReloadMatches[2].toTitleCase()){
        case 'Free':
          inqweapon.Reload = 0;
        break;
        case 'Half':
          inqweapon.Reload = 0.5;
        break;
        case 'Full':
          inqweapon.Reload = 1;
        break;
      }

      if(ReloadMatches[1] != ""){
        inqweapon.Reload *= Number(ReloadMatches[1]);
      }

    //Special Rules
    } else {
      _.each(detail.split(","), function(rule){
        inqweapon.Special.push(new INQLink(rule.trim()));
      });
    }
  });

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
