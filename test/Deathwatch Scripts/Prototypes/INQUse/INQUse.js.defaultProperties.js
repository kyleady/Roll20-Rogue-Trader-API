var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.defaultProperties()', function() {
	it('should set properties of INQUse to their defaults', function(done){
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
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
			inquse.defaultProperties();
      expect(inquse.braced).to.equal(false);
      expect(inquse.range).to.equal('');
			expect(inquse.options.FocusStrength).to.equal('');
			expect(inquse.options.modifiers).to.equal('');
			expect(inquse.jamsAt).to.equal(101);
			expect(inquse.jamResult).to.equal('?');
      expect(inquse.PsyPheDrop).to.equal(0);
      expect(inquse.PsyPheModifier).to.equal(0);
      expect(inquse.hordeDamage).to.equal(0);
      expect(inquse.hordeDamageMultiplier).to.equal(1);
      expect(inquse.ammoMultiplier).to.equal(1);
      expect(inquse.hitsMultiplier).to.equal(1);
      expect(inquse.maxHitsMultiplier).to.equal(1);
			expect(inquse.SB).to.equal(0);
			expect(inquse.PR).to.equal(0);
      done();
    });
  });
});
