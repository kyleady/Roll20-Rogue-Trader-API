var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parse()', function() {
	it('should be able to parse its properties from a string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var note = 'Knife(Melee; D10 R; Pen 1; Balanced, Primitive)';
    var noteparser = new INQWeaponNoteParser();
    noteparser.Special = [];
    noteparser.parse(note);

    expect(noteparser.Name).to.equal('Knife');
    expect(noteparser.Class).to.equal('Melee');
    expect(noteparser.Damage).to.deep.equal(new INQFormula('D10'));
    expect(noteparser.DamageType).to.deep.equal(new INQLink('R'));
    expect(noteparser.Penetration).to.deep.equal(new INQFormula('1'));
    expect(noteparser.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Primitive')]);
  });
  it('should treat commas and semi colins as interchangeable', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var note = 'Knife(Melee, D10 R, Pen 1; Balanced; Primitive)';
    var noteparser = new INQWeaponNoteParser();
    noteparser.Special = [];
    noteparser.parse(note);

    expect(noteparser.Name).to.equal('Knife');
    expect(noteparser.Class).to.equal('Melee');
    expect(noteparser.Damage).to.deep.equal(new INQFormula('D10'));
    expect(noteparser.DamageType).to.deep.equal(new INQLink('R'));
    expect(noteparser.Penetration).to.deep.equal(new INQFormula('1'));
    expect(noteparser.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Primitive')]);
  });
});
