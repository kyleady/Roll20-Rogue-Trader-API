var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQTest()).to.be.an.instanceof(INQTest);
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest();
    expect(inqtest).to.have.property('Modifiers');

    expect(inqtest).to.have.property('Characteristic');
    expect(inqtest).to.have.property('Skill');
    expect(inqtest).to.have.property('Subgroup');
		expect(inqtest).to.have.property('PartyStat');

    expect(inqtest).to.have.property('Die');
    expect(inqtest).to.have.property('Successes');
		expect(inqtest).to.have.property('Failures');

    expect(inqtest).to.have.property('Stat');
    expect(inqtest).to.have.property('Unnatural');
  });
  it('should allow you to specify a characteristic in the options', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({characteristic: 'WS'});
    expect(inqtest.Characteristic).to.equal('WS');
  });
  it('should allow you to specify a skill with or without a subgroup in the options', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Tactics(Assault Doctrine)'});
    expect(inqtest.Skill).to.equal('Tactics');
    expect(inqtest.Subgroup).to.equal('Assault Doctrine');
    expect(inqtest.Characteristic).to.equal('It');

    inqtest = new INQTest({skill: 'Scrutiny'});
    expect(inqtest.Skill).to.equal('Scrutiny');
    expect(inqtest.Subgroup).to.equal('');
    expect(inqtest.Characteristic).to.equal('Per');
  });
  it('should allow you to override a Skill\'s default Characteristic', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Intimidate', characteristic: 'Wp'});
    expect(inqtest.Skill).to.equal('Intimidate');
    expect(inqtest.Characteristic).to.equal('Wp');
  });
  it('should allow you to specify a modifier', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({modifier: '+36'});
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Other', Value: 36}]);
  });
  it('should allow you to specify an inqcharacter to gather stats and bonuses from', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.It = 32;
    inqcharacter.Attributes['Unnatural It'] = 2;
    inqcharacter.List.Skills.push(new INQLink('Scholastic Lore(Chymistry)+10'));
    inqcharacter.List.Skills.push(new INQLink('Scholastic Lore(Astromancy)-10'));
    var inqtest = new INQTest({skill: 'scholasticlore(astromancy)', inqcharacter: inqcharacter});
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: -10}]);
    expect(inqtest.Stat).to.equal(32);
    expect(inqtest.Unnatural).to.equal(2);
  });
	it('should accept a characteistic in the skill field', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var inqtest = new INQTest({skill: 'Toughness'});
    expect(inqtest.Characteristic).to.equal('T');
	});
});
