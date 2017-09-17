var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
Campaign().MOCK20reset();
var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
var MyScript = fs.readFileSync(filePath, 'utf8');
eval(MyScript);
describe('modifyAttribute()', function() {
	it('should perform basic numerical operations', function(){
		var attribute = {
			current: 3,
			max: 4
		};
		expect(modifyAttribute(attribute, {operator: '+', modifier: 2}).current).to.equal(5);
		expect(modifyAttribute(attribute, {operator: '-', modifier: 2}).current).to.equal(1);
		expect(modifyAttribute(attribute, {operator: '*', modifier: 2}).current).to.equal(6);
		expect(modifyAttribute(attribute, {operator: '/', modifier: 2}).current).to.equal(2);
		expect(modifyAttribute(attribute, {operator: '+', modifier: 2, sign: '-'}).current).to.equal(1);
		expect(modifyAttribute(attribute, {operator: '-', modifier: 2, sign: '-'}).current).to.equal(5);
		expect(modifyAttribute(attribute, {operator: '*', modifier: 2, sign: '-'}).current).to.equal(-6);
		expect(modifyAttribute(attribute, {operator: '/', modifier: 2, sign: '-'}).current).to.equal(-1);
  });
	it('should be able to use \'current\' and \'max\' as modifiers', function(){
		var attribute = {
			current: 3,
			max: 4
		};
		expect(modifyAttribute(attribute, {operator: '=', modifier: 'max'}).current).to.equal('4');
		expect(modifyAttribute(attribute, {operator: '+', modifier: 'current', workingWith: 'max'}).max).to.equal(7);
	});
	it('should return the given value if no operator is given', function(){
		var attribute = {
			current: 3,
			max: 4
		};
		expect(modifyAttribute(attribute, {operator: 'nope', modifier: 1000}).current).to.equal(3);
		expect(modifyAttribute(attribute, {operator: '????', modifier: 19, workingWith: 'max'}).max).to.equal(4);
	});
	it('should be able to use an inline as a modifier');
});
