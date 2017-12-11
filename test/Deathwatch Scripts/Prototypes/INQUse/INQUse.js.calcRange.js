var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcRange()', function() {
	it('should record the range modifier type', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Basic<br><strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, height: 0.1, width: 0.1, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 3, left: 19, height: 0.1, width: 0.1, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.range = '';
      inquse.SB = 4;
			inquse.calcRange();
      expect(inquse.range).to.match(/^Long/);
			graphic2.set('left', 5);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Point Blank/);
			graphic2.set('left', 4+3);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Close/);
			graphic2.set('left', 4+7);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Standard/);
			graphic2.set('left', 4+14);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Long/);
			graphic2.set('left', 4+25);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Extended/);
			graphic2.set('left', 4+37);
			inquse.calcRange();
      expect(inquse.range).to.match(/^Extreme/);
			graphic2.set('left', 4+60);
			inquse.calcRange();
			expect(inquse.autoFail).to.equal(true);
      done();
    });
  });
	it('should include the distance and weapon range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Basic<br><strong>Range</strong>: 3 x SB m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, height: 0.1, width: 0.1, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 3, left: 19, height: 0.1, width: 0.1, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.range = '';
      inquse.SB = 4;
			inquse.calcRange();
      expect(inquse.range).to.match(/\(15\/12\)$/);
      done();
    });
  });
  it('should record the melee range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Melee<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, height: 1, width: 1, represents: character.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, top: 3, left: 6, height: 1, width: 1, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.range = '';
      inquse.PR = 10;
			inquse.calcRange();
      expect(inquse.range).to.match(/^Melee/);
			expect(inquse.autoFail).to.not.equal(true);
      expect(inquse.modifiers).to.deep.equal([]);
			graphic2.set('left', 10);
			inquse.calcRange();
      expect(inquse.autoFail).to.equal(true);
      done();
    });
  });
	it('should leave the range unrecorded if the target is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Range</strong>: 10 x PR m<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 2}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic1 = createObj('graphic', {_pageid: page.id, top: 3, left: 4, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic1, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.range = '';
      inquse.PR = 10;
      inquse.calcRange();
      expect(inquse.range).to.equal('');
      done();
    });
  });
	it('should leave the range unrecorded if the character graphic is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {scale_number: 2}, {MOCK20override: true});
    var character = createObj('character', {});
		var graphic2 = createObj('graphic', {_pageid: page.id, top: 8, left: 16, represents: character.id});
    var options = {target: graphic2.id};
    new INQUse('Weapon Handout', options, character, undefined, player.id, function(inquse){
			inquse.modifiers = [];
      inquse.range = '';
      inquse.PR = 10;
      inquse.calcRange();
      expect(inquse.range).to.equal('');
      done();
    });
  });
});
