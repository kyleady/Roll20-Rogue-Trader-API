INQQtt.prototype.warpConduit = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var FocusStrength = this.inquse.options.FocusStrength;
  if(inqcharacter.has('Warp Conduit', 'Talents') && /(Push|True)/i.test(FocusStrength)){
    this.inquse.PR++;
    this.inquse.PsyPheModifier -= 10;
  }
}
