INQImportParser.prototype.interpretContent = function(content, properties){
  var inqlink = new INQLink(content);
  if(!inqlink.Name) inqlink.Name = content;
  this.saveProperty(inqlink, properties);
}
