var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('getHitLocation()', function() {
	it('should be able to target character locations', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		expect(getHitLocation('2', '0', 'character')).to.equal('H');
    expect(getHitLocation('2', '9', 'character')).to.equal('RA');
    expect(getHitLocation('3', '9', 'character')).to.equal('LA');
    expect(getHitLocation('2', '7', 'character')).to.equal('B');
    expect(getHitLocation('2', '3', 'character')).to.equal('RL');
    expect(getHitLocation('3', '3', 'character')).to.equal('LL');
	});
	it('should be accept numbers', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		expect(getHitLocation(2, '0', 'character')).to.equal('H');
	});
	it('should be accept roll20 attributes and use their current value', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var character = createObj('character', {});
		var attr = createObj('attribute', {current: 2, max: 3, _characterid: character.id});
		expect(getHitLocation(attr, '0', 'character')).to.equal('H');
	});
  it('should be able to target vehicle locations', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		expect(getHitLocation('0', '0', 'vehicle')).to.equal('F');
    expect(getHitLocation('-1', '9', 'vehicle')).to.equal('S');
    expect(getHitLocation('-2', '9', 'vehicle')).to.equal('R');
	});
  it('should be able to target starship locations', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(getHitLocation('0', '0', 'starship')).to.equal('F');
    expect(getHitLocation('-1', '9', 'starship')).to.equal('S');
    expect(getHitLocation('-2', '9', 'starship')).to.equal('A');
    expect(getHitLocation('-3', '9', 'starship')).to.equal('P');
	});
});
