INQImportParser.prototype.getContent = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: this.interpretContent});
}
