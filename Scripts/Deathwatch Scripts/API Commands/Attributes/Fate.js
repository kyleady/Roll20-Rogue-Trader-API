function fateHandler(matches,msg){
  eachCharacter(msg, function(character, graphic){
      var Fate = attributeValue('Fate', {characterid: character.id, graphicid: graphic.id});
      var name = character.get('name');
      if(Fate == undefined) return whisper(name + ' does not have a Fate Attribute!', {speakingTo: msg.playerid, gmEcho: true});
      if(Fate < 1){
        return whisper(name + ' does not have enough Fate to spend.', {speakingTo: msg.playerid});
      } else {
        announce(name + ' spends a Fate Point!');
        attributeValue('Fate', {setTo: Fate - 1, characterid: character.id, graphicid: graphic.id});
        var finalReport = name + ' has [[' + Fate + '-1]] Fate Point';
        if(Fate-1 != 1) finalReport += 's';
        whisper(finalReport + ' left.', {speakingTo: msg.playerid});
      }
  });
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*fate\s*$/i, fateHandler, true);
});
