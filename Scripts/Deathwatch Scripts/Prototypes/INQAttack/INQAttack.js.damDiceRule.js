INQAttack.prototype.damDiceRule = function(){
  var output = '';
  if(this.inquse.rerollDam){
    output += 'r<';
    output += this.inquse.rerollDam;
  }

  if(this.inquse.dropDice){
    output += 'dl';
    output += this.inquse.dropDice;
  }

  return output;
}
