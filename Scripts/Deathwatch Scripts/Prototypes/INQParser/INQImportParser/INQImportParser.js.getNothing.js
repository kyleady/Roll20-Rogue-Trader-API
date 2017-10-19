INQImportParser.prototype.getNothing = function(regex, property){
  Patterns.push({regex: regex, property: property, interpret: function(){}});
}
