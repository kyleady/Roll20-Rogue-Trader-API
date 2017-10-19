INQImportParser.prototype.getNumber = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: this.interpretNumber});
}
