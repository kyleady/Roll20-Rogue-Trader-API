//if there is an imbalance of bold tags, balance it out
INQParser.prototype.closeBoldTags = function(line){
  //count the number of tags beginning a bold section
  var matches = line.match(/<(?:strong|em)>/g);
  if(matches == null){matches = [];}
  var openers = matches.length;

  //count the number of tags ending a bold section
  var matches = line.match(/<\/(?:strong|em)>/g);
  if(matches == null){matches = [];}
  var closers = matches.length;

  //check for imbalances and rectify them
  while(openers > closers){
    line += "</strong>";
    closers++;
  }
  while(closers > openers){
    line = "<strong>" + line;
    openers++;
  }
  //return the balanced line
  return line;
}
