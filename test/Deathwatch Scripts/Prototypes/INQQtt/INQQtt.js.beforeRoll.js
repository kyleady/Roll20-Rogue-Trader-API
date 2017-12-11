var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.applyBeforeRoll()', function() {
	it('should apply all the Qualities, Talents, and Traits for before the Roll To Hit', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
      'Accurate',
      'Gyro-Stabilised',
      'Indirect[4]',
      'Overcharge', 'Use Overcharge',
      'Spray',
      'Storm',
      'To Hit[30]',
      'Twin-linked',
			'Reliable',
			'Overheats'
    ];
    var options = {
			modifiers: '+10 Aim',
			custom: 'My Weapon(Heavy; 100m; 10D10+20 R; Pen 3; ' + qualities.toString() + ')'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Traits.push(new INQLink('Auto-stabilised'));
      inquse.inqcharacter.List.Talents.push(new INQLink('Bulging Biceps'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Dead Eye Shot'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Favoured By The Warp'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Marksman'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Precise Blow'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Sharpshooter'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Sure Strike'));
			inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Puny)'));

			inquse.braced = false;
			inquse.range = 'Extended';
      inquse.mode = 'Single';
			inquse.options.RoF = 'Called Shot';

			inquse.PsyPheDrop = 0;
			inquse.options.FocusStrength = 'Push';
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;

			inquse.indirect = 0;

			inquse.jamsAt = 96;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.ammoMultiplier = 1;
			inquse.hitsMultiplier = 1;
			inquse.maxHitsMultiplier = 1;
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeRoll();
			expect(inquse.jamsAt).to.equal(100);
			expect(inquse.jamResult).to.equal('Overheats');
			expect(inquse.braced).to.equal(true);
			expect(inquse.modifiers).to.have.deep.members([
				{Name: '<em>Aim</em>', Value: '+10'},
				{Name: 'Deadeye', Value: 10},
				{Name: 'Marksman', Value: 20},
				{Name: 'Sharpshooter', Value: 10},
				{Name: 'Puny', Value: -20},
				{Name: 'Accurate', Value: 10},
				{Name: 'Weapon', Value: 30}
			]);
			expect(inquse.PsyPheDrop).to.equal(1);
			expect(inquse.indirect).to.equal(4);
			expect(inquse.ammoMultiplier).to.equal(5);
			expect(inquse.hitsMultiplier).to.equal(2);
			expect(inquse.maxHitsMultiplier).to.equal(2);
			var inqweapon = inquse.inqweapon;
			var recharge = inqweapon.has('Recharge');
			expect(recharge).to.not.be.undefined;
			var overheats = inqweapon.has('Overheats');
			expect(overheats).to.not.be.undefined;
			var devastating = inqweapon.has('Devastating');
			var devastatingTotal = inqqtt.getTotal(devastating);
			expect(devastatingTotal).to.equal(2);
			var concussive = inqweapon.has('Concussive');
			var concussiveTotal = inqqtt.getTotal(concussive);
			expect(concussiveTotal).to.equal(2);
			var useOvercharge = inqweapon.has('Use Overcharge');
			expect(useOvercharge).to.be.undefined;
			expect(inquse.hordeDamageMultiplier).to.be.within(26, 30);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.autoHit).to.equal(true);
      done();
    });
  });
	it('should ignore anything that requires a target', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
      'Accurate',
      'Gyro-Stabilised',
      'Indirect[4]',
      'Overcharge', 'Use Overcharge',
      'Spray',
      'Storm',
      'To Hit[30]',
      'Twin-linked',
			'Unreliable'
    ];
    var options = {
			modifiers: '+10 Aim',
			custom: 'My Weapon(Heavy; 100m; 10D10+20 R; Pen 3; ' + qualities.toString() + ')'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Traits.push(new INQLink('Auto-stabilised'));
      inquse.inqcharacter.List.Talents.push(new INQLink('Bulging Biceps'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Dead Eye Shot'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Favoured By The Warp'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Marksman'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Precise Blow'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Sharpshooter'));
			inquse.inqcharacter.List.Talents.push(new INQLink('Sure Strike'));

			inquse.braced = false;
			inquse.range = 'Extended';
      inquse.mode = 'Single';
			inquse.options.RoF = 'Called Shot';

			inquse.PsyPheDrop = 0;
			inquse.options.FocusStrength = 'Push';
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;

			inquse.indirect = 0;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.ammoMultiplier = 1;
			inquse.hitsMultiplier = 1;
			inquse.maxHitsMultiplier = 1;
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeRoll();
			expect(inquse.jamsAt).to.equal(91);
			expect(inquse.braced).to.equal(true);
			expect(inquse.modifiers).to.have.deep.members([
				{Name: '<em>Aim</em>', Value: '+10'},
				{Name: 'Deadeye', Value: 10},
				{Name: 'Marksman', Value: 20},
				{Name: 'Sharpshooter', Value: 10},
				{Name: 'Accurate', Value: 10},
				{Name: 'Weapon', Value: 30}
			]);
			expect(inquse.PsyPheDrop).to.equal(1);
			expect(inquse.indirect).to.equal(4);
			expect(inquse.ammoMultiplier).to.equal(5);
			expect(inquse.hitsMultiplier).to.equal(2);
			expect(inquse.maxHitsMultiplier).to.equal(2);
			var inqweapon = inquse.inqweapon;
			var recharge = inqweapon.has('Recharge');
			expect(recharge).to.not.be.undefined;
			var overheats = inqweapon.has('Overheats');
			expect(overheats).to.not.be.undefined;
			var devastating = inqweapon.has('Devastating');
			var devastatingTotal = inqqtt.getTotal(devastating);
			expect(devastatingTotal).to.equal(2);
			var concussive = inqweapon.has('Concussive');
			var concussiveTotal = inqqtt.getTotal(concussive);
			expect(concussiveTotal).to.equal(2);
			var useOvercharge = inqweapon.has('Use Overcharge');
			expect(useOvercharge).to.be.undefined;
			expect(inquse.hordeDamageMultiplier).to.be.within(26, 30);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.autoHit).to.equal(true);
      done();
    });
  });
	it('should ignore anything that requires an attacker', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var qualities = [
      'Accurate',
      'Gyro-Stabilised',
      'Indirect[4]',
      'Overcharge', 'Use Overcharge',
      'Spray',
      'Storm',
      'To Hit[30]',
      'Twin-linked',
			'Overheats'
    ];
    var options = {
			modifiers: '+10 Aim',
			custom: 'My Weapon(Heavy; 100m; 10D10+20 R; Pen 3; ' + qualities.toString() + ')'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqtarget = new INQCharacter();
      inquse.inqtarget.List.Traits.push(new INQLink('Size(Puny)'));

			inquse.braced = false;
			inquse.range = 'Extended';
      inquse.mode = 'Single';
			inquse.options.RoF = 'Called Shot';

			inquse.PsyPheDrop = 0;
			inquse.options.FocusStrength = 'Push';
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;

			inquse.indirect = 0;

			inquse.hordeDamageMultiplier = 1;
			inquse.hordeDamage = 0;

			inquse.ammoMultiplier = 1;
			inquse.hitsMultiplier = 1;
			inquse.maxHitsMultiplier = 1;
			inquse.parseModifiers();
			inquse.inqtest = {Successes: undefined};
      var inqqtt = new INQQtt(inquse);
      inqqtt.beforeRoll();
			expect(inquse.jamsAt).to.equal(91);
			expect(inquse.jamResult).to.equal('Overheats');
			expect(inquse.braced).to.equal(false);
			expect(inquse.modifiers).to.have.deep.members([
				{Name: '<em>Aim</em>', Value: '+10'},
				{Name: 'Puny', Value: -20},
				{Name: 'Accurate', Value: 10},
				{Name: 'Gyro-Stabilised', Value: 10},
				{Name: 'Gyro-Stabilised', Value: 10},
				{Name: 'Weapon', Value: 30}
			]);
			expect(inquse.PsyPheDrop).to.equal(0);
			expect(inquse.PR).to.equal(3);
			expect(inquse.PsyPheModifier).to.equal(0);
			expect(inquse.indirect).to.equal(4);
			expect(inquse.ammoMultiplier).to.equal(5);
			expect(inquse.hitsMultiplier).to.equal(2);
			expect(inquse.maxHitsMultiplier).to.equal(2);
			var inqweapon = inquse.inqweapon;
			var recharge = inqweapon.has('Recharge');
			expect(recharge).to.not.be.undefined;
			var overheats = inqweapon.has('Overheats');
			expect(overheats).to.not.be.undefined;
			var devastating = inqweapon.has('Devastating');
			var devastatingTotal = inqqtt.getTotal(devastating);
			expect(devastatingTotal).to.equal(2);
			var concussive = inqweapon.has('Concussive');
			var concussiveTotal = inqqtt.getTotal(concussive);
			expect(concussiveTotal).to.equal(2);
			var useOvercharge = inqweapon.has('Use Overcharge');
			expect(useOvercharge).to.be.undefined;
			expect(inquse.hordeDamageMultiplier).to.be.within(26, 30);
			expect(inquse.mode).to.equal('Semi');
			expect(inquse.autoHit).to.equal(true);
      done();
    });
  });
});
