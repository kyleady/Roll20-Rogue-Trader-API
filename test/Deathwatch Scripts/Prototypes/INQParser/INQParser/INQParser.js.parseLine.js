var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.parseLine()', function() {
	it('should do nothing if the line is invalid', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('');
    inqparser.parseLine(undefined);
    inqparser.parseLine(null);
    inqparser.parseLine(false);
    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
  });
  it('should use parseRule() to parse the given line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('<strong>Rule Name</strong>: Text of the Rule.');
    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.deep.equal([{Name: 'Rule Name', Content: 'Text of the Rule.'}]);
    expect(inqparser.newList).to.be.undefined;
  });
  it('should use parseTable() to parse the given line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('Table Name<table>'
      + '<tr>'
        + '<td>R1C1</td>'
        + '<td>R1C2</td>'
      + '</tr>'
      + '<tr>'
        + '<td>R2C1</td>'
        + '<td>R2C2</td>'
      + '</tr>'
      + '<tr>'
        + '<td>R3C1</td>'
        + '<td>R3C2</td>'
      + '</tr>'
    + '</table>');
    expect(inqparser.Tables).to.deep.equal([{Name: 'Table Name', Content: [['R1C1', 'R2C1', 'R3C1'], ['R1C2', 'R2C2', 'R3C2']]}]);
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
  });
  it('should use parseBeginningOfList() to parse the given line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('<strong>List Name</strong>');
    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.deep.equal({Name: 'List Name', Content: []});
  });
  it('should use addToList() to parse the given line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('<strong>List Name</strong>');
    inqparser.parseLine('item');
    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.deep.equal({Name: 'List Name', Content: ['item']});
  });
  it('should use addMisc() to parse the given line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    inqparser.Misc = [];
    inqparser.Lists = [];
    inqparser.Rules = [];

    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.be.empty;
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
    inqparser.parseLine('item');
    expect(inqparser.Tables).to.be.empty;
    expect(inqparser.Misc).to.deep.equal([{Name: '', Content: 'item'}]);
    expect(inqparser.Lists).to.be.empty;
    expect(inqparser.Rules).to.be.empty;
    expect(inqparser.newList).to.be.undefined;
  });
});
