function painSuppress(matches, msg) {
  var text = matches[1];
  if(msg.selected == undefined || msg.selected == []){
    if(playerIsGM(msg.playerid)){
      whisper('Please carefully select who is using pain suppressants.', {speakingTo: msg.playerid});
      return;
    }
  }
  eachCharacter(msg, function(character, graphic){
    var clip = attributeValue('Ammo - Pain Suppressant', {graphicid: graphic.id, alert: false});
    if(clip == undefined) clip = 6;
    clip = Number(clip);
    if(clip <= 0) return whisper('Not enough pain suppressants.', {speakingTo: msg.playerid});
    clip--;
    var clip = attributeValue('Ammo - Pain Suppressant', {setTo: clip, graphicid: graphic.id, alert: false});
    var maxClip = attributeValue('Ammo - Pain Suppressant', {graphicid: graphic.id, alert: false, max: true}) || 6;
    whisper(graphic.get('name') + ' has [[' + clip + ']]/' + maxClip + ' pain suppressants left.', {speakingTo: msg.playerid});
    addCounter(['', graphic.get('name') + '(' + text + ')', randomInteger(10).toString()], msg);
  });
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*pain\s*suppress\s*(.+)\s*$/i, painSuppress, true);
});
