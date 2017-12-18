//damages every selected character according to the stored damage variables
function applyDamage (matches,msg){
  eachCharacter(msg, function(character, graphic) {
    new INQDamage(character, graphic, function(inqdamage) {
      if(!inqdamage) return;
      if(!inqdamage.checkDamage()) return;
      inqdamage.applyArmour();
      inqdamage.applyToughness();
      if(!inqdamage.damage && inqdamage.damage != 0) return whisper('Damage undefined.');
      if(/^H/i.test(graphic.get('bar2_value'))) return inqdamage.hordeDamage(graphic);
      if(inqdamage.targetType == 'starship') inqdamage.starshipDamage(graphic);
      inqdamage.recordWounds(graphic);
      saveHitLocation(randomInteger(100));
      whisper(graphic.get('name') + ' took ' + inqdamage.damage + ' damage.');
      announce(Math.round(inqdamage.damage * 100 / graphic.get('bar3_max')) + '% taken.');
      if(/S/i.test(inqdamage.DamType.get('current'))) inqdamage.Dam.set('current', 0);
    });
  });
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*(?:dam(?:age)?|attack)\s*$/i, applyDamage);
});
