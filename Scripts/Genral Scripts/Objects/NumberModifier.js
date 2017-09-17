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

numModifier.regexStr = function(){
  return '(\\?\\s*\\+|\\?\\s*-|\\?\\s*\\*|\\?\\s*\\/|\\?|=|\\+\\s*=|-\\s*=|\\*\\s*=|\\/\\s*=)\s*(|\\+|-)'
}
