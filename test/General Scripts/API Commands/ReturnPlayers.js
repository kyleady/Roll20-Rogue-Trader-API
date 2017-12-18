var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('returnPlayers()', function() {
	it('should return all players from their player specific pages', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'return player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var playerspecificpages = {};
    playerspecificpages[player.id] = 'page-id';
    Campaign().set('playerspecificpages', playerspecificpages);
    expect(Campaign().get('playerspecificpages')).to.deep.equal(playerspecificpages);
    player.MOCK20chat('!return');
    expect(Campaign().get('playerspecificpages')).to.equal(false);
  });
  it('should return a matched player from their player specific page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'return player 1'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'return player 2'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var playerspecificpages = {};
    playerspecificpages[player.id] = 'page-id';
    playerspecificpages[player2.id] = 'other-page-id'
    Campaign().set('playerspecificpages', playerspecificpages);
    expect(Campaign().get('playerspecificpages')).to.deep.equal(playerspecificpages);
    player.MOCK20chat('!return PLAYER 2');
    var playerspecificpages2 = {};
    playerspecificpages2[player.id] = 'page-id';
    expect(Campaign().get('playerspecificpages')).to.deep.equal(playerspecificpages2);
  });
});
