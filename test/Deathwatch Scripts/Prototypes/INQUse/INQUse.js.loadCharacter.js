var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.loadCharacter()', function() {
	it('should convert the given character and graphic into an INQCharacter', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.loadCharacter(character, graphic, function(valid){
        expect(inquse.inqcharacter).to.be.an.instanceof(INQCharacter);
        done();
      });
    });
  });
  it('should use the stats of a default character, if the selected is a vehicle and the player is not the gm', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {name: 'Default Character', controlledby: player.id});
    var inqvehicle = new INQVehicle();
    var vehicle = inqvehicle.toCharacterObj();
    var graphic = createObj('graphic', {_pageid: page.id, represents: vehicle.id});
    var options = {};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.loadCharacter(vehicle, graphic, function(valid){
        expect(inquse.inqcharacter).to.be.an.instanceof(INQCharacter);
        expect(inquse.inqcharacter.Name).to.equal('Default Character');
        expect(inquse.inqcharacter.ObjID).to.equal(vehicle.id);
        expect(inquse.inqcharacter.GraphicID).to.equal(graphic.id);
        done();
      });
    });
  });
  it('should return true in the callback even if there was no character to parse', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {name: 'Default Character', controlledby: player.id});
    var inqvehicle = new INQVehicle();
    var vehicle = inqvehicle.toCharacterObj();
    var graphic = createObj('graphic', {_pageid: page.id, represents: vehicle.id});
    var options = {};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.loadCharacter(undefined, undefined, function(valid){
        expect(valid).to.equal(true);
        done();
      });
    });
  });
});
