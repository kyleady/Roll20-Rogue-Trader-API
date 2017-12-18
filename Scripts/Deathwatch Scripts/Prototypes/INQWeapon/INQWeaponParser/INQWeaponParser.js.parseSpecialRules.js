INQWeaponParser.prototype.parseSpecialRules = function(content){
  var regex = '^\\s*(?:-|–|—|((?:' + INQLinkParser.regex() + ',)*' + INQLinkParser.regex()  + '))$';
  var re = new RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    if(matches[1]){
      this.Special = _.map(matches[1].split(','), function(rule){
        return new INQLink(rule);
      });
    }
  } else {
    whisper('Invalid Special Rules');
    log('Invalid Special Rules');
    log(content);
  }
}
