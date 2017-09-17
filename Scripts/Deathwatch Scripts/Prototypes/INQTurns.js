function INQTurns(){

  //determine if the turn order is in descending order, but treat it as a loop
  this.isDescending = function(){
    var prev = undefined;
    var first = undefined;
    var LargestIndex = this.largestIndex();
    for(var i = 0; i < this.turnorder.length; i++){
      if(!(prev == undefined ||
        Number(this.turnorder[i].pr) <= prev ||
        i == LargestIndex)){
        return false;
      }
      if(first == undefined){
        first = Number(this.turnorder[i].pr);
      }
      prev = Number(this.turnorder[i].pr);
    }
    if(LargestIndex == 0 || first <= prev || this.turnorder.length == 0){
      return true;
    } else {
      return false;
    }
  }

  //delete any turns that share the given graphic id
  this.removeTurn = function(graphicid){
    //step through the turn order and delete any previous initiative rolls
    for(var i = 0; i < this.turnorder.length; i++){
      //has this token already been included?
      if(graphicid == this.turnorder[i].id){
        //remove this entry
        this.turnorder.splice(i, 1);
        //the array has shrunken, take a step back
        i--;
      }
    }
  }

  //return the index of the largest turn value
  this.largestIndex = function(){
    var largestIndex = undefined;
    var largest = undefined;

    for(var i = 0; i < this.turnorder.length; i++){
      if(largest == undefined || Number(this.turnorder[i].pr) > largest){
        largest = Number(this.turnorder[i].pr);
        largestIndex = i;
      }
    }

    return largestIndex;
  }

  //add or replace a turn
  this.addTurn = function(turnobj){
    //delete any previous instances of this character
    this.removeTurn(turnobj.id);
    //be sure the turns are properly ordered
    if(this.isDescending()){
      //determine where a new turn starts
      var startIndex = this.largestIndex();
      //if the array is empty, just add the turn
      if(startIndex == undefined){
        return this.turnorder.push(turnobj);
      }
      var turnAdded = false;
      for(var i = startIndex; i < this.turnorder.length; i++){
        if(this.higherInit(turnobj, this.turnorder[i])){
          //insert the turn here
          this.turnorder.splice(i, 0, turnobj);
          turnAdded = true;
          break;
        }
      }

      if(!turnAdded){
        for(var i = 0; i < startIndex; i++){
          if(this.higherInit(turnobj, this.turnorder[i])){
            //insert the turn here
            this.turnorder.splice(i, 0, turnobj);
            turnAdded = true;
            break;
          }
        }
      }
      if(!turnAdded){
        if(startIndex == 0){
          this.turnorder.push(turnobj);
        } else {
          this.turnorder.splice(startIndex, 0, turnobj);
        }
      }
    } else {
      //just add the turn on the end
      this.turnorder.push(turnobj);
    }
  }

  this.higherInit = function(newTurn, turn){
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
        challengerAg = attributeValue("Ag", {graphicid: challengerID});
        championAg = attributeValue("Ag", {graphicid: championID});
        //the character may not have an Agility attribute, try Detection
        if(challengerAg == undefined){
          challengerAg = attributeValue("Detection", {graphicid: challengerID});
        }
        //the character may not have an Agility attribute, try Detection
        if(championAg == undefined){
          championAg = attributeValue("Ag", {graphicid: championID});
        }
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

  //creates a turn object for the listed graphic and initiative roll
  this.toTurnObj = function(graphic, initiative, custom){
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

  //get the initiative roll of a turn already in the turn order
  this.getInit = function(graphicid){
    for(var i = 0; i < this.turnorder.length; i++){
      if(graphicid == this.turnorder[i].id){
        return Number(this.turnorder[i].pr);
      }
    }
    //nothing was found, return undefined
    return undefined;
  }

  //save the turn order in the Campaign
  this.save = function(){
    Campaign().set("turnorder", JSON.stringify(this.turnorder));
  }

  //get the JSON string of the turn order and make it into an array
  if(Campaign().get("turnorder") == ""){
    //We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    this.turnorder = [];
  } else{
    //otherwise turn the turn order into an array
    this.turnorder = carefulParse(Campaign().get("turnorder")) || {};
  }
}
