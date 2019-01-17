INQImportParser.prototype.clean = function(text){
  text = text.replace(/<span[^>]*>/g, '');
  text = text.replace(/<\/span[^>]*>/g, '');
  text = text.replace(/&nbsp;/g, ' ');
  return text;
}
