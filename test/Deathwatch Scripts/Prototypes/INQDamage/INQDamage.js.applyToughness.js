var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.applyToughness()', function() {
	it('should reduce the damage property by the toughness bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.T = 40;
    inqcharacter.Attributes['Unnatural T'] = 5;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 11;
      inqdamage.applyToughness();
      expect(inqdamage.damage).to.equal(2);
      done();
    });
  });
  it('should reduce the Unnatural Toughness by Felling', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.T = 40;
    inqcharacter.Attributes['Unnatural T'] = 5;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 11;
      inqdamage.Fell.set('current', 3);
      inqdamage.applyToughness();
      expect(inqdamage.damage).to.equal(5);
      done();
    });
  });
  it('should not reduce the Unnatural Toughness below 0', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.T = 40;
    inqcharacter.Attributes['Unnatural T'] = 5;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 11;
      inqdamage.Fell.set('current', 100);
      inqdamage.applyToughness();
      expect(inqdamage.damage).to.equal(7);
      done();
    });
  });
  it('should not reduce the damage property below 0', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.T = 40;
    inqcharacter.Attributes['Unnatural T'] = 20;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 11;
      inqdamage.applyToughness();
      expect(inqdamage.damage).to.equal(0);
      done();
    });
  });
});
