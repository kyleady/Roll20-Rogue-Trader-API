
//add or replace a turn
INQTurns.prototype.addTurn = function(graphic, initiative, custom){
  var turnobj = this.toTurnObj(graphic, initiative, custom);
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
