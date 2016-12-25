//a general use function that searches for all of the objects that match at
//least one of the given types and all of the given keywords
function matchingObjs(types, keywords, additionalCriteria){
  //be sure types is an array
  if(typeof types == 'string'){
    types = [types];
  }
  //ignore any empty keywords
  for(var i = 0; i < keywords.length; i++){
    if(keywords[i] == ""){
      keywords.splice(i,1);
      i--;
    }
  }
  //be sure at least one keyword was given
  //otherwise return nothing
  if(keywords.length <= 0){
    return [];
  }
  //the search is case insensitive
  for(var i = 0; i < keywords.length; i++){
    keywords[i] = keywords[i].toLowerCase();
  }
  //get an array of all of the matching objects
  return filterObjs(function(obj){
    //the object must match at least one of the types
    if(types.indexOf(obj.get("_type")) == -1){
      return false;
    }

    //get the object's name
    if(obj.get("_type") == "player"){
      var name = obj.get("_displayname");
    } else {
      var name = obj.get("name");
    }
    //the search is case insensitive
    name = name.toLowerCase();
    //the object must have every key word within it
    for(var i = 0; i < keywords.length; i++){
      if(name.indexOf(keywords[i]) == -1){
        //one of the keywords was not found, do not keep this result
        return false;
      }
    }

    //allow for additional criteria to be specified
    if(typeof additionalCriteria == 'function'){
      return additionalCriteria(obj);
    } else {
      //every valid check was passed
      return true;
    }
  });
}

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
    var permissions = result.get("inplayerjournals").split(",");
    return permissions.indexOf("all") != -1 || permissions.indexOf(msg.playerid)
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
