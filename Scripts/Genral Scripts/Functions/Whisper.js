function whisper(content, options){
  if(typeof options != 'object') options = {};
  var speakingAs = options.speakingAs || 'INQ';
  if(options.noarchive == undefined) options.noarchive = true;
  if(!content) return whisper('whisper() attempted to send an empty message.');
  var new_options = {};
  for(var k in options) new_options[k] = options[k];
  delete new_options.speakingTo;
  if (Array.isArray(options.speakingTo)) {
    for(var i = 0; i < options.speakingTo.length; i++){
      if(options.speakingTo[i] == '') {
        options.speakingTo.splice(i, 1);
        i--;
      }
    }
    if (options.speakingTo.indexOf('all') != -1) return announce(content, new_options);
    if (options.gmEcho) {
      var gmIncluded = false;
      _.each(options.speakingTo, function(target) {
        if (playerIsGM(target)) gmIncluded = true;
      });
      if(!gmIncluded) whisper(content, new_options);
      delete options.gmEcho;
    }

    _.each(options.speakingTo, function(target) {
      new_options.speakingTo = target;
      whisper(content, new_options);
    });
    return;
  }

  if(options.speakingTo == 'all') {
    return announce(content, new_options);
  } else if(options.speakingTo) {
    if(getObj('player', options.speakingTo)){
      if(options.gmEcho && !playerIsGM(options.speakingTo)) whisper(content, new_options);
      setTimeout(function(){
        var player = getObj('player', options.speakingTo);
        if(!player) return whisper('The playerid ' + JSON.stringify(options.speakingTo) + ' was not recognized, AFTER THE DELAY, and the following msg failed to be delivered: ' + content);
        sendChat(speakingAs, '/w \"' + player.get('_displayname') + '\" ' + content, options.callback, options);
      }, options.delay);
    } else {
      return whisper('The playerid ' + JSON.stringify(options.speakingTo) + ' was not recognized and the following msg failed to be delivered: ' + content);
    }
  } else {
    setTimeout(function(){sendChat(speakingAs, '/w gm ' + content, options.callback, options)}, options.delay);
  }
}
