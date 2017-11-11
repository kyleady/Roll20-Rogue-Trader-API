var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.setCharacteristic()', function() {
	it('should record the Characteristic that will be used', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setCharacteristic('Ws');
    expect(inqtest.Characteristic).to.equal('WS');
  });
  it('should accept alternate names', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setCharacteristic('weapon Skill');
    expect(inqtest.Characteristic).to.equal('WS');
  });
  it('should record if the Characteristic is a Party Stat', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setCharacteristic('PF');
    expect(inqtest.Characteristic).to.equal('Profit Factor');
    expect(inqtest.PartyStat).to.equal(true);
  });
});
