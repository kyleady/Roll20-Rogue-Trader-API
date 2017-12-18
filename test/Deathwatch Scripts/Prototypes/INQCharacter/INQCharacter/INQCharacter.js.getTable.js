var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.getTble()', function() {
	it('should return a string for an HTML table', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var table = [['R1E1', 'R1E2', 'R1E3'], ['R2E1', 'R2E2', 'R2E3']];
    var inqcharacter = new INQCharacter();
    expect(inqcharacter.getTable(table, false)).to.equal('<table><tbody>'
      + '<tr>'
        + '<td>'
          + 'R1E1'
        + '</td>'
        + '<td>'
          + 'R1E2'
        + '</td>'
        + '<td>'
          + 'R1E3'
        + '</td>'
      + '</tr>'
      + '<tr>'
        + '<td>'
          + 'R2E1'
        + '</td>'
        + '<td>'
          + 'R2E2'
        + '</td>'
        + '<td>'
          + 'R2E3'
        + '</td>'
      + '</tr>'
    + '</tbody></table>'
    );
  });
  it('should bold the first row by default', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var table = [['R1E1', 'R1E2', 'R1E3'], ['R2E1', 'R2E2', 'R2E3']];
    var inqcharacter = new INQCharacter();
    expect(inqcharacter.getTable(table)).to.equal('<table><tbody>'
      + '<tr>'
        + '<td>'
          + '<strong>R1E1</strong>'
        + '</td>'
        + '<td>'
          + '<strong>R1E2</strong>'
        + '</td>'
        + '<td>'
          + '<strong>R1E3</strong>'
        + '</td>'
      + '</tr>'
      + '<tr>'
        + '<td>'
          + 'R2E1'
        + '</td>'
        + '<td>'
          + 'R2E2'
        + '</td>'
        + '<td>'
          + 'R2E3'
        + '</td>'
      + '</tr>'
    + '</tbody></table>'
    );
  });
});
