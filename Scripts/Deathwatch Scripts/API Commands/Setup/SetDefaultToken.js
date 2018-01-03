//sets the selected token as the default token for the named character after
//detailing the token
//  matches[1] - the name of the character sheet
function setDefaultToken(matches, msg){
  //get the selected token
  if(msg.selected && msg.selected.length == 1){
    var graphic = getObj('graphic', msg.selected[0]._id);
    if(graphic == undefined) return whisper('graphic undefined');
  } else {
    return whisper('Please select exactly one token.');
  }

  var isPlayer = matches[1];
  var name = matches[2];
  var characters = suggestCMD('!Give Token To $', name, msg.playerid, 'character');
  if(!characters) return;
  var character = characters[0];
  var bars = ['bar1', 'bar2', 'bar3'];
  switch(characterType(character.id)){
    case 'character':
      var names = {bar1: 'Fatigue', bar2: 'Fate', bar3: 'Wounds'};
    break;
    case 'vehicle':
      var names = {bar1: 'Tactical Speed', bar2: 'Aerial Speed', bar3: 'Structural Integrity'};
    break;
    case 'starship':
      var names = {bar1: 'Population', bar2: 'Morale', bar3: 'Hull'};
    break;
  }

  var attrs = {};
  for(var bar of bars) attrs[bar] = findObjs({name: names[bar], _type: 'attribute', _characterid: character.id})[0] || {get: () => 0};
  var links = {};
  for(var bar of bars) links[bar] = attrs[bar].id || '';
  if(!isPlayer) links = {bar1: '', bar2: '', bar3: ''};
  var maxes = {};
  for(var bar of bars) maxes[bar] = attrs[bar].get('max');
  graphic.set({
    bar1_link: links.bar1,
    bar2_link: links.bar2,
    bar3_link: links.bar3,
    represents: character.id,
    name: character.get('name'),
    bar1_value: maxes.bar1,
    bar2_value: maxes.bar2,
    bar3_value: maxes.bar3,
    bar1_max: maxes.bar1,
    bar2_max: maxes.bar2,
    bar3_max: maxes.bar3,
    showname: true,
    showplayers_name: true,
    showplayers_bar1: true,
    showplayers_bar2: true,
    showplayers_bar3: true,
    showplayers_aura1: true,
    showplayers_aura2: true
  });

  setDefaultTokenForCharacter(character, graphic);
  if(!character.get('avatar')) character.set('avatar', graphic.get('imgsrc').replace('/thumb.png?', '/med.png?'));
  whisper('Default Token set for *' + getLink(character.get('name')) + '*.');
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*give\s*(player)?\s*token\s*to\s+(.+)$/i, setDefaultToken);
});
