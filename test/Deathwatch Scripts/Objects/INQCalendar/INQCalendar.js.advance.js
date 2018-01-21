var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.advance()', function() {
	it('should move events that were passed by to the announcements from the future', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQTime.load();
		INQCalendar.load(function() {
			INQCalendar.addEvent('Event 1', {date: '020.M3'});
			INQCalendar.addEvent('Event 2', {date: '010.M3'});
			INQCalendar.addEvent('Event 3', {date: '220.M3'});
			INQTime.year = 30;
			INQTime.mill = 3;
			expect(INQTime.showDate()).to.equal('8000030.M3');
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']},
				{Date: '8000020.M3', Content: [' Event 1']},
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			INQCalendar.advance();
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.announcements.notes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']},
				{Date: '8000020.M3', Content: [' Event 1']}
			]);

			done();
		});

  });
	it('should ignore events in the past', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function() {
			INQTime.load();
			INQTime.year = 30;
			INQTime.mill = 3;
			INQTime.save();
			INQCalendar.addEvent('Event 1', {date: '020.M3'});
			INQCalendar.addEvent('Event 2', {date: '010.M3'});
			INQCalendar.addEvent('Event 3', {date: '220.M3'});
			expect(INQTime.showDate()).to.equal('8000030.M3');
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			INQCalendar.advance();
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.announcements.notes).to.deep.equal([]);

			done();
		});
  });
	it('should differentiate between notes and gmnotes', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function() {
			INQTime.load();
			INQCalendar.addEvent('Event 1', {date: '020.M3'});
			INQCalendar.addEvent('Event 2', {date: '010.M3', isGM: true});
			INQCalendar.addEvent('Event 3', {date: '220.M3'});
			INQTime.year = 30;
			INQTime.mill = 3;
			expect(INQTime.showDate()).to.equal('8000030.M3');
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000020.M3', Content: [' Event 1']},
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.future.gmnotes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']}
			]);
			INQCalendar.advance();
			expect(INQCalendar.future.notes).to.deep.equal([
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.announcements.notes).to.deep.equal([
				{Date: '8000020.M3', Content: [' Event 1']}
			]);
			expect(INQCalendar.announcements.gmnotes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']}
			]);

			done();
		});
  });
	it('should ignore Content without a date', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function() {
			INQTime.load();
			INQCalendar.future.notes.push({Content: ['Title', '']});
			INQCalendar.addEvent('Event 1', {date: '020.M3'});
			INQCalendar.addEvent('Event 2', {date: '010.M3', isGM: true});
			INQCalendar.addEvent('Event 3', {date: '220.M3'});
			INQTime.year = 30;
			INQTime.mill = 3;
			expect(INQTime.showDate()).to.equal('8000030.M3');
			expect(INQCalendar.future.notes).to.deep.equal([
				{Content: ['Title', '']},
				{Date: '8000020.M3', Content: [' Event 1']},
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.future.gmnotes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']}
			]);
			INQCalendar.advance();
			expect(INQCalendar.future.notes).to.deep.equal([
				{Content: ['Title', '']},
				{Date: '8000220.M3', Content: [' Event 3']}
			]);
			expect(INQCalendar.announcements.notes).to.deep.equal([
				{Date: '8000020.M3', Content: [' Event 1']}
			]);
			expect(INQCalendar.announcements.gmnotes).to.deep.equal([
				{Date: '8000010.M3', Content: [' Event 2']}
			]);

			done();
		});
	});
});
