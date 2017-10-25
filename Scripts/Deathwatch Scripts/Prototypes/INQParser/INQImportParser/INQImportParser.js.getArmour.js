INQImportParser.prototype.getArmour = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: this.interpretArmour});
}
