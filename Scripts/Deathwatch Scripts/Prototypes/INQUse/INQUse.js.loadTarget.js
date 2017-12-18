INQUse.prototype.loadTarget = function(callback){
  if(!this.options.target) return callback(true);
  var graphic = getObj('graphic', this.options.target);
  if(!graphic) return callback(false);
  var character;
  if(graphic.get('represents')) {
    character = getObj('character', graphic.get('represents'));
    this.inqtarget = new INQCharacter(character, graphic, function(){
      callback(true);
    });
  } else {
    this.inqtarget = new INQCharacter();
    this.inqtarget.GraphicID = graphic.id;
    callback(true);
  }
}
