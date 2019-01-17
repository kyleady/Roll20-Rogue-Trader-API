INQQtt.prototype.warpConduit = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var FocusStrength = this.inquse.options.FocusStrength;
  if(!inqcharacter.has('Warp Conduit', 'Talents')) return;
  if(!/(Push|True)/i.test(FocusStrength)) return;
  log('Warp Conduit')
  this.inquse.PR++;
  this.inquse.PsyPheModifier -= 10;
}
