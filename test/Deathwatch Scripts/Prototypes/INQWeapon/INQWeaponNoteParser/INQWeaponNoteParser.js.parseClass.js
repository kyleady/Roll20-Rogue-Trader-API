var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseClass()', function() {
	it('should record the weapon\'s Class capitalized', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseClass('PSYCHIC');
    expect(noteparser.Class).to.equal('Psychic');

    noteparser.parseClass('pistol');
    expect(noteparser.Class).to.equal('Pistol');

    noteparser.parseClass('bAsIc');
    expect(noteparser.Class).to.equal('Basic');
  });
});
