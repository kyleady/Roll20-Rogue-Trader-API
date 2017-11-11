var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.skills()', function() {
	it('should return an array of recognized Skills', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var skills = INQTest.skills();
    for(var skill of skills){
      expect(skill).to.have.property('Name');
    }
  });
  it('should have default characteristics for each skill', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var skills = INQTest.skills();
    for(var skill of skills){
      expect(skill).to.have.property('DefaultStat');
    }
  });
});
