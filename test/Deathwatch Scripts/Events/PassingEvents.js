var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('passingEvents()', function() {
	it('should announce events that were passed by', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function(){
			INQCalendar.addEvent('Future Event A', {dt: '1 year'});
			INQCalendar.addEvent('Future Event B', {dt: '2 years'});
			INQCalendar.addEvent('Future Event C', {dt: '3 years'});
			INQCalendar.save();

			INQTime.load();
			INQTime.add([{quantity: 2, type: 'years'}]);
			INQTime.save();
		});

		var passedA = false;
		var passedB = false;
		on('chat:message', function(msg) {
			if(msg.content.indexOf('Future Event A') != -1) passedA = true;
			if(msg.content.indexOf('Future Event B') != -1) passedB = true;
			if(msg.content.indexOf('Future Event C') != -1) throw 'Passed Future Event C';

			if(passedA && passedB) done();
		});
  });
	it('should remove events that were passed by', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function(){
			INQCalendar.addEvent('Future Event A', {dt: '1 year'});
			INQCalendar.addEvent('Future Event B', {dt: '2 years'});
			INQCalendar.addEvent('Future Event C', {dt: '3 years'});
			INQCalendar.save();

			INQTime.load();
			INQTime.add([{quantity: 2, type: 'years'}]);
			INQTime.save();
		});

		var passedA = false;
		var passedB = false;
		on('chat:message', function(msg) {
			if(msg.content.indexOf('Future Event A') != -1) passedA = true;
			if(msg.content.indexOf('Future Event B') != -1) passedB = true;
			if(msg.content.indexOf('Future Event C') != -1) throw 'Passed Future Event C';

			if(passedA && passedB) {
				INQCalendar.load(function(){
					log(INQCalendar.future.notes)
					expect(INQCalendar.future.notes).to.deep.equal([
						{Date: '8000003.M0', Content: [' Future Event C'], Repeat: undefined}
					]);
					done();
				});
			}
		});
  });
	it('should not automatically add events to the logbook', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function(){
			INQCalendar.addEvent('Future Event A', {dt: '1 year'});
			INQCalendar.addEvent('Future Event B', {dt: '2 years'});
			INQCalendar.addEvent('Future Event C', {dt: '3 years'});
			INQCalendar.save();

			INQTime.load();
			INQTime.add([{quantity: 2, type: 'years'}]);
			INQTime.save();
		});

		var passedA = false;
		var passedB = false;
		on('chat:message', function(msg) {
			if(msg.content.indexOf('Future Event A') != -1) passedA = true;
			if(msg.content.indexOf('Future Event B') != -1) passedB = true;
			if(msg.content.indexOf('Future Event C') != -1) throw 'Passed Future Event C';

			if(passedA && passedB) {
				INQCalendar.load(function(){
					log(INQCalendar.future.notes)
					expect(INQCalendar.future.notes).to.deep.equal([
						{Date: '8000003.M0', Content: [' Future Event C'], Repeat: undefined}
					]);
					expect(INQCalendar.past.notes).to.deep.equal([]);
					done();
				});
			}
		});
  });
	it('should offer API buttons for recording the passing events', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		INQCalendar.load(function(){
			INQCalendar.addEvent('Future Event A', {dt: '1 year'});
			INQCalendar.addEvent('Future Event B', {dt: '2 years'});
			INQCalendar.addEvent('Future Event C', {dt: '3 years'});
			INQCalendar.save();

			INQTime.load();
			INQTime.add([{quantity: 2, type: 'years'}]);
			INQTime.save();
		});

		var passedA = false;
		var passedB = false;
		on('chat:message', function(msg) {
			if(msg.content.indexOf('Future Event A') != -1) {
				expect(msg.content).to.match(/!\{URIFixed\}log%20%20Future%20Event%20A%408000001\.M0/);
				passedA = true;
			}
			if(msg.content.indexOf('Future Event B') != -1) {
				expect(msg.content).to.match(/!\{URIFixed\}log%20%20Future%20Event%20B%408000002\.M0/);
				passedB = true;
			}
			if(msg.content.indexOf('Future Event C') != -1) throw 'Passed Future Event C';

			if(passedA && passedB) done();
		});
  });
});
