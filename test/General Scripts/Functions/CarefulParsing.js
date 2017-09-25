var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
var INQTotal = '';
describe('carefulParse()', function() {
	it('should parse exactly the same as JSON.parse()', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);

    var str = '{"key":"value"}';
    expect(JSON.parse(str)).to.deep.equal(carefulParse(str));
  });
  it('should not crash when it fails to parse', function () {
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		INQTotal = fs.readFileSync(filePath, 'utf8');
		eval(INQTotal);

    var str = '{key:"value"}';
    expect(function(){JSON.parse(str);}).to.throw();
    expect(function(){carefulParse(str);}).to.not.throw();
  });
});
