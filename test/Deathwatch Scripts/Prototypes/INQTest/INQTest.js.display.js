var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.display()', function() {
	it('should display a roll template', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqtest = new INQTest({characteristic: 'S', inqcharacter: inqcharacter});

    on('chat:message', function(msg){
      expect(msg.rolltemplate).to.not.be.undefined;
      done();
    });

    inqtest.display();
  });
  it('should include a title and number of successes', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqtest = new INQTest({characteristic: 'Renown', inqcharacter: inqcharacter});

    on('chat:message', function(msg){
      expect(msg.content).to.match(/{{name=/);
      expect(msg.content).to.match(/{{Successes=/);
      done();
    });

    inqtest.display();
  });
  it('should include a section for unnatural if there is an Unnatural Stat', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqtest = new INQTest({characteristic: 'S', inqcharacter: inqcharacter});

    on('chat:message', function(msg){
      expect(msg.content).to.match(/{{Unnatural=/);
      done();
    });

    inqtest.display();
  });
  it('should include a section for modifiers if there are modifiers', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqtest = new INQTest({characteristic: 'S', inqcharacter: inqcharacter, modifier: 20});

    on('chat:message', function(msg){
      expect(msg.content).to.match(/{{Modifiers=Other\(\+20\)}}/);
      done();
    });

    inqtest.display();
  });
  it('should include a section for the skill type if this is a skill check', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqtest = new INQTest({skill: 'tactics  (Stealth and Recon)', inqcharacter: inqcharacter});

    on('chat:message', function(msg){
      expect(msg.content).to.match(/{{Skill=Tactics\(Stealth and Recon\)}}/);
      done();
    });

    inqtest.display();
  });
});
