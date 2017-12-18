var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.tearingFleshRender()', function() {
	it('should add dice and drop dice', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Flesh Render'));
      inquse.dropDice = 0;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tearingFleshRender();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(3);
      expect(inquse.dropDice).to.equal(2);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Tearing Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Flesh Render'));
      inquse.dropDice = 0;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tearingFleshRender();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(1);
      expect(inquse.dropDice).to.equal(0);
      done();
    });
  });
  it('should allow Tearing to work without Flesh Render', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.dropDice = 0;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tearingFleshRender();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);
      expect(inquse.dropDice).to.equal(1);
      done();
    });
  });
  it('should ignore Flesh Render if the weapon is not a Melee Weapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; D10+2 I; Pen 3; Tearing)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Flesh Render'));
      inquse.dropDice = 0;
      var inqqtt = new INQQtt(inquse);
      inqqtt.tearingFleshRender();
			expect(inquse.inqweapon.Damage.DiceNumber).to.equal(2);
      expect(inquse.dropDice).to.equal(1);
      done();
    });
  });
});
