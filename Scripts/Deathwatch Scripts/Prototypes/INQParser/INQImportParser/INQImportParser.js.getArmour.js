INQImportParser.prototype.getArmour = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: this.interpretArmour});
}
