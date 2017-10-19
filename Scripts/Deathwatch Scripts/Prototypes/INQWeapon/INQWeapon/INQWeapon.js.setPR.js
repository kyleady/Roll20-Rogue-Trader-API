//replace every instance of PR with the effectove psy rating of the character
INQWeapon.prototype.setPR = function(effectivePR){
  //start with the basic stats of the weapon
  var psyStats = ["Range", "DiceMultiplier", "DamageBase", "Penetration", "Semi", "Full"];
  for(var i = 0; i < psyStats.length; i++){
    //these should be strings, waiting to be transformed into integers
    if(typeof this[psyStats[i]] == 'string'){
      //does this stat rely on Psy Rating?
      if(/PR/.test(this[psyStats[i]])){
        //find the Psy Rating coefficient
        var coefficient = 1;
        var matches = this[psyStats[i]].match(/\d+/);
        if(matches){
          coefficient = Number(matches[0]);
        }
        //transform the string formula into an integer
        this[psyStats[i]] = coefficient * effectivePR
      }
    }
  }
  //next check every group value of every special rule
  this.Special = _.map(this.Special, function(rule){
    rule.Groups = _.map(rule.Groups, function(group){
      if(/^\s*\d*\s*PR\s*$/.test(group)){
        //find the Psy Rating coefficient in this group
        var coefficient = 1;
        var matches = group.match(/\d+/);
        if(matches){
          coefficient = Number(matches[0]);
        }
        //do the multiplication but keep it as a string
        group = (coefficient * effectivePR).toString();
      }
      return group;
    });
    return rule;
  });
}
