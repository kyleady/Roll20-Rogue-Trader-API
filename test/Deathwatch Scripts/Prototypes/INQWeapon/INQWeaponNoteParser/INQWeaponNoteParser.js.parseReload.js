var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseReload()', function() {
	it('should record the Weapon\'s Reload as a Number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseReload('Rld -');
    expect(noteparser.Reload).to.deep.equal(-1);
    noteparser.parseReload('Reload –');
    expect(noteparser.Reload).to.deep.equal(-1);
    noteparser.parseReload('Reload —');
    expect(noteparser.Reload).to.deep.equal(-1);
    noteparser.parseReload('Rld Free');
    expect(noteparser.Reload).to.deep.equal(0);
    noteparser.parseReload('Rld Half');
    expect(noteparser.Reload).to.deep.equal(0.5);
    noteparser.parseReload('Rld Full');
    expect(noteparser.Reload).to.deep.equal(1);
    noteparser.parseReload('Rld 2Full');
    expect(noteparser.Reload).to.deep.equal(2);
    noteparser.parseReload('Rld 1 Full');
    expect(noteparser.Reload).to.deep.equal(1);
  });
});
