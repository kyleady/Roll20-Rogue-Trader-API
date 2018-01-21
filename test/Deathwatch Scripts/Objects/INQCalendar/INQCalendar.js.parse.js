var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.parse()', function() {
	it('should parse the Roll20 objs into arrays', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var logbook = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
    var events = '';
    events += '<strong>8000001.M0</strong>: Event 1';
    events += '<br><br>';
    events += '<strong>8000002.M0</strong>: Event 2';
    logbook.set('notes', events);
    events = '';
    events += '<strong>8000003.M0</strong>: Event 3';
    events += '<br><br>';
    events += '<strong>8000004.M0</strong>: Event 4';
    logbook.set('gmnotes', events);

    var calendar = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});
    events = '';
    events += '<strong>8000001.M1</strong>: Event 1a';
    events += '<br><br>';
    events += '<strong>8000002.M1</strong>: Event 2a';
    calendar.set('notes', events);
    events = '';
    events += '<strong>8000003.M1</strong>: Event 3a';
    events += '<br><br>';
    events += '<strong>8000004.M1</strong>: Event 4a';
    calendar.set('gmnotes', events);

    INQTime.load();
    INQTime.mill = 1;
    INQTime.save();

		INQCalendar.futureObj = calendar;
		INQCalendar.pastObj = logbook;
		INQCalendar.parse(function() {
      expect(INQCalendar.future.notes).to.deep.equal([
        {Date: '8000001.M1', Content: [' Event 1a', '']},
        {Date: '8000002.M1', Content: [' Event 2a']}
      ]);
      expect(INQCalendar.future.gmnotes).to.deep.equal([
        {Date: '8000003.M1', Content: [' Event 3a', '']},
        {Date: '8000004.M1', Content: [' Event 4a']}
      ]);

      expect(INQCalendar.past.notes).to.deep.equal([
        {Date: '8000001.M0', Content: [' Event 1', '']},
        {Date: '8000002.M0', Content: [' Event 2']}
      ]);
      expect(INQCalendar.past.gmnotes).to.deep.equal([
        {Date: '8000003.M0', Content: [' Event 3', '']},
        {Date: '8000004.M0', Content: [' Event 4']}
      ]);

      done();
    });
  });
	it('should parse empty strings into empty arrays', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var logbook = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
    var calendar = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});
    INQTime.load();
    INQTime.mill = 1;
    INQTime.save();

		INQCalendar.futureObj = calendar;
		INQCalendar.pastObj = logbook;
		INQCalendar.parse(function() {
			expect(INQCalendar.future.notes).to.deep.equal([]);
      expect(INQCalendar.future.gmnotes).to.deep.equal([]);
      expect(INQCalendar.past.notes).to.deep.equal([]);
      expect(INQCalendar.past.gmnotes).to.deep.equal([]);
      done();
    });
  });
	it('should add on unlabled lines to previous lines', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var logbook = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
    var events = '';
    events += '<strong>8000001.M0</strong>: Event 1';
		events += '<br>';
		events += 'Extra 1';
    events += '<br><br>';
    events += '<strong>8000002.M0</strong>: Event 2';
		events += '<br>';
		events += 'Extra 2';
    logbook.set('notes', events);

    var calendar = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});

		INQTime.load();
    INQTime.mill = 1;
    INQTime.save();

		INQCalendar.futureObj = calendar;
		INQCalendar.pastObj = logbook;
		INQCalendar.parse(function() {
      expect(INQCalendar.future.notes).to.deep.equal([]);
      expect(INQCalendar.future.gmnotes).to.deep.equal([]);

      expect(INQCalendar.past.notes).to.deep.equal([
        {Date: '8000001.M0', Content: [' Event 1', 'Extra 1', '']},
        {Date: '8000002.M0', Content: [' Event 2', 'Extra 2']}
      ]);
      expect(INQCalendar.past.gmnotes).to.deep.equal([]);

      done();
    });
  });
	it('should store extra lines before any dates without a Date', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var logbook = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
    var events = '';
		events += 'A Title';
		events += '<br>';
		events += 'Something Else';
		events += '<br>';
    events += '<strong>8000001.M0</strong>: Event 1';
		events += '<br>';
		events += 'Extra 1';
    events += '<br><br>';
    events += '<strong>8000002.M0</strong>: Event 2';
		events += '<br>';
		events += 'Extra 2';
    logbook.set('notes', events);

    var calendar = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});

		INQTime.load();
    INQTime.mill = 1;
    INQTime.save();

		INQCalendar.futureObj = calendar;
		INQCalendar.pastObj = logbook;
		INQCalendar.parse(function() {
      expect(INQCalendar.future.notes).to.deep.equal([]);
      expect(INQCalendar.future.gmnotes).to.deep.equal([]);

			expect(INQCalendar.past.notes).to.deep.equal([
				{Content: ['A Title', 'Something Else']},
        {Date: '8000001.M0', Content: [' Event 1', 'Extra 1', '']},
        {Date: '8000002.M0', Content: [' Event 2', 'Extra 2']}
      ]);
      expect(INQCalendar.past.gmnotes).to.deep.equal([]);

      done();
    });
  });
});
