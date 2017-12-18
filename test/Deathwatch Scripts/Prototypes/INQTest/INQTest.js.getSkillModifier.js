var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.getSkillModifier()', function() {
	it('should add the Skill\'s bonus to the Modifiers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Awareness'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Awareness+10'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 10}]);
  });
  it('should add -20 if the skill is not found', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Logic'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Awareness+10'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: -20}]);
  });
  it('should be able to handle subgroups', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Common Lore(War)'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore(Adeptus Mechanicus)'));
    inqcharacter.List.Skills.push(new INQLink('Common Lore(Imperium)+10'));
    inqcharacter.List.Skills.push(new INQLink('Common Lore(War)+20'));
    inqcharacter.List.Skills.push(new INQLink('Common Lore(Jericho Reach)+30'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 20}]);
  });
  it('should accept a general modifier, even if a subgroup was requested', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Common Lore(War)'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore+10'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 10}]);

    inqtest = new INQTest({skill: 'Common Lore(Imperium)'});
    inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore(all)+20'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 20}]);
  });
  it('should use the best modifier it can get', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Common Lore(War)'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore(all)'));
    inqcharacter.List.Skills.push(new INQLink('Common Lore(War)+20'));
    inqcharacter.List.Skills.push(new INQLink('Common Lore+10'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 20}]);

    inqtest = new INQTest({skill: 'Common Lore(Imperium)'});

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([{Name: 'Skill', Value: 10}]);
  });
  it('should not add a Modifier if no subgroup is requested and the user has subgroups', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Common Lore'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore(War)+20'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([]);
  });
  it('should not add a Modifier if the chracter is trained but has no bonus', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqtest = new INQTest({skill: 'Common Lore(War)'});
    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Common Lore(War)'));

    inqtest.getSkillModifier(inqcharacter);
    expect(inqtest.Modifiers).to.deep.equal([]);
  });
});
