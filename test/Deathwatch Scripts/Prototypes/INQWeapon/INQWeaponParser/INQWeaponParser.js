var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeaponParser()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQWeaponParser()).to.be.an.instanceof(INQWeaponParser);
  });
});
