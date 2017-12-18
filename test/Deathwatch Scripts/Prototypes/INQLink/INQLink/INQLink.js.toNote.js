var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQLink.prototype.toNote()', function() {
	it('should output a string that contains a link, if that link exists', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Drive'});
    var inqlink = new INQLink('Drive(Cycle)+10');
    expect(inqlink.toNote()).to.equal(getLink('Drive') + '(Cycle)+10');
  });
  it('should output a string, even if that link does not exists', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Tactics'});
    var inqlink = new INQLink('Drive(Cycle)+10');
    expect(inqlink.toNote()).to.equal('Drive(Cycle)+10');
  });
  it('should be called as the valueOf() INQLink', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Drive'});
    var inqlink = new INQLink('Drive(Cycle)+10');
    expect('Skill: ' + inqlink).to.equal('Skill: ' + getLink('Drive') + '(Cycle)+10');
  });
});
