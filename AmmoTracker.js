function AmmoTracker(){
//records the notes of the weapon, utilized in all the get functions
this.notes = "";
//take the given roll and calculate the location
this.calculateLocation = function(roll){
    //calculate Tens Location
    var tens = Math.floor(roll/10);
    //calculate Ones Location
    var ones = roll - 10*tens;
    //load up the GM variables
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the TensLocation variable to save the result in
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "TensLocation" })[0];
    attribObj.set("current",tens);
    //load up the OnesLocation variable to save the result in
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "OnesLocation" })[0];
    attribObj.set("current",ones);
    //where did you hit?
    var Location = "";
    switch(ones){
        case 10: case 0: Location = "Head"; break;
        case 9: case 8: 
            switch(tens % 2){
                case 0: Location = "Right "; break;
                case 1: Location = "Left "; break;
            } Location += "Arm"; break;
        case 4: case 5: case 6: case 7: Location = "Body"; break;
        case 3: case 2: case 1: 
            switch(tens % 2){
                case 0: Location = "Right "; break;
                case 1: Location = "Left "; break;
            } Location += "Leg"; break;
    }
    //send the total Damage at a 1 second delay
    setTimeout(sendChat,100,"System","/w gm <strong>Location</strong>: " + Location)
}
//searches the weapon notes for the class of the weapon
this.getClass = function(){
    //record what signifies the location of Class
    var signifier = "<strong>Class</strong>: ";
    //record where the class of the weapon begins (right after "Class: ")
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, abort with nothing to show
    if(this.notes.indexOf(signifier) == -1){return "";}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    if(stopIndex == -1){
        return this.notes.substring(startIndex);
    } else {
        return this.notes.substring(startIndex,stopIndex);
    }
}
//searches the weapon notes for the range of the weapon in number form
this.getRange = function(){
    //record what signifies the location of Range
    var signifier = "<strong>Range</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, abort with nothing to show
    if(this.notes.indexOf(signifier) == -1){return 0;}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    var output;
    if(stopIndex == -1){
        output =  this.notes.substring(startIndex);
    } else {
        output = this.notes.substring(startIndex,stopIndex);
    }
    //check the Range for any listing of PR (psychic rating)
    var isPsy = false;
    //the Psy Rating will be listed in either the format 10m x PR or PR x 10m
    if(output.indexOf("PR") != -1){
        output = output.replace("PR","");
        isPsy = true;
        //clean up the excesss junk of " x "
        output = output.replace(" x ","");
    }
    //remove any listing of meter
    output = output.replace("m","");
    //check to see if the range is listed in km
    if(output.indexOf("k") != -1){
        output = 1000*Number(output.replace("k",""));
    }
    //turn the output into a number
    output = Number(output);
    //negative numbers will indicate that Psy Rating multiplies the range
    if(isPsy){
        //be sure the final output is sensible
        if(output){
            return -1 * output;
        } else {
            //if PR was listed, but nothing else, then the range was PR which is equal to PR x 1m
            return -1;
        }
    }
    //be sure the final output is sensible
    if(output){
        return output;
    } else {
        return 0;
    }
}
//returns true if the weapon can fire on single. If nothing is found it will return true as most weapons can fire once. It must be stated that it cannot fire once
this.getSingle = function(){
    //record what signifies the location of Class
    var signifier = "<strong>RoF</strong>: ";
    //record where the class of the weapon begins 
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Rate of Fire</strong>: ";
        //record where the class of the weapon begins 
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return true;}
    }
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("/",startIndex);
    //if there was no end of the line, just search until the end of the notes
    if(stopIndex == -1){
        return this.notes.substring(startIndex).indexOf("S") != -1;
    } else {
        return this.notes.substring(startIndex,stopIndex).indexOf("S") != -1;
    }
}
//returns the number of shots the weapon fires on semi-auto, by default 0
this.getSemi = function(){
    //record what signifies the location of Class
    var signifier = "<strong>RoF</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Rate of Fire</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //move forward to the rapid fire number S/[3]/6
    startIndex = this.notes.indexOf("/",startIndex)+1;
    //if nothing was found, something is up. Just quit
    if(startIndex == 0){return 0;}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("/",startIndex);
    //if there was no end of the line, just search until the end of the notes
    var output;
    if(stopIndex == -1){
        output = Number(this.notes.substring(startIndex));
    } else {
        output = Number(this.notes.substring(startIndex,stopIndex));
    }
    //be sure the final output is sensible
    if(output){
        return output;
    } else {
        return 0;
    }
}
//returns the number of shots the weapon fires on full-auto, by default 0
this.getFull = function(){
    //record what signifies the location of Class
    var signifier = "<strong>RoF</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Rate of Fire</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //move forward to the rapid fire number S/[3]/6
    startIndex = this.notes.indexOf("/",startIndex)+1;
    //if nothing was found, something is up. Just quit
    if(startIndex == 0){return 0;}
    //move forward to the full auto number S/3/[6]
    startIndex = this.notes.indexOf("/",startIndex)+1;
    //if nothing was found, something is up. Just quit
    if(startIndex == 0){return 0;}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    var output;
    if(stopIndex == -1){
        output = Number(this.notes.substring(startIndex));
    } else {
        output = Number(this.notes.substring(startIndex,stopIndex));
    }
    //be sure the final output is sensible
    if(output){
        return output;
    } else {
        return 0;
    }
}
//returns the flat bonus to the damage roll. 2D10+[6]
this.getDamageBase = function(){
    //record what signifies the location of damage
    var signifier = "<strong>Damage</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of damage
        signifier = "<strong>Dam</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //move past the D10
    if(this.notes.indexOf("D10",startIndex) != -1){startIndex = this.notes.indexOf("D10",startIndex) + 3;}
    else if(this.notes.indexOf("D5",startIndex) != -1){startIndex = this.notes.indexOf("D5",startIndex) + 2;}
    //find the end of the search area
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if no end was found, get it all
    var snippet;
    if(stopIndex == -1){ snippet = this.notes.substring(startIndex);}
    else {snippet = this.notes.substring(startIndex,stopIndex); }
    //check to see if the DamageType is included in a Hyperlink
    stopIndex = snippet.indexOf("<a href=");
    //if a link was not found, you will have to work with 
    if(stopIndex == -1){
        if(snippet.indexOf("I") != -1){
            //Impact Damage
            stopIndex = snippet.indexOf("I");
        } else if(snippet.indexOf("R") != -1){
            //Rending Damage
            stopIndex = snippet.indexOf("R");
        } else if(snippet.indexOf("X") != -1){
            //Explosive Damage
            stopIndex = snippet.indexOf("X");
        } else if(snippet.indexOf("E") != -1){
            //Energy Damage
            stopIndex = snippet.indexOf("E");
        } else {
            //the damage type must not have been listed
            stopIndex = snippet.length;
        }
    } 
    //narrow in on the target area
    snippet = snippet.substring(0,stopIndex);
    //if D10 x PR was listed, throw that out, we want the starting base
    snippet = snippet.replace(" x PR","");
    //if any Psy Rating remans, note it down
    var isPsy = false;
    if(snippet.indexOf("PR") != -1){
        snippet.replace("PR","");
        isPsy = true;
    }
    if(Number(snippet)) {
        //since base damage can be negative, PR cannot be indicated by a negative number
        //damage will be assumed to be reasonable, and thus PR will be indicated by adding 2000 to it
        //if the stored damage is >= 1000 then it will subtract 2000 damage and multiply it by PR
        if(isPsy){
            return Number(snippet) + 2000;
        }
        //return the additional damage that was placed before the end
        return Number(snippet);
    } else {
        //since base damage can be negative, PR cannot be indicated by a negative number
        //damage will be assumed to be reasonable, and thus PR will be indicated by adding 2000 to it
        //if the stored damage is >= 1000 then it will subtract 2000 damage and multiply it by PR
        //if nothing was left then it is assumed PR damage was added thus multiplying PR by 1
        if(isPsy){
            return 1 + 2000;
        }
        //if nothing was found, then there must have been no damage base to note
        return 0;
    }
    
}
//returns the number of D10s used in the damage roll. [2]D10+6
this.getD10s = function(){
    //record what signifies the location of Class
    var signifier = "<strong>Damage</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Dam</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //find the end of the search area
    var stopIndex = this.notes.indexOf("D10",startIndex);
    //if there was no D10 on this line, the number of D10s is 0
    if(stopIndex == -1 || stopIndex > this.notes.indexOf("<br>",startIndex) ){
        return 0;
    } else if (stopIndex == startIndex) {
        //then the searchable section starts with something like D10+3 E
        return 1;
    } else {
        //if it starts with PR x then the number of dice is multiplied by Psy Rating
        if(this.notes.substring(startIndex,stopIndex).indexOf("PR x ") != -1){
            var snippet = this.notes.substring(startIndex,stopIndex).replace("PR x ","");
            //output the number of D10s, make it negative to indicate that they are multiplied by PR
            if(Number(snippet)){
                return -1 * Number(snippet);
            } else {
                //there was nothing left, it was likly "PR x D10" -> PR x 1D10
                return -1;
            }
        }
        
        //otherwise it has found a number right before D10, output that number
        if(Number(this.notes.substring(startIndex,stopIndex))){
            return Number(this.notes.substring(startIndex,stopIndex))
        } else {
            //the return was nonsensicle, 0 is for failure
            return 0;
        }
    }
}
//returns the number of D5s used in the damage roll. [3]D5+6
this.getD5s = function(){
    //record what signifies the location of Damage
    var signifier = "<strong>Damage</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Dam</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //find the end of the search area
    var stopIndex = this.notes.indexOf("D5",startIndex);
    //if there was no D10 on this line, the number of D10s is 0
    if(stopIndex == -1 || stopIndex > this.notes.indexOf("<br>",startIndex) ){
        return 0;
    } else if (stopIndex == startIndex) {
        //then the searchable section starts with something like D10+3 E
        return 1;
    } else {
        //otherwise it has found a number right before D5, output that number
        if(Number(this.notes.substring(startIndex,stopIndex))){
            return Number(this.notes.substring(startIndex,stopIndex))
        } else {
            //the return was nonsensicle, 0 is for failure
            return 0;
        }
    }
}
//returns the damage type of the weapon in the form of Explosive, Impact, Energy, or Rending
this.getDamageType = function(){
    //record what signifies the location of Damage
    var signifier = "<strong>Damage</strong>: ";
    //record where the class of the weapon begins
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Dam</strong>: ";
        //record where the class of the weapon begins
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return "I";}
    }
    //find the end of the search area
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //get a smaller area to work with
    var snippet;
    if(stopIndex == -1){
        snippet = this.notes.substring(startIndex);
    } else {
        snippet = this.notes.substring(startIndex,stopIndex);
    }
    //check for the hyperlink around the Damage type
    startIndex = snippet.indexOf(">")+1;
    //it lets us narrow our search
    if( startIndex != 0){
        stopIndex = snippet.indexOf("</a>");
        if(stopIndex != -1){
            snippet = snippet.substring(startIndex,stopIndex);
        } else {
            snippet = snippet.substring(startIndex);
        }
    }
    //search for specific damage types
    if(snippet.indexOf("E") != -1){
        return "E";
    } else if(snippet.indexOf("R") != -1){
        return "R"
    } else if(snippet.indexOf("X") != -1){
        return "X"
    } else {
        //impact is the default damage type
        return "I";
    }
}
//returns the Penetration of the weapon in number form, if randomized, it will roll for it
this.getPenetration = function(){
    //record what signifies the location of Class
    var signifier = "<strong>Penetration</strong>: ";
    //record where the class of the weapon begins 
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, try a different one
    if(this.notes.indexOf(signifier) == -1){
        //record what signifies the location of Class
        signifier = "<strong>Pen</strong>: ";
        //record where the class of the weapon begins 
        startIndex = this.notes.indexOf(signifier) + signifier.length;
        //if the signifier was not found, abort with nothing to show
        if(this.notes.indexOf(signifier) == -1){return 0;}
    }
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    var output;
    if(stopIndex == -1){
        output = this.notes.substring(startIndex);
    } else {
        output = this.notes.substring(startIndex,stopIndex);
    }
    //check for Psy Rating multiplier
    if(output.indexOf("PR") != -1){
        //remove the PR
        output = output.replace("PR","");
        //and the " x " multiplier
        //these are done seperately to handle "2 x PR" and "PR x 2"
        output = output.replace(" x ","");
        //convert output into a number
        output = Number(output);
        //be sure the final output is sensible
        if(output){
            //penetration shouldn't be negative, thus it indicates PR
            return -1 * output;
        } else {
            //if nothing is left, then it is assumed that the Pen was PR, thus 1 x PR
            return -1;
        }
    }
    
    //be sure the final output is sensible
    output = Number(output);
    if(output){
        return output;
    } else {
        return 0;
    }
}
//returns the clip size of the weapon in number form
this.getClip = function(){
    //record what signifies the location of Class
    var signifier = "<strong>Clip</strong>: ";
    //record where the class of the weapon begins 
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    var output;
    if(stopIndex == -1){
        output = Number(this.notes.substring(startIndex));
    } else {
        output = Number(this.notes.substring(startIndex,stopIndex));
    }
    //be sure the final output is sensible
    if(output){
        return output;
    } else {
        return 0;
    }
}
//returns the stated reload time in string form
this.getReload = function(){
    //record what signifies the location of Reload
    var signifier = "<strong>Reload</strong>: ";
    //record where the class of the weapon begins (right after "Class: ")
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, abort with nothing to show
    if(this.notes.indexOf(signifier) == -1){return "";}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    if(stopIndex == -1){
        return this.notes.substring(startIndex);
    } else {
        return this.notes.substring(startIndex,stopIndex);
    }
}
//returns the collection of special abilites in text form
this.getSpecial = function(){
    //record what signifies the location of Reload
    var signifier = "<strong>Special</strong>: ";
    //record where the class of the weapon begins (right after "Class: ")
    var startIndex = this.notes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, abort with nothing to show
    if(this.notes.indexOf(signifier) == -1){return "";}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.notes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    if(stopIndex == -1){
        return this.notes.substring(startIndex);
    } else {
        return this.notes.substring(startIndex,stopIndex);
    }
}
//returns the collection of special abilites in text form
this.getAmmoSpecial = function(){
    //record what signifies the location of Reload
    var signifier = "<strong>Special</strong>: ";
    //record where the class of the weapon begins (right after "Class: ")
    var startIndex = this.ammonotes.indexOf(signifier) + signifier.length;
    //if the signifier was not found, abort with nothing to show
    if(this.ammonotes.indexOf(signifier) == -1){return "";}
    //find the end of the line, that indicates the end of the search
    var stopIndex = this.ammonotes.indexOf("<br>",startIndex);
    //if there was no end of the line, just search until the end of the notes
    if(stopIndex == -1){
        return this.ammonotes.substring(startIndex);
    } else {
        return this.ammonotes.substring(startIndex,stopIndex);
    }
}

//meat of the object. Takes the !Fire command and rolls to hit, expends ammunition, and rolls for damage (which triggers Damage search)
this.track = function(fullInput,selected,who){
    //first disect the input into parts
    var startIndex = 6; //Start the index after '!Fire '
    var input = [];//Collect the input in pieces
    var stopIndex = -1; //index of the end of the substring (and not including this letter!)
    while(startIndex < fullInput.length){
        //find the next semicolin in the input
        stopIndex = fullInput.indexOf(";",startIndex);
        //be sure a semicolin was found
        if(stopIndex == -1){
            //no break was found, just pile the rest of it into this piece
            stopIndex = fullInput.length;
            //save this last chunk
            input.push(fullInput.substring(startIndex,stopIndex));
            //and exit the while loop (you've chopped everything up)
            break;
        }else{
            //otherwise save this piece of the input
            input.push(fullInput.substring(startIndex,stopIndex));
            //and start working through the rest of the input
            startIndex = stopIndex + 1; //we don't want to save the semicolin, skip over that part
        }
    }
    //if there was no input, stop wasting our time
    if(input.length < 1){return;}
    //be sure the player is at least trying to fire with someone
    if(selected == undefined || selected.length < 1){return sendChat("System", "Nothing selected");}
    //if this is just a test, there is no one selected
    if(selected != "Test"){
        //find the character the token represents
        var graphic = getObj("graphic", selected[0]._id);
        //be sure the graphic is valid
        if(graphic == undefined){return sendChat("System", "/em - graphic undefined.");}
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){return sendChat("System", "/em - character undefined.");}
        var charNotes = "";
        character.get("bio", function(bio) {
            charNotes = bio;
        });
    }
    //The first input should be the name of the weapon
    var weapon = findObjs({_type:"handout",_name:input[0]})[0];
    //be sure the weapon was found
    if(weapon == undefined){return sendChat("System","/w gm " + input[0] + " not found.");}
    //save the notes of the weapon for future use
    weapon.get("notes", function(notes) {
        myTracker.notes = notes;
    });
    //the sixth input should be special ammunition loaded in the weapon
    var specialammo = undefined
    myTracker.ammonotes = ""
    if(input.length >= 6){
        if(input[5].indexOf("?{") == 0 && input[5].indexOf("|") != -1 && input[5].indexOf("}") != -1){
            //there are multiple inputs. Divide them up.
            var ammoTypes = input[5].slice(2,-1).split("|");
            //skip the first ammoType. It is just the label. Try every other one.
            for(i = 1; i < ammoTypes.length; i++){
                log(ammoTypes[i])
                if(ammoTypes[i] != ""){
                    specialammo = findObjs({_type:"handout",_name:ammoTypes[i]})[0];
                    //be sure the weapon was found
                    if(specialammo == undefined){
                        sendChat("System","/w gm " + ammoTypes[i] + " not found. Using Standard Ammunition.");
                    } else {
                        //save the notes of the weapon for future use
                        specialammo.get("notes", function(notes) {
                            myTracker.ammonotes = notes;
                        });
                        //the first try with each new sandbox usually fails. I don't know why. Just try again.
                        if(myTracker.ammonotes.length == 0){
                            //exit the program. Nothing productive is going to come out of having an empty string
                            if(selected != "Test"){sendChat("System", "/w gm Try again?");}
                        } 
                    }    
                
                }
            }
        } else {
            specialammo = findObjs({_type:"handout",_name:input[5]})[0];
            //be sure the weapon was found
            if(specialammo == undefined){
                sendChat("System","/w gm " + input[5] + " not found. Using Standard Ammunition.");
            } else {
                //save the notes of the weapon for future use
                specialammo.get("notes", function(notes) {
                    myTracker.ammonotes = notes;
                });
                //the first try with each new sandbox usually fails. I don't know why. Just try again.
                if(myTracker.ammonotes.length == 0){
                    //exit the program. Nothing productive is going to come out of having an empty string
                    if(selected != "Test"){sendChat("System", "/w gm Try again?");}
                    return;
                } 
            }
        }
    }
    
    //the first try with each new sandbox fails(leaves the bio/notes empty). I don't know why. Just try again.
    if(myTracker.notes.length == 0 || charNotes.length == 0){
        //exit the program. Nothing productive is going to come out of having an empty string
        if(selected != "Test"){sendChat("System", "/w gm Try again?");}
        return;
    }
    
    //A test run only tries to load the weapon info. Stop here and do no more.
    if(selected == "Test"){return;}
    
    //look for any special bonuses
    var Special = this.getSpecial();
    
    //add all the ammo specific special rules to the list of special rules
    if(Special.length > 0 && this.getAmmoSpecial().length > 0){Special += ", ";}
    Special += this.getAmmoSpecial();
    
    //The second input should be toHit Modifiers
    var Modifier = 0;
    if(input.length >= 2){
        //make sure the modifier is sensible
        if(Number(input[1])){Modifier = Number(input[1]);}
    }
    
    //calculate Class, will be important for calculating RoF
    var Class = "Ranged";
    switch(this.getClass()){
        case "Psychic":
            Skill = Number(getAttrByName(character.id, "Wp"));
            SkillType = "Wp";
            UnnaturalSkill = Number(getAttrByName(character.id, "Unnatural Wp"));
            Class = "Psychic";
            break;
        case "Melee":
        case "Melee*": 
            Skill = Number(getAttrByName(character.id, "WS"));
            SkillType = "WS";
            UnnaturalSkill = Number(getAttrByName(character.id, "Unnatural WS"));
            Class = this.getClass();
            break;
        case "Thrown":
            Class = "Thrown";
        default:
            Skill = Number(getAttrByName(character.id, "BS"));
            SkillType = "BS";
            UnnaturalSkill = Number(getAttrByName(character.id, "Unnatural BS"));
            break;
    }
    //The third input should be the Rate of Fire
    var RoF = 1;
    var Mode = "Single";
    if(input.length >= 3){
        //single is the defaut mode and always fires a single shot, thus we don't need to look it up
        //if(input[1].toLowerCase().indexOf("single") != -1){
        //    
        //} else 
        if(input[2].toLowerCase().indexOf("semi") != -1){
            Mode = "Semi-Auto";
            if(Class == "Psychic"){
                RoF = Math.ceil((Math.floor(Number(getAttrByName(character.id, "Wp"))/10) + Number(getAttrByName(character.id, "Unnatural Wp")))/2);
            } else {
                RoF = this.getSemi();
            }
            // || input[2].toLowerCase().indexOf("lightning") != -1
        } else if(input[2].toLowerCase().indexOf("full") != -1){
            Mode = "Full-Auto";
            if(Class == "Psychic"){
                RoF = Math.floor(Number(getAttrByName(character.id, "Wp"))/10) + Number(getAttrByName(character.id, "Unnatural Wp"));
            } else {
                RoF = this.getFull();
            }
        } else if(input[2].toLowerCase().indexOf("swift") != -1 && charNotes.indexOf(">Swift Attack<") != -1) {
            RoF = Math.ceil((Math.floor(Number(getAttrByName(character.id, "WS"))/10) + Number(getAttrByName(character.id, "Unnatural WS")))/2);
            Mode = "Semi-Auto";
        } else if(input[2].toLowerCase().indexOf("lightning") != -1 && charNotes.indexOf(">Lightning Attack<") != -1) {
            RoF = Math.floor(Number(getAttrByName(character.id, "WS"))/10) + Number(getAttrByName(character.id, "Unnatural WS"));
            Mode = "Full-Auto";
        }
    }
    //the fourth input should be the PsyRating
    var PsyRating = Number(getAttrByName(character.id, "PR"));
    if(input.length >= 4){
        PsyRating = Number(input[3]);
    }
    //be sure Psy Rating is sensible
    if(!PsyRating){
        PsyRating = 0;
    }
    //the fifth input should be special abilities given to the weapon, by the character
    var ExtraSpecial = "";
    if(input.length >= 5){
        ExtraSpecial = input[4];
    }
    
    //check if the player chose single and the weapon cannot fire on Single
    //also check if the Rate of Fire is valid
    if((Mode == "Single" && !this.getSingle()) || RoF <= 0){
        sendChat("System", input[0] + " is incapable of firing on " + Mode);
        return;
    }
    //get ready to make a weapon report (ammo, weapon name)
    var WeaponReport = "<strong>Weapon</strong>: <a href=\"http://journal.roll20.net/handout/"  + weapon.id + "\">"+ weapon.get("name") + "</a>";
    
    //report any special ammunition
    if(specialammo != undefined){
        WeaponReport += "<br><strong>Special</strong>: <a href=\"http://journal.roll20.net/handout/"  + specialammo.id + "\">"+ specialammo.get("name") + "</a>";
    }
    
    //report how the weapon is firing
    if(RoF > 1){
        //don't bother reporting if you are firing on Single, everyone does that and I am tired of hearing it
        WeaponReport += "<br><strong>Mode</strong>: " + Mode + "(" + RoF.toString() + ")";
    }
    
    //be sure this attack uses ammo
    var Clip = this.getClip();
    if(Clip > 0){
        //use the name of the weapon to construct the name of the ammo
        var AmmoName = input[0];
        //add in the name of the special ammunition, if it exists
        if(specialammo != undefined){
            AmmoName += "(" + input[5] + ")"; 
        }
        //note that it is Ammo
        AmmoName += " Ammo"
        //be sure the character has a clip for this weapon
        var AmmoObjs =  findObjs({ type: 'attribute', characterid: character.id, name: AmmoName })
        if(AmmoObjs.length > 0){
            //be sure there is enough ammo to use otherwise rage quit
            if(Number(getAttrByName(character.id, AmmoName )) < RoF){return sendChat("System","Not enough ammo to fire on " + Mode);}
            //get the Ammo object off the character. It is the name of the weapon + " Ammo"
            var AmmoObj = AmmoObjs[0];
            //reduce the Ammo by the RoF
            var Ammo = AmmoObj.get('current') - RoF;
            //Weapons with Storm consume twice as much ammo
            if(Special.indexOf(">Storm<") != -1 || ExtraSpecial.indexOf("Storm") != -1 ){
                //subtract the rate of fire again
                Ammo = Ammo - RoF;
            }
            AmmoObj.set('current', Ammo);
        } else {
            //Weapons with Storm consume twice as much ammo
            if(Special.indexOf(">Storm<") != -1 || ExtraSpecial.indexOf("Storm") != -1 ){
                createObj("attribute", {
                name: AmmoName,
                current: Clip - 2 * RoF,
                max: Clip,
                characterid: character.id
            });
            } else {
                createObj("attribute", {
                name: AmmoName,
                current: Clip - RoF,
                max: Clip,
                characterid: character.id
                });    
            }
            
            
        }
        
        
        //Report the remaining Ammo
        WeaponReport += "<br><strong>Ammo</strong>: " + getAttrByName(character.id, AmmoName ) + "/" + getAttrByName(character.id, AmmoName ,"max");
    }
    //deliver the Weapon Report
    sendChat("",WeaponReport)
    
    //add any toHit bonuses based on Rate of Fire
    switch(Mode){
        case 'Single': Modifier += 10; break;
        case 'Semi-Auto': break;
        case 'Full-Auto': Modifier -= 10; break;
    }
    //get the base roll to hit
    var Skill;
    var SkillType;
    var UnnaturalSkill;
    
    //record the number of D10s in the damage as they could be modified by how well you roll
    var D10s = this.getD10s();
    //check if the D10s are multiplied by Psy Rating
    //that information is indicated by a negative number
    if(D10s < 0){
        //multiply out the negativity and multiply in the psy rating
        D10s = -1 * D10s * PsyRating;
    }
    
    //roll to hit
    var toHit = randomInteger(100);
    //calculate the number of hits
    if(Skill + Modifier - toHit >= 0){
        //if the character hit, add up the successes + the unnatural skill bonus. This is the total degrees of success
        var Hits =  Math.floor((Skill + Modifier - toHit)/10) + Math.ceil(UnnaturalSkill/2);
        switch(Mode){
            case "Single": 
                //accurate weapons will gain extra damage if they hit well enough
                if(Special.indexOf(">Accurate<") != -1 || ExtraSpecial.indexOf("Accurate") != -1){
                    if(Hits == 1){
                        D10s++;
                    } else if(Hits > 1){
                        D10s += 2;
                    }
                }
                Hits = 1; 
            break;
            case "Semi-Auto": 
                //Hits = 1 + 1 for every two full successes
                Hits = 1 + Math.floor(Hits/2);
            break;
            case "Full-Auto":
                //Hits = 1 + 1 for every success
                Hits++;
            break;
        }
        //you cannot hit your target more than the number of bullets
        if(Hits > RoF){Hits = RoF;}
        //Weapons with Storm hit twice as much
        if(Special.indexOf(">Storm<") != -1 || ExtraSpecial.indexOf("Storm") != -1){
            //subtract the rate of fire again
            Hits = Hits * 2;
        }
        
    } else {
        var Hits = 0;
    }
    //output the roll to hit
    sendChat(who,"&{template:default} {{name=<strong>" + SkillType +  "</strong>: " + character.get("name") + "}} {{Successes=[[(" + Skill.toString() +"+" + Modifier.toString() + " - (" + toHit.toString() + ") )/10]]}} {{Unnatural= [[ceil((" + UnnaturalSkill.toString() + ")/2)]]}} {{Hits= [[" + Hits.toString() + "]]}}")
    //sendChat(who,"/em - " + character.get("name") + " rolls [[(" + Skill.toString() +"+" + Modifier.toString() + " - (" + toHit.toString() + ") )/10]](+[[ceil(" + UnnaturalSkill.toString()  + "/2)]]) successes on a " + SkillType + " test, hitting " + Hits.toString() + " time(s).");
    //was there a crit?
    if(toHit == 100){
        setTimeout(sendChat,500,"","/desc [Critical Failure!](!ThisIsn'tAnythingYet)")
    } else if(toHit == 1) {
        setTimeout(sendChat,500,"","/desc [Critical Success!](!ThisIsn'tAnythingYet)")        
    }
   
    //output the hit location (and record it)
    this.calculateLocation(toHit);
    //record hits
    //load up the GM variables
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //record the number of hits
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
    attribObj.set('current', Hits);
    //if you did not hit, don't bother rolling for damage
    if(Hits <= 0){return;}
    //calculate the damage formula
    var DamageBase = this.getDamageBase();
    //check if the DamageBase is multiplied by Psy Rating
    //that information is indicated by having 2000 added to it (damage should be sensibly small)
    if(DamageBase > 1000){
        //subtract out the added 2000 and multiply in the psy rating
        DamageBase = (DamageBase - 2000) * PsyRating;
    }
    //check to see if the special rules modify the damage of this weapon
    var damageIndex = Special.lastIndexOf("Damage(");
    if(damageIndex != -1){
        var endIndex = Special.indexOf(")",damageIndex+7);
        //only add the damage if it is sensible
        if(endIndex != -1 && Number(Special.substring(damageIndex+7,endIndex))){
            DamageBase += Number(Special.substring(damageIndex+7,endIndex));
        }
    }
    //check to see if the extra special rules modify the dmage
    var damageIndex = ExtraSpecial.indexOf("Damage(");
    if(damageIndex != -1){
        var endIndex = ExtraSpecial.indexOf(")",damageIndex+7);
        log("): " + endIndex)
        log(ExtraSpecial.substring(damageIndex+7,endIndex))
        //only add the damage if it is sensible
        if(endIndex != -1 && Number(ExtraSpecial.substring(damageIndex+7,endIndex))){
            DamageBase += Number(ExtraSpecial.substring(damageIndex+7,endIndex));
        }
    }
    
    var D5s = this.getD5s();
    var Pen = this.getPenetration();
    //check if the Pen is multiplied by Psy Rating
    //that information is indicated by a negative number
    if(Pen < 0){
        //multiply out the negativity and multiply in the psy rating
        Pen = -1 * Pen * PsyRating;
    }
    //check to see if the special rules modify the penetration of this weapon
    var penIndex = Special.lastIndexOf("Penetration(");
    if(penIndex != -1){
        var endIndex = Special.indexOf(")",penIndex+12);
        //check to see if the penetration is set to one value
        if(Special.substring(penIndex+12,endIndex).indexOf("=") != -1 && endIndex != -1 && Number(Special.substring(penIndex+13,endIndex))){
            Pen = Number(Special.substring(penIndex+13,endIndex));
        }
        //only add the damage if it is sensible
        else if(endIndex != -1 && Number(Special.substring(penIndex+12,endIndex))){
            Pen += Number(Special.substring(penIndex+12,endIndex));
        }
    }
    //check to see if the extra special rules modify the penetration
    var penIndex = ExtraSpecial.indexOf("Penetration(");
    if(penIndex != -1){
        var endIndex = ExtraSpecial.indexOf(")",penIndex+12);
        log(ExtraSpecial.substring(penIndex+12,endIndex))
        
        //only add the damage if it is sensible
        if(endIndex != -1 && Number(ExtraSpecial.substring(penIndex+12,endIndex))){
            Pen += Number(ExtraSpecial.substring(penIndex+12,endIndex));
        }
    }
    //Search the weapon qualities and the tacked on weapon qualities for...
    //Tearing
    var Tearing = 0;
    if(Special.indexOf("Tearing") != -1 || ExtraSpecial.indexOf("Tearing") != -1){
        Tearing = 1;
        //Search the character for Flesh Render
        if(charNotes.indexOf("Flesh Render") > charNotes.indexOf("Talents")){
            Tearing = 2;
        }
    }
    //Search the character for...
    //Mightyshot
    //and be sure you are actually firing a ranged weapon
    if(charNotes.indexOf("Mighty Shot") > charNotes.indexOf("Talents") && Class == "Ranged"){
        DamageBase += 2;
    }
    //Mightyshot
    //and be sure you are actually firing a melee weapon
    if(charNotes.indexOf("Crushing Blow") > charNotes.indexOf("Talents") && Class == "Melee"){
        DamageBase += 2;
    }
    //Search the weapon qualities and the tacked on weapon qualities for...
    //Force
    if(Special.indexOf("Force") != -1 || ExtraSpecial.indexOf("Force") != -1){
        DamageBase += PsyRating;
        Pen += PsyRating;
    }
    //Search the weapon qualities and the tacked on weapon qualities for...
    //Blast
    var Blast = 0;
    if(ExtraSpecial.indexOf("Blast") != -1){
        var startIndex = ExtraSpecial.indexOf("(",ExtraSpecial.indexOf("Blast"))+1;
        if(startIndex != -1){
        var stopIndex = ExtraSpecial.indexOf(")",startIndex);
        if(stopIndex != -1){
        Blast = ExtraSpecial.substring(startIndex,stopIndex);
        //be sure that blast is sensible
        if(Number(Blast)){
            //the number of hits is multiplied by the blast radius
            attribObj.set('current', Hits*Number(Blast));
        } else if(Blast.indexOf("PR") != -1){
            //pull out "PR x "
            Blast = Blast.replace("PR");
            Blast = Blast.replace(" x ","");
            
            //check if blast is now sensible
            if(Number(Blast)){
                attribObj.set('current', Hits*Number(Blast)*PsyRating);
            } else {
                //otherwise the blast was probably listed as PR
                attribObj.set('current', Hits*PsyRating);
            }
        }
        }
        }
    } else if(Special.indexOf("Blast") != -1){
        var startIndex = Special.indexOf("(",Special.indexOf("Blast"))+1;
        if(startIndex != -1){
        var stopIndex = Special.indexOf(")",startIndex);
        if(stopIndex != -1){
        Blast = Special.substring(startIndex,stopIndex);
        //be sure that blast is sensible
        if(Number(Blast)){
            //the number of hits is multiplied by the blast radius
            attribObj.set('current', Hits*Number(Blast));
        } else if(Blast.indexOf("PR") != -1){
            //pull out "PR x "
            Blast = Blast.replace("PR");
            Blast = Blast.replace(" x ","");
            
            //check if blast is now sensible
            if(Number(Blast)){
                attribObj.set('current', Hits*Number(Blast)*PsyRating);
            } else {
                //otherwise the blast was probably listed as PR
                attribObj.set('current', Hits*PsyRating);
            }
        }
        }
        }
    }
    
    var Proven = 0;
    if(ExtraSpecial.indexOf("Proven") != -1){
        var startIndex = ExtraSpecial.indexOf("(",ExtraSpecial.indexOf("Proven"))+1;
        if(startIndex != -1){
            var stopIndex = ExtraSpecial.indexOf(")",startIndex);
            if(stopIndex != -1){
                Proven = Number(ExtraSpecial.substring(startIndex,stopIndex)) - 1;
            }
        }
    } else if(Special.indexOf("Proven") != -1){
        var startIndex = Special.indexOf("(",ExtraSpecial.indexOf("Proven"))+1;
        if(startIndex != -1){
            var stopIndex = Special.indexOf(")",startIndex);
            if(stopIndex != -1){
                Proven = Number(Special.substring(startIndex,stopIndex)) - 1;
            }
        }
    }
    log("Proven")
    log(Proven)
    //Spray Weapons get a random number of hits against hordes
    if(Special.indexOf("Spray") != -1 || ExtraSpecial.indexOf("Spray") != -1){
        Hits = Math.ceil(this.getRange()/4);
        toHit = randomInteger(5);
        attribObj.set('current', Hits + toHit);
    }
    //start piecing together the damage formula
    //create the title for the damage card
    var Damage = "&{template:default} {{name=<strong>Damage</strong>: " + character.get("name") + "}} ";
    //calculate the damage
    Damage +=  "{{Damage= [["
    //The exact damage formula //"2D10k1+3
    //add the D10s
    if(D10s > 0){
        //Tearing gives you extra dice, and....
        D10s += Tearing;
        Damage += D10s.toString() + "D10";
        if(Tearing > 0){
            //keeps only the highest of the original D10s
            D10s -= Tearing;
            Damage += "k" + D10s.toString();
        }
        //proven makes you reroll low dice (once)
        if(Proven > 0){
            Damage += "ro<" + Proven.toString();
        }
    } else if(D5s > 0){ //add the D5s if there are no D10s
        D5s += Tearing;
        Damage += D5s.toString() + "D5";
        if(Tearing > 0){
            D5s -= Tearing;
            Damage += "k" + D5s.toString();
        }
        //proven makes you reroll low dice (once)
        if(Proven > 0){
            Damage += "ro<" + Proven.toString();
        }
    }
    //be sure there is a Damage base to work with
    if(DamageBase > 0){
        Damage += "+" + DamageBase.toString();
    } else if(DamageBase < 0){
        Damage += DamageBase.toString();
    }
    //if this is a melee weapon, remember to add the character's S bonus
    if(Class == "Melee"){
        var characterSBonus = Number(getAttrByName(character.id, "Unnatural S")) + Math.floor(Number(getAttrByName(character.id, "S")/10));
        //check to see if the token is frenzied
        if(graphic.get("status_red")){
            //add 1 to their strength bonus
            characterSBonus += 1;
        }
        //check to see if this weapon is a fist weapon
        if(Special.indexOf(">Fist<") != -1) {
            characterSBonus *= 2;
        }
        //record the bonus damage from the Strength bonus
        Damage += "+" + characterSBonus.toString();
    }
    //close up the damage calculation
    Damage += "]]}} "
    //note the damage type
    Damage +=  "{{Type=  " + GetLink(this.getDamageType()) + "}} ";
    //calculate the penetration
    Damage +=  "{{Pen=  [[" + Pen.toString() + "]]}} ";
    //create any notes
    if(Special.length > 0 || ExtraSpecial.length > 0){
        Damage += "{{Notes=  " + Special;
        if(Special.length > 0 && ExtraSpecial.length > 0){
            Damage += ", ";
        }
        Damage += ExtraSpecial + "}} ";
    }
    /*
    var Damage = "/em - ";
    //add in the character name
    Damage += character.get("name");
    //open up the damage section
    Damage += " deals [[";
    //The exact damage formula //"2D10k1+3
    //add the D10s
    if(D10s > 0){
        //Tearing gives you extra dice, and....
        D10s += Tearing;
        Damage += D10s.toString() + "D10";
        if(Tearing > 0){
            //keeps only the highest of the original D10s
            D10s -= Tearing;
            Damage += "k" + D10s.toString();
        }
    } else if(D5s > 0){ //add the D5s if there are no D10s
        D5s += Tearing;
        Damage += D5s.toString() + "D5";
        if(Tearing > 0){
            D5s -= Tearing;
            Damage += "k" + D5s.toString();
        }    
    }
    //be sure there is a Damage base to work with
    if(DamageBase > 0){
        Damage += "+" + DamageBase.toString();
    } else if(DamageBase < 0){
        Damage += DamageBase.toString();
    }
    //if this is a melee weapon, remember to add the character's S bonus
    if(Class == "Melee"){
        Damage += "+" + getAttrByName(character.id, "Unnatural S").toString() + "+floor((" + getAttrByName(character.id, "S").toString() + ")/10)";
        
        if(Special.indexOf(">Fist<") != -1) {
            Damage += "+" + getAttrByName(character.id, "Unnatural S").toString() + "+floor((" + getAttrByName(character.id, "S").toString() + ")/10)";
        }
    }
    //close up the Damage Calculation
    Damage += "]] ";
    //determine the damage type
    switch(this.getDamageType()){
        case "X": Damage += "Explosive"; break;
        case "R": Damage += "Rending"; break;
        case "E": Damage += "Energy"; break;
        default: Damage += "Impact"; break;
    }
    //close up the Damage type and open up the Penetration
    Damage += " Damage, [[";
    //load up the penetration of the weapon
    Damage += Pen.toString();
    //close up penetration
    Damage += "]] Pen";
    //add Special rules //", Blast(4)"
    if(Special.length > 0 ){
        Damage += ", " + Special;
    }
    if(ExtraSpecial.length > 0 ){
        Damage += ", " + ExtraSpecial;
    }
    //add the name of the weapon
    Damage += " with a(n) " + input[0] + ".";
    */
    //send the total Damage at a 1 second delay
    setTimeout(sendChat,1000,who,Damage)
    
    
    
}
//reset ammo on all characters
this.ammoReset = function(character){
    var Attributes;
    if(character == undefined){
        //collect all the attributes
        Attributes = findObjs({
            _type: "attribute"
        });
    } else {
        //collect all the attributes
        Attributes = findObjs({
            _type: "attribute",
            _characterid: character.id
        });
    }
    //work through them one at a time
    _.each(Attributes,function(Attribute){
        //check to see if the Attribute is weapon ammo
    if(Attribute.get("name").indexOf(" Ammo") != -1 && Attribute.get("name").indexOf(" Ammo") == Attribute.get("name").length - 5){
        Attribute.set("current",Attribute.get("max"));
    }
    });
    if(character == undefined){
        sendChat("System","/w gm All ammo has been reset.");    
    } else {
        sendChat("System","/w gm " + character.get("name") + "'s ammo has been reset.")
    }
    
}
}
//watches for the user to request the fucntions to activate
on("chat:message", function(msg) {
if(msg.type == 'api' && msg.content.indexOf("!Fire ") == 0){
    myTracker = new AmmoTracker();
    myTracker.track(msg.content,msg.selected,"player|" + msg.playerid);
} else if(msg.type == 'api' && msg.content.indexOf("!ParseTest ") == 0){
    myTracker = new AmmoTracker();
    var weaponObj = findObjs({_type:"handout",_name:msg.content.substring(11)})[0];
    //be sure the weapon was found
    if(weaponObj == undefined){return sendChat("System","/w gm " + msg.content.substring(11) + " not found.");}
    //save the notes of the weapon for future use
    weaponObj.get("notes", function(notes) {
        //log(notes)
        //sendChat("System", "/w gm Note Size: " + notes.length.toString());
        myTracker.notes = notes;
    });
    if(myTracker.notes.length > 0){
        sendChat("System", "/desc <strong>Class</strong>: " + myTracker.getClass());
        sendChat("System", "/desc <strong>Range</strong>: " + myTracker.getRange().toString());
        sendChat("System", "/desc <strong>Single</strong>: " + myTracker.getSingle().toString());
        sendChat("System", "/desc <strong>Semi</strong>: " + myTracker.getSemi().toString());
        sendChat("System", "/desc <strong>Full</strong>: " + myTracker.getFull().toString());
        sendChat("System", "/desc <strong>Damage Base</strong>: " + myTracker.getDamageBase().toString());
        sendChat("System", "/desc <strong>D10s</strong>: " + myTracker.getD10s().toString());
        sendChat("System", "/desc <strong>D5s</strong>: " + myTracker.getD5s().toString());
        sendChat("System", "/desc <strong>Damage Type</strong>: " + myTracker.getDamageType());
        sendChat("System", "/desc <strong>Pen</strong>: " + myTracker.getPenetration().toString());
        sendChat("System", "/desc <strong>Clip</strong>: " + myTracker.getClip().toString());
        sendChat("System", "/desc <strong>Reload</strong>: " + myTracker.getReload());
        sendChat("System", "/desc <strong>Special</strong>: " + myTracker.getSpecial());    
    } else {
        sendChat("System", "/w GM Try again?");
    }
} else if(msg.type == "api" && msg.content == "!FindAbilities"){
    //be sure the player is at least trying to fire with someone
    if(msg.selected == undefined || msg.selected.length < 1){return sendChat("System", "Nothing selected");}
    //find the character the token represents
    var graphic = getObj("graphic", msg.selected[0]._id);
    //be sure the graphic is valid
    if(graphic == undefined){return sendChat("System", "/em - graphic undefined.");}
    //be sure the character is valid
    var character = getObj("character",graphic.get("represents"))
    if(character == undefined){return sendChat("System", "/em - character undefined.");}
    
    var Abilities = findObjs({
        _type: "ability",
        _characterid: character.id
    });
    
    log(Abilities);
    sendChat("System","/w gm Task complete.")
} else if(msg.type == "api" && msg.content == "!ResetAmmo" && playerIsGM(msg.playerid)){
    //open up the ammotracker object
    myTracker = new AmmoTracker();
    
    if(msg.selected.length < 1 || msg.selected == undefined){
        //reset the ammo of every character
        myTracker.ammoReset();
    } else {
        var graphic = getObj("graphic", msg.selected[0]._id);
        //be sure the graphic is valid
        if(graphic == undefined){return sendChat("System", "/w gm graphic undefined.");}
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"));
        if(character == undefined){return sendChat("System", "/w gm character undefined.");}
        //reset the ammo of the selected token's character
        myTracker.ammoReset(character);
    }
}
});
//Looking at the bio or notes gives you nothing the first time you try
//This makeshift function tries every bio and note once, eliminating that annoying first time from user perception
on("ready", function() {
    //gather up all the abilities
    var Abilities = findObjs({
        _type: "ability"
    });
    log("Testing Handout readability.")
    //step through each ability
    _.each(Abilities, function(Ability){
    //find each ability that starts with "!Fire "
    if(Ability.get("action").indexOf("!Fire ") == 0){
        myTracker = new AmmoTracker();
        myTracker.track(Ability.get("action"),"Test","gm")
        /*
        //get the first input of the !Fire ability
        var stopIndex = Ability.get("action").indexOf(";");
        var weaponName = "";
        if(stopIndex != -1){
            weaponName = Ability.get("action").substring(6,stopIndex);;
        } else {
            weaponName = Ability.get("action").substring(6);
        }
        //find the weapon
        var weapon = findObjs({_type:"handout",_name:weaponName})[0];
        //be sure the weapon was found
        if(weapon == undefined){return sendChat("System","/w gm " + weaponName + " not found.");}
        //load up the notes
        weapon.get("notes", function(notes) {
            notes;
        });*/
    }
    });
    //gather up all the characters
    var Characters = findObjs({
        _type: "character"
    });
    //step through each character
    _.each(Characters, function(Character){
    //find each ability that starts with "!Fire "
    Character.get("bio", function(bio) {
        bio;
    });
    });
    LinkList = [];
    log("Handout and character notes have been read.")
});
