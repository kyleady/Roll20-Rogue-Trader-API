function randomDisposition(matches, msg){
  var skills = [
    'Charm',
    'Deceive',
    'Command',
    'Blather',
    'Intimidate',
    'Interrogation'
  ];

  var output = '';
  var modifier;
  for(var skill of skills) {
    modifier = -10;
    modifier += randomInteger(4);
    modifier += randomInteger(4);
    modifier += randomInteger(4);
    modifier += randomInteger(4);
    modifier *= 10;
    output += '<strong>';
    output += skill;
    output += '</strong>: ';
    if(modifier >= 0) output += '+';
    output += modifier;
    output += '<br>';
  }

  whisper(output);
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*random\s*disposition\s*$/i, randomDisposition);
});
