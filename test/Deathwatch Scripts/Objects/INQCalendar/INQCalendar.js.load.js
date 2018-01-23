var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.load()', function() {
	it('should save the Calendar and Logbook', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var logbook = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
    var calendar = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});
    INQCalendar.load();
    expect(INQCalendar.pastObj).to.equal(logbook);
    expect(INQCalendar.futureObj).to.equal(calendar);
  });
  it('should create a Calendar and Logbook if they do not exist yet', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(findObjs({_type: 'handout', name: 'Logbook'})).to.be.empty;
    expect(findObjs({_type: 'handout', name: 'Calendar'})).to.be.empty;
    INQCalendar.load();
    expect(findObjs({_type: 'handout', name: 'Logbook'})).to.not.be.empty;
    expect(findObjs({_type: 'handout', name: 'Calendar'})).to.not.be.empty;
  });
	it('should add a title to the notes and gmnotes when creating a Calendar and Logbook for the fisrt time', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(findObjs({_type: 'handout', name: 'Logbook'})).to.be.empty;
    expect(findObjs({_type: 'handout', name: 'Calendar'})).to.be.empty;
    INQCalendar.load(function() {
			var logbook = findObjs({_type: 'handout', name: 'Logbook'})[0];
			var calendar = findObjs({_type: 'handout', name: 'Calendar'})[0];
	    expect(logbook).to.not.be.undefined;
	    expect(calendar).to.not.be.undefined;
			expect(INQCalendar.past.notes).to.deep.equal([
				{Content: ['<u>Recorded Events</u>']}
			]);
			expect(INQCalendar.past.gmnotes).to.deep.equal([
				{Content: ['<u>Recorded Hidden Events</u>']}
			]);
			expect(INQCalendar.future.notes).to.deep.equal([
				{Content: ['<u>Upcoming Events</u>']}
			]);
			expect(INQCalendar.future.gmnotes).to.deep.equal([
				{Content: ['<u>Upcoming Hidden Events</u>']}
			]);
		});
  });
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

		INQCalendar.load(function() {
			expect(INQCalendar.future.notes).to.deep.equal([
        {Date: '8000001.M1', Content: [' Event 1a', ''], Repeat: undefined},
        {Date: '8000002.M1', Content: [' Event 2a'], Repeat: undefined}
      ]);
			expect(INQCalendar.future.gmnotes).to.deep.equal([
        {Date: '8000003.M1', Content: [' Event 3a', ''], Repeat: undefined},
        {Date: '8000004.M1', Content: [' Event 4a'], Repeat: undefined}
      ]);

			expect(INQCalendar.past.notes).to.deep.equal([
        {Date: '8000001.M0', Content: [' Event 1', ''], Repeat: undefined},
        {Date: '8000002.M0', Content: [' Event 2'], Repeat: undefined}
      ]);
			expect(INQCalendar.past.gmnotes).to.deep.equal([
        {Date: '8000003.M0', Content: [' Event 3', ''], Repeat: undefined},
        {Date: '8000004.M0', Content: [' Event 4'], Repeat: undefined}
      ]);

      done();
    });
  });
});
