INQImportParser.prototype.getNumber = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: this.interpretNumber});
}
