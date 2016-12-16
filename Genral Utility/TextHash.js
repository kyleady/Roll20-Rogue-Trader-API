//transforms a hash into a string and can turn a string into a hash

//it also contains a regex to find a hash within a string
function Hash(hashString) {
  //allow users to access a regex for recognized items within the hash
  this.itemRegex = function(options){
    //default to no options
    options = options || [];
    var itemRegexTxt = "([a-zA-Z0-9][a-zA-Z0-9\\s]*):\\s*\"([a-zA-Z0-9\\s]*)\"";
    if(options["text"]){
      return itemRegexTxt;
    } else {
      return new RegExp(itemRegexTxt,options["flags"]);
    }
  }

  //allow users to access a regex for recognized hashes
  this.hashRegex = function(options){
    //default to no options
    options = options || [];
    //being with curly braces
    var hashRegexTxt = "(?:\\s|<br>)*\\{";
    //within the curly braces, allow for multiple text entries preceeded by a label
    hashRegexTxt += "(?:\\s|<br>)*(?:" + this.itemRegex({text: true}) + "(?:\\s|<br>)*,(?:\\s|<br>)*)*(?:" + this.itemRegex({text: true}) + ")?(?:\\s|<br>)*";
    //end with curly braces
    hashRegexTxt += "\\}(?:\\s|<br>)*";
    if(options["text"]){
      return hashRegexTxt;
    } else {
      return new RegExp(hashRegexTxt, options["flags"]);
    }
  }

  //outputs the hash as a string
  this.toString = function(){
      var output = "{";
      for(var k in this){
        //ignore any utility functions included in the hash
        if(!(typeof this[k] === 'function')){
            output += k + ": \"" + this[k] + "\", ";
        }
      }
      //remove the last comma
      output = output.substring(0,output.length-2);
      output += "}";
      return output;
  }

  //default the hashString to something empty
  hashString = hashString || "{}";

  //find the valid part of the hashString
  if(this.hashRegex().test(hashString)){
    hashString = hashString.match(this.hashRegex())[0];
  } else {
    return;
  }

  //get a list of the items in the hash
  var itemList = hashString.match(this.itemRegex({flags: "g"}));
  //default to an empty list
  itemList = itemList || [];
  var itemRegex = this.itemRegex();
  //record each value with their associated key
  for(var i = 0; i < itemList.length; i++){
    var matches = itemList[i].match(itemRegex);
    this[matches[1]] = matches[2];
  }
}
