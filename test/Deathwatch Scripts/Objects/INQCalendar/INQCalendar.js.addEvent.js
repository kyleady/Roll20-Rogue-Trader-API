var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.addEvent()', function() {
	it('should add an Event, including a date and description', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.');
	    expect(INQCalendar.past.notes[0]).to.deep.equal({
	      Date: '8000000.M0',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
  it('should be able to specify a date', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {date: '020.M3'});
	    expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000020.M3',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
  it('should be able to specify a modifier to the date', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {date: '020.M3', dt: '1 year'});
	    expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000021.M3',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
  it('should be able to specify a negative modifier for the date', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {date: '020.M3', dt: '1 year', sign: '-'});
	    expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000019.M3',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
	it('should be able to specify a repetition period', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {date: '020.M3', repeat: '1 year'});
	    expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000020.M3',
	      Content: [' Event content.'],
				Repeat: 10000
	    });

			done();
		});
  });
	it('should increase a date with a repetition period until it is in the future', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQTime.load();
			INQTime.equals('8000020.M3');
			INQTime.save();
			INQCalendar.addEvent('Event content.', {date: '001.M3', repeat: '2 year'});
			expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000021.M3',
	      Content: [' Event content.'],
				Repeat: 20000
	    });

			done();
		});
  });
  it('should be able to specify if the event should be saved in the gmnotes', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {isGM: true});
	    expect(INQCalendar.past.gmnotes[0]).to.deep.equal({
	      Date: '8000000.M0',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
  it('should be able to determine if the event in the past or future', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.load();
    INQTime.yearObj.set('max', 100);
    INQCalendar.load(function() {
			INQCalendar.addEvent('Event content.', {dt: '1 year', sign: '-'});
	    expect(INQCalendar.past.notes[0]).to.deep.equal({
	      Date: '8000099.M0',
	      Content: [' Event content.'],
				Repeat: undefined
	    });
	    INQCalendar.addEvent('Event content.', {date: '010.M1'});
	    expect(INQCalendar.future.notes[0]).to.deep.equal({
	      Date: '8000010.M1',
	      Content: [' Event content.'],
				Repeat: undefined
	    });

			done();
		});
  });
	it('should keep events in order', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.load();
    INQTime.yearObj.set('max', 100);
    INQCalendar.load(function() {
			INQCalendar.addEvent('Event A.', {dt: '1 year', sign: '-'});
	    expect(INQCalendar.past.notes).to.deep.equal([{
	      Date: '8000099.M0',
	      Content: [' Event A.'],
				Repeat: undefined
	    }]);
	    INQCalendar.addEvent('Event B.');
			expect(INQCalendar.past.notes).to.deep.equal([{
	      Date: '8000099.M0',
	      Content: [' Event A.'],
				Repeat: undefined
	    },{
	      Date: '8000100.M0',
	      Content: [' Event B.'],
				Repeat: undefined
	    }]);
			INQCalendar.addEvent('Event C.', {dt: '2 years', sign: '-'});
			expect(INQCalendar.past.notes).to.deep.equal([{
	      Date: '8000098.M0',
	      Content: [' Event C.'],
				Repeat: undefined
	    },{
	      Date: '8000099.M0',
	      Content: [' Event A.'],
				Repeat: undefined
	    },{
	      Date: '8000100.M0',
	      Content: [' Event B.'],
				Repeat: undefined
	    }]);

			done();
		});
  });
});
