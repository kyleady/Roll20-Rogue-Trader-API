INQTurns.prototype.removeTurn = function(graphicid){
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
