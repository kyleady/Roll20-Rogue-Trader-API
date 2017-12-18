var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.setSubgroup()', function() {
	it('should record the Subgroup that will be used', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setSubgroup('Tactics(Stealth and Recon)');
    expect(inqtest.Subgroup).to.equal('Stealth and Recon');
  });
});
