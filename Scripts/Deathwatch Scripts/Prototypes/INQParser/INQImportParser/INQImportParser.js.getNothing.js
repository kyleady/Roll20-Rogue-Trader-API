INQImportParser.prototype.getNothing = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: undefined});
}
