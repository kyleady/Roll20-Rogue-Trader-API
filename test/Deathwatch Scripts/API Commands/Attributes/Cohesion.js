var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('cohesion()', function() {
	it('should make a cohesion test', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    on('chat:message', function(msg){
      if(msg.playerid == 'API') {
        expect(msg.type).to.equal('rollresult');
        expect(msg.origRoll).to.equal('D10<10 Cohesion Test');
        done();
      }
    });

    var player = createObj('player', {_displayname: 'cohesion player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'cohesion variables'});
    var attribute = createObj('attribute', {name: 'Cohesion', current: 10, max: 20, _characterid: character.id});
    player.MOCK20chat('!cohesion');

  });
	it('should not crash if cohesion does not exist anywhere', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'cohesion player'}, {MOCK20override: true});
    expect(function(){player.MOCK20chat('!cohesion')}).to.not.throw();
  });
});
