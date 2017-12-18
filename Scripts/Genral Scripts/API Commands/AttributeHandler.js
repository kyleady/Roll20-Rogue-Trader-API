function attributeHandler(matches,msg,options){
  if(typeof options != 'object') options = {};
  if(options['show'] == undefined) options['show'] = true;
  var workingWith = (matches[1].toLowerCase() == 'max') ? 'max' : 'current';
  var statName = matches[2];
  var operator = matches[3].replace('/\s/g','');
  var sign = matches[4] || '';
  var modifier = matches[5] || '';
  if(options['partyStat']) msg.selected = [{_type: 'unique'}];
  eachCharacter(msg, function(character, graphic){
    graphic = graphic || {};
    character = character || {};
    var attribute = {
      current: attributeValue(statName, {graphicid: graphic.id, max: false, bar: options['bar']}),
      max: attributeValue(statName, {graphicid: graphic.id, max: true, alert: false, bar: options['bar']})
    };
    var name = (options.partyStat) ? '' : character.get('name');
    if (attribute.current == undefined) {
      if (operator  == '=') {
        attribute.current = '-';
      } else {
        return;
      }
    };
    if(attribute.max == undefined){
      if(modifier == 'max' && operator == '='){
        attributeValue(statName, {graphicid: graphic.id, delete: true, alert: false, bar: options['bar']});
        return whisper(statName + ' has been reset.', {speakingTo: msg.playerid, gmEcho: true});
      } else if(workingWith == 'max' || modifier == 'max') {
        return whisper('Local attributes do not have maximums to work with.', {speakingTo: msg.playerid, gmEcho: true});
      } else {
        attribute.max = '-';
      }
    }

    var modifiedAttribute = modifyAttribute(attribute, {
      workingWith: workingWith,
      operator: operator,
      sign: sign,
      modifier: modifier,
      inlinerolls: msg.inlinerolls
    });
    if(!modifiedAttribute) return;
    if(operator.indexOf('?') != -1) {
      if(options['show'] == false) return;
      whisper(name + attributeTable(statName, modifiedAttribute), {speakingTo: msg.playerid});
    } else if(operator.indexOf('=') != -1) {
      attributeValue(statName, {setTo: modifiedAttribute[workingWith], graphicid: graphic.id, max: workingWith, bar: options['bar']});
      if(options['show'] == false) return;
      var output = attributeTable(statName, attribute);
      output += attributeTable('|</caption><caption>V', modifiedAttribute, 'Yellow');
      if(options['partyStat']){
        var players = canViewAttribute(statName, {alert: false});
        whisper(name + output, {speakingTo: players, gmEcho: true});
      } else {
        whisper(name + output, {speakingTo: msg.playerid, gmEcho: true});
      }
    }
  });
}

function correctAttributeName(name){
  return name.trim();
}

function makeAttributeHandlerRegex(yourAttributes){
  var regex = "!\\s*";
  if(typeof yourAttributes == 'string'){
    yourAttributes = [yourAttributes];
  }
  if(yourAttributes == undefined){
    regex += "attr\\s+";
    regex += "(max|)\\s*";
    regex += "(\\S[^-\\+=/\\?\\*]*)\\s*";
  } else if(Array.isArray(yourAttributes)){
    regex += "(|max)\\s*";
    regex += "("
    for(var yourAttribute of yourAttributes){
      regex += yourAttribute + "|";
    }
    regex = regex.replace(/\|$/, "");
    regex += ")";
  } else {
    whisper('Invalid yourAttributes');
    log('Invalid yourAttributes');
    log(yourAttributes);
    return;
  }
  regex += "\\s*" + numModifier.regexStr();
  regex += "\\s*(|\\d+\\.?\\d*|max|current|\\$\\[\\[\\d\\]\\])";
  regex += "\\s*$";
  return RegExp(regex, "i");
};

on("ready", function(){
  var re = makeAttributeHandlerRegex();
  CentralInput.addCMD(re, function(matches, msg){
    matches[2] = correctAttributeName(matches[2]);
    attributeHandler(matches, msg);
  }, true);
});
