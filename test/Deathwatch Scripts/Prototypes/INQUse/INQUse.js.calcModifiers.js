var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.calcModifiers()', function() {
	it('should call parseModifiers, calcEffectivePsyRating, INQQtt.beforeRange, calcRange, calcStatus, calcRoF, INQQtt.beforeRoll', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Psychic; 10 x PR m; S/PR/2PR; D10+2; Pen 3; Tearing)',
      FocusStrength: 'Push',
			RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 91*70});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqweapon.FocusModifier = -10;
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqcharacter.Attributes.PR = 5;
			inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
      inquse.inqtarget = new INQCharacter();
			inquse.inqtarget.GraphicID = graphic2.id;
			inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
			inquse.calcModifiers();
			expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>My Modifier</em>', Value: '+20'},
				{Name: 'Focus Modifier', Value: -10},
        {Name: 'Psy Rating', Value: 45}
      ]);
			expect(inquse.PR).to.equal(9);
			expect(inquse.range).to.match(/^Standard/);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.maxHits).to.equal(9);
			done();
    });
  });
	it('should calculate SB and the bracing modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 91*70});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqcharacter.Attributes.PR = 5;
			inquse.inqcharacter.Attributes.S = 40;
			inquse.inqcharacter.Attributes['Unnatural S'] = 3;
			inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
      inquse.inqtarget = new INQCharacter();
			inquse.inqtarget.GraphicID = graphic2.id;
			inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
			inquse.calcModifiers();
			expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>My Modifier</em>', Value: '+20'},
				{Name: 'Focus Modifier', Value: 0},
				{Name: 'Long Range', Value: -10},
				{Name: 'Stunned', Value: 20},
				{Name: 'Enormous', Value: 20},
				{Name: 'Unbraced', Value: -30}
      ]);
			expect(inquse.PR).to.equal(5);
			expect(inquse.SB).to.equal(7);
			expect(inquse.range).to.match(/^Long/);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.maxHits).to.equal(3);
			done();
    });
  });
	it('should not require a target', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqcharacter.Attributes.PR = 5;
			inquse.inqcharacter.Attributes.S = 40;
			inquse.inqcharacter.Attributes['Unnatural S'] = 3;
			inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
      inquse.calcModifiers();
			expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>My Modifier</em>', Value: '+20'},
				{Name: 'Focus Modifier', Value: 0},
				{Name: 'Unbraced', Value: -30}
      ]);
			expect(inquse.PR).to.equal(5);
			expect(inquse.SB).to.equal(7);
			expect(inquse.range).to.equal('');
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.maxHits).to.equal(3);
			done();
    });
  });
	it('should not require an attacker', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 91*70});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqtarget = new INQCharacter();
			inquse.inqtarget.GraphicID = graphic2.id;
			inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
			inquse.calcModifiers();
			expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>My Modifier</em>', Value: '+20'},
				{Name: 'Focus Modifier', Value: 0},
				{Name: 'Stunned', Value: 20},
				{Name: 'Enormous', Value: 20},
				{Name: 'Unbraced', Value: -30}
      ]);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.maxHits).to.equal(3);
			done();
    });
  });
	it('should set autoHit to true if there is no attacker', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 91*70});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqtarget = new INQCharacter();
			inquse.inqtarget.GraphicID = graphic2.id;
			inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
			inquse.calcModifiers();
			expect(inquse.autoHit).to.equal(true);
			done();
    });
  });
	it('should set gm to true if the attacker is controlled by no one', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.GraphicID = graphic1.id;
      inquse.inqcharacter.Attributes.PR = 5;
			inquse.inqcharacter.Attributes.S = 40;
			inquse.inqcharacter.Attributes['Unnatural S'] = 3;
			inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
      inquse.calcModifiers();
			expect(inquse.gm).to.equal(true);
			inquse.inqcharacter.controlledby = 'all';
			inquse.calcModifiers();
			expect(inquse.gm).to.equal(false);
			done();
    });
  });
	it('should set gm to true if the player is a gm and there is no attacker', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
		player.MOCK20gm = true;
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.calcModifiers();
			expect(inquse.gm).to.equal(true);
			player.MOCK20gm = false
			inquse.calcModifiers();
			expect(inquse.gm).to.equal(false);
			done();
    });
  });
	it('should set jamsAt to 96 and jamResult to Jam if the weapon is ranged', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
		player.MOCK20gm = true;
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Single'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.calcModifiers();
			expect(inquse.jamsAt).to.equal(96);
			expect(inquse.jamResult).to.equal('Jam');
			done();
    });
  });
	it('should set jamsAt to 94 if the ranged weapon is not fired on Single', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
		player.MOCK20gm = true;
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Heavy; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.calcModifiers();
			expect(inquse.jamsAt).to.equal(94);
			expect(inquse.jamResult).to.equal('Jam');
			done();
    });
  });
	it('should set jamsAt to 91 and jamResult to Fails if the weapon is Psychic', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
		player.MOCK20gm = true;
    var options = {
      modifiers: '+20 My Modifier',
      custom: 'My Weapon(Psychic; 50m; S/3/5; D10+2; Pen 3; Tearing)',
      RoF: 'Semi-Auto'
    };
		var page = createObj('page', {scale_number: 1}, {MOCK20override: true});
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2*70, height: 2*70, left: 0*70, top: 0*70});
		new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.calcModifiers();
			expect(inquse.jamsAt).to.equal(91);
			expect(inquse.jamResult).to.equal('Fail');
			done();
    });
  });
	it('should allow the options to edit values', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Pistol; D10+2; Pen 3; Accurate)',
      freeShot: true,
      autoHit: true,
      braced: false,
      jamsAt: 101,
      gm: true
    };

    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.calcModifiers();
      expect(inquse.freeShot).to.equal(true);
      expect(inquse.autoHit).to.equal(true);
      expect(inquse.braced).to.equal(false);
      expect(inquse.jamsAt).to.equal(101);
      expect(inquse.gm).to.equal(true);
      done();
    });
  });
});
