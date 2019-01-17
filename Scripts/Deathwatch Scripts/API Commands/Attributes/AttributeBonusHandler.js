function attributeBonusHandler(matches,msg,options){
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
    var attributeUnnatural = {
      current: attributeValue('Unnatural ' + statName, {graphicid: graphic.id, max: false, alert: false}),
      max: attributeValue('Unnatural ' + statName, {graphicid: graphic.id, max: true, alert: false})
    };
    var attributeBonus = {
      current: '-',
      max: '-',
    }
    var name = (options.partyStat) ? '' : character.get('name');
    if (attribute.current == undefined) return;
    if(attribute.max == undefined){
      if(workingWith == 'max' || modifier == 'max') {
        return whisper('Local attributes do not have maximums to work with.', {speakingTo: msg.playerid, gmEcho: true});
      } else {
        attribute.max = '-';
      }
    } else {
      attribute.max = Number(attribute.max) || 0;
      attributeUnnatural.max = Number(attributeUnnatural.max) || 0;
      attributeBonus.max = Math.floor(attribute.max / 10) + attributeUnnatural.max;
    }

    attribute.current = Number(attribute.current) || 0;
    attributeUnnatural.current = Number(attributeUnnatural.current) || 0;
    attributeBonus.current = Math.floor(attribute.current / 10) + attributeUnnatural.current;

    var modifiedAttribute = modifyAttribute(attributeBonus, {
      workingWith: workingWith,
      operator: operator,
      sign: sign,
      modifier: modifier,
      inlinerolls: msg.inlinerolls
    });
    if(!modifiedAttribute) return;
    whisper(name + attributeTable(statName + ' Bonus', modifiedAttribute), {speakingTo: msg.playerid});
  });
}

function makeAttributeBonusHandlerRegex(yourAttributes){
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
  regex += '\\s*(?:B|Bonus)';
  regex += "\\s*" + numModifier.regexStr({ queryOnly: true });
  regex += "\\s*(|\\d+\\.?\\d*|max|current|\\$\\[\\[\\d\\]\\])";
  regex += "\\s*$";
  return RegExp(regex, "i");
};

on("ready", function(){
  var re = makeAttributeBonusHandlerRegex();
  CentralInput.addCMD(re, function(matches, msg){
    matches[2] = correctAttributeName(matches[2]);
    attributeBonusHandler(matches, msg);
  }, true);
});
