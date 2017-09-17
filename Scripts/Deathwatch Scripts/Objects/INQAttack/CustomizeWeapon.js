INQAttack = INQAttack || {};

//let the given options temporarily overwrite the details of the weapon
INQAttack.customizeWeapon = function(){
  for(var label in INQAttack.inqweapon){
    //only work with labels that options has
    if(INQAttack.options[label] != undefined){
      //if label -> array, don't overwrite just add each item on as a link
      if(Array.isArray(INQAttack.inqweapon[label])){
        _.each(INQAttack.options[label].split(","), function(element){
          if(element.trim() != ""){
            INQAttack.inqweapon[label].push(new INQLink(element.trim()));
          }
        });
        //check if the value we are overwriting is a number
      } else if(typeof INQAttack.inqweapon[label] == 'number'){
        INQAttack.inqweapon[label] = Number(INQAttack.options[label]);
      } else {
        //otherwise simply overwrite the label
        INQAttack.inqweapon[label] = INQAttack.options[label];
      }
    }
  }

  if(typeof INQAttack.inqweapon.Special == 'string'){
    INQAttack.inqweapon.Special = _.map(INQAttack.inqweapon.split(","), function(rule){
      return new INQLink(rule);
    });
  }
}
