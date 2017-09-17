var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('sendToPage()', function() {
	it('should send the player page to the matching page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'return player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'starting page'}, {MOCK20override: true});
    var page2 = createObj('page', {name: 'finish page'}, {MOCK20override: true});
    Campaign().set('playerpageid', page.id);
    player.MOCK20chat('!send to FINISH');
    expect(Campaign().get('playerpageid')).to.equal(page2.id);
  });
  it('should send a matching player to the matching page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'return player'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'specific player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var page = createObj('page', {name: 'starting page'}, {MOCK20override: true});
    var page2 = createObj('page', {name: 'side page'}, {MOCK20override: true});
    Campaign().set('playerpageid', page.id);
    expect(Campaign().get('playerspecificpages')).to.equal(false);
    player.MOCK20chat('!send to siDE | specific plaY');
    var playerspecificpages = {};
    playerspecificpages[player2.id] = page2.id;
    expect(Campaign().get('playerspecificpages')).to.deep.equal(playerspecificpages);
    expect(Campaign().get('playerpageid')).to.equal(page.id);
  });
});
