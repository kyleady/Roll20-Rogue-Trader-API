var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQLinkParser.prototype.parse()', function() {
	it('should parse a string into an INQLink', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqlinkparser = new INQLinkParser();
    inqlinkparser.parse('Common Lore(War, Jericho Reach)(It)(x2)+10');
    expect(inqlinkparser.Name).to.equal('Common Lore');
    expect(inqlinkparser.Bonus).to.equal(10);
    expect(inqlinkparser.Quantity).to.equal(2);
    expect(inqlinkparser.Groups).to.deep.equal(['War, Jericho Reach', 'It']);
  });
});
