var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcRoF()', function() {
	it('should record the Firing Mode', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8, left: 16, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
			inquse.options.RoF = 'semi-auto';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Semi');
			inquse.options.RoF = 'full-auto';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Full');
			inquse.options.RoF = 'called Shot';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Single');
			inquse.options.RoF = 'swift attack';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Semi');
			inquse.options.RoF = 'lightning attack';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Full');
			inquse.options.RoF = 'all out attack';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Single');
			inquse.options.RoF = 'something else';
			inquse.calcRoF();
      expect(inquse.mode).to.equal('Single');
      done();
    });
  });
	it('should record the max number of hits and shots fired', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>RoF</strong>: S/PR/2PR<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var inqcharacter = new INQCharacter();
		inqcharacter.Attributes.WS = 70;
    var character = inqcharacter.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8, left: 16, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.PR = 3;
			inquse.modifiers = [];
			inquse.options.RoF = 'semi-auto';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(3);
			expect(inquse.shotsFired).to.equal(3);
			inquse.options.RoF = 'full-auto';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(6);
			expect(inquse.shotsFired).to.equal(6);
			inquse.options.RoF = 'called Shot';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(1);
			expect(inquse.shotsFired).to.equal(1);
			inquse.options.RoF = 'swift attack';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(2);
			expect(inquse.shotsFired).to.equal(2);
			inquse.options.RoF = 'lightning attack';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(4);
			expect(inquse.shotsFired).to.equal(4);
			inquse.options.RoF = 'all out attack';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(1);
			expect(inquse.shotsFired).to.equal(1);
			inquse.options.RoF = 'something else';
			inquse.calcRoF();
      expect(inquse.maxHits).to.equal(1);
			expect(inquse.shotsFired).to.equal(1);
      done();
    });
  });
	it('should add modifiers based on the firing mode', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>RoF</strong>: S/PR/2PR<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var inqcharacter = new INQCharacter();
		inqcharacter.Attributes.WS = 70;
    var character = inqcharacter.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8, left: 16, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
			inquse.options.RoF = 'semi-auto';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([]);
			inquse.modifiers = [];
			inquse.options.RoF = 'full-auto';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([{Name: 'Full Auto', Value: -10}]);
			inquse.modifiers = [];
			inquse.options.RoF = 'called Shot';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([{Name: 'Called Shot', Value: -20}]);
			inquse.modifiers = [];
			inquse.options.RoF = 'swift attack';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([]);
			inquse.modifiers = [];
			inquse.options.RoF = 'lightning attack';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([{Name: 'Lightning Attack', Value: -10}]);
			inquse.modifiers = [];
			inquse.options.RoF = 'all out attack';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([{Name: 'All Out Attack', Value: 30}]);
			inquse.modifiers = [];
			inquse.options.RoF = 'something else';
			inquse.calcRoF();
      expect(inquse.modifiers).to.deep.equal([{Name: 'Standard', Value: 10}]);
      done();
    });
  });
});
