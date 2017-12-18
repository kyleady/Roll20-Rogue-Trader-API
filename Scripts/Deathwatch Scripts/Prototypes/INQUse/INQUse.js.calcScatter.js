INQUse.prototype.calcScatter = function() {
  var scatter = [];
  var direction = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];
  var maxHits = this.maxHits * this.maxHitsMultiplier;
  if(this.indirect) {
    for(var i = 0; i < this.hits; i++) {
      scatter.push({
        dir: direction[randomInteger(16)-1],
        dis: Math.max(randomInteger(10) - this.inqcharacter.bonus('BS'), 0)
      });
    }

    for(var i = 0; i < maxHits - this.hits; i++) {
      var distance = new INQFormula('D10');
      distance.DiceNumber = this.indirect;
      scatter.push({
        dir: direction[randomInteger(16)-1],
        dis: distance.toInline()
      });
    }
  } else if(this.inqweapon.isRanged() && this.inqweapon.has('Blast')) {
    for(var i = 0; i < maxHits - this.hits; i++) {
      var distance = new INQFormula('D10');
      scatter.push({
        dir: direction[randomInteger(16)-1],
        dis: distance.toInline()
      });
    }
  }

  if(!scatter.length) return;
  return {Name: 'Scatter', Content: scatter.map(roll => ' ' + roll.dis + ' ' + roll.dir).toString()};
}
