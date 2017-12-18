var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQSelection.saveSelected()', function() {
	it('should record the currently selected graphics', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id});

    on('chat:message', function(msg) {
      if(msg.playerid == player.id || msg.target == 'gm') return;
      expect(INQSelection.selected).to.deep.equal([
        {_type: 'graphic', _id: graphic1.id},
        {_type: 'graphic', _id: graphic2.id}
      ]);
      done();
    });

    player.MOCK20chat('!select', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ]});
  });
  it('should alert both the gm and the user that a selection was saved', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {name: 'Graphic One', _pageid: page.id});
    var graphic2 = createObj('graphic', {name: 'Graphic Two', _pageid: page.id});

    var gmWhisper = false;
    var playerWhisper = false;
    on('chat:message', function(msg) {
      if(msg.playerid == player.id) return;
      if(msg.target == player.id) playerWhisper = true;
      if(msg.target == 'gm') gmWhisper = true;
      if(playerWhisper && gmWhisper) done();
    });

    player.MOCK20chat('!select', {MOCK20selected: [
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ]});
  });
});
