INQTurns.prototype.higherInit = function(newTurn, turn){
  //does the turn we are inserting (newTurn) have greater initiative than the currently examined turn (turn)?
  if(Number(newTurn.pr) > Number(turn.pr)){
    return true;
  //is their initiative the same?
  } else if(Number(newTurn.pr) == Number(turn.pr)){
    //be sure the tokens represent characters
    var challengerAg = undefined;
    var championAg = undefined;
    var challengerCharacter = undefined;
    var championCharacter = undefined;
    var challengerID = newTurn.id;
    var championID = turn.id;
    //only load up the Ag/Detection if the characters exist
    if(challengerID != undefined && championID != undefined){
      challengerAg = attributeValue('Ag', {graphicid: challengerID, alert: false});
      championAg = attributeValue('Ag', {graphicid: championID, alert: false});
      //the character may not have an Agility attribute, try Detection
      if(challengerAg == undefined) challengerAg = attributeValue('Detection', {graphicid: challengerID});
      if(championAg == undefined) championAg = attributeValue('Detection', {graphicid: championID});
    }

    //if actual values were found for Ag/Detection for both of them, compare the two
    if(championAg != undefined && challengerAg != undefined){
      //if the challenger has greater agility (or == and rolling a 2 on a D2)
      if(challengerAg > championAg
      || challengerAg == championAg && randomInteger(2) == 1){
        return true;
      }
    }
  }

  //if it has not returned true yet, return false
  return false;
}
