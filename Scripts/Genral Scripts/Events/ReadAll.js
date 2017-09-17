on('ready', function() {
    var Handouts = findObjs({
        _type: 'handout'
    });

    var Characters = findObjs({
        _type: 'character'
    });

    log('Reading through every handout and character');

    _.each(Handouts, function(handout){
        handout.get('notes',function(notes){notes;});
        handout.get('gmnotes',function(gmnotes){gmnotes;});
    });

    log('...');
    _.each(Characters, function(Character){
        Character.get('bio', function(bio) {bio;});
        Character.get('gmnotes', function(gmnotes) {gmnotes;});
    });

    log('Reading complete.');
});
