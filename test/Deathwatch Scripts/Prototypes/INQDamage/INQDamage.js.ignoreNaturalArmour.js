var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.ignoreNaturalArmour()', function() {
	it('should return the remaining armour after any Natural Armour is ignored', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INA Character';
    inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Ina.set('current', 1);
      expect(inqdamage.ignoreNaturalArmour(20)).to.equal(12);
      done();
    });
  });
  it('should ignore all armour if no value is given', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INA Character';
    inqcharacter.List.Traits.push(new INQLink('Natural Armour'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Ina.set('current', 1);
      expect(inqdamage.ignoreNaturalArmour(20)).to.equal(0);
      done();
    });
  });
  it('should not ignore any armour if the character does not have any natural armour', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INA Character';
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.Ina.set('current', 1);
      expect(inqdamage.ignoreNaturalArmour(20)).to.equal(20);
      done();
    });
  });
  it('should not ignore any natural armour if the attack does not ignore natural armour', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'INA Character';
    inqcharacter.List.Traits.push(new INQLink('Natural Armour(8)'));
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
      expect(inqdamage.ignoreNaturalArmour(20)).to.equal(20);
      done();
    });
  });
});
