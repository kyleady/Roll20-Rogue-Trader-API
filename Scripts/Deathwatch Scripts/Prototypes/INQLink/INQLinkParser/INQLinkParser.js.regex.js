//save the regex for the link and its adjoining notes
INQLinkParser.prototype.regex = function(){
  var regex = "\\s*(?:<a href=\"http:\\//journal\\.roll20\\.net\\/handout\\/[-\\w\\d]+\">)?"
  regex += "([^+<>\\(\\),; –-][^+<>;\\(\\)–]*)";
  regex += "(?:<\\/a>)?";
  regex += "\\s*((?:\\([^x\\(\\)][^\\(\\)]*\\))*)"
  regex += "\\s*(?:\\(\\s*x\\s*(\\d+)\\))?";
  regex += "\\s*(?:(\\+|–)\\s*(\\d+))?\\s*";

  return regex;
}
