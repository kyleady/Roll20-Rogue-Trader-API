var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.applyArmour()', function() {
	it('should save the resulting damage to the damage property', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(10);
      done();
    });
  });
  it('should reduce the damage by the character\'s armour', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 6;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(4);
      done();
    });
  });
  it('should reduce the armour by the penetration', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 6;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 2);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(6);
      done();
    });
  });
	it('should double the armour if the attack is primitive', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 6;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 4);
			inqdamage.Prim.set('current', 1);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(2);
      done();
    });
  });
	it('should not allow high penetration to increase the damage', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 6;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 100);
			inqdamage.Prim.set('current', 1);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(10);
      done();
    });
  });
	it('should not allow high armour to reduce damage below zero', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 100;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 4);
			inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(0);
      done();
    });
  });
	it('should ignore starship armour if there is any penetration', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    inqcharacter.Attributes.Armour_F = 100;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 4);
			inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(10);
      done();
    });
  });
	it('should ignore natural armour if the attack is marked as ignoring natural armour', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 20;
		inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.Pen.set('current', 4);
			inqdamage.Ina.set('current', 1);
			inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(2);
      done();
    });
  });
	it('should default to 0 damage if the damage is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 0;
		inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 'Invalid Damage');
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(0);
      done();
    });
  });
	it('should default to 0 armour if the armour is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 'Invalid Armour';
		inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(10);
      done();
    });
  });
	it('should default to 0 penetration if the pen is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.Armour_H = 8;
		inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Dam.set('current', 10);
			inqdamage.Pen.set('current', 'Invalid Pen');
      inqdamage.applyArmour();
      expect(inqdamage.damage).to.equal(2);
      done();
    });
  });
});
