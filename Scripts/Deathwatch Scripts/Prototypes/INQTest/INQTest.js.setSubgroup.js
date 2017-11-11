INQTest.prototype.setSubgroup = function(input){
  if(!input) return false;
  var matches = input.match(/\(([^\)]+)\)/);
  if(matches) {
    this.Subgroup = matches[1];
    return true;
  } else {
    return false;
  }
}
