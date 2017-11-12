var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('statRoll()', function() {
	it('should roll a D100 against the given stat', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'WS', current: 19, max: 100, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});

    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('WS')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*19\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });

    player.MOCK20chat('!WS');
  });
  it('should add in Unnatural Successes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute  = createObj('attribute', {name: 'S', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Unnatural S', current: 4, max: 6, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});

    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('S')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[1].expression).to.match(/^\s*ceil\(\s*\(\s*4\s*\)\s*\/\s*2\s*\)\s*$/);
        done();
      }
    });

    player.MOCK20chat('!S');
  });
  it('should accept a modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute  = createObj('attribute', {name: 'Ag', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Unnatural Ag', current: 4, max: 6, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});

    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content.includes('Ag')) {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*39\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });

    player.MOCK20chat('!Ag+20');
  });
  it('should allow you to whisper the skill check to the gm', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute  = createObj('attribute', {name: 'It', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Unnatural It', current: 4, max: 6, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id});
    on('chat:message', function(msg){
			if (msg.playerid == 'API' && msg.content.includes('It') && msg.target == 'gm') {
        expect(msg.inlinerolls).to.not.be.undefined;
        expect(msg.inlinerolls[0].expression).to.match(/^\s*0\.1\s*\*\s*\(\s*22\s*-\s*1D100\s*\)\s*$/i);
        done();
      }
    });
    player.MOCK20chat('!gm It+3');
  });
});
