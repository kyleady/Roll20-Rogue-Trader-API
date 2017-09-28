var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('fate()', function() {
	it('should spend a Fate Point', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'fate player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'fate character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Fate', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'fate page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'fate graphic', _pageid: page.id, represents: character.id, bar1_link: attribute.id});
    expect(attribute.get('current')).to.equal(10);
    player.MOCK20chat('!fate');
    expect(attribute.get('current')).to.equal(9);
  });
  it('should not spend a Fate Point if you don\'t have any to spend', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'fate player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'fate character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Fate', current: 0, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'fate page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'fate graphic', _pageid: page.id, represents: character.id, bar1_link: attribute.id});
    expect(attribute.get('current')).to.equal(0);
    player.MOCK20chat('!fate');
    expect(attribute.get('current')).to.equal(0);
  });
  it('should not crash if the character does not have a fate point', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'fate player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'fate character', controlledby: player.id});
    var page = createObj('page', {name: 'fate page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'fate graphic', _pageid: page.id, represents: character.id});
    expect(function(){player.MOCK20chat('!fate')}).to.not.throw();
  });
});
