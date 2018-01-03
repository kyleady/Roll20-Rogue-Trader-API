var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('lastWatchWave()', function() {
  it('should report the number of Hordes, Elites, and Master enemies', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    on('chat:message', function(msg) {
      if(msg.type == 'api') return;
      log(msg.type)
      expect(msg.content).to.match(/(Master|Elite|Horde)/);
      done();
    });

    player.MOCK20chat('!lastwatchWave 50');
  });
  it('should allow you to change the chances of fighting higher level enemies', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    on('chat:message', function(msg) {
      if(msg.type == 'api') return;
      log(msg.type)
      expect(msg.content).to.equal('Master: 10');
      done();
    });

    player.MOCK20chat('!lastwatchWave 160 100%');
  });
});
