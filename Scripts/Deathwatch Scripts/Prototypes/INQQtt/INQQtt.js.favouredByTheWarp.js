INQQtt.prototype.favouredByTheWarp = function(){
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has(/Favou?red By The Warp/i, 'Talents')){
    this.inquse.PsyPheDrop++;
  }
}
