var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
var INQTotal = '';
describe('matchingAttrNames()', function() {
	it('should return an array of every matching Attribute or Local Attribute name', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'matchingAttrNames player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'matchingAttrNames page'}, {MOCK20override: true});
    var character = createObj('character', {name: 'matchingAttrNames character'});
    var graphic = createObj('graphic', {name: 'matchingAttrNames graphic', _pageid: page.id, represents: character.id});
		var attribute = createObj('attribute', {name: 'matchingAttrNames Attribute', current: '10', max: '18', _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'matchingAttrNames not a matching name', current: '10', max: '18', _characterid: character.id});
		player.MOCK20gm = true;
    player.MOCK20chat('!attr matchingAttrNames Local Attribute= 0', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});

    expect(matchingAttrNames(graphic.id, 'Attribute')).to.include.members(['matchingAttrNames Attribute', 'matchingAttrNames Local Attribute']);
  });
	it('if there is an exact match, it should only return an an array only containing the exact match', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);
    MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'matchingAttrNames player'}, {MOCK20override: true});
    var page = createObj('page', {name: 'matchingAttrNames page'}, {MOCK20override: true});
    var character = createObj('character', {name: 'matchingAttrNames character'});
    var graphic = createObj('graphic', {name: 'matchingAttrNames graphic', _pageid: page.id, represents: character.id});
		var attribute = createObj('attribute', {name: 'matchingAttrNames Attribute', current: '10', max: '18', _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'matchingAttrNames not a matching name', current: '10', max: '18', _characterid: character.id});
		player.MOCK20gm = true;
    player.MOCK20chat('!attr matchingAttrNames Local Attribute= 0', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});

    expect(matchingAttrNames(graphic.id, 'matchingAttrNames Attribute')).to.include.members(['matchingAttrNames Attribute']);
  });
});
