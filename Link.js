//searches for a link, if found creates a hyperlink, if not just leaves it as [Name]
function GetLink (Name,Link){
    Link = Link || "";
    if(Link == ""){
        if(Name == "Quadruped"){
            Name = "Multple Legs";
            var Handouts = findObjs({ type: 'handout', name: Name });
            if(Handouts.length > 0){
                return "<a href=\"http://journal.roll20.net/handout/" + Handouts[0].id + "\">" + Name + "</a>(4)";    
            } else {
                return "[Quadruped]";
            }
        }
        var Handouts = findObjs({ type: 'handout', name: Name });
        var Characters = findObjs({ type: 'character', name: Name });
        if(Name.indexOf("†") != -1) {
            return Name;
        } else if(Handouts.length > 0){
            return "<u><a href=\"http://journal.roll20.net/handout/" + Handouts[0].id + "\">" + Name + "</a></u>";    
        } else if(Characters.length > 0){
            return "<u><a href=\"http://journal.roll20.net/character/" + Characters[0].id + "\">" + Name + "</a></u>";    
        } else {
            return "[" + Name + "]";
        }
    } else {
        return "<a href=\"" + Link + "\">" + Name + "</a>";
    }
}

on("chat:message", function(msg) {
if(msg.type == "api" && msg.content.indexOf("!Link ") == 0 && playerIsGM(msg.playerid)){
    var linkText = GetLink(msg.content.substr(6));
    if(linkText.length > 0 && linkText[0] != "["){
        sendChat("player|" + msg.playerid,linkText);
    } else {
        sendChat("System","/w gm " + linkText + " not found.")
    }
}
});
