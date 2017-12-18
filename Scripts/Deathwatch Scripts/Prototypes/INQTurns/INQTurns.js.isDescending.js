INQTurns.prototype.isDescending = function(){
  var prev = undefined;
  var first = undefined;
  var LargestIndex = this.largestIndex();
  for(var i = 0; i < this.turnorder.length; i++){
    if(!(prev == undefined || Number(this.turnorder[i].pr) <= prev || i == LargestIndex)) return false;
    if(first == undefined) first = Number(this.turnorder[i].pr);
    prev = Number(this.turnorder[i].pr);
  }

  return (LargestIndex == 0 || first <= prev || this.turnorder.length == 0);
}
