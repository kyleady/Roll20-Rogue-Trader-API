//input a character name
function XenosImport(input){
    //find the character sheet with that name
    var XenosSheets = findObjs({ type: 'character', name: input });
    //rage quit if nothing was found
    if(XenosSheets.length <= 0 ){
        return sendChat("System","/w gm Character not found.");
    } else if(XenosSheets.length > 1){
        return sendChat("System","/w gm Character is not unique.");
    }
    //take the gmnotes from that character
    var Notes = "";
    XenosSheets[0].get('bio',function(obj){
        Notes = obj;
    });
    if(Notes == ""){
        return sendChat("System","/w gm Bio is empty.")
    }
    log(Notes)
    //step through the GMNotes and disect it by <br>
    var breakIndex = 0;
    var line = [];
    while(true) {
        //find the next <br>
        breakIndex = Notes.indexOf("<br>");
        if(breakIndex == -1){
            //could not find a break
            //save the last bit if it is worth anything
            if(Notes != ""){
                line.push(Notes);
            }
            //we are done. abort.
            break;
        } else {
            //save the line (only if there is something to save)
            if(breakIndex != 0){
                line.push(Notes.substring(0,breakIndex));
            }
            //remove the line and the 4 character break from the main input 
            Notes = Notes.substring(breakIndex+4);
        }
    } 
    //use : to determine the label of the line
    var label = [];
    for(i = 0; i < line.length; i++){
        breakIndex = line[i].indexOf(":");
        //did we find a semicolin?
        if(breakIndex != -1){
            //save the label in its lower case
            label.push(line[i].substring(0,breakIndex));
        } else {
            //there was no label
            label.push("");
        }
        //remove the label
        line[i] = line[i].substring(breakIndex+1);
    }
    //disect each line according to its label
    var piece;
    var pieces;
    var indicator; //this piece informs what the next piece means
    var isIndicator;
    //get the xenos ready to record its features
    Xenos = {};
    Xenos.Notes = "";
    Xenos.Skills = "";
    Xenos.Talents = "";
    Xenos.Traits = "";
    Xenos.Gear = "";
    Xenos.Weapons = [];
    for(i = 0; i < line.length; i++){
        piece = "";
        pieces = [];
        indicator = [];
        isIndicator = false;
        //stat[s]
        if(label[i].indexOf("stat") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a space?
                if(line[i][j] == " "){
                    //it is
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else {
                    //the char is not a space, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //interpret each piece as a stat
            for(j = 0; j < pieces.length; j++){
                //can we comprehend this piece as a number?
                if(Number(pieces[j])){
                    //this piece is a number
                    pieces[j] = Number(pieces[j]);
                } else {
                    //this piece was not a number
                    //default to 0
                    pieces[j] = 0;
                }
                //record the stat appropriately
                switch(j){
                    case 0: Xenos.WS = pieces[j]; break;
                    case 1: Xenos.BS = pieces[j]; break;
                    case 2: Xenos.S  = pieces[j]; break;
                    case 3: Xenos.T  = pieces[j]; break;
                    case 4: Xenos.Ag = pieces[j]; break;
                    case 5: Xenos.It = pieces[j]; break;
                    case 6: Xenos.Pr = pieces[j]; break;
                    case 7: Xenos.Wp = pieces[j]; break;
                    case 8: Xenos.Fe = pieces[j]; break;
                }
            }
        //unnatural || bonus
        //disect the line by space and throw out any parenthesies
        } 
        else if(label[i].toLowerCase().indexOf("unnatural") == 0 || label[i].toLowerCase().indexOf("bonus") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a space?
                if(line[i][j] == " " || line[i][j] == "(" || line[i][j] == ")"){
                    //it is
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else {
                    //the char is not a space, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            log(pieces)
            //interpret each piece as a stat
            for(j = 0; j < pieces.length; j++){
                //can we comprehend this piece as a number?
                if(Number(pieces[j])){
                    //this piece is a number
                    pieces[j] = Number(pieces[j]);
                } else {
                    //this piece was not a number
                    //default to 0
                    pieces[j] = 0;
                }
                //record the stat appropriately
                switch(j){
                    case 0: Xenos.Unnatural_WS = pieces[j]; break;
                    case 1: Xenos.Unnatural_BS = pieces[j]; break;
                    case 2: Xenos.Unnatural_S  = pieces[j]; break;
                    case 3: Xenos.Unnatural_T  = pieces[j]; break;
                    case 4: Xenos.Unnatural_Ag = pieces[j]; break;
                    case 5: Xenos.Unnatural_It = pieces[j]; break;
                    case 6: Xenos.Unnatural_Pr = pieces[j]; break;
                    case 7: Xenos.Unnatural_Wp = pieces[j]; break;
                    case 8: Xenos.Unnatural_Fe = pieces[j]; break;
                }
            }
        //move[ment]
        //disect the line by / and spaces
        } 
        else if(label[i].toLowerCase().indexOf("move") == 0 || label[i].toLowerCase() == "speed"){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a space?
                if(line[i][j] == " " || line[i][j] == "/"){
                    //it is
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else {
                    //the char is not a space, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //interpret each piece as a stat
            for(j = 0; j < pieces.length; j++){
                //can we comprehend this piece as a number?
                if(Number(pieces[j])){
                    //this piece is a number
                    pieces[j] = Number(pieces[j]);
                } else {
                    //this piece was not a number
                    //default to 0
                    pieces[j] = 0;
                }
                //record the stat appropriately
                switch(j){
                    case 0: Xenos.Half   = pieces[j]; break;
                    case 1: Xenos.Full   = pieces[j]; break;
                    case 2: Xenos.Charge = pieces[j]; break;
                    case 3: Xenos.Run    = pieces[j]; break;
                }
            }
        //wound[s]
        //trim any spaces out
        } 
        else if(label[i].toLowerCase().indexOf("wound") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a space?
                if(line[i][j] == " " || line[i][j] == "/"){
                    //it is
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else {
                    //the char is not a space, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //interpret each piece as a stat
            for(j = 0; j < pieces.length; j++){
                //can we comprehend this piece as a number?
                if(Number(pieces[j])){
                    //this piece is a number
                    pieces[j] = Number(pieces[j]);
                } else {
                    //this piece was not a number
                    //default to 0
                    pieces[j] = 0;
                }
                //record the stat appropriately
                switch(j){
                    case 0: Xenos.Wounds   = pieces[j]; break;
                }
            }
        
        //armo[ur]
        //trim any spaces
        } 
        else if(label[i].toLowerCase().indexOf("armour") == 0){
            indicator[0] = "";
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a space, a comma, or a paren?
                if(line[i][j] == " " || line[i][j] == "," || line[i][j] == ")" || line[i][j] == "(" || line[i][j] == ":"){
                    //it is
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else {
                    //the char is not a space, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //interpret each piece as a stat
            for(j = 0; j < pieces.length; j++){
                //can we comprehend this piece as a number?
                if(Number(pieces[j])){
                    //this piece is a number
                    pieces[j] = Number(pieces[j]);
                } else if(pieces[j].toLowerCase() == "all"
                || pieces[j].toLowerCase() == "legs"
                || pieces[j].toLowerCase() == "head"
                || pieces[j].toLowerCase() == "arms"
                || pieces[j].toLowerCase() == "body") {
                    indicator[0] = pieces[j].toLowerCase();
                    pieces[j] = "not a number";
                } else {
                    //this piece was not a number
                    //default to 0
                    pieces[j] = 0;
                }
                //record the stat appropriately
                if(pieces[j] != "not a number"){
                    switch(indicator[0]){
                        case "all":  
                            if(!Xenos.Armour_H ){Xenos.Armour_H  = pieces[j]; }
                            if(!Xenos.Armour_RA){Xenos.Armour_RA = pieces[j]; }
                            if(!Xenos.Armour_LA){Xenos.Armour_LA = pieces[j]; }
                            if(!Xenos.Armour_B ){Xenos.Armour_B  = pieces[j]; }
                            if(!Xenos.Armour_RL){Xenos.Armour_RL = pieces[j]; }
                            if(!Xenos.Armour_LL){Xenos.Armour_LL = pieces[j];}
                            //erase the indicator
                            indicator[0] = "";
                        break;
                        case "head": 
                            Xenos.Armour_H  = pieces[j];
                            //erase the indicator
                            indicator[0] = "";
                        break;
                        case "body": 
                            Xenos.Armour_B  = pieces[j]; 
                            //erase the indicator
                            indicator[0] = "";
                        break;
                        case "arms": 
                            Xenos.Armour_RA = pieces[j];
                            Xenos.Armour_LA = pieces[j];
                            //erase the indicator
                            indicator[0] = "";
                        break;
                        case "legs": 
                            Xenos.Armour_RL = pieces[j];
                            Xenos.Armour_LL = pieces[j];
                            //erase the indicator
                            indicator[0] = "";
                        break;
                    }
                }
            }
        //skill[s]
        //disect the line by , and spaces
        } 
        else if(label[i].toLowerCase().indexOf("skill") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a comma or an open paren?
                if((line[i][j] == "," && !isIndicator) || line[i][j] == "(" || line[i][j] == "."){
                    //will we be starting an indicator next?
                    if(line[i][j] == "("){
                        isIndicator = true;
                    }
                    //it is
                    //check to see if the number of indicators matches the number of pieces
                    while(indicator.length < pieces.length){
                        indicator.push("");
                    }
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else if(line[i][j] == ")"){
                    //the indicator is finished
                    isIndicator = false;
                    //it is
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the indicator (do not add it if it is empty)
                    if(piece != ""){
                        //be sure we are not adding too many indicators
                        if(indicator.length >= pieces.length){
                            //there are too many indicators already, just tack this one onto the last one
                            indicator[indicator.length-1] = indicator[indicator.length-1] + ")(" + piece;
                            //the piece has been used, clear it
                            piece = "";
                        } else {
                            //save this
                            indicator.push(piece);
                            //the piece has been used, clear it
                            piece = "";
                        }
                    }
                } else {
                    //the char is not a seporator, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //trim off any extra white space
            piece = piece.trim();
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //do a final check to see if the number of indicators matches the number of pieces
            while(indicator.length < pieces.length){
                indicator.push("");
            }
            Xenos.Skills = "";
            //stich together each piece using links
            for(j = 0; j < pieces.length; j++){
                //if the piece is not a number
                if(!Number(pieces[j])){
                    //seporate each entry by a line break
                    Xenos.Skills += "<br>";
                    //add on a link to the skill
                    Xenos.Skills += GetLink(pieces[j]);
                } else {
                    //add on the numerical adendum to the same line
                    Xenos.Skills += pieces[j];
                }
                //add on any indicators
                if(indicator[j] != ""){
                    Xenos.Skills += "(" + indicator[j] + ")";
                }
            }
        //talent[s]
        //disect the line by , and spaces
        } 
        else if(label[i].toLowerCase().indexOf("talent") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a comma or an open paren?
                if((line[i][j] == "," && !isIndicator) || line[i][j] == "(" || line[i][j] == "."){
                    //it is
                    //will we be starting an indicator next?
                    if(line[i][j] == "("){
                        isIndicator = true;
                    }
                    //check to see if the number of indicators matches the number of pieces
                    while(indicator.length < pieces.length){
                        indicator.push("");
                    }
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else if(line[i][j] == ")"){
                    //it is
                    //we are finished with this indicator
                    isIndicator = false;
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the indicator (do not add it if it is empty)
                    if(piece != ""){
                        //be sure we are not adding too many indicators
                        if(indicator.length >= pieces.length){
                            //there are too many indicators already, just tack this one onto the last one
                            indicator[indicator.length-1] = indicator[indicator.length-1] + ")(" + piece;
                            //the piece has been used, clear it
                            piece = "";
                        } else {
                            //save this
                            indicator.push(piece);
                            //the piece has been used, clear it
                            piece = "";
                        }
                    }
                } else {
                    //the char is not a seporator, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //trim off any extra white space
            piece = piece.trim();
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //do a final check to see if the number of indicators matches the number of pieces
            while(indicator.length < pieces.length){
                indicator.push("");
            }
            Xenos.Talents = "";
            //stich together each piece using links
            for(j = 0; j < pieces.length; j++){
                //if the piece is not a number
                if(!Number(pieces[j])){
                    //seporate each entry by a line break
                    Xenos.Talents += "<br>";
                    //add on a link to the skill
                    Xenos.Talents += GetLink(pieces[j]);
                } else {
                    //add on the numerical adendum to the same line
                    Xenos.Talents += pieces[j];
                }
                //add on any indicators
                if(indicator[j] != ""){
                    Xenos.Talents += "(" + indicator[j] + ")";
                }
            }
        //trait[s]
        //disect the line by , and spaces
        } 
        else if(label[i].toLowerCase().indexOf("trait") == 0){
            //disect the line by space
            for(j = 0; j < line[i].length; j++){
                //is this char a comma or an open paren?
                if((line[i][j] == "," && !isIndicator) || line[i][j] == "("  || line[i][j] == "."){
                    //it is
                    //will we be starting an indicator next?
                    if(line[i][j] == "("){
                        isIndicator = true;
                    }
                    //check to see if the number of indicators matches the number of pieces
                    while(indicator.length < pieces.length){
                        indicator.push("");
                    }
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                } else if(line[i][j] == ")"){
                    //it is
                    //the indicator has finished
                    isIndicator = false;
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the indicator (do not add it if it is empty)
                    if(piece != ""){
                        //be sure we are not adding too many indicators
                        if(indicator.length >= pieces.length){
                            //there are too many indicators already, just tack this one onto the last one
                            indicator[indicator.length-1] = indicator[indicator.length-1] + ")(" + piece;
                            //the piece has been used, clear it
                            piece = "";
                        } else {
                            //save this
                            indicator.push(piece);
                            //the piece has been used, clear it
                            piece = "";
                        }
                    }
                } else {
                    //the char is not a seporator, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //trim off any extra white space
            piece = piece.trim();
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //do a final check to see if the number of indicators matches the number of pieces
            while(indicator.length < pieces.length){
                indicator.push("");
            }
            Xenos.Traits = "";
            //stich together each piece using links
            for(j = 0; j < pieces.length; j++){
                
                if(pieces[j].indexOf("Unnatural ") == 0 && pieces[j]){
                    //seporate each entry by a line break
                    Xenos.Traits += "<br>";
                    //add on a link to the skill
                    Xenos.Traits += GetLink("Unnatural Characteristic");
                    //add on the stat type
                    Xenos.Traits += "(" + pieces[j].substring(10) + ")";
                    //is the indicator a multiplier like x2?
                    if(indicator[j].indexOf("x") == 0 && Number(indicator[j].substring(1))){
                        //determine the stat the increase is affecting
                        //and calculate the increase
                        //for example, if the unnatural was x2 and the stat was 33, then the increase would be 3
                        var bonus = 0;
                        switch(pieces[j].substring(10).toLowerCase()){
                            case "weapon skill": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.WS/10);
                            break;
                            case "balistic skill": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.BS/10);
                            break;
                            case "strength": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.S/10);
                            break;
                            case "toughness": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.T/10);
                            break;
                            case "agility": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.Ag/10);
                            break;
                            case "intelligence": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.It/10);
                            break;
                            case "perception": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.Pr/10);
                            break;
                            case "willpower": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.Wp/10);
                            break;
                            case "fellowship": 
                                bonus = (Number(indicator[j].substring(1))-1)*Math.floor(Xenos.Fe/10);
                            break;
                        }
                        //record the bonus
                        Xenos.Traits += "(+" + bonus.toString() + ")";
                    } else {
                        //add on any indicators
                        if(indicator[j] != ""){
                            Xenos.Traits += "(" + indicator[j] + ")";
                        }
                    }
                //if the piece is not a number
                } else if(!Number(pieces[j])){
                    //seporate each entry by a line break
                    Xenos.Traits += "<br>";
                    //add on a link to the skill
                    Xenos.Traits += GetLink(pieces[j]);
                    //add on any indicators
                    if(indicator[j] != ""){
                        Xenos.Traits += "(" + indicator[j] + ")";
                    }
                } else {
                    //add on the numerical adendum to the same line
                    Xenos.Traits += pieces[j];
                    //add on any indicators
                    if(indicator[j] != ""){
                        Xenos.Traits += "(" + indicator[j] + ")";
                    }
                }
                
            }
        //weapon[s]
        //disect the line by ,
        //disect the piece by ( and ;
        } 
        else if(label[i].toLowerCase().indexOf("weapon") == 0){
            //what parenthesis layer are we in?
            var parenLayer = 0;
            //disect the line
            for(j = 0; j < line[i].length; j++){
                //are we stepping into a parenthesis layer?
                if(line[i][j] == "("){
                    parenLayer++;
                }
                //are we stepping into a parenthesis layer?
                if(line[i][j] == ")"){
                    parenLayer--;
                }
                //is this char the first open paren or a period?
                if((line[i][j] == "(" && parenLayer <= 1) || line[i][j] == "."){
                    //it is
                    
                    //check to see if the number of indicators matches the number of pieces
                    while(indicator.length < pieces.length){
                        indicator.push("");
                    }
                    //remove any commas at the beginning
                    if(piece.length > 0 && piece[0] == ","){
                        piece = piece.substring(1);
                    }
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the piece (do not add it if it is empty)
                    if(piece != ""){
                        pieces.push(piece);
                        //the piece has been used, clear it
                        piece = "";
                    }
                //are we closing the final paren layer?
                } else if(line[i][j] == ")" && parenLayer <= 0){
                    //it is
                    //trim off any extra white space
                    piece = piece.trim();
                    //attempt to add the indicator (do not add it if it is empty)
                    if(piece != ""){
                        //be sure we are not adding too many indicators
                        if(indicator.length >= pieces.length){
                            //there are too many indicators already, just tack this one onto the last one
                            indicator[indicator.length-1] = indicator[indicator.length-1] + ")(" + piece;
                            //the piece has been used, clear it
                            piece = "";
                        } else {
                            //save this
                            indicator.push(piece);
                            //the piece has been used, clear it
                            piece = "";
                        }
                    }
                } else {
                    //the char is not a seporator, it must be interesting
                    piece = piece + line[i][j];
                }
            }
            //remove any commas at the beginning
            if(piece.length > 0 && piece[0] == ","){
                piece = piece.substring(1);
            }
            //trim off any extra white space
            piece = piece.trim();
            //is there anything of interest left?
            if(piece != ""){
                //add it to the list of pieces
                pieces.push(piece);
            }
            //do a final check to see if the number of indicators matches the number of pieces
            while(indicator.length < pieces.length){
                indicator.push("");
            }
            
            //record that stats of the all the weapons
            for(j = 0; j < pieces.length; j++){
                //add a new weapon
                Xenos.Weapons[j] = {};
                //default the damage and penetation
                Xenos.Weapons[j].Pen = 0;
                Xenos.Weapons[j].Damage = 0;
                //this time the name is the piece
                Xenos.Weapons[j].Name = pieces[j];
                //get ready to disect the weapon text into bits
                var weaponBit = "";
                var weaponBits = [];
                for(k = 0; k < indicator[j].length; k++){
                    //is this char a space?
                    if(indicator[j][k] == "," || indicator[j][k] == ";"){
                        //it is
                        //trim it down
                        weaponBit = weaponBit.trim();
                        //attempt to add the piece (do not add it if it is empty)
                        if(weaponBit != ""){
                            weaponBits.push(weaponBit);
                            //the piece has been used, clear it
                            weaponBit = "";
                        }
                    } else {
                        //the char is not a space, it must be interesting
                        weaponBit = weaponBit + indicator[j][k];
                    }
                }
                //trim it down
                weaponBit = weaponBit.trim();
                //attempt to add the piece (do not add it if it is empty)
                if(weaponBit != ""){
                    weaponBits.push(weaponBit);
                }
                //get the weapon qualities ready
                Xenos.Weapons[j].Qualities = "";
                //examine all the weapon bits
                for(k = 0; k < weaponBits.length; k++){
                    //range
                    if(weaponBits[k].indexOf("m") == weaponBits[k].length-1
                    && Number(weaponBits[k].slice(0,-1))){
                        //record the range
                        Xenos.Weapons[j].Range = Number(weaponBits[k].slice(0,-1))
                    //rate of fire
                    } else if(weaponBits[k].indexOf("/") != -1){
                        //record each RoF
                        log(Xenos.Weapons[j].Name)
                        log(weaponBits[k][0])
                        Xenos.Weapons[j].Single = weaponBits[k][0].toLowerCase() == "s";
                        log(weaponBits[k].substring(weaponBits[k].indexOf("/")+1,weaponBits[k].indexOf("/",weaponBits[k].indexOf("/")+1)));
                        Xenos.Weapons[j].Semi = Number(weaponBits[k].substring(weaponBits[k].indexOf("/")+1,weaponBits[k].indexOf("/",weaponBits[k].indexOf("/")+1)) );
                        log(weaponBits[k].substring(weaponBits[k].indexOf("/",weaponBits[k].indexOf("/")+1)+1))
                        Xenos.Weapons[j].Full = Number(weaponBits[k].substring(weaponBits[k].indexOf("/",weaponBits[k].indexOf("/")+1)+1));
                        
                        log(Xenos.Weapons[j].Single)
                        log(Xenos.Weapons[j].Semi)
                        log(Xenos.Weapons[j].Full)
                    } else if(weaponBits[k].indexOf("Pen") == 0){
                        Xenos.Weapons[j].Pen = Number(weaponBits[k].substring(3).trim());
                    } else if(weaponBits[k].indexOf("Clip") == 0) {
                        Xenos.Weapons[j].Clip = weaponBits[k].substring(4).trim();
                    } else if(weaponBits[k].indexOf("Reload") == 0) {
                        Xenos.Weapons[j].Reload = weaponBits[k].substring(6).trim();
                    } else if(weaponBits[k].indexOf("Rld") == 0) {
                        Xenos.Weapons[j].Reload = weaponBits[k].substring(3).trim();
                    } else if(weaponBits[k].indexOf("Clip") == 0) {
                        Xenos.Weapons[j].Clip = weaponBits[k].substring(4).trim();
                    } else if(weaponBits[k].toLowerCase() == "pistol") {
                        Xenos.Weapons[j].Type = "Pistol";
                    } else if(weaponBits[k].toLowerCase() == "basic") {
                        Xenos.Weapons[j].Type = "Basic";
                    } else if(weaponBits[k].toLowerCase() == "heavy") {
                        Xenos.Weapons[j].Type = "Heavy";
                    } else if(weaponBits[k].toLowerCase().indexOf("d10") != -1){
                        //how many D10s are we using?
                        if(weaponBits[k].toLowerCase().indexOf("d10") == 0){
                            Xenos.Weapons[j].D10s = 1;
                        } else {
                            Xenos.Weapons[j].D10s = Number(weaponBits[k].substring(0,weaponBits[k].toLowerCase().indexOf("d10")));
                        }
                        //is there a base damage to add?
                        var startIndex = -1;
                        //find the start index of the base damage
                        if(weaponBits[k].indexOf("+") != -1){
                            startIndex = weaponBits[k].indexOf("+");
                        } else if(weaponBits[k].indexOf("-") != -1){
                            startIndex = weaponBits[k].indexOf("-");
                        }
                        //find the end index of the base damage and the damage type?
                        var endIndex = -1;
                        if(weaponBits[k].indexOf("I") != -1){
                            Xenos.Weapons[j].DamageType = "I";
                            endIndex = weaponBits[k].indexOf("I");
                        } else if(weaponBits[k].indexOf("R") != -1){
                            Xenos.Weapons[j].DamageType = "R"
                            endIndex = weaponBits[k].indexOf("R");
                        } else if(weaponBits[k].indexOf("X") != -1){
                            Xenos.Weapons[j].DamageType = "X";
                            endIndex = weaponBits[k].indexOf("X");
                        } else if(weaponBits[k].indexOf("E") != -1){
                            Xenos.Weapons[j].DamageType = "E";
                            endIndex = weaponBits[k].indexOf("E");
                        }
                        //record the base damage
                        if(startIndex != -1){
                            if(endIndex != -1){
                                Xenos.Weapons[j].Damage = Number(weaponBits[k].substring(startIndex,endIndex).trim());
                            } else {
                                Xenos.Weapons[j].Damage = Number(weaponBits[k].substring(startIndex).trim());
                            }
                        } else {
                            Xenos.Weapons[j].Damage = 0;
                        }
                    } else if(weaponBits[k].toLowerCase().indexOf("d5") != -1) {
                        //how many D10s are we using?
                        if(weaponBits[k].toLowerCase().indexOf("d5") == 0){
                            Xenos.Weapons[j].D5s = 1;
                        } else {
                            Xenos.Weapons[j].D5s = Number(weaponBits[k].substring(0,weaponBits[k].toLowerCase().indexOf("d5")));
                        }
                        //is there a base damage to add?
                        var startIndex = -1;
                        //find the start index of the base damage
                        if(weaponBits[k].indexOf("+") != -1){
                            startIndex = weaponBits[k].indexOf("+");
                        } else if(weaponBits[k].indexOf("-") != -1){
                            startIndex = weaponBits[k].indexOf("-");
                        }
                        //find the end index of the base damage and the damage type?
                        var endIndex = -1;
                        if(weaponBits[k].indexOf("I") != -1){
                            Xenos.Weapons[j].DamageType = "I";
                            endIndex = weaponBits[k].indexOf("I");
                        } else if(weaponBits[k].indexOf("R") != -1){
                            Xenos.Weapons[j].DamageType = "R"
                            endIndex = weaponBits[k].indexOf("R");
                        } else if(weaponBits[k].indexOf("X") != -1){
                            Xenos.Weapons[j].DamageType = "X";
                            endIndex = weaponBits[k].indexOf("X");
                        } else if(weaponBits[k].indexOf("E") != -1){
                            Xenos.Weapons[j].DamageType = "E";
                            endIndex = weaponBits[k].indexOf("E");
                        }
                        //record the base damage
                        if(startIndex != -1){
                            if(endIndex != -1){
                                Xenos.Weapons[j].Damage = Number(weaponBits[k].substring(startIndex,endIndex).trim());
                            } else {
                                Xenos.Weapons[j].Damage = Number(weaponBits[k].substring(startIndex).trim());
                            }
                        } else {
                            Xenos.Weapons[j].Damage = 0;
                        }
                    //the remaining bits will be added as notes
                    } else {
                        //if there is something already in the list, add a comma
                        if(Xenos.Weapons[j].Qualities != ""){
                            Xenos.Weapons[j].Qualities += ", ";
                        }
                        //are there any notes on the quality?
                        if(weaponBits[k].indexOf("(") != -1){
                            //add everything up to the note
                            Xenos.Weapons[j].Qualities += GetLink(weaponBits[k].substring(0,weaponBits[k].indexOf("(")).trim());
                            //add the note
                            Xenos.Weapons[j].Qualities += weaponBits[k].substring(weaponBits[k].indexOf("(")).trim();
                        } else {
                            //there are no notes. provide a link to the whole thing
                            Xenos.Weapons[j].Qualities += GetLink(weaponBits[k].trim());
                        }
                    }
                }  
            }
        //note[s]
        //disect the remaining information by label
        //bold and output the label
        //place the content after a :
        //add a <br> before the next label
        } 
        else if(label[i].length > 0) {
            Xenos.Notes += "<br><strong>" + label[i] + "</strong>: " + line[i] + "<br>"; 
        }
    }    
    //reset the Xenos
    //gather up all the attributes
    var xenosObjs = findObjs({                              
      _characterid: XenosSheets[0].id,
      _type: "attribute",
    });
    //work with each attribute
    _.each(xenosObjs, function(obj) {
      //delete the attribute
      obj.remove();
    });
    //gather up all the abilities
    xenosObjs = findObjs({                              
      _characterid: XenosSheets[0].id,
      _type: "ability",
    });
    //work with each ability
    _.each(xenosObjs, function(obj) {
      //delete the ability
      obj.remove();
    });
    
    //==========================================================================================================================
    //==========================================================================================================================
    //OUTPUT THE XENOS
    //==========================================================================================================================
    //==========================================================================================================================
    //step through all the native weapons
    Xenos.WeaponText = "";
    for(weaponIndex = 0; weaponIndex < Xenos.Weapons.length; weaponIndex++){
        //write out the details of the weapon
        Xenos.WeaponText += Xenos.Weapons[weaponIndex].Name + " (";
        //output the weapon type if it was worth mentioning
        if(Xenos.Weapons[weaponIndex].Type){
            Xenos.WeaponText += Xenos.Weapons[weaponIndex].Type + "; ";
        }
        //detail the range of the weapon
        if(Xenos.Weapons[weaponIndex].Range > 0){
            Xenos.WeaponText += Xenos.Weapons[weaponIndex].Range.toString() + "m; ";
        }
        //detail the RoF of the weapon
        if(Xenos.Weapons[weaponIndex].Single || Xenos.Weapons[weaponIndex].Semi > 0 || Xenos.Weapons[weaponIndex].Full > 0){
            if(Xenos.Weapons[weaponIndex].Single){
                Xenos.WeaponText += "S/";
            } else {
                Xenos.WeaponText += "-/";
            }
            //detail the number of semi auto shots
            if(Xenos.Weapons[weaponIndex].Semi > 0){
                Xenos.WeaponText += Xenos.Weapons[weaponIndex].Semi.toString();
            } else {
                Xenos.WeaponText += "-";
            }
            Xenos.WeaponText += "/";
            //detail the number of full auto shots
            if(Xenos.Weapons[weaponIndex].Full > 0){
                Xenos.WeaponText += Xenos.Weapons[weaponIndex].Full.toString();
            } else {
                Xenos.WeaponText += "-";
            }
            Xenos.WeaponText += "; ";
        }
        //detail the damage
        if(Xenos.Weapons[weaponIndex].D10s > 0){
            if(Xenos.Weapons[weaponIndex].D10s > 1){
                Xenos.WeaponText += Xenos.Weapons[weaponIndex].D10s.toString();
            }
            Xenos.WeaponText += "D10";
        } else if(Xenos.Weapons[weaponIndex].D5s > 0){
            if(Xenos.Weapons[weaponIndex].D5s > 1){
                Xenos.WeaponText += Xenos.Weapons[weaponIndex].D5s.toString();
            }
            Xenos.WeaponText += "D5";
        }
        //add the base damage
        if(Xenos.Weapons[weaponIndex].Damage > 0){
            Xenos.WeaponText += "+" + Xenos.Weapons[weaponIndex].Damage.toString();
        } else if(Xenos.Weapons[weaponIndex].Damage < 0){
            Xenos.WeaponText += Xenos.Weapons[weaponIndex].Damage.toString();
        }
        //be sure there is a damage type
        if(!Xenos.Weapons[weaponIndex].DamageType){
            //default to impact damage
            Xenos.Weapons[weaponIndex].DamageType = "I";
        }
        //detail the damage type
        Xenos.WeaponText += " " + GetLink(Xenos.Weapons[weaponIndex].DamageType);
        //be sure there is a penetration
        if(!Xenos.Weapons[weaponIndex].Pen){
            //default to 0
            Xenos.Weapons[weaponIndex].Pen = 0;
        }
        Xenos.WeaponText += "; Pen " + Xenos.Weapons[weaponIndex].Pen.toString();
        if(Xenos.Weapons[weaponIndex].Qualities.length != ""){
            Xenos.WeaponText += "; " + Xenos.Weapons[weaponIndex].Qualities;
        }
        Xenos.WeaponText += ")<br>";
        
        //create a token ability for this weapon
        //convert to ability
        var AbilityText = "/w gm - @{character_name} deals [[";
        //add the D10s
        if(Xenos.Weapons[weaponIndex].D10s > 0){
            //does this weapon have tearing?
            if(Xenos.Weapons[weaponIndex].Qualities.indexOf("Tearing") != -1 && Xenos.Weapons[weaponIndex]){
                Xenos.Weapons[weaponIndex].D10s++;
                AbilityText += Xenos.Weapons[weaponIndex].D10s.toString() + "D10d1";
            } else{
                AbilityText += Xenos.Weapons[weaponIndex].D10s.toString() + "D10";
            }
        }
        //add the D5s
        else if(Xenos.Weapons[weaponIndex].D5s > 0){
            //does this weapon have tearing?
            if(Xenos.Weapons[weaponIndex].Qualities.indexOf("Tearing") != -1 && Xenos.Weapons[weaponIndex]){
                Xenos.Weapons[weaponIndex].D5s++;
                AbilityText += Xenos.Weapons[weaponIndex].D5s.toString() + "D5d1";
            } else{
                AbilityText += Xenos.Weapons[weaponIndex].D5s.toString() + "D5";
            }
        }
        //add the base damage
        if(Xenos.Weapons[weaponIndex].Damage){
            AbilityText += "+" + Xenos.Weapons[weaponIndex].Damage.toString()
        }
        AbilityText += "]] "; 
        
        switch(Xenos.Weapons[weaponIndex].DamageType){
            case "I": AbilityText += "Impact"; break;
            case "R": AbilityText += "Rending"; break;
            case "E": AbilityText += "Energy"; break;
            case "X": AbilityText += "Explosive"; break;
        }
        AbilityText += " Damage, ";
        AbilityText += "[[" + Xenos.Weapons[weaponIndex].Pen + "]] Pen";
        if(Xenos.Weapons[weaponIndex].Qualities != ""){
            AbilityText += ", "  + Xenos.Weapons[weaponIndex].Qualities;
        }
        AbilityText += " with a(n) " + Xenos.Weapons[weaponIndex].Name;
        createObj("ability", {
            name: Xenos.Weapons[weaponIndex].Name,
            action: AbilityText,
            istokenaction: true,
            characterid: XenosSheets[0].id
        });
    
    }
    
    //Compile the GM Notes
    Xenos.gmnotes = "";
    Xenos.bio = "";
    //Movement
    //be sure the movement exists
    Xenos.Half   = Xenos.Half || "-";
    Xenos.Full   = Xenos.Full || "-";
    Xenos.Charge = Xenos.Charge || "-";
    Xenos.Run    = Xenos.Run || "-";
    //setup the title row
    Xenos.gmnotes += "<br><table><tbody><tr><td><strong>Half</strong></td><td><strong>Full</strong></td><td><strong>Charge</strong></td><td><strong>Run</strong></td></tr>";
    //add the Half Move
    Xenos.gmnotes += "<tr><td>" + Xenos.Half + "</td>";
    //add the Full Move
    Xenos.gmnotes += "<td>" + Xenos.Full + "</td>";
    //add the Charge Move
    Xenos.gmnotes += "<td>" + Xenos.Charge + "</td>";
    //add the Run Move
    Xenos.gmnotes += "<td>" + Xenos.Run + "</td>";
    //close up the table
    Xenos.gmnotes += "</tbody></table>";
    //Weapons
    if(Xenos.WeaponText != ""){
        Xenos.gmnotes += "<br><strong><u>Weapons</u></strong><br>" + Xenos.WeaponText;
    }
    //Gear
    if(Xenos.Gear != ""){
        Xenos.gmnotes += "<br><strong><u>Gear</u></strong>" + Xenos.Gear + "<br>";
    }
    //Talents
    if(Xenos.Talents != ""){
        Xenos.gmnotes += "<br><strong><u>Talents</u></strong>" + Xenos.Talents + "<br>";
    }
    //Traits
    if(Xenos.Traits != ""){
        Xenos.gmnotes += "<br><strong><u>Traits</u></strong>" + Xenos.Traits + "<br>";
    }
    //Skills
    if(Xenos.Skills != ""){
        Xenos.gmnotes += "<br><strong><u>Skills</u></strong>" + Xenos.Skills + "<br>";
    }
    //Notes
    if(Xenos.Skills != ""){
        Xenos.gmnotes += Xenos.Notes + "<br>";
    }
    //record the GM Notes and bio
    XenosSheets[0].set('gmnotes',Xenos.gmnotes);
    XenosSheets[0].set('bio',Xenos.bio);
    //be sure the stats exist
    if(!Xenos.WS){Xenos.WS = 0}
    if(!Xenos.BS){Xenos.BS = 0}
    if(!Xenos.S ){Xenos.S  = 0}
    if(!Xenos.T ){Xenos.T  = 0}
    if(!Xenos.Ag){Xenos.Ag = 0}
    if(!Xenos.Wp){Xenos.Wp = 0}
    if(!Xenos.Pr){Xenos.Pr = 0}
    if(!Xenos.It){Xenos.It = 0}
    if(!Xenos.Fe){Xenos.Fe = 0}
    //be sure the bonus stats exist, and adust them to reflect the bonus they give, not the total
    if(!Xenos.Unnatural_WS){Xenos.Unnatural_WS = 0}else{Xenos.Unnatural_WS -= Math.floor(Xenos.WS/10);}
    if(!Xenos.Unnatural_BS){Xenos.Unnatural_BS = 0}else{Xenos.Unnatural_BS -= Math.floor(Xenos.BS/10);}
    if(!Xenos.Unnatural_S ){Xenos.Unnatural_S  = 0}else{Xenos.Unnatural_S  -= Math.floor(Xenos.S /10);}
    if(!Xenos.Unnatural_T ){Xenos.Unnatural_T  = 0}else{Xenos.Unnatural_T  -= Math.floor(Xenos.T /10);}
    if(!Xenos.Unnatural_Ag){Xenos.Unnatural_Ag = 0}else{Xenos.Unnatural_Ag -= Math.floor(Xenos.Ag/10);}
    if(!Xenos.Unnatural_Wp){Xenos.Unnatural_Wp = 0}else{Xenos.Unnatural_Wp -= Math.floor(Xenos.Wp/10);}
    if(!Xenos.Unnatural_Pr){Xenos.Unnatural_Pr = 0}else{Xenos.Unnatural_Pr -= Math.floor(Xenos.Pr/10);}
    if(!Xenos.Unnatural_It){Xenos.Unnatural_It = 0}else{Xenos.Unnatural_It -= Math.floor(Xenos.It/10);}
    if(!Xenos.Unnatural_Fe){Xenos.Unnatural_Fe = 0}else{Xenos.Unnatural_Fe -= Math.floor(Xenos.Fe/10);}
    //be sure the Armour stats exist
    if(!Xenos.Armour_H ){Xenos.Armour_H  = 0}
    if(!Xenos.Armour_B ){Xenos.Armour_B  = 0}
    if(!Xenos.Armour_RA){Xenos.Armour_RA = 0}
    if(!Xenos.Armour_LA){Xenos.Armour_LA = 0}
    if(!Xenos.Armour_RL){Xenos.Armour_RL = 0}
    if(!Xenos.Armour_LL){Xenos.Armour_LL = 0}
    //be sure the Wounds exist and default to 3
    if(!Xenos.Wounds){Xenos.Wounds = 3}
    //calculate the total toughness bonus and save it as the Fatigue cap
    Xenos.Fatigue = Math.floor(Xenos.T/10) + Xenos.Unnatural_T;
//=========================================================================================        
    //Feature not available yet :(
    //create the default token for the Xenos from the 'Ahh! A Monster Blueprint!' Character Sheet
    //var Blueprint = findObjs({type: 'character', name: "Ahh! A Monster Blueprint!"})[0];
    //var Token = JSON.parse(Blueprint._defaulttoken);
    
    //Link the token to the sheet
    //Token.represents = NewXenos.id;
    
    //Record the Xenos' name
    //Token.name = UniqueName;
    
    //setup the token bars that are seen by the players
    //Token.bar1_vaule = 0;
    //Token.bar1_max = Xenos.Fatigue.toString();
    //Token.bar2_vaule = 0;
    //Token.bar2_max   = 0;
    //Token.bar3_vaule = Xenos.Wounds.toString();
    //Token.bar3_max   = Xenos.Wounds.toString();
    
    //record the default token
    //NewXenos.set("defaulttoken", JSON.stringify(Token));
//=========================================================================================        
    
    //Potential work around, create an object to use as the default token
    //start out by finding the creature creation room
    var WaitingRooms = findObjs({type: "page", name: "Creature Creation"});
    var WaitingRoom;
    if(WaitingRooms.length > 0){
        WaitingRoom = WaitingRooms[0];
    } else {
        //if the room does not exist, make it exist
        WaitingRoom = createObj("page", {name: "Creature Creation"});
    }
    
    //create the token in the room
    var Token = createObj("graphic", {pageid: WaitingRoom.id, name: XenosSheets[0].get("name") , height: 70, width:70, left: 350, top: 350, layer: "objects", imgsrc: "https://s3.amazonaws.com/files.d20.io/images/3360725/NFy-FPDogVUZbxiRowb2Ag/thumb.png?1394439373"});
    //Fatigue
    Token.set("bar1_value", "0");
    Token.set("bar1_max", Xenos.Fatigue.toString());
    //Fate
    Token.set("bar2_value", "0");
    Token.set("bar2_max", "0");
    //Wounds
    Token.set("bar3_value", Xenos.Wounds.toString());
    Token.set("bar3_max", Xenos.Wounds.toString());
    //Link the Token to the Character
    Token.set("represents", XenosSheets[0].id);
    //adjust visibility
    Token.set("showname",true);
    Token.set("showplayers_bar1",true);
    Token.set("showplayers_bar2",true);
    Token.set("showplayers_bar3",true);
    //adjust editing powers
    Token.set("playersedit_name",false);
    Token.set("playersedit_bar1",false);
    Token.set("playersedit_bar2",false);
    Token.set("playersedit_bar3",false);
    Token.set("playersedit_aura1",false);
    Token.set("playersedit_aura2",false);
    //create all the attributes of the player
    //Characteristics: WS,BS,S,T,Ag,Wp,It,Per,Fe
    createObj("attribute", {name: "WS", current: Xenos.WS, max: Xenos.WS, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "BS", current: Xenos.BS, max: Xenos.BS, characterid: XenosSheets[0].id});
    createObj("attribute", {name:  "S", current: Xenos.S,  max: Xenos.S,  characterid: XenosSheets[0].id});
    createObj("attribute", {name:  "T", current: Xenos.T,  max: Xenos.T,  characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Ag", current: Xenos.Ag, max: Xenos.Ag, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Wp", current: Xenos.Wp, max: Xenos.Wp, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "It", current: Xenos.It, max: Xenos.It, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Per",current: Xenos.Pr, max: Xenos.Pr, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Fe", current: Xenos.Fe, max: Xenos.Fe, characterid: XenosSheets[0].id});
    
    //Stats: Wounds, Fatigue, Fate
    createObj("attribute", {name: "Wounds",  current: Xenos.Wounds, max: Xenos.Wounds, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Fatigue", current: 0, max: Xenos.Fatigue, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Fate",    current: 0, max: 0, characterid: XenosSheets[0].id});
    //Armour: H,RA,LA,B,RL,LL
    createObj("attribute", {name: "Armour_H",  current: Xenos.Armour_H,  max: Xenos.Armour_H,  characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Armour_RA", current: Xenos.Armour_RA, max: Xenos.Armour_RA, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Armour_LA", current: Xenos.Armour_LA, max: Xenos.Armour_LA, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Armour_B",  current: Xenos.Armour_B,  max: Xenos.Armour_B,  characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Armour_RL", current: Xenos.Armour_RL, max: Xenos.Armour_RL, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Armour_LL", current: Xenos.Armour_LL, max: Xenos.Armour_LL, characterid: XenosSheets[0].id});
    //PR
    createObj("attribute", {name: "PR", current: 0, max: 0, characterid: XenosSheets[0].id});
    //Unnatural Characteristics: WS,BS,S,T,Ag,Wp,It,Per,Fe
    createObj("attribute", {name: "Unnatural WS", current: Xenos.Unnatural_WS, max: Xenos.Unnatural_WS, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural BS", current: Xenos.Unnatural_BS, max: Xenos.Unnatural_BS, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural S",  current: Xenos.Unnatural_S,  max: Xenos.Unnatural_S,  characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural T",  current: Xenos.Unnatural_T,  max: Xenos.Unnatural_T,  characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural Ag", current: Xenos.Unnatural_Ag, max: Xenos.Unnatural_Ag, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural Wp", current: Xenos.Unnatural_Wp, max: Xenos.Unnatural_Wp, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural It", current: Xenos.Unnatural_It, max: Xenos.Unnatural_It, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural Per",current: Xenos.Unnatural_Pr, max: Xenos.Unnatural_Pr, characterid: XenosSheets[0].id});
    createObj("attribute", {name: "Unnatural Fe", current: Xenos.Unnatural_Fe, max: Xenos.Unnatural_Fe, characterid: XenosSheets[0].id});
    
    log(Xenos)
    //alert the gm that the character was updated
    sendChat("System","/w gm The <a href=\"http://journal.roll20.net/character/" + XenosSheets[0].id + "\">" + XenosSheets[0].get("name") + "</a>" + " has been Imported.")
}

//searches for a link, if found creates a hyperlink, if not just leaves it as [Name]
//I want this function freely available without having to conjure up the System Object
/*
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
*/
//accept the command
on("chat:message", function(msg) {
if(msg.type == 'api' && msg.content.indexOf('!Import ') == 0 && playerIsGM(msg.playerid)){
    XenosImport(msg.content.substring(8));
}
});
