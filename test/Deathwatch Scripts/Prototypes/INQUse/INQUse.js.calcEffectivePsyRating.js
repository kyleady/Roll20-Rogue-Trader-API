var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcEffectivePsyRating()', function() {
	it('should use the options to determine the character\'s effective Psy Rating', function(done){
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
			inquse.modifiers = [];
      inquse.inqcharacter.Attributes.PR = 4;
      inquse.options.FocusStrength = 'Push';
      inquse.options.BonusPR = 1;
      inquse.calcEffectivePsyRating();
      expect(inquse.PR).to.equal(7);
      done();
    });
  });
	it('should add a modifier based on the Effective Psy Rating', function(done){
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
			inquse.modifiers = [];
			inquse.inqcharacter.Attributes.PR = 5;
      inquse.options.FocusStrength = 'True';
      inquse.options.BonusPR = 0;
      inquse.calcEffectivePsyRating();
      expect(inquse.modifiers).to.deep.equal([{Name: 'Psy Rating', Value: 50}]);
      done();
    });
  });
  it('should determine the Psychic Phenomena Modifier', function(done){
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
			inquse.modifiers = [];
			inquse.inqcharacter.Attributes.PR = 4;
      inquse.options.FocusStrength = 'Fettered';
      inquse.options.BonusPR = 1;
      inquse.calcEffectivePsyRating();
      expect(inquse.PsyPheModifier).to.equal(0);
      done();
    });
  });
});
