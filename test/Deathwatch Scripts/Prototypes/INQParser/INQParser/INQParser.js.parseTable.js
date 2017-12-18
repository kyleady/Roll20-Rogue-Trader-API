var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.parseTable()', function() {
	it('should return true if the given line is a table', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    expect(inqparser.parseTable('<em><u>Table Name</u></em><table>'
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
    + '</table>')).to.equal(true);
  });
  it('should return false if the given line is not a table', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];
    expect(inqparser.parseTable('Table Name'
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
      + '</tr>')).to.equal(false);
  });
  it('should save the table into Tables', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];

    inqparser.parseTable('Table Name<table>'
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
  });
  it('should allow tables without names', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqparser = new INQParser();
    inqparser.Tables = [];

    inqparser.parseTable('<table>'
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
    expect(inqparser.Tables).to.deep.equal([{Name: '', Content: [['R1C1', 'R2C1', 'R3C1'], ['R1C2', 'R2C2', 'R3C2']]}]);
  });
});
