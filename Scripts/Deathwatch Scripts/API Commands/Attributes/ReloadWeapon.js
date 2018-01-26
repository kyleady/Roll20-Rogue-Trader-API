function reloadWeapon(matches, msg){
  var ammoPhrase = 'Ammo - ' + matches[1];
  eachCharacter(msg, function(character, graphic){
    if(/Ammo -\s+all\s*$/i.test(ammoPhrase)) {
      var localAttributes = new LocalAttributes(graphic);
      for(var prop in localAttributes.Attributes) {
        if(/^Ammo - /.test(prop)) localAttributes.remove(prop);
      }

      var clips = filterObjs(function(obj) {
        if(obj.get('_type') != 'attribute') return false;
        if(obj.get('name').indexOf('Ammo - ') != 0) return false;
        return obj.get('_characterid') == character.id;
      });

      _.each(clips, (clip) => clip.remove());
      return whisper(getLink(character) + ' has reloaded every clip.', {speakingTo: msg.playerid, gmEcho: true});
    }

    var ammoNames = matchingAttrNames(graphic.id, ammoPhrase);
    if(ammoNames.length <= 0) return whisper('A clip for *' + ammoPhrase.replace(/^Ammo - /, '') + '* does not exist yet.');
    if(ammoNames.length >= 2){
      whisper('Which clip did you want to reload?');
      _.each(ammoNames, function(ammo){
        var name = ammo.replace(/^Ammo - /, '');
        var suggestion = 'reload ' + name;
        suggestion = '!{URIFixed}' + encodeURIFixed(suggestion);
        whisper('[' + name + '](' + suggestion  + ')', {speakingTo: msg.playerid});
      });
      return;
    }
    var fakeMsg = {
      playerid: msg.playerid,
      selected: [graphic]
    };
    attributeHandler(['','',ammoNames[0],'=','','max'], fakeMsg);
  });
}

on('ready', function(){
  CentralInput.addCMD(/!\s*reload\s+(\S.*)$/i, reloadWeapon, true);
});
