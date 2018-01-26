 function medic(matches, msg){
  var Healing = Number(matches[1]);
  if(!Healing) return whisper('Invalid amount to be healed.');
  eachCharacter(msg, function(character, graphic){
    var Wounds = {
      current: Number(graphic.get('bar3_value')),
      max: Number(graphic.get('bar3_max'))
    }

    if(Wounds.current == NaN || Wounds.max == NaN) return whisper(character.get('name') + ' has no wounds.');
    var NewWounds = Wounds.current + Healing;

    var MaxHealing = attributeValue('Max Healing', {graphicid: graphic.id, characterid: character.id, alert: false});
    MaxHealing = Number(MaxHealing);

    if(MaxHealing != NaN && NewWounds > MaxHealing) NewWounds = MaxHealing;
    if(NewWounds > Wounds.max) NewWounds = Wounds.max;

    attributeValue('Max Healing', {setTo: NewWounds, graphicid: graphic.id, characterid: character.id, alert: false});
    attributeValue('Max Healing', {max: true, setTo: NewWounds, graphicid: graphic.id, characterid: character.id, alert: false});
    graphic.set('bar3_value', NewWounds);
    announce(character.get('name') + ' has been healed to [[' + NewWounds.toString() + ']]/' + Wounds.max.toString() + ' Wounds.');
  });
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*medic\s*(\d+)\s*$/i, medic, true);
});
