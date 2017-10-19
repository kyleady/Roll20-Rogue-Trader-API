//add misc content to the current list (if it exists)
INQParser.prototype.addToList = function(line){
  //be sure there is a list to add to
  if(this.newList != undefined){
    this.newList.Content.push(line);
    //this line was accepted
    return true;
  }
  return false;
}
