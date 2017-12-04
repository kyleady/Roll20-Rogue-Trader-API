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
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 0});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 91});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
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
        {Name: 'Psy Rating', Value: 45}
      ]);
			expect(inquse.PR).to.equal(9);
			expect(inquse.range).to.equal('Standard');
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
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 0});
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 91});
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
				{Name: 'Long Range', Value: -10},
				{Name: 'Stunned', Value: 20},
				{Name: 'Enormous', Value: 20},
				{Name: 'Unbraced', Value: -30}
      ]);
			expect(inquse.PR).to.equal(5);
			expect(inquse.SB).to.equal(7);
			expect(inquse.range).to.equal('Long');
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
		var graphic1 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 0});
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
		var graphic2 = createObj('graphic', {_pageid: page.id, width: 2, height: 2, left: 0, top: 91});
		graphic2.set('status_green', true);
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.braced = false;
			inquse.inqtarget = new INQCharacter();
			inquse.inqtarget.GraphicID = graphic2.id;
			inquse.inqtarget.List.Traits.push(new INQLink('Size(Enormous)'));
			inquse.calcModifiers();
			expect(inquse.modifiers).to.deep.equal([
        {Name: '<em>My Modifier</em>', Value: '+20'},
				{Name: 'Stunned', Value: 20},
				{Name: 'Enormous', Value: 20},
				{Name: 'Unbraced', Value: -30}
      ]);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.maxHits).to.equal(3);
			done();
    });
  });
});
