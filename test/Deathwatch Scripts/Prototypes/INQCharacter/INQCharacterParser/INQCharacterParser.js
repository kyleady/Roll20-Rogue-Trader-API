var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacterParser()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQCharacterParser()).to.be.an.instanceof(INQCharacterParser);
  });
  it('should inherit from INQCharacter()', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQCharacterParser()).to.respondTo('has');
    expect(new INQCharacterParser()).to.respondTo('toCharacterObj');
    expect(new INQCharacterParser()).to.respondTo('getCharacterBio');
    expect(new INQCharacterParser()).to.respondTo('bonus');
  });
});
