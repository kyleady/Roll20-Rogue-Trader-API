var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.getDamDetails()', function() {
	it('should create properties for each of the detail attributes', function(done){
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
      for(var prop in inqdamage) {
        if(inqdamage[prop] && inqdamage[prop].get){
          delete inqdamage[prop];
        }
      }

      inqdamage.getDamDetails();
      expect(inqdamage.Dam).to.respondTo('get');
      expect(inqdamage.DamType).to.respondTo('get');
      expect(inqdamage.Pen).to.respondTo('get');
      expect(inqdamage.Fell).to.respondTo('get');
      expect(inqdamage.Ina).to.respondTo('get');
      expect(inqdamage.Prim).to.respondTo('get');
      expect(inqdamage.Hits).to.respondTo('get');
      expect(inqdamage.TensLoc).to.respondTo('get');
      expect(inqdamage.OnesLoc).to.respondTo('get');
      done();
    });
  });
});
