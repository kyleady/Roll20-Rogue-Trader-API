INQQtt.prototype.autoStabilised = function(){
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Auto-stabilised', 'Traits')){
    this.inquse.braced = true;
  }
}
