var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.save()', function() {
	it('should record the INQCalendar in the Logbook and Calendar', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function() {
			INQCalendar.future.notes.push({Content: [' Event 1'], Date: '8000001.M42'});
			INQCalendar.future.gmnotes.push({Content: [' Event 2'], Date: '8000002.M42'});
			INQCalendar.past.notes.push({Content: [' Event 3'], Date: '8000003.M42'});
			INQCalendar.past.gmnotes.push({Content: [' Event 4'], Date: '8000004.M42'});

			INQCalendar.save();
			var logbook = INQCalendar.pastObj;
			var calendar = INQCalendar.futureObj;
			var p1 = new Promise(function(resolve) {
				calendar.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8000001.M42</strong>: Event 1');
					resolve();
				});
			});
			var p2 = new Promise(function(resolve) {
				calendar.get('gmnotes', function(notes) {
					expect(notes).to.equal('<strong>8000002.M42</strong>: Event 2');
					resolve();
				});
			});
			var p3 = new Promise(function(resolve) {
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8000003.M42</strong>: Event 3');
					resolve();
				});
			});
			var p4 = new Promise(function(resolve) {
				logbook.get('gmnotes', function(notes) {
					expect(notes).to.equal('<strong>8000004.M42</strong>: Event 4');
					resolve();
				});
			});
			Promise.all([p1, p2, p3, p4]).then(function() {
				done();
			});
		});
  });
	it('should reconstruct handouts perfectly', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var calendar = createObj('handout', {name: 'Calendar'});
		calendar.set('notes', '<br><br>A<br><br>C<br>');
		calendar.set('gmnotes', '<strong>Title</strong>: A<br><strong>Title</strong>: C<br><br><strong>Title</strong>: Z<br>');
		var logbook = createObj('handout', {name: 'Logbook'});
		logbook.set('notes', '');
		logbook.set('gmnotes', '<strong>Title</strong>: A');


		INQCalendar.load(function() {
			INQCalendar.save();
			var p1 = new Promise(function(resolve) {
				calendar.get('notes', function(notes) {
					expect(notes).to.equal('<br><br>A<br><br>C<br>');
					resolve();
				});
			});
			var p2 = new Promise(function(resolve) {
				calendar.get('gmnotes', function(notes) {
					expect(notes).to.equal('<strong>Title</strong>: A<br><strong>Title</strong>: C<br><br><strong>Title</strong>: Z<br>');
					resolve();
				});
			});
			var p3 = new Promise(function(resolve) {
				logbook.get('notes', function(notes) {
					expect(notes).to.equal('');
					resolve();
				});
			});
			var p4 = new Promise(function(resolve) {
				logbook.get('gmnotes', function(notes) {
					expect(notes).to.equal('<strong>Title</strong>: A');
					resolve();
				});
			});
			Promise.all([p1, p2, p3, p4]).then(function() {
				done();
			});
		});
  });
	it('should record if an event has a repeating period', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function() {
			INQCalendar.future.notes.push({Content: [' Event 1'], Date: '8000001.M42', Repeat: 10000});
			INQCalendar.save();
			var logbook = INQCalendar.pastObj;
			var calendar = INQCalendar.futureObj;
			var p1 = new Promise(function(resolve) {
				calendar.get('notes', function(notes) {
					expect(notes).to.equal('<strong>8000001.M42%10000</strong>: Event 1');
					resolve();
				});
			});

			p1.then(done);
		});
  });
});
