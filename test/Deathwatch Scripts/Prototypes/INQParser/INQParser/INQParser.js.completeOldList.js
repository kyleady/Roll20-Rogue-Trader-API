var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.completeOldList()', function() {
	it('should save the currently ongoing list to Lists', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Lists = [];
    inqparser.newList = {Name: 'List Name', Content: ['item']};
    expect(inqparser.Lists).to.be.empty;
    inqparser.completeOldList();
    expect(inqparser.Lists).to.deep.equal([{Name: 'List Name', Content: ['item']}]);
  });
  it('should delete the currently ongoing list', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Lists = [];
    inqparser.newList = {Name: 'List Name', Content: ['item']};
    expect(inqparser.newList).to.deep.equal({Name: 'List Name', Content: ['item']});
    inqparser.completeOldList();
    expect(inqparser.newList).to.be.undefined;
  });
  it('should not add the ongoing list if it doesn\'t exist', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Lists = [];
    inqparser.newList = undefined;
    expect(inqparser.Lists).to.be.empty;
    inqparser.completeOldList();
    expect(inqparser.Lists).to.be.empty;
  });
});
