function cohesionHandler(matches,msg){
  var cohesionObjs = findObjs({
    _type: 'attribute',
    name: 'Cohesion'
  }) || [];

  if(cohesionObjs.length <= 0){
    return whisper('There is nothing in the campaign with a Cohesion Attribute.', {speakingTo: msg.playerid, gmEcho: true});
  } else if(cohesionObjs.length >= 2){
    whisper('There were multiple Cohesion attributes. Using the first one found. A log has been posted in the terminal.');
    log('Cohesion' + ' Attributes');
    log(cohesionObjs);
  }

  var cohesion = cohesionObjs[0].get('current');
  announce('/r D10<' + cohesion + ' Cohesion Test', {speakingAs: msg.playerid});
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*cohesion\s*$/i, cohesionHandler, true);

  var re = makeAttributeHandlerRegex('cohesion');
  CentralInput.addCMD(re, function(matches,msg){
    matches[2] = 'Cohesion';
    attributeHandler(matches,msg,{partyStat: true});
  }, true);
});
