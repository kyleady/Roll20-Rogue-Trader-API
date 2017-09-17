var expect = require('chai').expect;
describe('MyModule.js', function() {
	it('should run without throwing any errors', function(){
		expect(require('./../INQModule')).not.to.throw;
	});
});
