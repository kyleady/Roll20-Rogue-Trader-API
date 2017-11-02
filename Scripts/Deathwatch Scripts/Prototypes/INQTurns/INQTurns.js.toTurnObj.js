//creates a turn object for the listed graphic and initiative roll
INQTurns.prototype.toTurnObj = function(graphic, initiative, custom){
  //create a turn object
  var turnObj = {};
  turnObj.custom = custom || '';
  turnObj.id = graphic.id;
  turnObj.pr = initiative + '';
  turnObj._pageid = graphic.get("_pageid");
  return turnObj;
}
