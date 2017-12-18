var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTest.prototype.roll()', function() {
	it('should roll a D100, recording the result and the successes', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Attributes.BS = 43;
    inqcharacter.Attributes['Unnatural BS'] = 3;
    var inqtest = new INQTest({skill: 'BS', inqcharacter: inqcharacter, modifier: 10});

    for(var i = 0; i < 1000; i++){
      inqtest.roll();
      expect(inqtest.Die).to.be.within(1, 100);
      var total = 0;
      for(var modifier of inqtest.Modifiers){
        total += modifier.Value;
      }
      var test = inqtest.Stat + total - inqtest.Die;
      var degrees = Math.floor(Math.abs(test)/10);
      degrees += Math.ceil(inqtest.Unnatural/2);
      if(test >= 0){
        expect(inqtest.Successes).to.equal(degrees);
        expect(inqtest.Failures).to.equal(-1);
      } else {
        expect(inqtest.Successes).to.equal(-1);
        expect(inqtest.Failures).to.equal(degrees);
      }
    }
  });
});
