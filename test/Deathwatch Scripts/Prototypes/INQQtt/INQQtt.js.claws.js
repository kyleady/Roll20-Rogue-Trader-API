var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.claws()', function() {
	it('should add to the weapon damage modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Claws[2])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 0};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 1};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 2};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(6);
      done();
    });
  });
	it('should default to a value of 1', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Claws)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 0};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 1};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(3);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 2};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(4);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Claws Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqqtt = new INQQtt(inquse);
      inquse.inqtest = {Successes: 0};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 1};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      inquse.inqweapon.Damage.Modifier = 2;
      inquse.inqtest = {Successes: 2};
      inqqtt.claws();
			expect(inquse.inqweapon.Damage.Modifier).to.equal(2);
      done();
    });
  });
});
