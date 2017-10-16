var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('medicCatcher()', function() {
	it('should increase Max Healing if a character receives true healing', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes['Max Healing'] = 10;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id, bar3_value: '7', bar3_max: '15', bar3_link: 'Wounds'});
		var maxHealing = findObjs({_type: 'attribute', _characterid: character.id, name: 'Max Healing'})[0];

    expect(maxHealing.get('current')).to.equal(10);
    graphic.set('bar3_value', '12');
    expect(maxHealing.get('current')).to.equal(12);
  });
	it('should not increase Max Healing above the Max Wounds', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes['Max Healing'] = 10;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id, bar3_value: '7', bar3_max: '15', bar3_link: 'Wounds'});
		var maxHealing = findObjs({_type: 'attribute', _characterid: character.id, name: 'Max Healing'})[0];

    expect(maxHealing.get('current')).to.equal(10);
    graphic.set('bar3_value', '20');
    expect(maxHealing.get('current')).to.equal(15);
  });
	it('should not modify Max Healing if a character takes damage', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes['Max Healing'] = 10;
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id, bar3_value: '7', bar3_max: '15', bar3_link: 'Wounds'});
		var maxHealing = findObjs({_type: 'attribute', _characterid: character.id, name: 'Max Healing'})[0];

    expect(maxHealing.get('current')).to.equal(10);
    graphic.set('bar3_value', '8');
    expect(maxHealing.get('current')).to.equal(10);
  });
	it('should not create Max Healing if a character does not already have it', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'calcInitBonus page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'calcInitBonus graphic', _pageid: page.id, represents: character.id, bar3_value: '7', bar3_max: '15', bar3_link: 'Wounds'});

		expect(findObjs({_type: 'attribute', _characterid: character.id, name: 'Max Healing'})).to.be.empty;
    graphic.set('bar3_value', '12');
    expect(findObjs({_type: 'attribute', _characterid: character.id, name: 'Max Healing'})).to.be.empty;
  });
});
