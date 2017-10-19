//disect a single line
INQParser.prototype.parseLine = function(line){
  //be sure there is a line to work with
  if(line == undefined || line == "" || line == null){return;}
  var parenthesiesDepth = 0;
  line = line.split('');
  for(var i = 0; i < line.length; i++){
    if(line[i] == "("){
      if(parenthesiesDepth > 0){
        line[i] = "[";
      }
      parenthesiesDepth++;
    } else if(line[i] == ")"){
      parenthesiesDepth--;
      if(parenthesiesDepth > 0){
        line[i] = "]";
      }
    }
  }
  line = line.join('');
  //complete any bold tags separated by lines
  line = this.closeBoldTags(line);
  //try each way of parsing the line and quit when it is successful
  if(this.parseRule(line)){return;}
  if(this.parseTable(line)){return;}
  if(this.parseBeginningOfList(line)){return;}
  if(this.addToList(line)){return;}
  //if nothing fits, add the line to the misc content
  this.addMisc(line);
}
