function useWeapon (matches, msg) {
  var name = matches[1];
  var originalOptions = matches[2];
  var options = carefulParse(originalOptions) || {};
  INQSelection.useSelected(msg);
  INQSelection.useInitiative(msg);
  if(!msg.selected || !msg.selected.length){
    if(playerIsGM(msg.playerid)){
      msg.selected = [{_type: 'unique'}];
    }
  }

  eachCharacter(msg, function(character, graphic){
    new INQUse(name, options, character, graphic, msg.playerid, function(inquse){
      if(!inquse) return;
      inquse.calcModifiers();
      if(inquse.autoFail) return;
      if(!inquse.autoHit) inquse.roll();
      if(character) {
        inquse.inqclip = new INQClip(inquse.inqweapon, character.id, {
          freeShot: inquse.freeShot,
          inqammo: inquse.inqammo,
          shots: inquse.maxHits,
          ammoMultilpier: inquse.ammoMultilpier,
          playerid: msg.playerid
        });

        if(!inquse.inqclip.spend()) return;
      }

      if(inquse.autoHit || inquse.inqtest.Successes >= 0) {
        if(!inquse.inqweapon.Damage.onlyZero()) {
          inquse.inqattack = new INQAttack(inquse);
          inquse.inqattack.prepareAttack();
        }
      } else {
        inquse.offerReroll(originalOptions);
      }

      inquse.display();
    });
  });
}

on('ready', function(){
  var regex = '^!\\s*use\\s*weapon';
  regex += '\\s+(\\S[^\\{\\}]*)'
  regex += '(\\{.*\\})$'
  var re = RegExp(regex, 'i');
  CentralInput.addCMD(re, useWeapon, true);
});
