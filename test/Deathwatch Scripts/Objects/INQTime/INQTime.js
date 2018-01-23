var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime()', function() {
	it('should be an object created at startup', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime).be.an('object');
  });
  it('should have a variable names object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.vars).be.an('object');
    expect(INQTime.vars.fraction).to.equal('Year Fraction');
    expect(INQTime.vars.year).to.equal('Year');
    expect(INQTime.vars.mill).to.equal('Millennia');
  });
  it('should have a timeEvents array', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(INQTime.timeEvents).be.an('array');
  });
});
