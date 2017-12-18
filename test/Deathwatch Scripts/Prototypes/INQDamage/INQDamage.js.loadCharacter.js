var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.loadCharacter()', function() {
	it('should run the given callback after loading the character', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(undefined, undefined, function(inqdamage) {
      inqdamage.loadCharacter(character, graphic, function() {
        expect(inqdamage.inqcharacter).to.be.an.instanceof(INQCharacter);
        done();
      });
    });
  });
  it('should record the character type', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(undefined, undefined, function(inqdamage) {
      inqdamage.loadCharacter(character, graphic, function() {
        expect(inqdamage.targetType).to.equal('character');
        done();
      });
    });
  });
  it('should be able to handle vehicles', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQVehicle();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(undefined, undefined, function(inqdamage) {
      inqdamage.loadCharacter(character, graphic, function() {
        expect(inqdamage.inqcharacter).to.be.an.instanceof(INQVehicle);
        expect(inqdamage.targetType).to.equal('vehicle');
        done();
      });
    });
  });
  it('should be able to handle starships', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(undefined, undefined, function(inqdamage) {
      inqdamage.loadCharacter(character, graphic, function() {
        expect(inqdamage.inqcharacter).to.be.an.instanceof(INQStarship);
        expect(inqdamage.targetType).to.equal('starship');
        done();
      });
    });
  });
});
