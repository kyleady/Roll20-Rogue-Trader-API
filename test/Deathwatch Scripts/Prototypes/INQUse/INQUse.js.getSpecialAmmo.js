var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.getSpecialAmmo()', function() {
	it('should do nothing to this.inqammo if there was no Ammo specified', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      inquse.options.Ammo = undefined;
      inquse.options.customAmmo = undefined;
      var valid = inquse.getSpecialAmmo();
			expect(valid).to.equal(true);
      expect(inquse.inqammo).to.be.undefined;
      done();
    });
  });
  it('should allow you to use Custom Special Ammo', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      inquse.options.Ammo = undefined;
      inquse.options.customAmmo = 'My Ammo(Tearing, Reliable)';
      var valid = inquse.getSpecialAmmo();
			expect(valid).to.equal(true);
      expect(inquse.inqammo).to.be.an.instanceof(INQWeapon);
      expect(inquse.inqammo.Special).to.deep.equal([new INQLink('Tearing'), new INQLink('Reliable')]);
      done();
    });
  });
  it('should save the inqammo as a roll20 object if specified by name', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var ammo = createObj('handout', {name: 'Ammo Handout', notes: '<strong>Special</strong>: Melta'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      inquse.options.Ammo = 'ammo hANdout';
      inquse.options.customAmmo = undefined;
      var valid = inquse.getSpecialAmmo();
			expect(valid).to.equal(true);
      expect(inquse.inqammo).to.not.be.an.instanceof(INQWeapon);
      expect(inquse.inqammo.get('_type')).to.equal('handout');
      expect(inquse.inqammo.get('name')).to.equal('Ammo Handout');
      done();
    });
  });
	it('should return false if it attempted to find a roll20 handout but failed', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4'});
    var ammo = createObj('handout', {name: 'Ammo Handout', notes: '<strong>Special</strong>: Melta'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      inquse.options.Ammo = 'wrong hANdout';
      inquse.options.customAmmo = undefined;
      var valid = inquse.getSpecialAmmo();
			expect(valid).to.equal(false);
      expect(inquse.inqammo).to.be.undefined;
      done();
    });
	});
});
