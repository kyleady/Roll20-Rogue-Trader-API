var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');

describe('announce()', function() {
	Campaign().MOCK20reset();
	var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
	var MyScript = fs.readFileSync(filePath, 'utf8');
	eval(MyScript);
	it('should send a message through sendChat()', function(done){
		on('chat:message:announce_sendChat', function(msg){
      expect(msg.content).to.equal('I have made an announcement.');
      done();
    });
    announce('I have made an announcement.', {speakingAs: 'announce() message', MOCK20tag: 'announce_sendChat'});
  });
  it('should allow you to specify speakingAs in the options', function(done){
		on('chat:message:announce_options', function(msg){
      expect(msg.who).to.equal('The Speaker');
      done();
    });
    announce('announce() speakingAs', {speakingAs: 'The Speaker', MOCK20tag: 'announce_options'});
  });
	it('should allow you to specify a delay', function(){
		msgCount = 0;
		on('chat:message:announce_options', function(msg){
      msgCount++;
      done();
    });
    announce('announce() delay', {speakingAs: 'The Speaker', MOCK20tag: 'announce_options', delay: 100});
		expect(msgCount).to.equal(0);
  });
});
