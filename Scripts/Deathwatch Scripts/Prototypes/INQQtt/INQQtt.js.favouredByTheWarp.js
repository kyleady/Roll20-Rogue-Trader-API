INQQtt.prototype.favouredByTheWarp = function(){
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Favoured By The Warp', 'Talents')){
    this.inquse.PhyPheDrop++;
  }
}
