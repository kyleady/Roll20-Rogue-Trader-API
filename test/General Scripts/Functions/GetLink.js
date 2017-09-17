var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
Campaign().MOCK20reset();
var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
var MyScript = fs.readFileSync(filePath, 'utf8');
eval(MyScript);
describe('getLink()', function() {
	it('should construct an HTML link by name', function(){
    var handout = createObj('handout', {name: 'getLink target'});
    expect(getLink(handout.get('name'))).to.equal('<a href=\"http://journal.roll20.net/handout' + '/' + handout.id + '\">' + handout.get('name') + '</a>');
  });
  it('should return the name if the object cannot be found', function(){
    expect(getLink('this handout doesn\' exist yet')).to.equal('this handout doesn\' exist yet');
  });
  it('should construct an HTML Link out of a Name and Address', function(){
    expect(getLink('google', 'www.google.com')).to.equal('<a href=\"www.google.com\">google</a>');
  });
});
