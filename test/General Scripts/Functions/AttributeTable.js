var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('attributeTable()', function() {
	Campaign().MOCK20reset();
	var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
	var MyScript = fs.readFileSync(filePath, 'utf8');
	eval(MyScript);
  var fakeAttribute = {current: 1, max: 2};
  it('should output an HTML table', function(){
    var table = attributeTable('test table', fakeAttribute);
    expect(/^\s*<\s*table\s*[^>]*>/.test(table)).to.equal(true);
    expect(/<\s*\/table\s*>\s*$/.test(table)).to.equal(true);
  });
});
