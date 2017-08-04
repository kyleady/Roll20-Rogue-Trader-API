//searches every handout and character sheet for titles that meet the search criteria
//whispers the first five results to the user and saves the rest to be accessed with !More
//matches[0] is the same as msg.content
//matches[1] is the search criteria
function journalSearch(matches, msg){
  //break apart the search criteria by spaces (and change it to lower case)
  var keywords = matches[1].toLowerCase().split(" ");

  //get a list of all the handouts and characters that have every keyword and
  //that can be viewed by the current player
  var searchResults = matchingObjs(["handout", "character"], keywords, function(obj){
    //the gm can view any handout or character
    if(playerIsGM(msg.playerid)){return true;}
    //be sure the current player can view this handout/character
    var permissions = obj.get("inplayerjournals").split(",");
    return permissions.indexOf("all") != -1 || permissions.indexOf(msg.playerid) != -1
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

on("ready",function(){
  LinkList = [];

  //matches[0] is the same as msg.content
  //matches[1] is the search criteria
  CentralInput.addCMD(/^!\s*find\s+(\S.*)$/i,journalSearch,true);

  //matches[0] is the same as msg.content
  CentralInput.addCMD(/^!\s*more\s*$/i,moreSearch,true);
});
