//if this line is a rule, save it
INQParser.prototype.parseRule = function(line){
  var re = /^\s*<(?:strong|em)>(.+?)<\/(?:strong|em)>\s*:\s*(.+)$/;
  var matches = line.match(re);
  if(matches){
    //finish off any in-progress lists
    this.completeOldList();
    //add the rule
    this.Rules.push({
      Name:    matches[1],
      Content: matches[2]
    });
    //this line has been properly parsed
    return true;
  }
  return false;
}
