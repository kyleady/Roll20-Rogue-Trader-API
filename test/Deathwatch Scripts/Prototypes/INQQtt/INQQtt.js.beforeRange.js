var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.applyBeforeRange()', function() {
	it('should apply all the Qualities, Talents, and Traits for before measuring Range', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
			modifiers: '',
			custom: 'My Weapon(Pistol; 10m; 100D10+100 I; Pen 100; Use Maximal, Maximal, Blast[10])',
			FocusStrength: 'Push'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.inqcharacter = new INQCharacter();
			inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
			inquse.ammoMultiplier = 2;
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;
			var inqqtt = new INQQtt(inquse);
      inqqtt.beforeRange();
			expect(inquse.inqweapon.has('Maximal')).to.not.be.undefined;
			expect(inquse.inqweapon.has('Recharge')).to.not.be.undefined;
			expect(inquse.ammoMultiplier).to.equal(4);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(150);
			expect(inquse.inqweapon.Damage.Modifier).to.equal(125);
			expect(inquse.inqweapon.Penetration.Modifier).to.equal(120);
      expect(inquse.inqweapon.Range.Multiplier).to.equal(1.33);
			var blast = inquse.inqweapon.has('Blast');
			expect(inqqtt.getTotal(blast)).to.equal(15);
			expect(inquse.PR).to.equal(4);
			expect(inquse.PsyPheModifier).to.equal(-10);
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
		var options = {
			modifiers: '',
			custom: 'My Weapon(Pistol; 10m; 100D10+100 I; Pen 100; Use Maximal, Maximal, Blast[10])',
			FocusStrength: 'Push'
		};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			inquse.ammoMultiplier = 2;
			inquse.PR = 3;
			inquse.PsyPheModifier = 0;
			var inqqtt = new INQQtt(inquse);
      inqqtt.beforeRange();
			expect(inquse.inqweapon.has('Maximal')).to.not.be.undefined;
			expect(inquse.inqweapon.has('Recharge')).to.not.be.undefined;
			expect(inquse.ammoMultiplier).to.equal(4);
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(150);
			expect(inquse.inqweapon.Damage.Modifier).to.equal(125);
			expect(inquse.inqweapon.Penetration.Modifier).to.equal(120);
      expect(inquse.inqweapon.Range.Multiplier).to.equal(1.33);
			var blast = inquse.inqweapon.has('Blast');
			expect(inqqtt.getTotal(blast)).to.equal(15);
			done();
    });
  });
});
