function eachCharacter(msg, givenFunction, options){
  options = options || {}
  if(msg.selected == undefined || msg.selected.length <= 0){
    msg.selected = [defaultCharacter(msg.playerid)];
    if(msg.selected[0] == undefined) return;
  }

  if(options.onlyOneCharacter && msg.selected.length != 1) return whisper('Select only one graphic.');

  _.each(msg.selected, function(obj){
    if(obj._type == 'graphic'){
      var graphic = getObj('graphic', obj._id);
      if(graphic == undefined) {
        log('graphic undefined')
        log(obj)
        return whisper('graphic undefined', {speakingTo: msg.playerid, gmEcho: true});
      }

      var character = getObj('character', graphic.get('represents'))
      if(character == undefined){
        log('character undefined')
        log(graphic)
        return whisper('character undefined', {speakingTo: msg.playerid, gmEcho: true});
      }
    } else if(obj._type == 'unique'){
      var graphic = undefined;
      var character = undefined;
    } else if(typeof obj.get === 'function' && obj.get('_type') == 'character') {
      var character = obj;
      var graphics = [];
      if(Campaign().get('playerspecificpages') && Campaign().get('playerspecificpages')[msg.playerid]){
        graphics = findObjs({
          _pageid: Campaign().get('playerspecificpages')[msg.playerid],
          _type: 'graphic',
          represents: character.id
        }) || [];
      }

      if(graphics[0] == undefined){
        graphics = findObjs({
          _pageid: Campaign().get('playerpageid'),
          _type: 'graphic',
          represents: character.id
        }) || [];
      }

      if(graphics[0] == undefined){
        graphics = findObjs({
          _type: 'graphic',
          represents: character.id
        }) || [];
      }

      if(graphics[0] == undefined){
        return whisper(character.get('name') + ' does not have a token on any map in the entire campaign.',
         {speakingTo: msg.playerid, gmEcho: true});
      }

      var graphic = graphics[0];
    } else if(typeof obj.get === 'function' && obj.get('_type') == 'graphic') {
      var graphic = obj;
      var character = getObj('character', graphic.get('represents'));
      if(character == undefined){
        log('character undefined')
        log(graphic)
        return whisper('character undefined', {speakingTo: msg.playerid, gmEcho: true});
      }
    } else {
      log('Selected is neither a graphic nor a character.')
      log(obj)
      return whisper('Selected is neither a graphic nor a character.', {speakingTo: msg.playerid, gmEcho: true});
    }

    givenFunction(character, graphic);
  });
}
