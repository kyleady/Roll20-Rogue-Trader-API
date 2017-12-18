var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('CentralInput', function() {
  it('whisper to the user if an unrecognized API command was input', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  	var MyScript = fs.readFileSync(filePath, 'utf8');
  	eval(MyScript);
    var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
    on('chat:message', function(msg){
      if (msg.playerid == 'API' && /!Invalid API Command/.test(msg.content)) {
        expect(msg.target).to.equal(player.id);
        expect(msg.content).to.include('!help');
        done();
      }
    });
    player.MOCK20chat('!Invalid API Command');
  });
  it('should default to setting permissions on commands as gm-only', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  	var MyScript = fs.readFileSync(filePath, 'utf8');
  	eval(MyScript);
    var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
    var gm = createObj('player', {_displayname: 'test gm'}, {MOCK20override: true});
    gm.MOCK20gm = true;
    CentralInput.addCMD(/^!\s*central\s*input\s*default\s*to\s*gm\s*only\s*$/i, function(matches, msg){
      expect(msg.playerid).to.not.equal(player.id);
      expect(msg.playerid).to.equal(gm.id);
      done();
    });
    player.MOCK20chat('!central input default to gm only');
    gm.MOCK20chat('!central input default to gm only');
  });
  it('should allow you to give players access to cmds', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
  	var MyScript = fs.readFileSync(filePath, 'utf8');
  	eval(MyScript);
    var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
    CentralInput.addCMD(/^!\s*central\s*input\s*player\s*access\s*$/i, function(matches, msg){
      expect(msg.playerid).to.equal(player.id);
      done();
    }, true);
    player.MOCK20chat('!central input player access');
  });
});
