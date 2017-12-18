var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.switchBonusOut()', function() {
	it('should move the info from Bonus to Characteristics and leave Bonus at 0', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretBonus('- - 3 0 - 1 - 10 2');

    expect(inqcharacterimport.Attributes['Unnatural WS']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural BS']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural S']).to.equal(3);
    expect(inqcharacterimport.Attributes['Unnatural T']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Ag']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural It']).to.equal(1);
    expect(inqcharacterimport.Attributes['Unnatural Per']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Wp']).to.equal(10);
    expect(inqcharacterimport.Attributes['Unnatural Fe']).to.equal(2);

    inqcharacterimport.switchBonusOut();

    expect(inqcharacterimport.Attributes.WS).to.equal(0);
    expect(inqcharacterimport.Attributes.BS).to.equal(0);
    expect(inqcharacterimport.Attributes.S).to.equal(3);
    expect(inqcharacterimport.Attributes.T).to.equal(0);
    expect(inqcharacterimport.Attributes.Ag).to.equal(0);
    expect(inqcharacterimport.Attributes.It).to.equal(1);
    expect(inqcharacterimport.Attributes.Per).to.equal(0);
    expect(inqcharacterimport.Attributes.Wp).to.equal(10);
    expect(inqcharacterimport.Attributes.Fe).to.equal(2);

    expect(inqcharacterimport.Attributes['Unnatural WS']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural BS']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural S']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural T']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Ag']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural It']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Per']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Wp']).to.equal(0);
    expect(inqcharacterimport.Attributes['Unnatural Fe']).to.equal(0);
  });
});
