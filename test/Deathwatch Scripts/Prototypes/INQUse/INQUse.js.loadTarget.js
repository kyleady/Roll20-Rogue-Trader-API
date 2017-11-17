var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.loadTarget()', function() {
	it('should find the named graphic and the character it represents, turning them into an INQCharacter', function(done){
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
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.options.target = graphic.id;
      inquse.loadTarget(function(valid){
        expect(valid).to.equal(true);
        expect(inquse.inqtarget).to.be.instanceof(INQCharacter);
        expect(inquse.inqtarget.ObjID).to.equal(character.id);
        expect(inquse.inqtarget.GraphicID).to.equal(graphic.id);
        done();
      });
    });
  });
  it('should set valid as true even if there was no target to load', function(done){
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
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.options.target = undefined;
      inquse.loadTarget(function(valid){
        expect(valid).to.equal(true);
        done();
      });
    });
  });
  it('should allow you to target graphics that do not represent characters', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var options = {};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.options.target = graphic.id;
      inquse.loadTarget(function(valid){
        expect(valid).to.equal(true);
        expect(inquse.inqtarget).to.be.instanceof(INQCharacter);
        expect(inquse.inqtarget.ObjID).to.equal('');
        expect(inquse.inqtarget.GraphicID).to.equal(graphic.id);
        done();
      });
    });
  });
  it('should set valid to false if the graphic id was invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var options = {};
    new INQUse('Weapon Handout', options, undefined, undefined, player.id, function(inquse){
      inquse.options.target = 'invalid ID';
      inquse.loadTarget(function(valid){
        expect(valid).to.equal(false);
        done();
      });
    });
  });
});
