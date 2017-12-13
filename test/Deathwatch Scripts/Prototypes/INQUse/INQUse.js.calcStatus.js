var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcStatus()', function() {
	it('should add a modifier if the target is prone', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3*70, left: 4*70, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8*70, left: 16*70, represents: character.id});
    graphic2.set('status_brown', true);
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.inqweapon.Class = 'Melee';
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([{Name: 'Prone', Value: 10}]);
      inquse.modifiers = [];
      inquse.inqweapon.Class = 'Pistol';
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([{Name: 'Prone', Value: -10}]);
      done();
    });
  });
	it('should add a modifier if the target is stunned', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3*70, left: 4*70, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8*70, left: 16*70, represents: character.id});
    graphic2.set('status_green', true);
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([{Name: 'Stunned', Value: 20}]);
      done();
    });
  });
	it('should autoHit if the target is helpless', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3*70, left: 4*70, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8*70, left: 16*70, represents: character.id});
    graphic2.set('status_yellow', true);
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.inqweapon.Class = 'Melee';
			inquse.calcStatus();
			expect(inquse.autoHit).to.equal(true);
      done();
    });
  });
	it('should add a modifier if the attacker is making a surprise attack', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3*70, left: 4*70, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8*70, left: 16*70, represents: character.id});
    graphic1.set('status_purple', true);
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.inqweapon.Class = 'Melee';
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([{Name: 'Unaware', Value: 30}]);
      inquse.modifiers = [];
      inquse.inqweapon.Class = 'Pistol';
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([{Name: 'Unaware', Value: 30}]);
			inquse.modifiers = [];
      inquse.inqweapon.Class = 'Psychic';
			inquse.calcStatus();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
	it('should note if the attacker is braced', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3*70, left: 4*70, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 8*70, left: 16*70, represents: character.id});
    graphic1.set('status_blue', true);
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.calcStatus();
			expect(inquse.braced).to.equal(true);
      done();
    });
  });
});
