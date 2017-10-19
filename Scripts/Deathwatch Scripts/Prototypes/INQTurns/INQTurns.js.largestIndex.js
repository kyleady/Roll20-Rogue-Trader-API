INQTurns.prototype.largestIndex = function(){
  var result = undefined;
  var largest = undefined;

  for(var i = 0; i < this.turnorder.length; i++){
    if(largest == undefined || Number(this.turnorder[i].pr) > largest){
      largest = Number(this.turnorder[i].pr);
      result = i;
    }
  }

  return result;
}
