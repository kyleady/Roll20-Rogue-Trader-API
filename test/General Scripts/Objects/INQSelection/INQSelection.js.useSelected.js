var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQSelection.useSelected()', function() {
	it('should edit the given msg to select the saved selection', function(){
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

    var msg = {playerid: player.id};
    INQSelection.useSelected(msg);
    expect(msg.selected).to.deep.equal([
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ]);
  });
  it('should remove the saved selection when used', function(){
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

    var msg = {playerid: player.id};
    INQSelection.useSelected(msg);
    expect(INQSelection.selected).to.be.undefined;
  });
  it('should do nothing if the msg already has something selected', function(){
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

    var msg = {playerid: player.id, selected: ['something']};
    INQSelection.useSelected(msg);
    expect(msg.selected).to.deep.equal(['something']);
    expect(INQSelection.selected).to.deep.equal([
      {_type: 'graphic', _id: graphic1.id},
      {_type: 'graphic', _id: graphic2.id}
    ]);
  });
});
