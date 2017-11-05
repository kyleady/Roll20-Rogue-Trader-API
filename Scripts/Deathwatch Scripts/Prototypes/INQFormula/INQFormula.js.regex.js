INQFormula.prototype.regex = function(){
  var regex = '\\s*';
  regex += '((?:\\d*\\s*x?\\s*(?:PR|SB)|\\d+)\\s*x\\s*)?';
  regex += '(?:(\\d*(?:PR|SB|))\\s*D\\s*(\\d+))?';
  regex += '(\\s*(?:\\+|-|)\\s*(?:\\d*\\s*x?\\s*(?:PR|SB)|\\d+))?';
  regex += '\\s*';
  return regex;
}
