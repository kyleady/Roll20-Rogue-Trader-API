var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('where()', function() {
	it('should whisper the player page and the specific player pages to the gm', function(done){
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
    var playerspecificpages = {};
    playerspecificpages[player.id] = page2.id;
    Campaign().set('playerspecificpages', playerspecificpages);

    on('chat:message', function(msg) {
      if (msg.target == 'gm') {
        expect(msg.content).to.include(page.get('name'));
        expect(msg.content).to.include(page2.get('name'));
        done();
      }

    });
    player.MOCK20chat('!wherE?');
  });
});
