var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('defaultCharacter()', function() {
	Campaign().MOCK20reset();
	var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
	var MyScript = fs.readFileSync(filePath, 'utf8');
	eval(MyScript);
	it('should retrive the one character a player controls', function(){
		var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
		var character = createObj('character', {name: 'test character', controlledby: player.id});
		var character2 = createObj('character', {name: 'wrong character'});
		expect(defaultCharacter(player.id)).to.equal(character);
	});
	it('should return undefined if the player owns no characters', function(){
		var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
		var character = createObj('character', {name: 'test character 1'});
		var character2 = createObj('character', {name: 'test character 2'});
		expect(defaultCharacter(player.id)).to.equal(undefined);
	});
	it('should return undefined if the player owns more than one character', function(){
		var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
		var character = createObj('character', {name: 'test character 1', controlledby: player.id});
		var character2 = createObj('character', {name: 'test character 2', controlledby: player.id});
		expect(defaultCharacter(player.id)).to.equal(undefined);
	});
});
