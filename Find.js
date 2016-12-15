//searches every handout and character sheet for titles that meet the search criteria
//whispers the first five results to the user and saves the rest to be accessed with !More
//matches[0] is the same as msg.content
//matches[1] is the search criteria
function journalSearch(matches, msg){
  //break apart the search criteria by spaces (and change it to lower case)
  var searchItems = matches[1].toLowerCase().split(" ");

  //filter the handouts and character sheets by the search criteria
  var searchResults = filterObjs(function(obj) {
    //first, be sure we are only looking at handouts and characters
    if(obj.get("_type") == "handout" || obj.get("_type") == "character"){
      //save the obj's name for repeated use
      var objName = obj.get("name").toLowerCase();
      for(var i = 0; i < searchItems.length; i++){
        if(objName.indexOf(searchItems[i]) == -1){
          return false;
        }
      }
      //be sure the player has access to this handout/character sheet
      if(playerIsGM(msg.playerid) || obj.get("inplayerjournals").split(",").indexOf("all") != -1 || obj.get("inplayerjournals").split(",").indexOf(msg.playerid)){
        //the obj met the search criteria and can be viewed by the player
        return true;
      } else {
        //the obj cannot be viewed by the player
        return false;
      }
    }else{
      //this is not a handout or character, ignore it
      return false;
    }
  });

  //erase any old search results for the specific player
  LinkList[msg.playerid] = [];
  //save the search results for the specific player
  for(var i = 0; i < searchResults.length; i++){
    LinkList[msg.playerid].push((LinkList[msg.playerid].length + 1).toString() + ". " + GetLink(searchResults[i].get("name"),"http://journal.roll20.net/" + searchResults[i].get("_type") + "/" + searchResults[i].id));
  }
  //use the moreSearch() function to privately whisper the search results to the player
  moreSearch([],msg)
}

//displays the next five search results from !Find <blah>
function moreSearch(matches,msg){
  //is there anything to show?
  if(LinkList[msg.playerid] == undefined || LinkList[msg.playerid].length <= 0){
    return whisper("No results.",msg.playerid);
  }

  //only send out the first five links
  for(var i = 1; i <= 5 && LinkList[msg.playerid].length > 0; i++){
    //privately whisper the next link to the user
    whisper(LinkList[msg.playerid][0],msg.playerid);
    //this Link has been sent. Remove it.
    LinkList[msg.playerid].shift();
  }
  //are there any Links left?
  if(LinkList[msg.playerid].length > 0){
    //whisper a button to keep showing more
    whisper(LinkList[msg.playerid].length.toString() + " [More](!More) search results.",msg.playerid);
  }
}

function GetLink (Name,Link){
    Link = Link || "";
    if(Link == ""){
        if(Name == "Quadruped"){
            Name = "Multiple Legs";
            var Handouts = findObjs({ type: 'handout', name: Name });
            if(Handouts.length > 0){
                return "<a href=\"http://journal.roll20.net/handout/" + Handouts[0].id + "\">" + Name + "</a>(4)";
            } else {
                return "[Quadruped]";
            }
        }
        var Handouts = findObjs({ type: 'handout', name: Name });
        var Characters = findObjs({ type: 'handout', name: Name });
        if(Name.indexOf("†") != -1) {
            return Name;
        } else if(Handouts.length > 0){
            return "<a href=\"http://journal.roll20.net/handout/" + Handouts[0].id + "\">" + Name + "</a>";
        } else if(Characters.length > 0){
            return "<a href=\"http://journal.roll20.net/character/" + Characters[0].id + "\">" + Name + "</a>";
        } else {
            return "[" + Name + "]";
        }
    } else {
        return "<a href=\"" + Link + "\">" + Name + "</a>";
    }
}

on("ready",function(){
  LinkList = [];

  //matches[0] is the same as msg.content
  //matches[1] is the search criteria
  CentralInput.addCMD(/^!\s*find\s+(\S.*)$/i,journalSearch,true);

  //matches[0] is the same as msg.content
  CentralInput.addCMD(/^!\s*more\s*$/i,moreSearch,true);
});
