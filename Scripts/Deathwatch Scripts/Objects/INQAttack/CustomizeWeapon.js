INQAttack_old = INQAttack_old || {};

//let the given options temporarily overwrite the details of the weapon
INQAttack_old.customizeWeapon = function(){
  for(var label in INQAttack_old.inqweapon){
    //only work with labels that options has
    if(INQAttack_old.options[label] != undefined){
      //if label -> array, don't overwrite just add each item on as a link
      if(Array.isArray(INQAttack_old.inqweapon[label])){
        _.each(INQAttack_old.options[label].split(","), function(element){
          if(element.trim() != ""){
            INQAttack_old.inqweapon[label].push(new INQLink(element.trim()));
          }
        });
        //check if the value we are overwriting is a number
      } else if(typeof INQAttack_old.inqweapon[label] == 'number'){
        INQAttack_old.inqweapon[label] = Number(INQAttack_old.options[label]);
      } else {
        //otherwise simply overwrite the label
        INQAttack_old.inqweapon[label] = INQAttack_old.options[label];
      }
    }
  }

  if(typeof INQAttack_old.inqweapon.Special == 'string'){
    INQAttack_old.inqweapon.Special = _.map(INQAttack_old.inqweapon.split(","), function(rule){
      return new INQLink(rule);
    });
  }
}
