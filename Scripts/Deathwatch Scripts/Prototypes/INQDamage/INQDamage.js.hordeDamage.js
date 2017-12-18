INQDamage.prototype.hordeDamage = function(graphic) {
  if(this.damage > 0){
    var damage = Number(this.Hits.get('current'));
    if(!damage && damage != 0) return whisper('Hits is not valid.');
    var members = getHorde(graphic);
    var killed = [];
    for(var i = 0; i < damage; i++) {
      if(!members.length) break;
      var index = randomInteger(members.length) - 1;
      killed.push(members[index]);
      members.splice(index, 1);
    }


    this.Hits.set('current', damage - killed.length);
    damage = killed.length;
    for(var i = 0; i < damage; i++) {
      killed[i].set('status_dead', true);
      damageFx(killed[i], attributeValue('DamageType'));
    }
  } else {
    var damage = 0;
  }

  announce('**' + this.inqcharacter.toLink() + '** Horde took [[' + damage + ']] damage.');
}
