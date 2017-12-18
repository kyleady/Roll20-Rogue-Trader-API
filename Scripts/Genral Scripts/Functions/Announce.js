function announce(content, options){
  if(typeof options != 'object') options = {};
  var speakingAs = options.speakingAs || 'INQ';
  var callback = options.callback || null;
  if(options.noarchive == undefined) options.noarchive = true;
  if(!content) return whisper('announce() attempted to send an empty message.');
  setTimeout(function(){sendChat(speakingAs, content, callback, options)}, options.delay);
}
