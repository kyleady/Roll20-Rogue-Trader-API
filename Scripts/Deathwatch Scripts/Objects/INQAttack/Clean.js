INQAttack_old = INQAttack_old || {};
//delete every property but leave all of the functions untouched
INQAttack_old.clean = function(){
  for(var k in INQAttack_old){
    if(typeof INQAttack_old[k] != 'function'){
      delete INQAttack_old[k];
    }
  }
}
