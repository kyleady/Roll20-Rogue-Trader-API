var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.on()', function() {
	it('should save the given function within INQTime', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var myFunc = () => 'My Function';
    INQTime.on('change:time', myFunc);
    expect(INQTime.timeEvents[INQTime.timeEvents.length-1]).to.equal(myFunc);
  });
  it('should do nothing if the wrong event label is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var myFunc = () => 'My Function';
    INQTime.on('wrong label', myFunc);
    expect(INQTime.timeEvents[INQTime.timeEvents.length-1]).to.not.equal(myFunc);
  });
});
