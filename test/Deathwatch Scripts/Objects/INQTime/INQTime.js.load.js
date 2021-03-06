var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTime.diff()', function() {
	it('should load the time variables from the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: INQVariables.id});
    INQTime.load();
    expect(INQTime.fraction).to.equal(1);
    expect(INQTime.year).to.equal(2);
    expect(INQTime.mill).to.equal(3);
  });
  it('should load the time variables from attributes on any character sheet', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character1 = createObj('character', {name: 'character1'});
    var character2 = createObj('character', {name: 'character2'});
    var character3 = createObj('character', {name: 'character3'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: character1.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: character2.id});
    createObj('attribute', {name: 'Millennia', current: 30, max: 3, _characterid: character3.id});
    INQTime.load();
    expect(INQTime.fraction).to.equal(1);
    expect(INQTime.year).to.equal(2);
    expect(INQTime.mill).to.equal(3);
  });
  it('should create missing attributes and attach them to a character sheet used by other attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character1 = createObj('character', {name: 'character1'});
    var character2 = createObj('character', {name: 'character2'});
    createObj('attribute', {name: 'Year Fraction', current: 10, max: 1, _characterid: character1.id});
    createObj('attribute', {name: 'Year', current: 20, max: 2, _characterid: character2.id});
    INQTime.load();
    expect(INQTime.fraction).to.equal(1);
    expect(INQTime.year).to.equal(2);
    expect(INQTime.millObj.get('_type')).to.equal('attribute');
    expect(INQTime.millObj.get('name')).to.equal('Millennia');
    expect(INQTime.millObj.get('current')).to.equal(0);
    expect(INQTime.millObj.get('max')).to.equal(0);
    expect(INQTime.millObj.get('_characterid')).to.equal(character2.id)
  });
  it('should attach the created attributes to INQVariables, if it exists and none of the other attributes exist', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    INQTime.load();
    expect(INQTime.fractionObj.get('_type')).to.equal('attribute');
    expect(INQTime.fractionObj.get('name')).to.equal('Year Fraction');
    expect(INQTime.fractionObj.get('current')).to.equal(0);
    expect(INQTime.fractionObj.get('max')).to.equal(0);
    expect(INQTime.fractionObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.yearObj.get('_type')).to.equal('attribute');
    expect(INQTime.yearObj.get('name')).to.equal('Year');
    expect(INQTime.yearObj.get('current')).to.equal(0);
    expect(INQTime.yearObj.get('max')).to.equal(0);
    expect(INQTime.yearObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.millObj.get('_type')).to.equal('attribute');
    expect(INQTime.millObj.get('name')).to.equal('Millennia');
    expect(INQTime.millObj.get('current')).to.equal(0);
    expect(INQTime.millObj.get('max')).to.equal(0);
    expect(INQTime.millObj.get('_characterid')).to.equal(INQVariables.id);
  });
  it('should create INQVariables if it does not exist and none of the attributes exist', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    INQTime.load();
    var INQVariables = findObjs({_type: 'character', name: 'INQVariables'})[0];
    expect(INQVariables.get('_type')).to.equal('character');
    expect(INQVariables.get('name')).to.equal('INQVariables');

    expect(INQTime.fractionObj.get('_type')).to.equal('attribute');
    expect(INQTime.fractionObj.get('name')).to.equal('Year Fraction');
    expect(INQTime.fractionObj.get('current')).to.equal(0);
    expect(INQTime.fractionObj.get('max')).to.equal(0);
    expect(INQTime.fractionObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.yearObj.get('_type')).to.equal('attribute');
    expect(INQTime.yearObj.get('name')).to.equal('Year');
    expect(INQTime.yearObj.get('current')).to.equal(0);
    expect(INQTime.yearObj.get('max')).to.equal(0);
    expect(INQTime.yearObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.millObj.get('_type')).to.equal('attribute');
    expect(INQTime.millObj.get('name')).to.equal('Millennia');
    expect(INQTime.millObj.get('current')).to.equal(0);
    expect(INQTime.millObj.get('max')).to.equal(0);
    expect(INQTime.millObj.get('_characterid')).to.equal(INQVariables.id);
  });
  it('should convert strings into numbers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: '10', max: '1', _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: '20', max: '2', _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: '30', max: '3', _characterid: INQVariables.id});
    INQTime.load();
    expect(INQTime.fraction).to.equal(1);
    expect(INQTime.year).to.equal(2);
    expect(INQTime.mill).to.equal(3);
  });
  it('should store references to the attributes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var INQVariables = createObj('character', {name: 'INQVariables'});
    createObj('attribute', {name: 'Year Fraction', current: '10', max: '1', _characterid: INQVariables.id});
    createObj('attribute', {name: 'Year', current: '20', max: '2', _characterid: INQVariables.id});
    createObj('attribute', {name: 'Millennia', current: '30', max: '3', _characterid: INQVariables.id});
    INQTime.load();
    expect(INQTime.fractionObj.get('_type')).to.equal('attribute');
    expect(INQTime.fractionObj.get('name')).to.equal('Year Fraction');
    expect(INQTime.fractionObj.get('current')).to.equal('10');
    expect(INQTime.fractionObj.get('max')).to.equal('1');
    expect(INQTime.fractionObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.yearObj.get('_type')).to.equal('attribute');
    expect(INQTime.yearObj.get('name')).to.equal('Year');
    expect(INQTime.yearObj.get('current')).to.equal('20');
    expect(INQTime.yearObj.get('max')).to.equal('2');
    expect(INQTime.yearObj.get('_characterid')).to.equal(INQVariables.id);

    expect(INQTime.millObj.get('_type')).to.equal('attribute');
    expect(INQTime.millObj.get('name')).to.equal('Millennia');
    expect(INQTime.millObj.get('current')).to.equal('30');
    expect(INQTime.millObj.get('max')).to.equal('3');
    expect(INQTime.millObj.get('_characterid')).to.equal(INQVariables.id);
  });
});
