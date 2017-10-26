var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQLinkParser()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQLinkParser()).to.be.an.instanceof(INQLinkParser);
  });
  it('should inherit from INQLink()', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqlink = new INQLink();
    var inqlinkparser = new INQLinkParser();
    for(var prop in inqlink) {
      expect(inqlinkparser).to.have.property(prop);
    }
  });
});
