var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQSelection.checkSelected()', function() {
	it('should whisper ping buttons to the user', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id});

    INQSelection.selected = [
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ];

    on('chat:message', function(msg) {
      if(msg.playerid == player.id) return;
      expect(msg.content).to.include('[Graphic One](!pingG ' + graphic1.id + ')');
      expect(msg.content).to.include('[Graphic Two](!pingG ' + graphic2.id + ')');
      done();
    });

    player.MOCK20chat('!selected?');
  });
  it('should warn if nothing is selected', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id});

    INQSelection.selected = undefined;

    on('chat:message', function(msg) {
      if(msg.playerid == player.id) return;
      expect(msg.content).to.include('Empty');
      done();
    });

    player.MOCK20chat('!selected?');
  });
});
