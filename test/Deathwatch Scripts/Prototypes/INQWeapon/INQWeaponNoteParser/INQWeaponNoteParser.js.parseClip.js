var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponNoteParser.prototype.parseClip()', function() {
	it('should record the weapon\'s Clip as a number', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseClip('Clip 25');
    expect(noteparser.Clip).to.equal(25);
  });
  it('should be able to parse a dash as 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var noteparser = new INQWeaponNoteParser();

    noteparser.parseClip('Clip -');
    expect(noteparser.Clip).to.equal(0);

    noteparser.parseClip('Clip –');
    expect(noteparser.Clip).to.equal(0);

    noteparser.parseClip('Clip —');
    expect(noteparser.Clip).to.equal(0);
  });
});
