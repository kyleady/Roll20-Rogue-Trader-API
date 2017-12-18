var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('damageFx()', function() {
	it('should run without crashing', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var page = createObj('page', {name: 'damageFx page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'damageFx graphic', _pageid: page.id});

		expect(function(){damageFx(graphic, 'E')}).not.to.throw();
  });
});
