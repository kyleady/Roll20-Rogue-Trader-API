//While Dark Heresy typically lists T Bonus, I want to be sure I get Fatigue right
//further, Fate Points are listed as a Trait: Touched by the Fates.
this.calcAttributes = function(){
  this.Attributes.Fatigue = this.bonus("T");
  var fate = this.has("Touched by the Fates", "Traits");
  if(fate){
    this.Attributes.Fate = fate.Bonus;
  }
}
