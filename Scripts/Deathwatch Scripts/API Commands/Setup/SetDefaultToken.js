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

  var name = matches[1];
  var characters = suggestCMD('!Give Token To $', name, msg.playerid, 'character');
  if(!characters) return;
  var character = characters[0];
  switch(characterType(character.id)){
    case 'character':
      var bar1 = getAttrByName(character.id, 'Fatigue', 'max');
      var bar2 = getAttrByName(character.id, 'Fate', 'max');
      var bar3 = getAttrByName(character.id, 'Wounds', 'max');
    break;
    case 'vehicle':
      var bar1 = getAttrByName(character.id, 'Tactical Speed', 'max') || 0;
      var bar2 = getAttrByName(character.id, 'Aerial Speed', 'max')   || 0;
      var bar3 = getAttrByName(character.id, 'Structural Integrity', 'max');
    break;
    case 'starship':
      var bar1 = getAttrByName(character.id, 'Population', 'max') || 0;
      var bar2 = getAttrByName(character.id, 'Morale', 'max') || 0;
      var bar3 = getAttrByName(character.id, 'Hull', 'max');
    break;
  }

  //detail the graphic
  graphic.set('bar1_link', '');
  graphic.set('bar2_link', '');
  graphic.set('bar3_link', '');

  graphic.set('represents', character.id);
  graphic.set('name', character.get('name'));

  graphic.set('bar1_value', bar1);
  graphic.set('bar2_value', bar2);
  graphic.set('bar3_value', bar3);

  graphic.set('bar1_max', bar1);
  graphic.set('bar2_max', bar2);
  graphic.set('bar3_max', bar3);

  graphic.set('showname', true);
  graphic.set('showplayers_name', true);
  graphic.set('showplayers_bar1', true);
  graphic.set('showplayers_bar2', true);
  graphic.set('showplayers_bar3', true);
  graphic.set('showplayers_aura1', true);
  graphic.set('showplayers_aura2', true);

  setDefaultTokenForCharacter(character, graphic);

  //set the character's avatar as the token if they don't already have something
  if(character.get('avatar') == ''){
    character.set('avatar', graphic.get('imgsrc').replace('/thumb.png?', '/med.png?'));
  }

  whisper('Default Token set for *' + getLink(character.get('name')) + '*.');
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*give\s*token\s*to\s+(.+)$/i, setDefaultToken);
});
