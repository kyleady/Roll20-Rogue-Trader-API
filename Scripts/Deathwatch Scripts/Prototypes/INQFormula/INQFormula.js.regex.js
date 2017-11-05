INQFormula.regex = function(options){
  if(typeof options != 'object') options = {};
  if(options.requireDice == undefined) options.requireDice = false;
  var regex = '\\s*';
  regex += '((?:\\d*\\s*x?\\s*(?:PR|SB)|\\d+)\\s*x\\s*)?';
  regex += '\\(?';
  regex += '(?:(\\d*(?:PR|SB|))\\s*D\\s*(\\d+))';
  if(!options.requireDice) regex += '?';
  regex += '(\\s*(?:\\+|-|)\\s*(?:\\d*\\s*x?\\s*(?:PR|SB)|\\d+))?';
  regex += '\\)?';
  regex += '\\s*';
  return regex;
}
