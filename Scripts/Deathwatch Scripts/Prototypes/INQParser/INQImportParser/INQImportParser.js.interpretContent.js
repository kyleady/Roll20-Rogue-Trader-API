INQImportParser.prototype.interpretContent = function(content, properties){
  var inqlink = new INQLink(content);
  this.saveProperty(inqlink, properties);
}
