var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.setSkill()', function() {
	it('should record the Characteristic that will be used', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setSkill('scholasticlore');
    expect(inqtest.Skill).to.equal('Scholastic Lore');
  });
  it('should ignore whatever is in parentheses', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setSkill('scholasticlore(Beasts)');
    expect(inqtest.Skill).to.equal('Scholastic Lore');
  });
  it('should record the default Characteristic as well', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.setSkill('scholasticlore');
    expect(inqtest.Characteristic).to.equal('It');
  });
});
