function Sector(){
    this.Grid = [];  //create an array to hold the system objects

    //create a function to randomly make a connected blob of systems
    this.GenerateGrid = function(size){
        //reset the grid
        this.Grid = [];
        //build up the height of the grid
        for(var i = 0; i < size; i++){
            this.Grid[i] = [];
            //build up the width of the grid
            for(var j = 0; j < size; j++){
                this.Grid[i][j] = {};
                //create a list of connections
                this.Grid[i][j].X = [];
                this.Grid[i][j].Y = [];
            }
        }

        //now that the grid exists, with a list of connections ready for each system, generate connections between the systems
        //step through each system in the grid
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                //step through each nearby system
                for(var di = -2; di <= 2; di++){
                    for(var dj = -2; dj <= 2; dj++){
                        //be sure the nearby system is within the grid
                        //also be sure we are not making a connection with ourselves
                        if(i+di >= 0 && i+di < size && j+dj >= 0 && j+dj < size && (di != 0 || dj != 0)){
                            //with this probability of a connection forming, there will be an average of 2.7 +- 1.5 connections per system
                            //if(Math.random() <= 0.03456){
                            if(Math.random() <= 0.05){
                                //be sure this is a new connection
                                //step through all of the previous connections
                                var newConnection = true;
                                for(var k = 0; k < this.Grid[i][j].X.length; k++){
                                    //are the X and Y coordinates a match?
                                    if(di == this.Grid[i][j].X[k] && dj == this.Grid[i][j].Y[k]){
                                        //this connection already exists, don't add it, and stop looking for it
                                        newConnection = false;
                                        break;
                                    }
                                }
                                //only add the connection if it is new
                                if(newConnection){
                                    //save this connection to the current system
                                    this.Grid[i][j].X.push(di);
                                    this.Grid[i][j].Y.push(dj);
                                    //save this system to the connected system
                                    this.Grid[i+di][j+dj].X.push(-di);
                                    this.Grid[i+di][j+dj].Y.push(-dj);
                                }
                            }
                        }
                    }
                }
            }
        }


        //now that the grid is randomly connected, label each connected blob
        //create a label counter
        var counter = 0;
        //step through each system
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                //does this system not have a label already?
                if(this.Grid[i][j].label == undefined){
                    //note this as part of the next blob group
                    this.Grid[i][j].label = counter;
                    //get ready for the next blob group
                    counter++;
                }
                //mark all the connected systems as being part of this blob group
                for(var k = 0; k < this.Grid[i][j].X.length; k++){
                    //be sure the connected system isn't already labeled
                    if(this.Grid[i + this.Grid[i][j].X[k]][j + this.Grid[i][j].Y[k]].label == undefined){
                        this.Grid[i + this.Grid[i][j].X[k]][j + this.Grid[i][j].Y[k]].label = this.Grid[i][j].label;
                    //have we just connected two different blobs?
                    } else if(this.Grid[i + this.Grid[i][j].X[k]][j + this.Grid[i][j].Y[k]].label != this.Grid[i][j].label) {
                        //write over the connected blob with this current one
                        //save the connect blob
                        var tempLabel = this.Grid[i + this.Grid[i][j].X[k]][j + this.Grid[i][j].Y[k]].label;
                        //search for every system with this label in the grid
                        for(var i2 = 0; i2 < size; i2++){
                            for(var j2 = 0; j2 < size; j2++){
                                if(this.Grid[i2][j2].label == tempLabel){
                                    //and change it
                                    this.Grid[i2][j2].label = this.Grid[i][j].label
                                }
                            }
                        }
                    }
                }
            }
        }

        //now that the blobs are labeled, find the biggest blob
        //create an array to tally how big each blob is
        var tally = [];
        for(var k = 0; k < counter; k++){
            tally[k] = 0;
        }
        //tally up all the systems in each blob
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                tally[this.Grid[i][j].label]++;
            }
        }
        //find the blob with the biggest tally (any ties will be forgotten)
        var largestTally = 0;
        for(var k = 1; k < tally.length; k++){
            if(tally[k] > tally[largestTally]){
                largestTally = k;
            }
        }

        //now that the largest blob has been found, delete the connections of all the systems within other blobs
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                //is this not part of the largest blob?
                if(this.Grid[i][j].label != largestTally){
                    //delete all the connections of this system
                    this.Grid[i][j].X = [];
                    this.Grid[i][j].Y = [];
                }
            }
        }

        //output the number of connections each system has
        var output = "";
        for(var i = 0; i < size; i++){
            output += "|";
            for(var j = 0; j < size; j++){
                if(this.Grid[i][j].X.length == 0){
                    output += "--";
                } else if(this.Grid[i][j].X.length < 10){
                    output += " " + this.Grid[i][j].X.length;
                } else {
                    output += this.Grid[i][j].X.length;
                }
                output += ",";
            }
            output += "|";
            output += "<br>";
        }
        //find the damage catcher character sheet
        var outputWindow = findObjs({
          _type: "character",
          name: "Damage Catcher"
        })[0];

        outputWindow.set('gmnotes',output);

        sendChat("System","/w gm Largest Blob " + tally[largestTally].toString());
    }
    //create a function to build up a map of the sector, start by hiding everything in the GM Overlay so that players cannot see what is ahead
    //this map will not have any Sector info yet, it will just be a bunch of black suns connected by lines
    this.ShowGrid = function(sectorName){
        //did the user input a sector?
        if(sectorName.length <= 0 || sectorName.length == undefined){
            sectorName = "Sector Map"
        }
        //does the sector map exist yet?
        var SectorRooms = findObjs({type: "page", name: sectorName});
        var SectorRoom;
        //if not, then create the sector map
        if(SectorRooms[0] != undefined){
            SectorRoom = SectorRooms[0];
        } else {
            //if the room does not exist, make it exist
            SectorRoom = createObj("page", {name: sectorName});
        }
        //clear the room of any objects
        //find all of the objects on this page
        var SectorGraphics = findObjs({
          _pageid: SectorRoom.id,
          _type: "graphic",
        });
        //delete each found object
        _.each(SectorGraphics, function(obj) {obj.remove();});

        //size the room according to the grid size
        SectorRoom.set("width",2*this.Grid.length);
        SectorRoom.set("height",2*this.Grid.length);

        //write the width of the connection ahead of time, so that it can be easily adjusted later
        var connectionWidth = 30;

        //add any system which has > 0 connections
        for(var i = 0; i < this.Grid.length; i++){
            for(var j = 0; j < this.Grid[i].length; j++){
                if(this.Grid[i][j].X.length > 0){
                    //where will the system and all of its connections be placed?
                    this.Grid[i][j].Left = 35 + 140 * j + randomInteger(69);
                    this.Grid[i][j].Top = 35 + 140 * i + randomInteger(69);

                    //place the system at a slightly randomized position
                    var systemToken = createObj("graphic", {
                        name: "?????",
                        _pageid: SectorRoom.id,
                        imgsrc: "https://s3.amazonaws.com/files.d20.io/images/16775325/LXeJmIMRsQLKpYrQykRfmA/thumb.png?1456822071",
                        left: this.Grid[i][j].Left,
                        top: this.Grid[i][j].Top,
                        width: 35,
                        height: 35,
                        rotation: randomInteger(360)-1,
                        layer: "objects",
                        tint_color: "#20124d",
                        showname: true,
                        showplayers_name: true,
                    });
                    //record the token id
                    this.Grid[i][j].id = systemToken.id;
                }
            }
        }

        //now that all the tokens are on the map, write down the connections with the token IDs
        for(var i = 0; i < this.Grid.length; i++){
            for(var j = 0; j < this.Grid[i].length; j++){
                //only add connection notes
                if(this.Grid[i][j].X.length > 0){
                    //reset the list of warp connections and their duration
                    var warpTravel = "";
                    for(var k = 0; k < this.Grid[i][j].X.length; k++){
                        //generate a list of travel times and the direction of travel
                        //start with the duration
                        switch(randomInteger(10)){
                            case 1: case 2:
                                var connectionDuration = randomInteger(5);
                                break;
                            case 3: case 4:
                                var connectionDuration = randomInteger(5)+5;
                                break;
                            case 5: case 6:
                                var connectionDuration = randomInteger(20) + 10;
                                break;
                            case 7: case 8:
                                var connectionDuration = randomInteger(50) + 30;
                                break;
                            case 9:
                                var connectionDuration = randomInteger(110) + 80;
                                break;
                            case 10:
                                var connectionDuration = randomInteger(110) + 190;
                                break;
                        }
                        //end with the stability
                        switch(randomInteger(10)){
                            case 1: case 2: case 3:
                                warpTravel += "Stable";
                                break;
                            case 4: case 5:
                                connectionDuration *= 2;
                                warpTravel += "Indirect";
                                break;
                            case 6:
                                connectionDuration *= 2;
                                warpTravel += "Haunted";
                                break;
                            case 7:
                                connectionDuration *= 2;
                                warpTravel += "Surly";
                                break;
                            case 8:
                                connectionDuration *= 2;
                                warpTravel += "Untraceable";
                                break;
                            case 9:
                                connectionDuration *= 2;
                                warpTravel += "Lightless";
                                break;
                            case 10:
                                connectionDuration *= 3;
                                warpTravel += "Byzantine";
                                break;
                        }
                        //note the total duration
                        warpTravel += "(" + connectionDuration.toString() + ") - ";
                        //note the id of the token we are connecting to
                        warpTravel += this.Grid[i + this.Grid[i][j].X[k]][j + this.Grid[i][j].Y[k]].id;
                        //move onto the next line
                        warpTravel += "<br>";
                        //only show half the connections so they do not double up
                        if(this.Grid[i][j].Y[k] > 0 || (this.Grid[i][j].Y[k] == 0 && this.Grid[i][j].X[k] > 0)){
                            //calculate the rotation of the connection
                            var connectionRotation = 180 /Math.PI * Math.atan((this.Grid[i][j].Top - this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Top)/(this.Grid[i][j].Left - this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Left))
                            if(connectionRotation == NaN){
                                connectionRotation = 180;
                            }
                            createObj("graphic", {
                                isdrawing: true,
                                _pageid: SectorRoom.id,
                                imgsrc: "https://s3.amazonaws.com/files.d20.io/images/16785887/qrZMRhhOvtq9Klq_lhHDFg/thumb.png?1456866191",
                                left: (this.Grid[i][j].Left + this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Left)/2,
                                top: (this.Grid[i][j].Top + this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Top)/2,
                                width: Math.sqrt(Math.pow(this.Grid[i][j].Left - this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Left,2) + Math.pow(this.Grid[i][j].Top - this.Grid[i+this.Grid[i][j].X[k]][j+this.Grid[i][j].Y[k]].Top,2)),
                                height: connectionWidth,
                                rotation: connectionRotation,
                                layer: "gmlayer",
                            });
                        }
                    }
                    //add the warpTravel note to the token
                    var systemToken = getObj("graphic", this.Grid[i][j].id);
                    systemToken.set("gmnotes",warpTravel);
                }
            }
        }


    }

    //attempts to create a NewSystem for a selected token on the map
    this.TokenToSystem = function(obj,content){
        //get the graphic object
        var graphic = getObj("graphic", obj._id);
        //be sure the graphic is defined
        if(graphic == undefined){
            //rage quit if the graphic is undefined
            return;
        }
        //be sure the graphic isn't just a drawing
        if(graphic.get("isdrawing")){
            //rage quit if the graphic is just a drawing
            return;
        }
        //get the system object ready
        var mySystem = new System();
        //create the system and record the output information
        var stars = mySystem.Generate(content,graphic.get("gmnotes"));
        delete mySystem;
        //add some variance to the size
        var sizeVariance = (74+randomInteger(51))/100;
        //edit the size of the token
        graphic.set("width",18*stars.StarSizes[0]*sizeVariance);
        graphic.set("height",18*stars.StarSizes[0]*sizeVariance);
        //edit the color of the token
        graphic.set("tint_color",stars.StarTypes[0]);
        //edit the name of the token
        graphic.set("name",stars.SystemName);
        //make the token represent this system
        graphic.set("represents",stars.id)
        //add any additional stars to the map
        //start at a specific angle
        var angle0 = randomInteger(360);
        for(var k = 1; k < stars.StarTypes.length; k++){
            //add some variance to the size
            var sizeVariance = (74+randomInteger(51))/100;
            createObj("graphic", {
                isdrawing: true,
                _pageid: graphic.get("_pageid"),
                imgsrc: "https://s3.amazonaws.com/files.d20.io/images/16775325/LXeJmIMRsQLKpYrQykRfmA/thumb.png?1456822071",
                left: graphic.get("left") + 35 * Math.cos(60*k + angle0),
                top: graphic.get("top") + 35 * Math.sin(60*k + angle0),
                width: 18*stars.StarSizes[k]*sizeVariance,
                height: 18*stars.StarSizes[k]*sizeVariance,
                rotation: randomInteger(360)-1,
                layer: "map",
                tint_color: stars.StarTypes[k],
            });
        }
    }

    this.UpdateConnections = function(token){
        //get the graphic
        var graphic = getObj("graphic",token._id);
        //does the graphic exist?
        if(graphic == undefined){return;}
        //is the graphic just a drawing?
        if(graphic.get("isdrawing")){return;}
        //get the associated character sheet
        var character = getObj("character",graphic.get("represents"));
        //does the character sheet exist?
        if(character == undefined){return;}
        //get the GMNotes
        var GMNotes = "";
        character.get("gmnotes",function(gmnotes){
            GMNotes = gmnotes;
        });
        //be sure we loaded the gmnotes right. This usually doesn't happen on the first try
        if(GMNotes == ""){
            sendChat("System", "/w gm " + character.get("name") + " is empty. Once more, with feeling.");
            return;
        }
        var bulletEnd = -1;
        //does the GMNotes start with information about warp routes?
        if(GMNotes.substring(0,19) == "Warp Routes<br><ul>"){
            //find the end of the bullet point group
            bulletEnd = GMNotes.indexOf("</ul>");
        }
        //create the system object
        var mySystem = new System();
        //be sure the bullet group end is found
        if(bulletEnd >= 0){
            //replace the old connections
            //start after "</ul>" finishes
            GMNotes = mySystem.WriteWarpRoutes(graphic.get("gmnotes")) + GMNotes.substring(bulletEnd+5);
        } else {
            //tack the connection onto the beginning
            GMNotes = mySystem.WriteWarpRoutes(graphic.get("gmnotes")) + GMNotes;
        }
        //record the GMNotes
        character.set("gmnotes",GMNotes);
        //alert the GM
        sendChat("System","/w gm " + graphic.get("name") + "'s connections updated.");
    }

}

on("chat:message", function(msg) {
if(msg.type == 'api' && msg.content.indexOf('!NewSector ') == 0 && playerIsGM(msg.playerid)){
    mySector = new Sector();
    mySector.GenerateGrid(Number(msg.content.substring(11)));
} else if(msg.type == 'api' && msg.content.indexOf("!ShowSector") == 0 && playerIsGM(msg.playerid)){
    mySector.ShowGrid(msg.content.substring(12));
    sendChat("System", "/w gm Sector Shown")
} else if(msg.type == 'api' && msg.content == "!TokenInfo" && playerIsGM(msg.playerid)){
    if(msg.selected){
        //find the character the token represents
        var graphic = getObj("graphic", msg.selected[0]._id);
        //be sure the graphic is valid
        if(graphic == undefined){
            sendChat(msg.who, "/em - graphic undefined.")
            return;
        }
        log("imgsrc");
        log(graphic.get("imgsrc"));
        log("left");
        log(graphic.get("left"));
        log("top");
        log(graphic.get("top"));
        log("layer");
        log(graphic.get("layer"));
    }
} else if(msg.type == "api" && msg.content.indexOf("!NewSystem") == 0 && playerIsGM(msg.playerid) && msg.selected) {
    mySector = new Sector();
    _.each(msg.selected,function(obj){
        mySector.TokenToSystem(obj,msg.content)
    });
} else if(msg.type == "api" && msg.content.indexOf("!UpdateConnections") == 0 && playerIsGM(msg.playerid) && msg.selected){
    log("connections")
    mySector = new Sector();

    _.each(msg.selected,function(obj){
        log(obj)
        mySector.UpdateConnections(obj)
    });
}
});
