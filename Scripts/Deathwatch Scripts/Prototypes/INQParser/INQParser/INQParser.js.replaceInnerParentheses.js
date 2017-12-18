INQParser.prototype.replaceInnerParentheses = function(line){
  var parenthesiesDepth = 0;
  line = line.split('');
  for(var i = 0; i < line.length; i++){
    if(line[i] == '('){
      if(parenthesiesDepth > 0) line[i] = '[';
      parenthesiesDepth++;
    } else if(line[i] == ')'){
      parenthesiesDepth--;
      if(parenthesiesDepth > 0) line[i] = ']';
    }
  }
  return line.join('');
}
