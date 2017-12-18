var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.loadWeapon()', function() {
	it('should retrive the named weapon', function(done){
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
    var inquse = new INQUse('invalid weapon', options, undefined, undefined, player.id, function(){
      inquse.loadWeapon('weapon handOut', function(valid){
        expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
        expect(inquse.inqweapon.Name).to.equal('Weapon Handout');
        done();
      });
    });
  });
	it('should allow you to use a custom weapon', function(done){
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
    var inquse = new INQUse('invalid weapon', options, undefined, undefined, player.id, function(){
			inquse.options.custom = 'My Weapon (2D10+3 X; Pen 3; Tearing)'
      inquse.loadWeapon('doesn\'t matter', function(valid){
        expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
        expect(inquse.inqweapon.Name).to.equal('My Weapon');
				expect(inquse.inqweapon.Damage).to.deep.equal(new INQFormula('2d10+3'));
				expect(inquse.inqweapon.DamageType).to.deep.equal(new INQLink('X'));
				expect(inquse.inqweapon.Penetration).to.deep.equal(new INQFormula('3'));
				expect(inquse.inqweapon.Special).to.deep.equal([new INQLink('Tearing')]);
        done();
      });
    });
  });
	it('should include the special rules of the named Special Ammo', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
		var ammo = createObj('handout', {name: 'Ammo Handout', notes: '<strong>Special</strong>: Tearing'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    var inquse = new INQUse('invalid weapon', options, undefined, undefined, player.id, function(){
			inquse.options.Ammo = 'ammo     hAndout';
			inquse.loadWeapon('weapon handOut', function(valid){
        expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
        expect(inquse.inqweapon.Name).to.equal('Weapon Handout');
				expect(inquse.inqammo).to.be.an.instanceof(INQWeapon);
				expect(inquse.inqammo.Name).to.equal('Ammo Handout');
				expect(inquse.inqweapon.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Tearing')]);
        done();
      });
    });
  });
	it('should allow you to use custom Special Ammo', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
		var ammo = createObj('handout', {name: 'Ammo Handout', notes: '<strong>Special</strong>: Tearing'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    var inquse = new INQUse('invalid weapon', options, undefined, undefined, player.id, function(){
			inquse.options.customAmmo = 'My Ammo (Maximal)';
			inquse.loadWeapon('weapon handOut', function(valid){
        expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
        expect(inquse.inqweapon.Name).to.equal('Weapon Handout');
				expect(inquse.inqammo).to.be.an.instanceof(INQWeapon);
				expect(inquse.inqammo.Name).to.equal('My Ammo');
				expect(inquse.inqweapon.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Maximal')]);
        done();
      });
    });
  });
	it('should add any weapon customizations after the Special Ammo', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Class</strong>: Psychic<br><strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
		var ammo = createObj('handout', {name: 'Ammo Handout', notes: '<strong>Special</strong>: Tearing'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    var inquse = new INQUse('invalid weapon', options, undefined, undefined, player.id, function(){
			inquse.options.customAmmo = 'My Ammo (Maximal)';
			inquse.options.Special = 'Overheats, Accurate';
			inquse.loadWeapon('weapon handOut', function(valid){
        expect(inquse.inqweapon).to.be.an.instanceof(INQWeapon);
        expect(inquse.inqweapon.Name).to.equal('Weapon Handout');
				expect(inquse.inqammo).to.be.an.instanceof(INQWeapon);
				expect(inquse.inqammo.Name).to.equal('My Ammo');
				expect(inquse.inqweapon.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Maximal'), new INQLink('Overheats'), new INQLink('Accurate')]);
        done();
      });
    });
  });
});
