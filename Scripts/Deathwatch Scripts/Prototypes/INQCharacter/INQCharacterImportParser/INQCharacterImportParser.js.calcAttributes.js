//While Dark Heresy typically lists T Bonus, I want to be sure I get Fatigue right
//further, Fate Points are listed as a Trait: Touched by the Fates.
INQCharacterImportParser.prototype.calcAttributes = function(){
  this.Attributes.Fatigue = this.bonus("T");
  var fate = this.has("Touched by the Fates", "Traits");
  if(fate){
    if(fate.length){
      this.Attributes.Fate = fate[0].Name;
    } else {
      this.Attributes.Fate = fate.Bonus;
    }
  }
}
