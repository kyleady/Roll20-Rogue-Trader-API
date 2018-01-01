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
  it('should allow you to specify a delay', function(done){
		var msgCount = 0;
		on('chat:message:whisper_options', function(msg){
      msgCount++;
      done();
    });
    whisper('whisper() delay', {speakingAs: 'The Speaker', MOCK20tag: 'whisper_options', delay: 100});
		expect(msgCount).to.equal(0);
  });
  it('should warn if the player does not exist after the delay', function(done){
		var msgCount = 0;
		on('chat:message', function(msg){
      if(msg.content =='This message should not arrive.') throw 'Message should not have sent.';
      msgCount++;
      done();
    });
    var player = createObj('player', {_displayname: 'tempPlayer'}, {MOCK20override: true});
    whisper('This message should not arrive.', {speakingTo: player.id, delay: 100});
    player.remove({MOCK20override: true});
  });
});
