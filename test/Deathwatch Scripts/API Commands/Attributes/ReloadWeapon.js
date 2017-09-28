var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('reloadWeapon()', function() {
	it('should set the named Ammo attribute back to max', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'reloadWeapon player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'reloadWeapon character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Ammo - A Weapon Name', current: 19, max: 100, _characterid: character.id});
    var page = createObj('page', {name: 'reloadWeapon page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'reload graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(attribute.get('current')).to.equal(19);
    player.MOCK20chat('!reload A Weapon Name');
    expect(Number(attribute.get('current'))).to.equal(100);
  });
  it('should detete the named Ammo if it is a Local Attribute', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'reloadWeapon player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'reloadWeapon character', controlledby: player.id});
    var page = createObj('page', {name: 'reloadWeapon page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'reload graphic', _pageid: page.id, represents: character.id});
    var localAttributes = new LocalAttributes(graphic);
    localAttributes.set('Ammo - A Weapon Name', 19);
    expect(attributeValue('Ammo - A Weapon Name', {graphicid: graphic.id})).to.equal(19);
    player.MOCK20chat('!reload A Weapon Name');
    expect(attributeValue('Ammo - A Weapon Name', {graphicid: graphic.id})).to.be.undefined;
  });
  it('should search for the closest matching ammo clip', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'reloadWeapon player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'reloadWeapon character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Ammo - A Weapon Name', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Ammo - A Different Name', current: 5, max: 30, _characterid: character.id});
    var page = createObj('page', {name: 'reloadWeapon page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'reload graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(attribute.get('current')).to.equal(19);
    expect(attribute2.get('current')).to.equal(5);
    player.MOCK20chat('!reload weap ame');
    expect(Number(attribute.get('current'))).to.equal(100);
    expect(attribute2.get('current')).to.equal(5);
  });
  it('should default to the exact match if there are multiple matches', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'reloadWeapon player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'reloadWeapon character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Ammo - A Weapon Name', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Ammo - A weapon Name', current: 5, max: 30, _characterid: character.id});
    var page = createObj('page', {name: 'reloadWeapon page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'reload graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    expect(attribute.get('current')).to.equal(19);
    expect(attribute2.get('current')).to.equal(5);
    player.MOCK20chat('!reload A Weapon Name');
    expect(Number(attribute.get('current'))).to.equal(100);
    expect(attribute2.get('current')).to.equal(5);
  });
  it('should offer suggestions with exact matches if there are multiple matches', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'reloadWeapon player'}, {MOCK20override: true});
    var character = createObj('character', {name: 'reloadWeapon character', controlledby: player.id});
    var attribute = createObj('attribute', {name: 'Ammo - A Weapon Name', current: 19, max: 100, _characterid: character.id});
    var attribute2 = createObj('attribute', {name: 'Ammo - A weapon Name', current: 5, max: 30, _characterid: character.id});
    var page = createObj('page', {name: 'reloadWeapon page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'reload graphic', _pageid: page.id, represents: character.id, bar3_link: attribute.id, bar3_value: 10, bar3_max: 20});
    var suggestions = 0;

    on('chat:message', function(msg){
      if (msg.playerid == 'API' && msg.content == '[A Weapon Name](!{URIFixed}reload%20A%20Weapon%20Name)') {
        suggestions++;
      } else if (msg.playerid == 'API' && msg.content == '[A weapon Name](!{URIFixed}reload%20A%20weapon%20Name)') {
        suggestions++;
      }
      if (suggestions == 2) {
        done();
        suggestions = 3;
      }
    });
    player.MOCK20chat('!reload a weapon name');
  });
});
