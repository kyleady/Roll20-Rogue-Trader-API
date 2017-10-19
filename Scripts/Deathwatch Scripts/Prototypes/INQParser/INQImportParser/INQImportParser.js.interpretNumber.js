INQImportParser.prototype.interpretNumber = function(content, properties){
  var matches = content.match(/(?:\+\s*|-\s*|)\d+/g);
  if(!matches){return;}
  if(matches.length == 1){
    this.saveProperty(matches[0], properties);
  } else {
    this.saveProperty(matches, properties);
  }
}
