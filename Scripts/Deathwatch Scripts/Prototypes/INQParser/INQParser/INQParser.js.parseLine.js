//disect a single line
INQParser.prototype.parseLine = function(line){
  //be sure there is a line to work with
  if(!line) return;
  line = this.replaceInnerParentheses(line);
  //try each way of parsing the line and quit when it is successful
  if(this.parseRule(line)){return;}
  if(this.parseTable(line)){return;}
  if(this.parseBeginningOfList(line)){return;}
  if(this.addToList(line)){return;}
  //if nothing fits, add the line to the misc content
  this.addMisc(line);
}
