INQQtt.prototype.range = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = inqweapon.has(/^range$/i);
  if(range){
    var rangeM = 1;
    var rangeA = [];
    _.each(range, function(value){
      if(/=/.test(value.Name)){
        var text = value.Name.replace('=', '');
        var formula = new INQFormula(text);
        inqweapon.Range = formula;
      } else if(/%\s*$/.test(value.Name)) {
        var mMatches = value.Name.match(/(\-|)\s*\d+/);
        if(!mMatches) return log(value.Name);
        var percent = Number(mMatches[0]) || 0;
        rangeM *= 1 + (percent / 100);
      } else {
        rangeA.push(value);
      }
    });

    inqweapon.Range.Multiplier *= rangeM;
    var total = this.getTotal(rangeA, -1 * inqweapon.Range.Modifier);
    inqweapon.Range.Modifier += total;
  }
}
