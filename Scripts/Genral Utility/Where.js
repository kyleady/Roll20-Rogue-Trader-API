//tells the gm which map the players are currently on
//if players are on their own maps, it will report which maps they are on as well
function where(matches, msg){
  var output = "";
  //get the page where the players are by default
  if(Campaign().get("playerpageid")){
    var page = getObj("page", Campaign().get("playerpageid"));
    output = "<strong>Party</strong>: " + page.get("name");
  } else {
    output = "Player Page has not been set.";
  }
  //get the pages where individual players may have been sent
  if(Campaign().get("playerspecificpages")){
    for(var k in Campaign().get("playerspecificpages")){
      var player = getObj("player", k);
      var page = getObj("page", Campaign().get("playerspecificpages")[k]);
      output += "<br>";
      output += "<strong>" + player.get("_displayname") + "</strong>: ";
      output += page.get("name");
    }
  }
  whisper(output);
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*where\s*\?\s*$/i, where);
});
