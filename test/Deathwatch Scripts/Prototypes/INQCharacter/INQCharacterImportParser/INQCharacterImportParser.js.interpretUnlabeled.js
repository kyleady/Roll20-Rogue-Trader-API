var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.interpretUnlabeled()', function() {
	it('should parse unlabeled for characteristics and bonuses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretUnlabeled([
      '1 2 3 4 5 6 7 8 9',
      '11 22 33 44 55 66 77 88 99'
    ]);

    expect(inqcharacterimport.Attributes.WS).to.equal(11);
    expect(inqcharacterimport.Attributes.BS).to.equal(22);
    expect(inqcharacterimport.Attributes.S).to.equal(33);
    expect(inqcharacterimport.Attributes.T).to.equal(44);
    expect(inqcharacterimport.Attributes.Ag).to.equal(55);
    expect(inqcharacterimport.Attributes.It).to.equal(66);
    expect(inqcharacterimport.Attributes.Per).to.equal(77);
    expect(inqcharacterimport.Attributes.Wp).to.equal(88);
    expect(inqcharacterimport.Attributes.Fe).to.equal(99);

    expect(inqcharacterimport.Attributes['Unnatural WS']).to.equal(1);
    expect(inqcharacterimport.Attributes['Unnatural BS']).to.equal(2);
    expect(inqcharacterimport.Attributes['Unnatural S']).to.equal(3);
    expect(inqcharacterimport.Attributes['Unnatural T']).to.equal(4);
    expect(inqcharacterimport.Attributes['Unnatural Ag']).to.equal(5);
    expect(inqcharacterimport.Attributes['Unnatural It']).to.equal(6);
    expect(inqcharacterimport.Attributes['Unnatural Per']).to.equal(7);
    expect(inqcharacterimport.Attributes['Unnatural Wp']).to.equal(8);
    expect(inqcharacterimport.Attributes['Unnatural Fe']).to.equal(9);
  });
  it('should set characteristics if only one line is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretUnlabeled([
      '11 22 33 44 55 66 77 88 99'
    ]);

    expect(inqcharacterimport.Attributes.WS).to.equal(11);
    expect(inqcharacterimport.Attributes.BS).to.equal(22);
    expect(inqcharacterimport.Attributes.S).to.equal(33);
    expect(inqcharacterimport.Attributes.T).to.equal(44);
    expect(inqcharacterimport.Attributes.Ag).to.equal(55);
    expect(inqcharacterimport.Attributes.It).to.equal(66);
    expect(inqcharacterimport.Attributes.Per).to.equal(77);
    expect(inqcharacterimport.Attributes.Wp).to.equal(88);
    expect(inqcharacterimport.Attributes.Fe).to.equal(99);

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
