var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQTurns()).to.be.an.instanceof(INQTurns);
  });
  it('should parse the Campaign turn order upon creation', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    Campaign().set('turnorder', JSON.stringify([{id: '1000000', pr: '3'}]))
    var inqturns = new INQTurns();
    expect(inqturns.turnorder).to.deep.equal([{id: '1000000', pr: '3'}]);

  });
});
