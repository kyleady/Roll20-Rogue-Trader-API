function attackReset(matches,msg){
  var details = damDetails();
  if(details == undefined) return;
  for(var k in details) details[k].set('current', details[k].get('max'));
  attackShow();
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*attack\s*=\s*max$/i, attackReset);
});
