INQImportParser.prototype.getList = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: this.interpretList});
}
