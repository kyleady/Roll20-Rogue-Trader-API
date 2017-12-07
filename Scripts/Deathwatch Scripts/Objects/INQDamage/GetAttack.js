INQAttack_old = INQAttack_old || {};
//record the details of the attack into the object
INQAttack_old.getAttack = function(){
    //get the damage details obj
    var details = damDetails();

    //quit if one of the details was not found
    if(details == undefined){return;}

    //record the attack details for use elsewhere in the object
    INQAttack_old.DamType = details.DamType;
    INQAttack_old.Dam     = details.Dam;
    INQAttack_old.Pen     = details.Pen;
    INQAttack_old.Prim    = details.Prim;
    INQAttack_old.Fell    = details.Fell;
    INQAttack_old.Hits    = details.Hits;
    INQAttack_old.OnesLoc = details.OnesLoc;
    INQAttack_old.TensLoc = details.TensLoc;

    //return that reading the details was successful
    return true;
}
