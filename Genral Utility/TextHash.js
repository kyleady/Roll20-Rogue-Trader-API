//transforms a hash into a string and can turn a string into a hash

//it also contains a regex to find a hash within a string
function Hash(hashString) {
  //allow users to access a regex for recognized items within the hash
  this.itemRegex = function(options){
    //default to no options
    options = options || [];
    var itemRegexTxt = "(\\w[\\w\\s]*):\\s*\"([,;:-\\w\\s\\(\\)]*)\"";
    if(options["text"]){
      return itemRegexTxt;
    } else {
      return new RegExp(itemRegexTxt,options["flags"]);
    }
  }

  //allow users to access a regex for recognized hashes
  this.regex = function(options){
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
      output = output.replace(/,\s*$/, "");
      output += "}";
      return output;
  }

  //default the hashString to something empty
  hashString = hashString || "{}";

  //find the valid part of the hashString
  if(this.regex().test(hashString)){
    hashString = hashString.match(this.regex())[0];
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
