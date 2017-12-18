var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.toHit()', function() {
	it('should add a modifier', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3; To Hit[+10], toHit[5])'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.toHit();
			expect(inquse.modifiers).to.deep.equal([
        {Name: 'Weapon', Value: 15}
      ]);
      done();
    });
  });
  it('should do nothing if the weapon does not have the toHit Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {modifiers: '', custom: 'My Weapon(Melee; D10+2 I; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      inquse.modifiers = [];
      var inqqtt = new INQQtt(inquse);
      inqqtt.toHit();
			expect(inquse.modifiers).to.deep.equal([]);
      done();
    });
  });
});
