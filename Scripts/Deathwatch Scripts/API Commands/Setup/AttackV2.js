on('ready', function() {
  CentralInput.addCMD(/^!attack2\.0$/i, function(matches, msg) {
    eachCharacter(msg, function(character, graphic) {
      var wounds = findObjs({_type: 'attribute', _characterid: character.id, name: 'Wounds'});
      var SIs = findObjs({_type: 'attribute', _characterid: character.id, name: 'Structural Integrity'});
      if(wounds[0]) {
        var prom = new Promise(function(resolve) {
          new INQCharacter(character, graphic, function(inqcharacter){
            resolve(inqcharacter);
          });
        });
      } else if(SIs[0]) {
        var prom = new Promise(function(resolve) {
          new INQVehicle(r20character, graphic, function(inqcharacter){
            resolve(inqcharacter);
          });
        });
      } else {
        return;
      }

      prom.then(function(inqcharacter){
        var abilities = findObjs({_type: 'ability', _characterid: inqcharacter.ObjID});
        for(var ability of abilities) ability.remove();
        for(var weapon of inqcharacter.List.Weapons) {
          if(weapon.toNote().indexOf('(') != -1) {
            var inqweapon = new INQWeapon(weapon.toNote());
            var action = inqweapon.toAbility(inqcharacter, {custom: true});
            createObj('ability', {
              _characterid: inqcharacter.ObjID,
              name: inqweapon.Name,
              action: action,
              istokenaction: true
            });
          }
        }

        whisper(inqcharacter.Name + ' has been converted.');
      });
    });
  });
});
