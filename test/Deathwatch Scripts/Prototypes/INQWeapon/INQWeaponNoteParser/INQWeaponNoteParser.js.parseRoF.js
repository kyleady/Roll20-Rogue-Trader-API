var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseRoF()', function() {
	it('should record the Weapon\'s RoF as three different values', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();
    noteparser.Semi = new INQFormula('0');
    noteparser.Full = new INQFormula('0');
    noteparser.parseRoF('S/-/-');
    expect(noteparser.Single).to.equal(true);
    expect(noteparser.Semi).to.deep.equal(new INQFormula('0'));
    expect(noteparser.Full).to.deep.equal(new INQFormula('0'));
    noteparser.Semi = new INQFormula('0');
    noteparser.Full = new INQFormula('0');
    noteparser.parseRoF('-/2/PR');
    expect(noteparser.Single).to.equal(false);
    expect(noteparser.Semi).to.deep.equal(new INQFormula('2'));
    expect(noteparser.Full).to.deep.equal(new INQFormula('PR'));
    noteparser.Semi = new INQFormula('0');
    noteparser.Full = new INQFormula('0');
    noteparser.parseRoF('S/—/–');
    expect(noteparser.Single).to.equal(true);
    expect(noteparser.Semi).to.deep.equal(new INQFormula('0'));
    expect(noteparser.Full).to.deep.equal(new INQFormula('0'));
  });
});
