var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser.prototype.parseSpecialRules()', function() {
	it('should be able to save special rules', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacterparser = new INQCharacterParser();
    inqcharacterparser.Content = {Rules: []};
    inqcharacterparser.Content.Rules.push({Name: 'The Special Rule', Rule: 'It is quite special.'});

    inqcharacterparser.parseSpecialRules();

    expect(inqcharacterparser.SpecialRules[0]).to.deep.equal({Name: 'The Special Rule', Rule: 'It is quite special.'});
  });
});
