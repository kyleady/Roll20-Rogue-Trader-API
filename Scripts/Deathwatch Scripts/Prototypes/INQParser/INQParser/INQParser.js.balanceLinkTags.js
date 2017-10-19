//sometimes a link tag can be split onto multiple lines
//close every link tag that is imbalanced
INQParser.prototype.balanceLinkTags = function(Lines){
  var opener = undefined;
  return _.map(Lines, function(line){
    var matches = line.match(/<\/a>/g);
    if(matches == null){matches = [];}
    var closers = matches.length;

    matches = line.match(/<a href=\"https?:\/\/[^\s>]*\">/g);
    if(matches == null){matches = [];}
    var openers = matches.length;

    //close up any links that may have been extend to another line
    while(openers > closers){
      line += "</a>";
      closers++;
    }

    //remove any link closers that have been pushed to this line
    while(closers > openers){
      line = line.replace(/<\/a>/, "");
      closers--;
    }

    return line;
  });
}
