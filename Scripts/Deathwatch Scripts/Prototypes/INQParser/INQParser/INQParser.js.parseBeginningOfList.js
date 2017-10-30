//if this is the beginning of a new list, start a new list
INQParser.prototype.parseBeginningOfList = function(line){
  var re = /^\s*(?:<(?:strong|em|u)>)+([^:]+?)(?:<\/(?:strong|em|u)>)+\s*$/;
  var matches = line.match(re);
  if(matches){
    //tidy up the last list first
    this.completeOldList();
    //start the new list
    this.newList = {
      Name: matches[1],
      Content: []
    }
    //this line has been properly parsed
    return true;
  }
  return false;
}
