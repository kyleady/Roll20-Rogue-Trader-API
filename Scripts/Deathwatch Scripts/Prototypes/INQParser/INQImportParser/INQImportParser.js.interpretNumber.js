INQImportParser.prototype.interpretNumber = function(content, properties){
  var matches = content.match(/((\+|-|–|—)\s*|)\d+/g);
  if(!matches){return;}
  for(var i = 0; i < matches.length; i++) matches[i] = matches[i].replace(/(-|–|—)/, '-').replace(/ /g, '');
  if(matches.length == 1){
    this.saveProperty(matches[0], properties);
  } else {
    this.saveProperty(matches, properties);
  }
}
