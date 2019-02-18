 function medic(matches, msg){
  const healing = Number(matches[1]);
  eachCharacter(msg, function(character, graphic){
    const critical = {
      current: Number(graphic.get('bar3_value')),
      max: Number(graphic.get('bar3_max'))
    }

    if(critical.current == NaN || critical.max == NaN) return whisper(character.get('name') + ': bar3 is not valid.');
    new INQCharacter(character, graphic, (inqcharacter) => {
      const wounds_bonus = inqcharacter.bonus('Wounds');
      const enhancement = wounds_bonus > 0 ? Math.ceil(wounds_bonus / 2) : 1;
      const enhanced_healing = healing * enhancement;
      critical.healed = critical.current + enhanced_healing;
      graphic.set('bar3_value', critical.healed);
      INQMoveCriticalDamage(graphic);
      announce(`${character.get('name')} has healed [[${healing}*ceil(${wounds_bonus}/2)]] Wounds.`);
    });
  });
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*medic\s*(\d+)\s*$/i, medic, true);
});
