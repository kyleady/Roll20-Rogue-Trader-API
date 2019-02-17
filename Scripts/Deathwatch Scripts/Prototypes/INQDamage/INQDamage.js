function INQDamage(character, graphic, callback) {
  this.graphic = graphic;
  this.getDamDetails();
  if(this.Dam == undefined) {
    if(typeof callback == 'function') return callback(false);
    return false;
  }

  var inqdamage = this;
  this.loadCharacter(character, graphic, function(){
    if(typeof callback == 'function') callback(inqdamage);
  });
}
