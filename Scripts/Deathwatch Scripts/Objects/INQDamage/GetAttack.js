INQAttack = INQAttack || {};
//record the details of the attack into the object
INQAttack.getAttack = function(){
    //get the damage details obj
    var details = damDetails();

    //quit if one of the details was not found
    if(details == undefined){return;}

    //record the attack details for use elsewhere in the object
    INQAttack.DamType = details.DamType;
    INQAttack.Dam     = details.Dam;
    INQAttack.Pen     = details.Pen;
    INQAttack.Prim    = details.Prim;
    INQAttack.Fell    = details.Fell;
    INQAttack.Hits    = details.Hits;
    INQAttack.OnesLoc = details.OnesLoc;
    INQAttack.TensLoc = details.TensLoc;

    //return that reading the details was successful
    return true;
}
