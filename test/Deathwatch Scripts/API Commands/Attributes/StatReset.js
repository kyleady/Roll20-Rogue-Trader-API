var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('statReset()', function() {
	it('should reset every attribute and bar to its maximum', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'statReset attribute', current: 19, max: 100, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});
    player.MOCK20gm = true;

    expect(attribute.get('current')).to.not.equal(attribute.get('max'));
    expect(graphic.get('bar3_value')).to.not.equal(graphic.get('bar3_max'));
    player.MOCK20chat('!reset', {MOCK20selected: [{_id: graphic.id, _type: 'graphic'}]});
    expect(attribute.get('current')).to.equal(attribute.get('max'));
    expect(graphic.get('bar3_value')).to.equal(graphic.get('bar3_max'));
  });
  it('should remove every status marker', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'statReset attribute', current: 19, max: 100, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});
    player.MOCK20gm = true;
    graphic.set('statusmarkers','red@2,blue')

    expect(graphic.get('statusmarkers')).to.not.be.empty;
    player.MOCK20chat('!reset All', {MOCK20selected: [{_id: graphic.id, _type: 'graphic'}]});
    expect(graphic.get('statusmarkers')).to.be.empty;
  });
  it('should remove every status marker', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'statReset player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'statReset character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'statReset attribute', current: 19, max: 100, _characterid: character.id});
    var page = createObj('page', {name: 'statReset page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'statReset graphic', _pageid: page.id, represents: character.id, bar3_value: 10, bar3_max: 20});
    player.MOCK20gm = true;
    graphic.set('statusmarkers','red@2,blue')

    expect(graphic.get('statusmarkers')).to.not.be.empty;
    player.MOCK20chat('!alL = max', {MOCK20selected: [{_id: graphic.id, _type: 'graphic'}]});
    expect(graphic.get('statusmarkers')).to.be.empty;
  });
});
