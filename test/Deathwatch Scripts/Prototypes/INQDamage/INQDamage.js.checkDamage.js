var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.checkDamage', function() {
	it('should whisper a warning and return false if Starship Damage is being used on a non-starship', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        done();
      });

      inqdamage.DamType.set('current', 'S');
      expect(inqdamage.checkDamage()).to.equal(false);
    });
  });
  it('should whisper a warning and return false if non-starship Damage is being used on a starship', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    inqcharacter.Name = 'Crit Starship';
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        done();
      });

      expect(inqdamage.checkDamage()).to.equal(false);
    });
  });
  it('should return true otherwise, with no whisper', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        throw false;
      });

      expect(inqdamage.checkDamage()).to.equal(true);
      setTimeout(done, 200);
    });
  });
});
