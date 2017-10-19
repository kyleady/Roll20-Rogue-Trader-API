//complete the old list and save it, preparing for a new list
INQParser.prototype.completeOldList = function(){
  if(this.newList != undefined){
    this.Lists.push(this.newList);
    this.newList = undefined;
  }
}
