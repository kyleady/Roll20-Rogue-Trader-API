//take text and turn it into an INQLink
INQLinkParser.prototype.parse = function(text){
  var re = RegExp("^" + INQLinkParser.regex() + "$", "");
  var matches = text.match(re);
  if(matches){
    if(matches[1]){
      this.Name = matches[1].trim();
    }
    //parse out each group
    if(matches[2]){
      var regex = "\\(([^x\\(\\)][^\\(\\)]*)\\)";
      re = RegExp(regex, "g");
      var groups = matches[2].match(re);
      re = RegExp(regex, "");
      this.Groups = _.map(groups, function(group){
        groupMatches = group.match(re);
        return groupMatches[1];
      });
    }
    if(matches[3]){
      this.Quantity = Number(matches[3]);
    }
    if(matches[4] && matches[5]){
      this.Bonus = Number(matches[4].replace('–', '-') + matches[5]);
    }
  }
}
