var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.adjustBonus()', function() {
	it('should subtract out natural bonuses from the total bonus to get unnatural bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.S = 48;
    inqcharacterimport.Attributes['Unnatural S'] = 5;
    inqcharacterimport.adjustBonus();

    expect(inqcharacterimport.Attributes.S).to.equal(48);
    expect(inqcharacterimport.Attributes['Unnatural S']).to.equal(1);
  });
  it('should leave the unnatural bonuses alone if the total is zero', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.Attributes.T = 78;
    inqcharacterimport.Attributes['Unnatural T'] = 0;
    inqcharacterimport.adjustBonus();

    expect(inqcharacterimport.Attributes.T).to.equal(78);
    expect(inqcharacterimport.Attributes['Unnatural T']).to.equal(0);
  });
});
