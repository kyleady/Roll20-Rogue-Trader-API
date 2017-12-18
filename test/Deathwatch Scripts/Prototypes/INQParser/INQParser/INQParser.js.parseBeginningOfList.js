var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.parseBeginningOfList()', function() {
	it('should return true if the given line is the beginning of a list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var line = '<u>The List\'s Name</u>';
    var inqparser = new INQParser();
    inqparser.Lists = [];
    expect(inqparser.parseBeginningOfList(line)).to.equal(true);
  });
  it('should return false if the given line is not the beginning of a list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Iron Jaw'});

    var line = getLink(handout);
    var inqparser = new INQParser();
    inqparser.Lists = [];
    expect(inqparser.parseBeginningOfList(line)).to.equal(false);
  });
  it('should complete the currently ongoing list and start a new one', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Iron Jaw'});

    var line = '<em>The List\'s Name</em>';
    var inqparser = new INQParser();
    inqparser.Lists = [];
    inqparser.newList = {Name: 'A List', Content: ['item']};
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.newList).to.deep.equal({Name: 'A List', Content: ['item']});
    inqparser.parseBeginningOfList(line);
    expect(inqparser.Lists).to.deep.equal([{Name: 'A List', Content: ['item']}]);
    expect(inqparser.newList).to.deep.equal({Name: 'The List\'s Name', Content: []});
  });
});
