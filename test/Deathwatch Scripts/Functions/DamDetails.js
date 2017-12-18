var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('damDetails()', function() {
	it('should return an object with all of the attack details', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

		var attack = damDetails();
		expect(attack).to.have.all.keys(
			'DamType',
			'Dam',
			'Pen',
			'Fell',
			'Prim',
			'Hits',
			'OnesLoc',
			'TensLoc',
			'Ina'
		);
  });
	it('should return attribute objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

		var attackObjs = damDetails();
		expect(attackObjs.Dam.get('_type')).to.equal('attribute');
	});
	it('should create any missing damage attributes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    var maxValues = {DamageType: 'R', Damage: '23', Penetration: '34', Felling: '2', Primitive: '3', Hits: '1', OnesLocation: '8', TensLocation: '3'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: maxValues[attr], _characterid: attack.id});

		on('add:attribute', function(obj){
			if(obj.get('name') != 'Ignores Natural Armour') return;
			expect(obj.get('_characterid')).to.equal(attack.id);
			expect(obj.get('current')).to.equal(0);
			expect(obj.get('max')).to.equal(0);
			done();
		});

		var attackObjs = damDetails();
	});
	it('should create a Damage Catcher character sheet if there isn\'t one already', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		on('add:character', function(obj){
			if(obj.get('name') != 'Damage Catcher') return;
			done();
		});

		var attackObjs = damDetails();
	});
});
