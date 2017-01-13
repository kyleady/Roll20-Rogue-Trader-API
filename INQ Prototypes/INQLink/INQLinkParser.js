//takes the text of a link (and its adjacent notes) and stores them within an object
function INQLinkParser(){

  //save the regex for the link and its adjoining notes
  this.regex = function(){
    var regex = "\\s*(?:<a href=\"http:\\//journal\\.roll20\\.net\\/handout\\/[-\\w\\d]+\">)?"
    regex += "([^<>\\(\\), -][^<>\\(\\)]*)";
    regex += "(?:<\\/a>)?";
    regex += "\\s*((?:\\([^x\\(\\)][^\\(\\)]*\\))*)"
    regex += "\\s*(?:\\(\\s*x\\s*(\\d+)\\))?";
    regex += "\\s*(?:\\+\\s*(\\d+))?\\s*";

    return regex;
  }
  //take text and turn it into an INQLink
  this.parse = function(text){
    var re = RegExp("^" + this.regex() + "$", "i");
    var matches = text.match(re);
    if(matches){
      if(matches[1]){
        this.Name = matches[1];
      }
      //parse out each group
      if(matches[2]){
        var regex = "\\(([^x\\(\\)][^\\(\\)]*)\\)";
        re = RegExp(regex, "gi");
        var groups = matches[2].match(re);
        re = RegExp(regex, "i");
        this.Groups = _.map(groups, function(group){
          groupMatches = group.match(re);
          return groupMatches[1];
        });
      }
      if(matches[3]){
        this.Quantity = Number(matches[3]);
      }
      if(matches[4]){
        this.Bonus = Number(matches[4]);
      }
    }
  }
}
