var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse()', function() {
	it('should create objects', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    var inquse = new INQUse('invalid weapon', options, character, graphic, player.id, function(){
      done();
    });

    expect(inquse).to.be.an.instanceof(INQUse);
  });
  it('should have default properties');
  it('should retrive a handout by name and save it as an INQWeapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
      expect(inquse.inqweapon.Name).to.equal('Weapon Handout');
      done();
    });
  });
	it('should default to an empty options object', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    new INQUse('Weapon Handout', undefined, character, graphic, player.id, function(inquse){
      expect(inquse.options).to.deep.equal({});
      done();
    });
  });
	it('should not require a character or a graphic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    new INQUse('Weapon Handout', undefined, undefined, undefined, player.id, function(inquse){
      done();
    });
  });
	it('should not require a playerid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    new INQUse('Weapon Handout', undefined, undefined, undefined, undefined, function(inquse){
      done();
    });
  });
});
