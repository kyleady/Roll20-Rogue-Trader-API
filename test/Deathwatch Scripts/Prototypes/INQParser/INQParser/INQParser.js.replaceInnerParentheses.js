var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.replaceInnerParentheses()', function() {
	it('should return a string where the inner parentheses are replaced with square brackets', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    expect(inqparser.replaceInnerParentheses('((()))(())()')).to.equal('([[]])([])()');
  });
  it('should not count brackets', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    expect(inqparser.replaceInnerParentheses('[(())]{(())}[([])]{({})}')).to.equal('[([])]{([])}[([])]{({})}');
  });
});
