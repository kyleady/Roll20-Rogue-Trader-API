var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.warpConduit()', function() {
	it('should increase the PR and decrease the Psy Phe', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push(new INQLink('Warp Conduit'));
      inquse.PR = 10;
      inquse.PsyPheModifier = 30;
      inquse.options = {FocusStrength: 'Push'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(11);
      expect(inquse.PsyPheModifier).to.equal(20);
      inquse.options = {FocusStrength: 'True'};
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(12);
      expect(inquse.PsyPheModifier).to.equal(10);
      done();
    });
  });
  it('should do nothing if the FocusStrength is not Push or True', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.inqcharacter.List.Talents.push('Warp Conduit');
      inquse.PR = 10;
      inquse.PsyPheModifier = 30;
      inquse.options = {FocusStrength: 'Fettered'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(10);
      expect(inquse.PsyPheModifier).to.equal(30);
      inquse.options = {FocusStrength: 'Unfettered'};
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(10);
      expect(inquse.PsyPheModifier).to.equal(30);
      done();
    });
  });
  it('should do nothing if the character does not have the Warp Conduit Talent', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; Twin-linked)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.inqcharacter = new INQCharacter();
      inquse.PR = 10;
      inquse.PsyPheModifier = 30;
      inquse.options = {FocusStrength: 'Push'};
      var inqqtt = new INQQtt(inquse);
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(10);
      expect(inquse.PsyPheModifier).to.equal(30);
      inquse.options = {FocusStrength: 'True'};
      inqqtt.warpConduit();
			expect(inquse.PR).to.equal(10);
      expect(inquse.PsyPheModifier).to.equal(30);
      done();
    });
  });
});
