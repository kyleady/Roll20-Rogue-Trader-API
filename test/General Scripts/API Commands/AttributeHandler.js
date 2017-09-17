var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('attributeHandler()', function() {
	it('should allow any player to learn of a selected character\'s attribute', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Strength', current: '10', max: '18', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id});
		var table = attributeTable(attribute.get('name'), {current: attribute.get('current'), max: attribute.get('max')});
		on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.content.indexOf(table) != -1){
				on({MOCK20remove: true}, this);
				done();
			}
		});
		player.MOCK20chat('!attr Strength ?', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
	});
	it('should allow any player to apply a modifier to an attribute query', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Intelligence', current: 9, max: 6, _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id});

		var table_addition    = attributeTable(attribute.get('name'), {current: attribute.get('current')+10, max: attribute.get('max')});
		var table_subtraction = attributeTable(attribute.get('name'), {current: attribute.get('current')-8, max: attribute.get('max')});
		var table_multiplication = attributeTable(attribute.get('name'), {current: attribute.get('current')*3, max: attribute.get('max')});
		var table_division = attributeTable(attribute.get('name'), {current: Math.round(attribute.get('current')/2), max: attribute.get('max')});

		var addition_detected = false;
		var subtraction_detected = false;
		var multiplication_detected = false;
		var division_detected = false;

		on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.content.indexOf(table_addition) != -1){
				on({MOCK20remove: true}, this);
				addition_detected = true;
			}
		});
		on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.content.indexOf(table_subtraction) != -1){
				on({MOCK20remove: true}, this);
				subtraction_detected = true;
			}
		});
		on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.content.indexOf(table_multiplication) != -1){
				on({MOCK20remove: true}, this);
				multiplication_detected = true;
			}
		});
		on('chat:message', function(msg){
			if(msg.playerid == 'API' && msg.content.indexOf(table_division) != -1){
				on({MOCK20remove: true}, this);
				division_detected = true;
			}
		});

		expect(addition_detected).to.equal(false);
		expect(subtraction_detected).to.equal(false);
		expect(multiplication_detected).to.equal(false);
		expect(division_detected).to.equal(false);

		player.MOCK20chat('!attr Intelligence ?+ 10', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(addition_detected).to.equal(true);
		player.MOCK20chat('!attr Intelligence ?- 8', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(subtraction_detected).to.equal(true);
		player.MOCK20chat('!attr Intelligence ?* 3', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(multiplication_detected).to.equal(true);
		player.MOCK20chat('!attr Intelligence ?/ 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(division_detected).to.equal(true);
	});
	it('should allow any player to set an attribute of a selected character\'s attribute', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Dexterity', current: '13', max: '11', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id, bar1_link: attribute.id});
		expect(attribute.get('current')).to.equal('13');
		player.MOCK20chat('!attr Dexterity = 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal('2');
	});
	it('should allow any player to modify an attribute of a selected character\'s attribute', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Toughness', current: '25', max: '14', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id, bar1_link: attribute.id});
		expect(attribute.get('current')).to.equal('25');
		player.MOCK20chat('!attr Toughness += 9', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal(34);
		player.MOCK20chat('!attr Toughness -= 13', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal(21);
		player.MOCK20chat('!attr Toughness *= 1.5', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal(32);
		player.MOCK20chat('!attr Toughness /= 2.6', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal(12);
	});
	it('should allow any player to work with max values as well', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Charisma', current: '2', max: '4', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id, bar1_link: attribute.id});
		expect(attribute.get('max')).to.equal('4');
		player.MOCK20chat('!attr max Charisma += 9', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		log(attribute)
		expect(attribute.get('max')).to.equal(13);
		player.MOCK20chat('!attr max Charisma -= 12', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('max')).to.equal(1);
		player.MOCK20chat('!attr max Charisma *= 2', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('max')).to.equal(2);
		player.MOCK20chat('!attr max Charisma /= 3', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('max')).to.equal(1);
	});
	it('should allow any player to use the current or max value as the modifier', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Wisdom', current: '15', max: '17', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id, bar1_link: attribute.id});
		expect(attribute.get('current')).to.equal('15');
		player.MOCK20chat('!attr Wisdom = max', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal('17');
		player.MOCK20chat('!attr Wisdom += max', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		expect(attribute.get('current')).to.equal(34);
	});
	it('should default to the player\'s default character', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Wisdom', current: '15', max: '17', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic = createObj('graphic', {represents: character.id, _pageid: page.id, bar1_link: attribute.id});
		expect(attribute.get('current')).to.equal('15');
		player.MOCK20chat('!attr Wisdom = max');
		expect(attribute.get('current')).to.equal('17');
		player.MOCK20chat('!attr Wisdom += max');
		expect(attribute.get('current')).to.equal(34);
	});
	it('should edit local attributes if the graphic has no bar links', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		var player = createObj('player', {_displayname: 'stat handler query'}, {MOCK20override: true});
		var character = createObj('character', {controlledby: player.id});
		var attribute = createObj('attribute', {name: 'Agility', current: '8', max: '9', _characterid: character.id});
		var page = createObj('page', {}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {represents: character.id, _pageid: page.id});
		var graphic2 = createObj('graphic', {represents: character.id, _pageid: page.id});
		expect(attribute.get('current')).to.equal('8');
		player.MOCK20chat('!attr Agility -= 1', {MOCK20selected: [{_type: 'graphic', _id: graphic2.id}]});
		expect(attribute.get('current')).to.equal('8');
		expect(attributeValue(attribute.get('name'), {graphicid: graphic1.id})).to.equal('8');
		expect(attributeValue(attribute.get('name'), {graphicid: graphic2.id})).to.equal(7);
	});
});
