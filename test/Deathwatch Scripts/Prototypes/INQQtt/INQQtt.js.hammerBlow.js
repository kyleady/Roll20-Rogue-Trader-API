var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.hammerBlow()', function() {
	it('should add the Concussive(2) Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Hammer Blow'));
      inquse.SB = 5;
      inquse.options = {RoF: 'All Out Attack'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.hammerBlow();
      expect(inquse.inqweapon.Special).to.deep.equal([
        new INQLink('Concussive(2)')
      ]);
      done();
    });
  });
  it('should add half the SB to the penetration', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Hammer Blow'));
      inquse.SB = 5;
      inquse.options = {RoF: 'All Out Attack'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.hammerBlow();
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(6);
      done();
    });
  });
  it('should do nothing if the character did not make an All Out Attack', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Hammer Blow'));
      inquse.SB = 5;
      inquse.options = {RoF: 'Called Shot'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.hammerBlow();
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(3);
      expect(inquse.inqweapon.Special).to.deep.equal([]);
      done();
    });
  });
  it('should do nothing if the character does not have the Hammer Blow Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Pistol; 10m; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.SB = 5;
      inquse.options = {RoF: 'All Out Attack'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.hammerBlow();
      expect(inquse.inqweapon.Penetration.Modifier).to.equal(3);
      expect(inquse.inqweapon.Special).to.deep.equal([]);
      done();
    });
  });
});
