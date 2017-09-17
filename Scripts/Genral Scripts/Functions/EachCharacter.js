function eachCharacter(msg, givenFunction){
  if(msg.selected == undefined || msg.selected.length <= 0){
    if(playerIsGM(msg.playerid)){
      var gm = getObj('player', msg.playerid)
      var pageid = gm.get('_lastpage') || Campaign().get('playerpageid');
      msg.selected = findObjs({
        _pageid: pageid,
        _type: 'graphic',
        _subtype: 'token',
        isdrawing: false,
        layer: 'objects'
      });
    } else {
      msg.selected = [defaultCharacter(msg.playerid)];
      if(msg.selected[0] == undefined){return;}
    }
  }

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
      var graphic = undefined;
      if(Campaign().get('playerspecificpages') && Campaign().get('playerspecificpages')[msg.playerid]){
        graphic = findObjs({
          _pageid: Campaign().get('playerspecificpages')[msg.playerid],
          _type: 'graphic',
          represents: character.id
        })[0];
      }

      if(graphic == undefined){
        graphic = findObjs({
          _pageid: Campaign().get('playerpageid'),
          _type: 'graphic',
          represents: character.id
        })[0];
      }

      if(graphic == undefined){
        graphic = findObjs({
          _type: 'graphic',
          represents: character.id
        })[0];
      }

      if(graphic == undefined){
        return whisper(character.get('name') + ' does not have a token on any map in the entire campaign.',
         {speakingTo: msg.playerid, gmEcho: true});
      }
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
