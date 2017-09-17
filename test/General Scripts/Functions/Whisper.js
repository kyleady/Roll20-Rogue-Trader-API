var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('whisper()', function() {
  Campaign().MOCK20reset();
  var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  var MyScript = fs.readFileSync(filePath, 'utf8');
  eval(MyScript);
  it('should whisper to the gm by default', function(done){
    on('chat:message:whisper_gm', function(msg){
      expect(msg.target).to.equal('gm');
      done();
    });
    whisper('private message', {MOCK20tag: 'whisper_gm'});
  });
  it('should whisper to the given player id', function(done){
    var player = createObj('player', {_displayname: 'whisper player'}, {MOCK20override: true});
    on('chat:message:whisper_player', function(msg){
      expect(msg.target).to.equal(player.id);
      expect(msg.target_name).to.equal(player.get('_displayname'));
      done();
    });
    whisper('private message', {speakingTo: player.id, MOCK20tag: 'whisper_player'});
  });
  it('should be able to set speakingAs', function(done){
    on('chat:message:whisper_speakingAs', function(msg){
      expect(msg.who).to.equal('speaker');
      done();
    });
    whisper('private message', {speakingAs: 'speaker', MOCK20tag: 'whisper_speakingAs'});
  });
});
