var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQQtt.prototype.reliable()', function() {
	it('should edit the jamsAt property', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3; Reliable)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			var inqqtt = new INQQtt(inquse);
      inqqtt.reliable();
			expect(inquse.jamsAt).to.equal(100);
      done();
    });
  });
  it('should do nothing if the weapon does not have the Reliable Quality', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
			var inqqtt = new INQQtt(inquse);
      inqqtt.reliable();
			expect(inquse.jamsAt).to.not.equal(100);
      done();
    });
  });
});
