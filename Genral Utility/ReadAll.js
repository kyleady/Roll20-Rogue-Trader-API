//Looking at the bio or notes of a handout or character sheet gives you nothing the first time you try
//This ad hoc function tries every bio and note once, eliminating that annoying first time from user perception
on("ready", function() {
    ///gather up all the handouts
    var Handouts = findObjs({
        _type: "handout"
    });
    //gather up all the characters
    var Characters = findObjs({
        _type: "character"
    });

    log("Reading through every handout and character")
    //step through each handout
    _.each(Handouts, function(handout){
        handout.get("notes",function(notes){notes;});
        handout.get("gmnotes",function(gmnotes){gmnotes;});
    });
    log("...")
    //step through each character
    _.each(Characters, function(Character){
        Character.get("bio", function(bio) {bio;});
        Character.get("gmnotes", function(gmnotes) {gmnotes;});
    });
    log("Reading complete.")
});
