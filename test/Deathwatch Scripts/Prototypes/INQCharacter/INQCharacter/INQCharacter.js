var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQCharacter()).to.be.an.instanceof(INQCharacter);
  });
	it('should return itself in a callback', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();
		new INQCharacter(undefined, undefined, function(inqcharacter){
			expect(inqcharacter).to.be.an.instanceof(INQCharacter);
			done();
		});
  });
  it('should have default properties', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    expect(inqcharacter).to.have.property('Movement');
    expect(inqcharacter.Movement).to.have.property('Half');
    expect(inqcharacter.Movement).to.have.property('Full');
    expect(inqcharacter.Movement).to.have.property('Charge');
    expect(inqcharacter.Movement).to.have.property('Run');

    expect(inqcharacter).to.have.property('List');
    expect(inqcharacter.List).to.have.property('Psychic Powers');
    expect(inqcharacter.List).to.have.property('Weapons');
    expect(inqcharacter.List).to.have.property('Gear');
    expect(inqcharacter.List).to.have.property('Talents');
    expect(inqcharacter.List).to.have.property('Traits');
    expect(inqcharacter.List).to.have.property('Skills');

    expect(inqcharacter).to.have.property('SpecialRules');

    expect(inqcharacter).to.have.property('Attributes');
    expect(inqcharacter.Attributes).to.have.property('WS');
    expect(inqcharacter.Attributes).to.have.property('BS');
    expect(inqcharacter.Attributes).to.have.property('S');
    expect(inqcharacter.Attributes).to.have.property('T');
    expect(inqcharacter.Attributes).to.have.property('Ag');
    expect(inqcharacter.Attributes).to.have.property('Wp');
    expect(inqcharacter.Attributes).to.have.property('Per');
    expect(inqcharacter.Attributes).to.have.property('It');
    expect(inqcharacter.Attributes).to.have.property('Fe');
    expect(inqcharacter.Attributes).to.have.property('Wounds');
    expect(inqcharacter.Attributes).to.have.property('Corruption');

    expect(inqcharacter.Attributes).to.have.property('Unnatural WS');
    expect(inqcharacter.Attributes).to.have.property('Unnatural BS');
    expect(inqcharacter.Attributes).to.have.property('Unnatural S');
    expect(inqcharacter.Attributes).to.have.property('Unnatural T');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Ag');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Wp');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Per');
    expect(inqcharacter.Attributes).to.have.property('Unnatural It');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Fe');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Wounds');
    expect(inqcharacter.Attributes).to.have.property('Unnatural Corruption');

    expect(inqcharacter.Attributes).to.have.property('Fatigue');
    expect(inqcharacter.Attributes).to.have.property('PR');
    expect(inqcharacter.Attributes).to.have.property('Fate');
    expect(inqcharacter.Attributes).to.have.property('Insanity');
    expect(inqcharacter.Attributes).to.have.property('Renown');

    expect(inqcharacter.Attributes).to.have.property('Armour_H');
    expect(inqcharacter.Attributes).to.have.property('Armour_RA');
    expect(inqcharacter.Attributes).to.have.property('Armour_LA');
    expect(inqcharacter.Attributes).to.have.property('Armour_B');
    expect(inqcharacter.Attributes).to.have.property('Armour_RL');
    expect(inqcharacter.Attributes).to.have.property('Armour_LL');
  });
  it('should inherent from INQObject', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqobject = new INQObject();
    var inqcharacter = new INQCharacter();
    for(var prop in inqobject) {
      expect(inqcharacter).to.have.property(prop);
    }
  });
  it('should be able to parse a Roll20 character object', function(done){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Gear.push(new INQLink('Chartograph'));
    var character = inqcharacter.toCharacterObj();
		var page = createObj('page', {name: 'INQCharacter page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'INQCharacter graphic', _pageid: page.id, represents: character.id});
    new INQCharacter(character, graphic, function(parsedCharacter){
			expect(parsedCharacter.List.Gear).to.have.lengthOf(1);
	    expect(parsedCharacter.List.Gear[0]).to.deep.equal(new INQLink('Chartograph'));
			done();
		});
  });
	it('should be able to parse a import character text', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

		var text = '05 05 10 20 30 30 10 30 10 – –';
		text += '<br>';
		text += 'Movement: 3/6/9/18';
		text += '<br>';
		text += 'Wounds: 19';
		text += '<br>'
		text += 'Armour: None';
		text += '<br>';
		text += 'Skills: Forbidden Lore (Daemonology, Heresy, The Warp) (Int).';
		text += '<br>';
		text += 'Talents: Bloodcaller†.';
		text += '<br>';
		text += 'Traits: Psyker.';
		text += '<br>';
		text += 'Weapons: None.';
		text += '<br>';
		text += 'Gear: Brass Binding Chains††, gore-soaked robes.';

    var inqcharacter = new INQCharacter(text);
		expect(inqcharacter.Attributes.WS).to.equal(5);
		expect(inqcharacter.Attributes.BS).to.equal(5);
		expect(inqcharacter.Attributes.S).to.equal(10);
		expect(inqcharacter.Attributes.T).to.equal(20);
		expect(inqcharacter.Attributes.Ag).to.equal(30);
		expect(inqcharacter.Attributes.It).to.equal(30);
		expect(inqcharacter.Attributes.Per).to.equal(10);
		expect(inqcharacter.Attributes.Wp).to.equal(30);
		expect(inqcharacter.Attributes.Fe).to.equal(10);

		expect(inqcharacter.Movement.Half).to.equal('3');
		expect(inqcharacter.Movement.Full).to.equal('6');
		expect(inqcharacter.Movement.Charge).to.equal('9');
		expect(inqcharacter.Movement.Run).to.equal('18');

		expect(inqcharacter.Attributes.Wounds).to.equal('19');

		expect(inqcharacter.Attributes.Armour_H).to.equal(0);
		expect(inqcharacter.Attributes.Armour_RA).to.equal(0);
		expect(inqcharacter.Attributes.Armour_LA).to.equal(0);
		expect(inqcharacter.Attributes.Armour_B).to.equal(0);
		expect(inqcharacter.Attributes.Armour_RL).to.equal(0);
		expect(inqcharacter.Attributes.Armour_LL).to.equal(0);

		expect(inqcharacter.List.Skills[0]).to.deep.equal(new INQLink('Forbidden Lore(Daemonology, Heresy, The Warp)'));
		expect(inqcharacter.List.Talents[0]).to.deep.equal(new INQLink('Bloodcaller†'));
		expect(inqcharacter.List.Traits[0]).to.deep.equal(new INQLink('Psyker'));
		expect(inqcharacter.List.Gear[0]).to.deep.equal(new INQLink('Brass Binding Chains††'));
		expect(inqcharacter.List.Gear[1]).to.deep.equal(new INQLink('gore-soaked robes'));
  });
});
