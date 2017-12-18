var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.addToList()', function() {
	it('should add the unrecognized line to the currently ongoing list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.newList = {Name: 'An Ongoing List', Content: []};

    inqparser.addToList('List Item');
    expect(inqparser.newList).to.deep.equal({Name: 'An Ongoing List', Content: ['List Item']});
  });
  it('should return true if there was an onging list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.newList = {Name: 'An Ongoing List', Content: []};

    expect(inqparser.addToList('List Item')).to.equal(true);
  });
  it('should return false if there was no onging list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();

    expect(inqparser.addToList('List Item')).to.equal(false);
  });
});
