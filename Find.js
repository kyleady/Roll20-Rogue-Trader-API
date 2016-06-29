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
if(msg.type == "api" && msg.content.indexOf("!Find ") == 0){
    log("Find")
    //STEP 1 - break apart their input
    //save what they are looking for (and ignore any capitalization)
    var searchText = msg.content.substring(6).toLowerCase();
    //divide the search text into pieces
    var searchItems = [];
    var searchItem = "";
    for(i = 0; i < searchText.length; i++){
        if(searchText[i] == " "){
            //space mark separation of words, save this word if it is worth saving
            if(searchItem != ""){
                //save the search item into search Items
                searchItems.push(searchItem);
            }
            //start the search item all over again
            searchItem = "";
        } else {
            //otherwise the character is of interest. Save it.
            searchItem += searchText[i];
        }
    }
    //be sure to save any last search items
    if(searchItem != ""){
        //save the search item into search Items
        searchItems.push(searchItem);
    }
    log(searchItems)
    //STEP 2 - make a list of all the handouts and characters that meet the search criteria
    
    //save a list of handouts and characters
    LinkList[msg.playerid] = [];
    var handoutList = findObjs({_type: "handout"});
    log(handoutList.length)
    var characterList = findObjs({_type: "character"});
    log(characterList.length)
    //step through every handout
    for(i = 0; i < handoutList.length; i++){
        //assume that the search items will match
        var MeetsCriteria = true;
        //step through each word in the search criteria
        for(j = 0; j < searchItems.length; j++){
            //is this search word NOT in the handout title?
            if(handoutList[i].get("name").toLowerCase().indexOf(searchItems[j]) == -1){
                //this document did not meet one of the search words. RAGE QUIT
                //also note that this document did not meet all the search criteria
                MeetsCriteria = false
                break;
            }
        }
        if(MeetsCriteria){
           //be sure the player can view the link
            if(playerIsGM(msg.playerid) || handoutList[i].get("inplayerjournals") == "all" || handoutList[i].get("inplayerjournals").indexOf(msg.playerid) != -1){
                LinkList[msg.playerid].push((LinkList[msg.playerid].length+1) + ". " + GetLink(handoutList[i].get("name"),"http://journal.roll20.net/handout/" + handoutList[i].id));
            }
        }
    }
    //step through every character
    for(i = 0; i < characterList.length; i++){
        //assume that the search items will match
        var MeetsCriteria = true;
        //step through each word in the search criteria
        for(j = 0; j < searchItems.length; j++){
            //is this search word NOT in the handout title?
            if(characterList[i].get("name").toLowerCase().indexOf(searchItems[j]) == -1){
                //this document did not meet one of the search words. RAGE QUIT
                //also note that this document did not meet all the search criteria
                MeetsCriteria = false
                break;
            }
        }
        if(MeetsCriteria){
            //be sure the player can view the link
            if(playerIsGM(msg.playerid) || characterList[i].get("inplayerjournals") == "all" || characterList[i].get("inplayerjournals").indexOf(msg.playerid) != -1){
                LinkList[msg.playerid].push((LinkList[msg.playerid].length+1) + ". " + GetLink(characterList[i].get("name"),"http://journal.roll20.net/character/" + characterList[i].id));
            }
        }
    }
    
    //STEP 3 - output the top 5 Link List back to the sender
    
    //who are we talking to?
    var whisperTarget = msg.who;
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //report if there were no results
    if(LinkList[msg.playerid].length <= 0){
        sendChat("System","/w " + whisperTarget + " No results matched your criteria.");
    }
    //only send out the first five links
    for(i = 1; i <= 5 && LinkList[msg.playerid].length > 0; i++){
        //whisper the Link to the sender
        sendChat("System","/w " + whisperTarget + " " + LinkList[msg.playerid][0]);
        //this Link has been sent. Remove it. 
        LinkList[msg.playerid].shift();
    }
    //are there any Links left?
    if(LinkList[msg.playerid].length > 0){
        //whisper the Link to the sender
        sendChat("System","/w " + whisperTarget + " " + LinkList[msg.playerid].length.toString() + " [More](!More) links remain.");
    }
    
} else if(msg.type == "api" && msg.content == "!More"){
    if(LinkList[msg.playerid] && LinkList[msg.playerid].length > 0){
        //who are we talking to?
        var whisperTarget = msg.who;
        //shorten the target name to one word
        if(whisperTarget.indexOf(" ") != -1){
            whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
        }
        //only send out the first five links
        for(i = 1; i <= 5 && LinkList[msg.playerid].length > 0; i++){
            //whisper the Link to the sender
            sendChat("System","/w " + whisperTarget + " " + LinkList[msg.playerid][0]);
            //this Link has been sent. Remove it. 
            LinkList[msg.playerid].shift();
        }
        //are there any Links left?
        if(LinkList[msg.playerid].length > 0){
            //whisper the Link to the sender
            sendChat("System","/w " + whisperTarget + " " + LinkList[msg.playerid].length.toString() + " [More](!More) links remain.");
        }
    }
} else if(msg.type == "api" && msg.content.indexOf("!Link ") == 0 && playerIsGM(msg.playerid)){
    var linkText = GetLink(msg.content.substr(6));
    if(linkText.length > 0 && linkText[0] != "["){
        sendChat("player|" + msg.playerid,linkText);
    } else {
        sendChat("System","/w gm " + linkText + " not found.")
    }
}
});