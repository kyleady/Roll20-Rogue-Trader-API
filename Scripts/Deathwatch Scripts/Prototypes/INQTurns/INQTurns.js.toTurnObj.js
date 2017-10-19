//creates a turn object for the listed graphic and initiative roll
INQTurns.prototype.toTurnObj = function(graphic, initiative, custom){
  //create a turn object
  var turnObj = {};
  //default to no custom text
  turnObj.custom = custom || "";
  //record the id of the token
  turnObj.id = graphic.id;
  //record the total initiative roll
  turnObj.pr = initiative;
  if(typeof turnObj.pr == "number"){
    //record it as a string (as that is what it normally is)
    turnObj.pr = turnObj.pr.toString();
  }
  //record the page id
  turnObj._pageid = graphic.get("_pageid");

  return turnObj;
}
