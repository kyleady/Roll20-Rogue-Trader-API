//A general use function which creates a hyperlink out of a the name (text) and
//the hyperlink.

//If no link is given, it will instead search your handouts and characters in
//your journal and create a link to that instead.

//If multiple candidates are found within your journal, it will choose the first
//one, defaulting to handouts before characters.

//If nothing is found, it will return just the name with no link at all

function GetLink (Name,Link){
    Link = Link || "";
    if(Link == ""){
        var Handouts = findObjs({ type: 'handout', name: Name });
        var Characters = findObjs({ type: 'handout', name: Name });
        if(Handouts.length > 0){
            return "<a href=\"http://journal.roll20.net/handout/" + Handouts[0].id + "\">" + Name + "</a>";
        } else if(Characters.length > 0){
            return "<a href=\"http://journal.roll20.net/character/" + Characters[0].id + "\">" + Name + "</a>";
        } else {
            return Name;
        }
    } else {
        return "<a href=\"" + Link + "\">" + Name + "</a>";
    }
}
