var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseDetails()', function() {
	it('should take an array of details and determine how they should be parsed', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var details = [
      'Penetration: 3',
      'heavy',
      '3D10-10',
      '3 x SBm',
      'Clip —',
      'Special Rule',
      'Rld –',
      'Also Special',
      'S/PR/2PR'
    ];

    var noteparser = new INQWeaponNoteParser();
    noteparser.Special = [];

    noteparser.parseDetails(details);

    expect(noteparser.Class).to.equal('Heavy');
    expect(noteparser.Range).to.deep.equal(new INQFormula('3xSB'));
    expect(noteparser.Single).to.equal(true);
    expect(noteparser.Semi).to.deep.equal(new INQFormula('PR'));
    expect(noteparser.Full).to.deep.equal(new INQFormula('2PR'));
    expect(noteparser.Damage).to.deep.equal(new INQFormula('3D10-10'));
    expect(noteparser.DamageType).to.deep.equal(new INQLink('I'));
    expect(noteparser.Clip).to.equal(0);
    expect(noteparser.Reload).to.equal(-1);
    expect(noteparser.Special).to.deep.equal([new INQLink('Special Rule'), new INQLink('Also Special')]);
  });
});
