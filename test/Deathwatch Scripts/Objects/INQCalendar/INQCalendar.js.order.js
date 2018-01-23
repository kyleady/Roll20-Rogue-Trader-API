var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.order()', function() {
	it('should order the named array of events by date', function(){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.past = {};
    INQCalendar.past.notes = [{
      Date: '8000099.M0',
      Content: [' Event A.']
    },{
      Date: '8000100.M0',
      Content: [' Event B.']
    },{
      Date: '8000098.M0',
      Content: [' Event C.']
    }];
    INQCalendar.order('past', 'notes');
    expect(INQCalendar.past.notes).to.deep.equal([{
      Date: '8000098.M0',
      Content: [' Event C.']
    },{
      Date: '8000099.M0',
      Content: [' Event A.']
    },{
      Date: '8000100.M0',
      Content: [' Event B.']
    }]);
  });
  it('should keep undated events at the top', function(){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.past = {};
    INQCalendar.past.notes = [{
      Date: '8000099.M0',
      Content: [' Event A.']
    },{
      Date: '8000100.M0',
      Content: [' Event B.']
    },{
      Content: ['Title']
    },{
      Date: '8000098.M0',
      Content: [' Event C.']
    },{
      Content: ['Extra']
    }];
    INQCalendar.order('past', 'notes');
    expect(INQCalendar.past.notes).to.deep.equal([{
      Content: ['Title']
    },{
      Content: ['Extra']
    },{
      Date: '8000098.M0',
      Content: [' Event C.']
    },{
      Date: '8000099.M0',
      Content: [' Event A.']
    },{
      Date: '8000100.M0',
      Content: [' Event B.']
    }]);
  });
});
