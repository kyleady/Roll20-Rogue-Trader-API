INQImportParser.prototype.getWeapons = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: this.interpretWeapons});
}
