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
        var objs = filterObjs(function(obj) {
          if(obj.get("_type") == "handout" || obj.get("_type") == "character"){
            var regex = "^" + Name.replace(/[\.\+\*\[\]\(\)\{\}\^\$\?]/g, function(match){return "\\" + match}).replace(/(-|–|\s)/, "(-|–|\\s)") + "$";
            var re = RegExp(regex, "i");
            return re.test(obj.get("name"));
          } else {return false;}
        });
        objs = trimToPerfectMatches(objs, Name);
        if(objs.length > 0){
          return "<a href=\"http://journal.roll20.net/" + objs[0].get("_type") + "/" + objs[0].id + "\">" + objs[0].get("name") + "</a>";
        } else {
            return Name;
        }
    } else {
        return "<a href=\"" + Link + "\">" + Name + "</a>";
    }
}
