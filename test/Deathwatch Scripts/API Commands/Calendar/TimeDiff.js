var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('timeDiff()', function() {
	it('should report the time difference to the user', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    on('chat:message', function(msg){
      if(msg.type == 'api') return;
      expect(msg.content).to.equal('1 day, 5 weeks, 3002 years until 8100004.M6.');
      done();
    });

    var player = createObj('player', {_displayname: 'player'}, {MOCK20override: true});
    player.MOCK20chat('!time ?- 8100004.M6');
  });
});
