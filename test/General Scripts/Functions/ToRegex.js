var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('toRegex()', function() {
	it('should return a case insensitive regex of the given string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(toRegex('myWord')).to.deep.equal(/^\s*myWord\s*$/i);
  });
  it('should accept an object with a Name and Alternates', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(toRegex({Name: 'myWord', Alternates: ['yourWord', 'ourWord']})).to.deep.equal(/^\s*(?:myWord|yourWord|ourWord)\s*$/i);
  });
  it('should replace dashes and spaces with an option for a dash or spaces', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(toRegex('My W-ord')).to.deep.equal(/^\s*My(?:\s*|-)W(?:\s*|-)ord\s*$/i);
  });
  it('should allow you to request the regex as a string', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(toRegex('My W-ord', {str: true})).to.equal('My(?:\\s*|-)W(?:\\s*|-)ord');
  });
});
