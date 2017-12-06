var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.roll()', function() {
	it('should create an INQTest object and roll it', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Melee; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.modifiers = [
        {Name: 'Will not include 0 modifiers', Value: '+0'},
        {Name: '<em>Modifier</em>', Value: 10},
        {Name: 'Something', Value: '-10'}
      ];

      inquse.roll();
      expect(inquse.test).to.be.an.instanceof(INQTest);
      expect(inquse.test.Die).to.be.within(1,100);
      expect(inquse.test.Characteristic).to.equal('WS');
      expect(inquse.test.Modifiers).to.deep.equal([
        {Name: '<em>Modifier</em>', Value: 10},
        {Name: 'Something', Value: -10}
      ]);
      done();
    });
  });
  it('should use WS for Melee weapons', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Melee; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.modifiers = [
        {Name: 'Will not include 0 modifiers', Value: '+0'},
        {Name: '<em>Modifier</em>', Value: 10},
        {Name: 'Something', Value: '-10'}
      ];

      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('WS');
      done();
    });
  });
  it('should use BS for Ranged weapons', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Thrown; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.modifiers = [
        {Name: 'Will not include 0 modifiers', Value: '+0'},
        {Name: '<em>Modifier</em>', Value: 10},
        {Name: 'Something', Value: '-10'}
      ];

      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('BS');
      inquse.inqweapon.Class = 'Pistol';
      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('BS');
      inquse.inqweapon.Class = 'Basic';
      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('BS');
      inquse.inqweapon.Class = 'Heavy';
      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('BS');
      done();
    });
  });
  it('should use the weapon\'s FocusTest property for other weapons', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {
      custom: 'My Weapon(Psychic; D10+2; Pen 3)'
    };
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.modifiers = [
        {Name: 'Will not include 0 modifiers', Value: '+0'},
        {Name: '<em>Modifier</em>', Value: 10},
        {Name: 'Something', Value: '-10'}
      ];

      inquse.inqweapon.FocusTest = 'Psyniscience';
      inquse.roll();
      expect(inquse.test.Characteristic).to.equal('Per');
      expect(inquse.test.Skill).to.equal('Psyniscience');
      done();
    });
  });
});
