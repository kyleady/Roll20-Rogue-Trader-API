var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.overheats()', function() {
	it('should edit the jamsAt and jamResult properties', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3; Overheats)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			var inqqtt = new INQQtt(inquse);
      inqqtt.overheats();
			expect(inquse.jamsAt).to.equal(91);
			expect(inquse.jamResult).to.equal('Overheats');
      done();
    });
  });
  it('should do nothing if the weapon does not have the Overheats Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			var inqqtt = new INQQtt(inquse);
      inqqtt.overheats();
			expect(inquse.jamsAt).to.not.equal(91);
			expect(inquse.jamResult).to.not.equal('Overheats');
      done();
    });
  });
});
