var numModifier = {};
numModifier.calc = function(stat, operator, modifier){
  if(operator.indexOf('+') != -1){
    stat = Number(stat) + Number(modifier);
    return Math.round(stat);
  } else if(operator.indexOf('-') != -1){
    stat = Number(stat) - Number(modifier);
    return Math.round(stat);
  } else if(operator.indexOf('*') != -1){
    stat = Number(stat) * Number(modifier);
    return Math.round(stat);
  } else if(operator.indexOf('/') != -1){
    stat = Number(stat) / Number(modifier);
    return Math.round(stat);
  } else if(operator.indexOf('=') != -1){
    return modifier;
  } else {
    return stat;
  }
}

numModifier.regexStr = function(options){
  options = typeof options == 'object' ? options : {};
  var basicOperators = [
    '\\+',
    '-',
    '\\*',
    '\\/',
  ];
  var signs = [
    '',
    '\\+',
    '-',
  ];
  var queryOperators = basicOperators.map(basicOperator => '\\?\\s*' + basicOperator);
  queryOperators.push('\\?');
  var writeOperators = basicOperators.map(basicOperator => basicOperator + '\\s*=');
  writeOperators.push('=');
  var operators = [];
  if(options.queryOnly) {
    operators = queryOperators;
  } else if(options.writeOnly) {
    operators = writeOperators;
  } else {
    operators = operators.concat(queryOperators, writeOperators);
  }
  
  return '(' + operators.join('|') + ')\\s*(' + signs.join('|') + ')';
}
