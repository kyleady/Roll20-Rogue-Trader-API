var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('medic()', function() {
	it('should create a Max Healing attribute to keep track of the healing done', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'medic player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'medic character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'medic page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'medic graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id})).to.be.empty;
    player.MOCK20chat('!medic 5');
    expect(findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id})).to.not.be.empty;
  });
  it('should not be able to heal past the player\'s Max Wounds', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'medic player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'medic character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'medic page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'medic graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    player.MOCK20chat('!medic 15');
    expect(findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id})[0].get('current')).to.equal(graphic.get('bar3_max'));
    expect(graphic.get('bar3_value')).to.equal(graphic.get('bar3_max'));
  });
  it('should use a character\'s Max Healing attribute to limit healing if it already exists', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'medic player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'medic character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'medic page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'medic graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id})).to.be.empty;
    player.MOCK20chat('!medic 4');
    var MaxHealingObjs = findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id});
    expect(MaxHealingObjs[0].get('current')).to.equal(14);
    expect(graphic.get('bar3_value')).to.equal(14);
    graphic.set('bar3_value', 12);
    player.MOCK20chat('!medic 4');
    expect(MaxHealingObjs[0].get('current')).to.equal(14);
    expect(graphic.get('bar3_value')).to.equal(14);
    graphic.set('bar3_value', 5);
    player.MOCK20chat('!medic 4');
    expect(MaxHealingObjs[0].get('current')).to.equal(9);
    expect(graphic.get('bar3_value')).to.equal(9);
  });
  it('should increase Max Healing if the Max Wounds are manually increased', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'medic player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'medic character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Wounds', current: 10, max: 20, _characterid: character.id});
    var page = createObj('page', {name: 'medic page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'medic graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id})).to.be.empty;
    player.MOCK20chat('!medic 3');
    var MaxHealingObjs = findObjs({_type: 'attribute', name: 'Max Healing', _characterid: character.id});
    expect(MaxHealingObjs[0].get('current')).to.equal(13);
    expect(graphic.get('bar3_value')).to.equal(13);
    graphic.set('bar3_value', 17);
    expect(MaxHealingObjs[0].get('current')).to.equal(17);
  });
});
