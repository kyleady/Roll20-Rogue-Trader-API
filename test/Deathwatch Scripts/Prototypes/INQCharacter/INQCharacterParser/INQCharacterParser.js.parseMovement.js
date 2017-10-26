var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser.prototype.parseMovement()', function() {
	it('should be able to parse the movement table into properties', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacterparser = new INQCharacterParser();

    inqcharacterparser.Content = {Tables: []};
    inqcharacterparser.Content.Tables.push({Name: '', Content: [['Half', '2'], ['Full', '4'], ['Charge', '6'], ['Run', '12']]});

    inqcharacterparser.parseMovement();

    expect(inqcharacterparser.Movement.Half).to.equal('2');
		expect(inqcharacterparser.Movement.Full).to.equal('4');
		expect(inqcharacterparser.Movement.Charge).to.equal('6');
		expect(inqcharacterparser.Movement.Run).to.equal('12');
  });
});
