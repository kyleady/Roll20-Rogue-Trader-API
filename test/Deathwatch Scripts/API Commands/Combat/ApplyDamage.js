var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('applyDamage()', function() {
	it('should deal damage to the graphic\'s bar 3', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Wounds = 100;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(87);
  });
  it('should reduce damage by armour minus penetration', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_RA = 10;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(93);
  });
  it('should reduce damage by toughness and unnatural toughness minus felling', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_RA = 10;
    inqcharacter.Attributes.T = 30;
    inqcharacter.Attributes['Unnatural T'] = 2;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(97);
  });
  it('should be able to damage vehicles', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQVehicle();
    inqcharacter.Attributes.Armour_F = 10;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'X', Damage: '13', Penetration: '4', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(93);
  });
	it('should be able to damage starships', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQStarship();
    inqcharacter.Attributes.Armour_F = 10;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'S', Damage: '13', Penetration: '0', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(97);
  });
	it('should be able to damage hordes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100, bar2_value: 'H'});
		var graphic2 = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100, bar2_value: 'H'});
		var graphic3 = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100, bar2_value: 'H'});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'I', Damage: '13', Penetration: '0', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
		var dead = 0;
		if(graphic.get('status_dead')) dead++;
		if(graphic2.get('status_dead')) dead++;
		if(graphic3.get('status_dead')) dead++;
    expect(dead).to.equal(2);
  });
	it('should allow Characters to go into negative health', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQCharacter();
		inqcharacter.Attributes.T = 30;
		inqcharacter.Attributes['Unnatural T'] = 4;
		inqcharacter.Attributes.Armour_RA = 5;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'I', Damage: '113', Penetration: '1', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(-3);
  });
	it('should allow Vehicles to go into negative health', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQVehicle();
		inqcharacter.Attributes.Armour_F = 5;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'I', Damage: '113', Penetration: '1', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(-9);
  });
	it('should not allow Starships to go into negative health', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'applyDamage player'}, {MOCK20override: true});
    player.MOCK20gm = true;
    var inqcharacter = new INQStarship();
		inqcharacter.Attributes.Armour_F = 5;
    var character = inqcharacter.toCharacterObj();
		character.set('controlledby', player.id);
		var page = createObj('page', {name: 'applyDamage page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'applyDamage graphic', _pageid: page.id, represents: character.id, bar3_value: 100, bar3_max: 100});
    var attack = createObj('character', {name: 'Damage Catcher'});
    var values = {DamageType: 'S', Damage: '113', Penetration: '1', Felling: '1', Primitive: '0', Hits: '2', OnesLocation: '9', TensLocation: '8'};
    for (var attr in values) createObj('attribute', {name: attr, current: values[attr], max: values[attr], _characterid: attack.id});

    expect(graphic.get('bar3_value')).to.equal(100);
    player.MOCK20chat('!dam', {MOCK20selected: [{_type: 'graphic', _id: graphic.id}]});
    expect(graphic.get('bar3_value')).to.equal(0);
  });
});
