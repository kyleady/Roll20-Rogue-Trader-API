var CentralInput = {};
CentralInput.Commands = [];
CentralInput.addCMD = function(cmdregex, cmdaction, cmdpublic){
  if(cmdregex == undefined){return whisper('A command with no regex could not be included in CentralInput.js.');}
  if(cmdregex == undefined){return whisper('A command with no function could not be included in CentralInput.js.');}
  cmdpublic = cmdpublic || false;
  var Command = {cmdRegex: cmdregex, cmdAction:cmdaction, cmdPublic: cmdpublic};
  this.Commands.push(Command);
}

CentralInput.input = function(msg){
  var inputRecognized = false;
  if(msg.content.indexOf('!{URIFixed}') == 0){
    msg.content = msg.content.replace('{URIFixed}','');
    msg.content = decodeURIComponent(msg.content);
  }
  for(var i = 0; i < this.Commands.length; i++){
    if(this.Commands[i].cmdRegex.test(msg.content)
    && (this.Commands[i].cmdPublic || playerIsGM(msg.playerid)) ){
      inputRecognized = true;
      this.Commands[i].cmdAction(msg.content.match(this.Commands[i].cmdRegex), msg);
    }
  }

  if(!inputRecognized){
    whisper('The command ' + msg.content + ' was not recognized. See **' + getLink('!help') + '** for a list of commands.', {speakingTo: msg.playerid});
  }
}

on('chat:message', function(msg) {
  if(msg.type == 'api' && msg.playerid && getObj('player', msg.playerid)){
    CentralInput.input(msg);
  }
});

function encodeURIFixed(str){
  return encodeURIComponent(str).replace(/['()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
