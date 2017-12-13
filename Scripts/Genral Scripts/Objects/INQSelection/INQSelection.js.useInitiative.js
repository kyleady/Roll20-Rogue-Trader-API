INQSelection.useInitiative = function(msg) {
  if(msg.selected && msg.selected.length) return;
  var initOpen = Campaign().get('initiativepage');
  if(!initOpen) return;
  var turnOrderStr = Campaign().get('turnorder');
  if(!turnOrderStr) return;
  var turn = carefulParse(turnOrderStr)[0];
  var pageID = turn._pageid;
  var playerPageID = getPlayerPageID(msg.playerid);
  if(pageID != playerPageID) return;
  var turn = carefulParse(turnOrderStr)[0];
  var graphic = getObj('graphic', turn.id);
  if(!graphic) return;
  var character = getObj('character', graphic.get('represents'));
  if(!character) return;
  if(!playerIsGM(msg.playerid)) {
    var canControl = false;
    for(var id of character.get('controlledby').split(',')) {
      if(id == 'all' || id == msg.playerid) {
        canControl = true;
        break;
      }
    }

    if(!canControl) return;
  }

  msg.selected = [{
    _id: turn.id,
    _type: 'graphic'
  }];
}
