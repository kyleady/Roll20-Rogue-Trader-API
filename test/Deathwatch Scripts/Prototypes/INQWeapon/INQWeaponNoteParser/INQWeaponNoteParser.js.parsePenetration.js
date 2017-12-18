var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parsePenetration()', function() {
	it('should record the Weapon\'s Penetration as a Formula', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var pen1 = 'Pen 2D10+3';
    var pen2 = 'Penetration 4';
    var pen3 = 'Pen: 2PR';

    var noteparser = new INQWeaponNoteParser();

    noteparser.parsePenetration(pen1);
    expect(noteparser.Penetration).to.deep.equal(new INQFormula('2D10+3'));
    noteparser.parsePenetration(pen2);
    expect(noteparser.Penetration).to.deep.equal(new INQFormula('4'));
    noteparser.parsePenetration(pen3);
    expect(noteparser.Penetration).to.deep.equal(new INQFormula('2PR'));
  });
});
