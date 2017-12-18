var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseRange()', function() {
	it('should record the Weapon\'s Range as a Formula', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseRange('3m');
    expect(noteparser.Range).to.deep.equal(new INQFormula('3'));
  });
});
