var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCalendar.announceEvents()', function() {
	it('should announce all the events in announcements', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var event1Heard = false;
    var event2Heard = false;
    on('chat:message', function(msg) {
      if(msg.content.indexOf('Event 1') != -1) {
        expect(msg.type).to.equal('general');
        event1Heard = true;
      } else if(msg.content.indexOf('Event 2') != -1) {
        expect(msg.type).to.equal('general');
        event2Heard = true;
      }
      if(event1Heard && event2Heard) done();
    });

    INQCalendar.announcements = {
      notes: [
        {Date: '8000020.M3', Content: [' Event 1']},
  			{Date: '8000010.M3', Content: [' Event 2']}
      ],
      gmnotes: []
    };

    INQCalendar.announceEvents();
  });
  it('should whisper all the gm events in announcements', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var event1Heard = false;
    var event2Heard = false;
    on('chat:message', function(msg) {
      if(msg.content.indexOf('Event 1') != -1) {
        expect(msg.type).to.equal('whisper');
        event1Heard = true;
      } else if(msg.content.indexOf('Event 2') != -1) {
        expect(msg.type).to.equal('whisper');
        event2Heard = true;
      }
      if(event1Heard && event2Heard) done();
    });

    INQCalendar.announcements = {
      gmnotes: [
        {Date: '8000020.M3', Content: [' Event 1']},
  			{Date: '8000010.M3', Content: [' Event 2']}
      ],
      notes: []
    };

    INQCalendar.announceEvents();
  });
  it('should include an API button to record the event in the past', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var event1Heard = false;
    var event2Heard = false;
    on('chat:message', function(msg) {
      if(msg.content.indexOf('Event 1') != -1) {
        expect(msg.type).to.equal('whisper');
        event1Heard = true;
        expect(msg.content).to.include('[Log](!{URIFixed}gmlog%20%20Event%201%408000020.M3)');
      } else if(msg.content.indexOf('Event 2') != -1) {
        expect(msg.type).to.equal('whisper');
        event2Heard = true;
        expect(msg.content).to.include('[Log](!{URIFixed}gmlog%20%20Event%202%408000010.M3)');
      }
      if(event1Heard && event2Heard) done();
    });

    INQCalendar.announcements = {
      gmnotes: [
        {Date: '8000020.M3', Content: [' Event 1']},
  			{Date: '8000010.M3', Content: [' Event 2']}
      ],
      notes: []
    };

    INQCalendar.announceEvents();
    expect(INQCalendar.announcements.notes).to.be.empty;
    expect(INQCalendar.announcements.gmnotes).to.be.empty;
  });
	it('should include an API button to continue repeating, if it is a repeated event', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var event1Heard = false;
    var event2Heard = false;
    on('chat:message', function(msg) {
      if(msg.content.indexOf('Event 1') != -1) {
        expect(msg.type).to.equal('whisper');
        event1Heard = true;
        expect(msg.content).to.include('[Repeat](!{URIFixed}gmlog%20%20Event%201%408000020.M3%25300000)');
      } else if(msg.content.indexOf('Event 2') != -1) {
        expect(msg.type).to.equal('whisper');
        event2Heard = true;
        expect(msg.content).to.not.include('[Repeat]');
      }

      if(event1Heard && event2Heard) done();
    });

    INQCalendar.announcements = {
      gmnotes: [
        {Date: '8000020.M3', Content: [' Event 1'], Repeat: 300000},
  			{Date: '8000010.M3', Content: [' Event 2']}
      ],
      notes: []
    };

    INQCalendar.announceEvents();
    expect(INQCalendar.announcements.notes).to.be.empty;
    expect(INQCalendar.announcements.gmnotes).to.be.empty;
  });
  it('should empty the announcements', function(done){
  	Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var event1Heard = false;
    var event2Heard = false;
    on('chat:message', function(msg) {
      if(msg.content.indexOf('Event 1') != -1) {
        expect(msg.type).to.equal('whisper');
        event1Heard = true;
      } else if(msg.content.indexOf('Event 2') != -1) {
        expect(msg.type).to.equal('whisper');
        event2Heard = true;
      }
      if(event1Heard && event2Heard) done();
    });

    INQCalendar.announcements = {
      gmnotes: [
        {Date: '8000020.M3', Content: [' Event 1']},
  			{Date: '8000010.M3', Content: [' Event 2']}
      ],
      notes: []
    };

    INQCalendar.announceEvents();
    expect(INQCalendar.announcements.notes).to.be.empty;
    expect(INQCalendar.announcements.gmnotes).to.be.empty;
  });
});
