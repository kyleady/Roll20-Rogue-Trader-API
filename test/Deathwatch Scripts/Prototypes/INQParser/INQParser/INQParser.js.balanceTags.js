var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.balanceTags()', function() {
	it('should add bold, link, underline, and italics tags to each line', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var Lines = [
      '<strong><u>Lin<a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></u><u>e1',
      '</strong>Lin<em>e2',
      '</a>Li</u>n</em>e'
    ];
    var inqparser = new INQParser();
    expect(inqparser.balanceTags(Lines)).to.deep.equal([
      '<strong><u>Lin<a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></u><u>e1</a></strong></u>',
      '<u><strong><a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></strong>Lin<em>e2</a></em></u>',
      '<u><em><a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></a>Li</u>n</em>e'
    ]);
  });
	it('should delete unpaired tags', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var Lines = [
      '</u></a></strong><strong><u>Lin<a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></u><u>e1',
      '</strong>Lin<em><em>e2',
      '</a>Li</u>n<a href=\"http://journal.roll20.net/handout/-f9hf8Whj9JfshDFskdsUJ\"></em>e'
    ];
    var inqparser = new INQParser();
    expect(inqparser.balanceTags(Lines)).to.deep.equal([
      '<strong><u>Lin<a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></u><u>e1</a></strong></u>',
      '<u><strong><a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></strong>Lin<em>e2</a></em></u>',
      '<u><em><a href=\"http://journal.roll20.net/handout/-Jj8Kd49NgeKbCEKpzUJ\"></a>Li</u>n</em>e'
    ]);
  });
});
