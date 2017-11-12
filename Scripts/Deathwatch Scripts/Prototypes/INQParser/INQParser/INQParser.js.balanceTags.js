INQParser.prototype.balanceTags = function(Lines){
  var tags = [];
  tags.push({Opener: '<a href="https?://[^\\s>]*">', Closer: '</a>'});
  tags.push({Opener: '<strong>', Closer: '</strong>'});
  tags.push({Opener: '<em>', Closer: '</em>'});
  tags.push({Opener: '<u>', Closer: '</u>'});
  _.each(tags, function(tag){
    var openers = [];
    var closers = [];
    var j, subLine, text, jshift;
    for(var i = 0; i < Lines.length; i++) {
      subLine = Lines[i];
      jshift = 0;
      while(true) {
        j = subLine.search(RegExp(tag.Opener));
        if(j == -1) break;
        text = subLine.match(RegExp(tag.Opener))[0];
        subLine = subLine.substring(j + text.length);
        openers.push({text: text, j: j + jshift, i: i});
        jshift += j + text.length;
      }

      subLine = Lines[i];
      jshift = 0;
      while(true) {
        j = subLine.search(RegExp(tag.Closer));
        if(j == -1) break;
        text = subLine.match(RegExp(tag.Closer))[0];
        subLine = subLine.substring(j + text.length);
        closers.push({text: text, j: j + jshift, i: i});
        jshift += j + text.length;
      }
    }

    for(var opener of openers){
      for(var closer of closers){
        if(!closer.opener && (opener.i < closer.i || (opener.i == closer.i && opener.j < closer.j))){
          opener.closer = closer;
          closer.opener = opener;
          break;
        }
      }
    }

    for(var opener of openers){
      if(!opener.closer || /^((<[^<>]+>|\s+))*$/.test(Lines[opener.i].substring(opener.j))){
        opener.removed = true;
        Lines[opener.i] = Lines[opener.i].substring(0, opener.j)
          + Lines[opener.i].substring(opener.j).replace(RegExp(tag.Opener), '');
      }
    }

    for(var closer of closers){
      if(!closer.opener || /^((<[^<>]+>|\s+))*$/.test(Lines[closer.i].substring(0, closer.j))){
        closer.removed = true;
        Lines[closer.i] = Lines[closer.i].substring(0, closer.j)
          + Lines[closer.i].substring(closer.j).replace(RegExp(tag.Closer), '');
      }
    }

    for(var opener of openers){
      if(opener.closer && opener.i != opener.closer.i){
        for(var i = opener.i; i <= opener.closer.i; i++){
          if(i == opener.i && opener.removed) continue;
          if(i == opener.closer.i && opener.closer.removed) continue;
          if(i != opener.i) Lines[i] = opener.text + Lines[i];
          if(i != opener.closer.i) Lines[i] = Lines[i] + opener.closer.text;
        }
      }
    }

  });

  return Lines;
}
