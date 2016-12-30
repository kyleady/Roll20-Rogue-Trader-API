//a prototype the will parse handouts and character sheets for use by other prototypes
function INQParser(object){
  //the text that will be parsed
  this.Text = "";
  //the parsing function
  this.parse = function(){
    //empty out any old content
    this.Tables = [];
    this.Rules  = [];
    this.Lists  = [];
    this.Misc   = [];

    //break the text up by lines
    var Lines = this.Text.split(/(?:<br>|\n|<\/?ul>|<\/?li>)/);
    Lines = this.balanceLinkTags(Lines);
    for(var i = 0; i < Lines.length; i++){
      log(Lines[i]);
      this.parseLine(Lines[i]);
    }
    //finish off any in-progress lists
    this.completeOldList();
  }

  //disect a single line
  this.parseLine = function(line){
    //be sure there is a line to work with
    if(!line){return;}
    //complete any bold tags separated by lines
    line = this.closeBoldTags(line);
    //try each way of parsing the line and quit when it is successful
    if(this.parseRule(line)){return;}
    if(this.parseTable(line)){return;}
    if(this.parseBeginningOfList(line)){return;}
    if(this.addToList(line)){return;}
    //if nothing fits, add the line to the misc content
    this.addMisc(line);
  }

  //sometimes a link tag can be split onto multiple lines
  //close every link tag that is imbalanced
  this.balanceLinkTags = function(Lines){
    var opener = undefined;
    return _.map(Lines, function(line){
      var matches = line.match(/<\/a>/g);
      if(matches == null){matches = [];}
      var closers = matches.length;

      matches = line.match(/<a href=\"https?:\/\/[^\s>]*\">/g);
      if(matches == null){matches = [];}
      var openers = matches.length;

      //close up any links that may have been extend to another line
      while(openers > closers){
        line += "</a>";
        closers++;
      }

      //remove any link closers that have been pushed to this line
      while(closers > openers){
        line = line.replace(/<\/a>/, "");
        closers--;
      }

      return line;
    });
  }

  //if there is an imbalance of bold tags, balance it out
  this.closeBoldTags = function(line){
    //count the number of tags beginning a bold section
    var matches = line.match(/<(?:strong|em)>/g);
    if(matches == null){matches = [];}
    var openers = matches.length;

    //count the number of tags ending a bold section
    var matches = line.match(/<\/(?:strong|em)>/g);
    if(matches == null){matches = [];}
    var closers = matches.length;

    //check for imbalances and rectify them
    while(openers > closers){
      line += "</strong>";
      closers++;
    }
    while(closers > openers){
      line = "<strong>" + line;
      openers++;
    }
    //return the balanced line
    return line;
  }

  //if this line is a rule, save it
  this.parseRule = function(line){
    var re = /^\s*<(?:strong|em)>(.+?)<\/(?:strong|em)>\s*:\s*(.+)$/;
    var matches = line.match(re);
    if(matches){
      //finish off any in-progress lists
      this.completeOldList();
      //add the rule
      this.Rules.push({
        Name:    matches[1],
        Content: matches[2]
      });
      //this line has been properly parsed
      return true;
    }
    return false;
  }
  //if this is the beginning of a new list, start a new list
  this.parseBeginningOfList = function(line){
    var re = /^\s*<(?:strong|em)>([^:]+)<\/(?:strong|em)>\s*$/;
    var matches = line.match(re);
    if(matches){
      //tidy up the last list first
      this.completeOldList();
      //start the new list
      this.newList = {
        Name: matches[1],
        Content: [],
        Type: "List"
      }
      //this line has been properly parsed
      return true;
    }
    return false;
  }

  //complete the old list and save it, preparing for a new list
  this.completeOldList = function(){
    if(this.newList != undefined){
      this.Lists.push(this.newList);
      this.newList = undefined;
    }
  }

  //if this line is a table, save it
  this.parseTable = function(line){
    var re = /^\s*(.*)\s*<table>(.*)<\/table>\s*$/;
    var matches = line.match(re);
    if(matches){
      //finish off any in-progress lists
      this.completeOldList();
      //store the content of the tables here
      var table = [];
      //break the table into rows
      re = /<tr>(.*?)<\/tr>/g
      var rows = matches[2].match(re);
      if(rows == null){rows = [];}
      for(var i = 0; i < rows.length; i++){
        //break each row into cells, while maintaining the overall structure
        re = /<td>(.*?)<\/td>/g
        var cells = rows[i].match(re);
        if(cells == null){cells = [];}
        for(var j = 0; j < cells.length; j++){
          //trim down each cell to just the content
          cells[j] = cells[j].replace(/<\/?td>/g, "");
          //be sure a column exists for the content
          table[j] = table[j] || [];
          //save the content
          table[j][i] = cells[j];
        }
      }
      //the table has been disected, save it
      this.Tables.push({
        Name:    matches[1],
        Content: table
      });
      //the line was properly parsed
      return true;
    }
    return false;
  }

  //add misc content to the current list (if it exists)
  this.addToList = function(line){
    //be sure there is a list to add to
    if(this.newList != undefined){
      this.newList.Content.push(line);
      //this line was accepted
      return true;
    }
    return false;
  }

  //if there was no place for this line, add it as misc content
  this.addMisc = function(line){
    this.Misc.push({
      Name:    "",
      Content: line
    })
  }

  //extract the text out of an object
  this.objectToText = function(obj){
    var Notes = "";
    //compile the notes based on the object type
    switch(obj.get("_type")){
      case "handout":
        obj.get("notes", function(notes){Notes += notes;});
        break;
      case "character":
        obj.get("bio", function(bio){Notes += bio;});
        break;
    }
    obj.get("gmnotes", function(gmnotes){Notes += "<br>" + gmnotes;});
    //save the result
    this.Text = Notes;
  }

  //allow the user to specify the object to parse in the constructor
  if(object != undefined){
    //get the text to parse
    this.objectToText(object);
    //parse the text
    this.parse();
  }
}
