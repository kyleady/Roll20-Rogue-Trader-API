INQImportParser.prototype.getList = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: this.interpretList});
}
