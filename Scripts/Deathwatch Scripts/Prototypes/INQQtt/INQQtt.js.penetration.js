INQQtt.prototype.penetration = function(inqweapon, pr, sb){
  var pen = inqweapon.has('Pen') || [];
  var penetration = inqweapon.has('Penetration') || [];
  pen = pen.concat(penetration);
  _.each(pen, function(value){
    var equals = /=/.test(value.Name);
    var text = value.Name.replace('=', '');
    var formula = new INQFormula(text);
    if(equals){
      inqweapon.Penetration = formula;
    } else {
      inqweapon.Penetration.Modifier += formula.roll({PR: pr, SB: sb});
    }
  });
}
