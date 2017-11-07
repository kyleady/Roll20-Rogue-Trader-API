var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseDamage()', function() {
	it('should record the weapon\'s Damage and Damage Type', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseDamage('PRD10 E');
    expect(noteparser.Damage).to.deep.equal(new INQFormula('PRd10'));
    expect(noteparser.DamageType).to.deep.equal(new INQLink('E'));
  });
  it('should default to Impact as the Damage Type', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseDamage('D5-2');
    expect(noteparser.Damage).to.deep.equal(new INQFormula('1d5 - 2'));
    expect(noteparser.DamageType).to.deep.equal(new INQLink('I'));
  });
});
