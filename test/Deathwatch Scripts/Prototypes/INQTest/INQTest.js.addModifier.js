var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.addModifier()', function() {
	it('should add the given modifier to Modifiers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.addModifier({Name: 'Half Aim', Value: 10});
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Half Aim', Value: 10}]);
  });
  it('should convert strings to numbers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.addModifier({Name: 'Modifier', Value: '20'});
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Modifier', Value: 20}]);
  });
  it('should convert the input to an object if not an object', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.addModifier('3');
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Other', Value: 3}]);
  });
  it('should add each value separately if given an Array', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    inqtest.addModifier([1, '2', {Name: 'Bonus', Value: 3}]);
    expect(inqtest.Modifiers).to.deep.equal([
      {Name: 'Other', Value: 1},
      {Name: 'Other', Value: 2},
      {Name: 'Bonus', Value: 3}]
    );
  });
});
