var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.calcAttributes()', function() {
	it('should calcuate Fatigue from the T Bonus', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.T = 28;
    inqcharacterimport.Attributes['Unnatural T'] = 1;

    inqcharacterimport.List = {Traits: []};

    inqcharacterimport.calcAttributes();
    expect(inqcharacterimport.Attributes.Fatigue).to.equal(3);
  });
  it('should calcuate Fate from the Touched by the Fates', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.T = 28;
    inqcharacterimport.Attributes['Unnatural T'] = 1;

    inqcharacterimport.List = {Traits: [new INQLink('Touched by the Fates(2)')]};

    inqcharacterimport.calcAttributes();
    expect(inqcharacterimport.Attributes.Fate).to.equal('2');
  });
});
