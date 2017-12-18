var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterImportParser.prototype.interpretCharacteristics()', function() {
	it('should parse a line for characteristics', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretCharacteristics('2 3 4 5 6 7 8 9 10');

    expect(inqcharacterimport.Attributes.WS).to.equal(2);
    expect(inqcharacterimport.Attributes.BS).to.equal(3);
    expect(inqcharacterimport.Attributes.S).to.equal(4);
    expect(inqcharacterimport.Attributes.T).to.equal(5);
    expect(inqcharacterimport.Attributes.Ag).to.equal(6);
    expect(inqcharacterimport.Attributes.It).to.equal(7);
    expect(inqcharacterimport.Attributes.Per).to.equal(8);
    expect(inqcharacterimport.Attributes.Wp).to.equal(9);
    expect(inqcharacterimport.Attributes.Fe).to.equal(10);
  });
  it('should default to 0 if no characteristic is listed', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretCharacteristics('2 3 4');

    expect(inqcharacterimport.Attributes.WS).to.equal(2);
    expect(inqcharacterimport.Attributes.BS).to.equal(3);
    expect(inqcharacterimport.Attributes.S).to.equal(4);
    expect(inqcharacterimport.Attributes.T).to.equal(0);
    expect(inqcharacterimport.Attributes.Ag).to.equal(0);
    expect(inqcharacterimport.Attributes.It).to.equal(0);
    expect(inqcharacterimport.Attributes.Per).to.equal(0);
    expect(inqcharacterimport.Attributes.Wp).to.equal(0);
    expect(inqcharacterimport.Attributes.Fe).to.equal(0);
  });
  it('should ignore characteristics beyond the first nine', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacterimport = new INQCharacterImportParser();
    inqcharacterimport.Attributes = {};
    inqcharacterimport.interpretCharacteristics('2 3 4 5 6 7 8  9 10 11 12 13 14 15 16 17 10000 9');

    expect(inqcharacterimport.Attributes.WS).to.equal(2);
    expect(inqcharacterimport.Attributes.BS).to.equal(3);
    expect(inqcharacterimport.Attributes.S).to.equal(4);
    expect(inqcharacterimport.Attributes.T).to.equal(5);
    expect(inqcharacterimport.Attributes.Ag).to.equal(6);
    expect(inqcharacterimport.Attributes.It).to.equal(7);
    expect(inqcharacterimport.Attributes.Per).to.equal(8);
    expect(inqcharacterimport.Attributes.Wp).to.equal(9);
    expect(inqcharacterimport.Attributes.Fe).to.equal(10);
  });
});
