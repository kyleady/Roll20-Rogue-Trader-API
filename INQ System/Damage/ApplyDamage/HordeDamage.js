//when damaging a horde, the damage is based on the number of hits
on("ready",function(){
  INQAttack.hordeDamage = function(damage){
    //if the damage is non-zero, overwrite the damage with the number of Hits
    //(gm's can add bonus horde damage beforehand by modifying the number of
    //hits. This is will leave the damage unaffected on other tokens.)
    if(damage > 0){
      //at base it is the number of hits
      damage = this.Hits.get("Current");
      //explosive damage deals one extra point of horde damage
      if(this.DamType.get("current").toUpperCase() == "X"){
        damage++;
      }
      //FUTURE WORK: add devastating damage to the magnitude damage
    }

    //return the magnitude damage
    return damage;
  }
});
