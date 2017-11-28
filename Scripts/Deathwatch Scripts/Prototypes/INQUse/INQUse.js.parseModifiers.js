INQUse.prototype.parseModifiers = function(){
  var modifierMatches = this.options.modifiers.match(/(\+|-)\s*(\d+)([\sa-z]*)/gi);
  this.modifiers = [];
  if(modifierMatches){
    for(var modifierMatch of modifierMatches){
      var details = modifierMatch.match(/(\+|-)\s*(\d+)([\sa-z]*)/i);
      var name = details[3].trim();
      if(!name) name = 'Other';
      this.modifiers.push({
        Value: details[1] + details[2],
        Name: '<em>' + name + '</em>'
      });
    }
  }
}
