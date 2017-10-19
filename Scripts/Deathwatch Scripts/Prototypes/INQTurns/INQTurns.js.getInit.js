//get the initiative roll of a turn already in the turn order
INQTurns.prototype.getInit = function(graphicid){
  for(var i = 0; i < this.turnorder.length; i++){
    if(graphicid == this.turnorder[i].id){
      return Number(this.turnorder[i].pr);
    }
  }
  //nothing was found, return undefined
  return undefined;
}
