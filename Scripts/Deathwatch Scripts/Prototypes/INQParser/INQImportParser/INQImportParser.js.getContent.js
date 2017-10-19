INQImportParser.prototype.getContent = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: this.interpretContent});
}
