INQImportParser.prototype.getWeapons = function(regex, property){
  this.Patterns.push({regex: regex, property: property, interpret: this.interpretWeapons});
}
