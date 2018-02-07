function statReset(matches,msg){
  var names = [];
  eachCharacter(msg, function(character, graphic){
    attribList = findObjs({
      _type: 'attribute',
      _characterid: character.id
    });

    _.each(attribList,function(attrib){
      attrib.set('current', attrib.get('max'));
    });

    for(var bar = 1; bar <= 3; bar++){
      graphic.set('bar' + bar + '_value', graphic.get('bar' + bar + '_max'));
    }

    graphic.set('statusmarkers', '');
    graphic.set('gmnotes', '');
    names.push(' ' + graphic.get('name'));
  });

  var output = 'The following characters were reset:' + names.join();
  whisper(output.replace(/,\s*$/, '.'));
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*(?:(?:everything|all)\s*=\s*max|reset\s*(?:tokens?|all)?)\s*$/i, statReset);
});
