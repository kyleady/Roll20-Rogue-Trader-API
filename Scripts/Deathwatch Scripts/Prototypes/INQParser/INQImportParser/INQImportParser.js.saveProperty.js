INQImportParser.prototype.saveProperty = function(content, properties){
  if(!Array.isArray(properties)){
    properties = [properties];
  }
  var propertyTarget = this.target;
  for(var i = 0; i < properties.length-1; i++){
    propertyTarget = propertyTarget[properties[i]];
  }
  if(Array.isArray(properties[properties.length-1])){
    for(var i = 0; i < properties[properties.length-1].length && i < content.length; i++){
      propertyTarget[properties[properties.length-1][i]] = content[i];
    }
  } else {
    propertyTarget[properties[properties.length-1]] = content;
  }
}
