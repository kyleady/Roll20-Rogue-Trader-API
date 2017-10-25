INQWeaponNoteParser.prototype.parse = function(text){
  var inqlink = new INQLink(text);
  this.Name = inqlink.Name.trim();
  var details = [];
  _.each(inqlink.Groups, function(group){
    _.each(group.split(/\s*(?:;|,)\s*/), function(detail){
      details.push(detail);
    });
  });
  this.parseDetails(details);
}
