//takes the text of a link (and its adjacent notes) and stores them within an object
function INQLinkParser(){

  //save the regex for the link and its notes
  this.regex = function(){
    var regex = "\\s*(?:<a href=\"http:\\//journal\\.roll20\\.net\\/handout\\/[-\\w\\d]+\">)?([^<>\\(\\), -][^<>\\(\\)]*)(?:<\\/a>)?";
    regex += "\\s*((?:\\([^<>\\(\\)]+\\))*)"
    regex += "\\s*(?:\\(\\s*x\\s(\\d+)\\))?";
    regex += "\\s*(?:\\+\\s*(\\d+))?\\s*";

    return regex;
  }

  this.parse = function(text){
    var re = RegExp(this.regex(), "i");
    var matches = text.match(re);

    if(matches){
      if(matches[1]){
        this.Name = matches[1];
      }
      if(matches[2]){
        var regex = "\\(([^<>\\(\\)]+)\\)";
        re = RegExp(regex, "gi");
        var groups = matches[2].match(re);
        Groups = [];
        re = RegExp(regex, "i");
        _.each(groups, function(group){
          groupMatches = group.match(re);
          Groups.push(groupMatches[1]);
        });
        this.Groups = Groups;
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
