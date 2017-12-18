var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.parseRule()', function() {
	it('should return true if the given line is a rule', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Rules = [];
    expect(inqparser.parseRule('<em><u>Rule</u></em>: Do your chores.')).to.equal(true);
  });
  it('should return false if the given line is not a rule', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Rules = [];
    expect(inqparser.parseRule('<u>Not a Rule</u>')).to.equal(false);
  });
  it('should parse the rule into Rules', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Rules = [];
    inqparser.parseRule('<u>Rule</u>: Do your chores.');
    expect(inqparser.Rules).to.deep.equal([{Name: 'Rule', Content: 'Do your chores.'}]);
  });
});
