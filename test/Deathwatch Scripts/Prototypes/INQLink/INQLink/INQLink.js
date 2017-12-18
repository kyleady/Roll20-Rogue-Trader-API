var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQLink()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQLink()).to.be.an.instanceof(INQLink);
  });
  it('should inherit from INQObject()', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    var inqcharacter = new INQCharacter();
    for(var prop in inqobject) {
      expect(inqcharacter).to.have.property(prop);
    }
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqlink = new INQLink();
    expect(inqlink.Bonus).to.not.be.undefined;
    expect(inqlink.Quantity).to.not.be.undefined;
    expect(inqlink.Groups).to.not.be.undefined;
  });
  it('should parse a string into an INQLink', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqlink = new INQLink('Common Lore(War, Jericho Reach)(It)(x2)+10');
    expect(inqlink.Name).to.equal('Common Lore');
    expect(inqlink.Bonus).to.equal(10);
    expect(inqlink.Quantity).to.equal(2);
    expect(inqlink.Groups).to.deep.equal(['War, Jericho Reach', 'It']);
  });
});
