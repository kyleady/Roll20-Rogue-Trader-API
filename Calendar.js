function Calendar(day,month,year) {
    //what is the curret Day/Month/Year
    this.Day = Number(day) || 1;
    this.Month = Number(month) || 0;
    this.Year = Number(year) || 40000;
    
    //what are the static limits on the days and months?
    this.DaysInAMonth = 35;  
    //what are the names of the months?
    this.MonthNames = ["Terra", "El\'Jonson", "Jaghatai", "Russ", "Dorn", "Sanguinius", "Manus", "Gulliman", "Vulkan", "Corax"];    
    
    //converts a series of numbers into a text date
    this.dateToText = function(day,month,year){
        if(day == null){
            day = this.Day;
        }
        if(month == null){
            month = this.Month;
        }
        if(year == null){
            year = this.Year
        }
        
        //create an output to show the date, starting with the numerical day
        var output = day.toString();
        //add a suffix based on the one's digit 
        //however, all the teens are weird and get th
        if(Math.floor(day/10) == 1){
            output += "th";
        } else {
            //get the suffix based on the one's digit
            switch(day - Math.floor(day/10)*10){
                case 1:                    
                    output += "st";
                break;
                case 2:
                    output += "nd";
                break;
                case 3:
                    output += "rd";
                break;
                default:
                    output += "th"
                break;
            }
        }
        
        //add the month
        output += " of " + this.MonthNames[month];
        
        //add the year
        output += ", in the year " + year.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        //report the date in text form
        return output;
    }
    
    //display the current date to the player
    this.show = function(pretext, who){
        //if no pretext was specified, default to nothing
        pretext = pretext || "";
        //create an output to show the date, starting with the numerical day
        var output = pretext + this.dateToText() + ".";
        //if we are not reporting back to a specific person, then report back to everyone
        if(who == null){
            sendChat("System",output)    
        } else {
            //report the date privatly to the inquirer
            sendChat("System","/w " + who + " " + output)    
        }
        
        
    }
    
    //increases the calendar date based on string input
    this.advance = function(input){
        //step through the input and disect it by the space " "
        var breakIndex = 0;
        var pieces = [];
        while(true) {
            //find the next space
            breakIndex = input.indexOf(" ");
            if(breakIndex == -1){
                //could not find a space
                //save the last bit if it is worth anything
                if(input != ""){
                    pieces.push(input);
                }
                //we are done. abort.
                break;
            } else {
                //save the piece (only if there is something to save)
                if(breakIndex != 0){
                    pieces.push(input.substring(0,breakIndex));
                }
                //remove the piece and the 1 character space from the main input 
                input = input.substring(breakIndex+1);
            }
        }
        //return the current day,month,year, and the change in days
        var output = {};
        output["days"] = 0;
        //record the time in years that is passing
        var years = 0;
        //step through each submitted piece
        for(i = 1; i < pieces.length; i++){
            //search for the labels: day week month year
            //add the appropriate number to the calendar
            switch(pieces[i].toLowerCase()){
                case "day": case "days":
                    if(Number(pieces[i-1])){
                        this.Day += Number(pieces[i-1]);
                        output["days"] += Number(pieces[i-1]);
                    }
                break;
                case "week": case "weeks":
                    if(Number(pieces[i-1])){
                        this.Day += 7*Number(pieces[i-1]);
                        output["days"] += 7*Number(pieces[i-1]);
                    }
                break;
                case "month": case "months":
                    if(Number(pieces[i-1])){
                        this.Month += Number(pieces[i-1]);
                        output["days"] += this.DaysInAMonth*Number(pieces[i-1]);
                    }
                break;
                case "year": case "years":
                    if(Number(pieces[i-1])){
                        this.Year += Number(pieces[i-1]);
                        output["days"] += this.DaysInAMonth * this.MonthNames.length*Number(pieces[i-1]);;
                    }
                break;
                case "decade": case "decades":
                    if(Number(pieces[i-1])){
                        this.Year += 10*Number(pieces[i-1]);
                        output["days"] += this.DaysInAMonth * this.MonthNames.length*10*Number(pieces[i-1]);;
                    }
                break;
                case "century": case "centuries":
                    if(Number(pieces[i-1])){
                        this.Year += 100*Number(pieces[i-1]);
                        output["days"] += this.DaysInAMonth * this.MonthNames.length*100*Number(pieces[i-1]);;
                    }
                break;
            }
        }
        //correct the day/month/year so that none are over their maximum
        this.correct();
        
        output["Day"] = this.Day;
        output["Month"] = this.Month;
        output["Year"] = this.Year;
        return output;
    }
    
    //adjusts the calendar to meed the limits on days and months
    this.correct = function() {
        //for each chunck of MaxDays that we have, add an extra month (while subtracting that extra chunck of MaxDays)
        while(this.Day > this.DaysInAMonth){
            this.Day -= this.DaysInAMonth;
            this.Month++
        }
        
        //for each chunck of MaxMonths that we have, add an extra year (while subtracting that extra chunck of MaxMonths)
        while(this.Month >= this.MonthNames.length){
            this.Month -= this.MonthNames.length;
            this.Year++
        }
        
        //if we are in negative days, borrow from months
        while(this.Day < 0){
            this.Day += this.DaysInAMonth;
            this.Month--;
        }
        
        //if we are in negative months, borrow from years
        while(this.Month < 0){
            this.Month += this.MonthNames.length;
            this.Year--;
        }
    }
    
    //break down a text date into numbers
    this.textToNumbers = function(input){
        //the input is expected to conform to something like "14th of Mamby, 20,000,000"
        
        //create an output variable to save our work in
        var output = {};
        
        //divide the input up by spaces
        //delete any commas
        //step through the GMNotes and disect it by the space " "
        var breakIndex = 0;
        var pieces = [];
        while(true) {
            //find the next space
            breakIndex = input.indexOf(" ");
            if(breakIndex == -1){
                //could not find a space
                //save the last bit if it is worth anything
                if(input != ""){
                    pieces.push(input.replace(/,/g,""));
                }
                //we are done. abort.
                break;
            } else {
                //save the piece (only if there is something to save)
                if(breakIndex != 0 && input.substring(0,breakIndex).replace(/,/g,"") != ""){
                    //save the piece without commas
                    pieces.push(input.substring(0,breakIndex).replace(/,/g,""));
                    
                }
                //remove the piece and the 1 character space from the main input 
                input = input.substring(breakIndex+1);
            }
        }
        
        //step through every piece
        for(var i = 0; i < pieces.length; i++){
            //look for month names in the pieces
            //stop looking once we have found a month
            for(j = 0; output["Month"] == null && j < this.MonthNames.length; j++){
                //search for the month...
                var pat = RegExp(this.MonthNames[j],"i")
                //...inside the current piece
                if(pat.test(pieces[i])){
                    //the jth month was found. Record this.
                    output["Month"] = j;
                }
            }
            //search for a number, then convert that number
            if(Number(/\d+/.exec(pieces[i])) != NaN){
                //first attempt to put the result in the Day
                if(!output["Day"]){
                    output["Day"] = Number(/\d+/.exec(pieces[i]));
                } else if(!output["Year"]){
                    //otherwise jump to the Year
                    output["Year"] = Number(/\d+/.exec(pieces[i]));
                }
            }
                //default to Day first, then Year
        }
        
        //output the date object
        return output;
        
    }
    
    //finds the number of day/month/year difference from date1-date2
    //date2 will default as the current date
    this.difference = function(date1,date2){
        //is date 2 an object?
        if( !((typeof date2 === "object") && (date2 !== null)) ){
            date2 = {};
        }
        //if the day month year of date 1 is not setup, abort
        if(Number(date1["Day"]) == null
        || Number(date1["Month"]) == null
        || Number(date1["Year"]) == null){
            return "Invalid Input: ";
        }
        //if the day moth year of date2 is not setup, default to the current date
        if(date2["Day"] == null){
            date2["Day"] = this.Day;
        }
        if(date2["Month"] == null){
            date2["Month"] = this.Month;
        }
        if(date2["Year"] == null){
            date2["Year"] = this.Year;
        }
        
        //create an output variable to save our work in
        var output = {};
        //calculate the difference of date1 - date2
        output["Day"]   = date1["Day"]   - date2["Day"];
        output["Month"] = date1["Month"] - date2["Month"];
        output["Year"]  = date1["Year"]  - date2["Year"];
        log("date1")
        log(date1)
        log("date2")
        log(date2)
        log("output")
        log(output)
        
        //are there more days than a month?
        while(output["Day"] > this.DaysInAMonth){
            //reduce the number of days by the maximm number of days in a month
            output["Day"] -= this.DaysInAMonth;
            //advance the month count by one
            output["Month"]++;
        }
        //are there more months than a year?
        while(output["Month"] >= this.MonthNames.length){
            //reduce the months by the number of months in a year
            output["Month"] -= this.MonthNames.length;
            //advance the year count by one
            output["Year"]++;
        }
        //are there less than zero months?
        while(output["Day"] < 0){
            //take a month and add it to the days
            output["Day"] += this.DaysInAMonth;
            output["Month"]--;
        }
        while(output["Month"] < 0){
            //take a year and add it to the months
            output["Month"] += this.MonthNames.length;
            output["Year"]--;
        }
        log(output)
        //return the difference of time in text
        output["Text"] = "";
        //be sure the overall product is a positive number
        if(output["Year"] >= 0){
            //any number of days until date1?
            if(output["Day"] > 0){
                //output the number of days until date 1
                output["Text"] += output["Day"].toString() + " day";
                //are the days plural?
                if(output["Day"] > 1){
                    output["Text"] += "s";
                }
            }
            //any number of months until date1?
            if(output["Month"] > 0){
                //do we need a comma?
                if(output["Text"] != ""){
                    output["Text"] += ", ";
                }
                //output the number of months until date 1
                output["Text"] += output["Month"].toString() + " month";
                //are the months plural?
                if(output["Month"] > 1){
                    output["Text"] += "s";
                }
            }
            //any number of years until date1?
            if(output["Year"] > 0){
                //do we need a comma?
                if(output["Text"] != ""){
                    output["Text"] += ", ";
                }
                //output the number of years until date 1
                output["Text"] += output["Year"].toString() + " year";
                //are the years plural?
                if(output["Year"] > 1){
                    output["Text"] += "s";
                }
            }
            //if nothing has been added yet, then the difference is 0,0,0
            if(output["Text"] == ""){
                return "It is the same date today as ";
            }
            //otherwise, return the difference
            return output["Text"] + " until ";
            
        } else {
            output["Year"] *= -1;
            output["Month"] *= -1;
            output["Day"] *= -1;
            log(output)
            //are there less than zero months?
            while(output["Day"] < 0){
                //take a month and add it to the days
                output["Day"] += this.DaysInAMonth;
                output["Month"]--;
            }
            while(output["Month"] < 0){
                //take a year and add it to the months
                output["Month"] += this.MonthNames.length;
                output["Year"]--;
            }
            //now output the positive results
            
            //any number of days until date1?
            if(output["Day"] > 0){
                //output the number of days until date 1
                output["Text"] += output["Day"].toString() + " day";
                //are the days plural?
                if(output["Day"] > 1){
                    output["Text"] += "s";
                }
            }
            //any number of months until date1?
            if(output["Month"] > 0){
                //do we need a comma?
                if(output["Text"] != ""){
                    output["Text"] += ", ";
                }
                //output the number of months until date 1
                output["Text"] += output["Month"].toString() + " month";
                //are the months plural?
                if(output["Month"] > 1){
                    output["Text"] += "s";
                }
            }
            //any number of years until date1?
            if(output["Year"] > 0){
                //do we need a comma?
                if(output["Text"] != ""){
                    output["Text"] += ", ";
                }
                //output the number of years until date 1
                output["Text"] += output["Year"].toString() + " year";
                //are the years plural?
                if(output["Year"] > 1){
                    output["Text"] += "s";
                }
            }
            //if nothing has been added yet, then the difference is 0,0,0
            if(output["Text"] == ""){
                return "It is the same date today as ";
            }
            //otherwise, return the difference
            return output["Text"] + " past ";
        }
        
    }
     
    //convert input calendar text into a schedule object
    this.getSchedule = function(input){
        log("input")
        log(input)
        //start by breaking the input apart by <br>
        var breakIndex = 0;
        var pieces = [];
        while(true) {
            
            //find the next space
            breakIndex = input.indexOf("<br>");
            if(breakIndex == -1){
                //could not find a space
                //save the last bit if it is worth anything
                if(input != ""){
                    pieces.push(input);
                }
                //we are done. abort.
                break;
            } else {
                //save the piece 
                if(breakIndex != 0){
                    //save the piece without commas
                    pieces.push(input.substring(0,breakIndex));
                }
                //remove the piece and the 1 character space from the main input 
                input = input.substring(breakIndex + 4);
            }
            
        }
        
        log("pieces")
        log(pieces)
        //break the line into date and description by the :
        var output = [];
        
        for(ii = 0; ii < pieces.length; ii++){
            log(pieces[ii])
            //do not accept lines that do not have a : in them
            if(pieces[ii].indexOf(":") > -1){
                log(": found")
                //add a new object to the output
                output[output.length] = {};
                //add the text to the object
                output[output.length-1]["text"] = pieces[ii].substring(pieces[ii].indexOf(":") + 1);
                //ask if this date is a repeating date
                if(pieces[ii].indexOf("%") > -1 && pieces[ii].indexOf("%") < pieces[ii].indexOf(":")){
                    log(pieces[ii].substring(pieces[ii].indexOf("%") + 1,pieces[ii].indexOf(":")))
                    output[output.length-1]["repeat"] = pieces[ii].substring(pieces[ii].indexOf("%") + 1,pieces[ii].indexOf(":"));
                    output[output.length-1]["repeat"] = output[output.length-1]["repeat"].substring(0,output[output.length-1]["repeat"].indexOf("</strong>"));
                    log(output[output.length-1]["repeat"])
                    //convert the text date into a list of numbers
                    var tempDate = this.textToNumbers(pieces[ii].substring(0,pieces[ii].indexOf(" %")));
                    
                //otherwise it is not a repeating date
                } else{
                    //convert the text date into a list of numbers
                    var tempDate = this.textToNumbers(pieces[ii].substring(0,pieces[ii].indexOf(":"))) ;
                }
                
                log("tempDate")
                log(tempDate)
                
                //add the date individually
                output[output.length-1]["Day"]   = tempDate["Day"];
                output[output.length-1]["Month"] = tempDate["Month"];
                output[output.length-1]["Year"]  = tempDate["Year"];
                
                log("ii")
                log(ii)
            }
            log("output")
            log(output)
        }
        
        //return the result
        return output;
    }
    
    this.scheduleToText = function(schedule){
        var output = "";
        //step through each event in the schedule
        for(var i = 0; i < schedule.length; i++){
            //make a new line for this event
            output += "<br>";
            //add the date
            output += "<strong>" + this.dateToText(schedule[i]["Day"],schedule[i]["Month"],schedule[i]["Year"]);
            //if the date is repeating, add the period length
            if(schedule[i]["repeat"]){
                output += " %" + schedule[i]["repeat"].toString();
            }
            output += "</strong>:";
            //add the description
            output += schedule[i]["text"];
            //for the ease of reading, add another break
            output += "<br>";
        }
        //return the result
        return output;
    }
    
    //attempts to add the event, pulling apart its description and date
    //second input allows you to denote if this event should be added to the public notes or the gmnotes
    this.addEvent = function(event,gm){
        log("addEvent")
        //try to load both the Calendar and Log Book
        var calendar =  findObjs({type: 'character', name: "Calendar"})[0];
        var logbook  =  findObjs({type: 'character', name: "Log Book"})[0];
        //attempt to load the Notes from both the calendar and logbook
        var CalendarNotes   = "";
        var LogBookNotes    = "";
        //are we workin with gmnotes or regular notes?
        if(gm){
            calendar.get('gmnotes',function(obj){
                CalendarNotes = obj;
            });
            logbook.get('gmnotes',function(obj){
                LogBookNotes = obj;
            });
        } else {
            calendar.get('bio',function(obj){
                CalendarNotes = obj;
            });
            logbook.get('bio',function(obj){
                LogBookNotes = obj;
            });
        }
        //If the notes were not properly loaded..
        //(this always happens on the first try)
        if (CalendarNotes == "" || LogBookNotes == ""){
            //rage quit and tell the user why you are rage quiting.
            //the second time we attempt this it should work
            sendChat("System","/w gm Notes are empty. Try again.");
            return false;
        }
        //chop up the incoming event into starting date, date modifier, and event description
        //event description will be at the beginning
        var EventDescription = event;
        //starting date is denoted by @
        var StartingDate     = "";
        //date modifier will be denoted by +
        var DateModifier     = "";
        //any repetition period will be denoted by %
        var RepeatPeriod = "";
        //create a list for the modifier content
        //de
        var ModifierList = [];
        ModifierList["@"] = "";
        ModifierList["+"] = "";
        ModifierList["%"] = "";
        
        //gather all the content for the modifier list
        for(signifier1 in ModifierList){
            //only do this if the modifier index is even present
            if(event.indexOf(signifier1) > -1){
                //gather all the content AFTER the index
                ModifierList[signifier1] = event.substring(event.indexOf(signifier1)+1)
                //trim out all the content that belongs to other modifiers
                for(signifier2 in ModifierList){
                    //be sure we are only trimming out content from OTHER modifiers
                    //and be sure the second signifier is even present within the content
                    if(signifier2 != signifier1 && ModifierList[signifier1].indexOf(signifier2) > -1){
                        //only retain the text before the second signifier
                        ModifierList[signifier1] = ModifierList[signifier1].substring(0,ModifierList[signifier1].indexOf(signifier2))
                    }
                }
                //trim off any spaces on the edges
                ModifierList[signifier1] = ModifierList[signifier1].trim();
                
                //check if this signifier is in the remaining Event Description
                if(EventDescription.indexOf(signifier1) > -1){
                    //trim out this content from the Event Description                
                    EventDescription = EventDescription.substring(0,EventDescription.indexOf(signifier1))
                }
                
            }
            
        }
        //trim down the final Event Description
        EventDescription = EventDescription.trim();
        
        /*
        //record where the @ and + symbols occur
        var StartingDateIndex = event.indexOf("@");
        var DateModifierIndex = event.indexOf("+");
        //does the Starting Date Index exist and is it before the Date Modifier Index?
        if(StartingDateIndex > -1 && StartingDateIndex < DateModifierIndex){
            EventDescription = event.substring(0,StartingDateIndex).trim();
            StartingDate     = event.substring(StartingDateIndex+1,DateModifierIndex).trim();
            DateModifier     = event.substring(DateModifierIndex+1).trim();
        //does the Starting Date Index exist while the Date Modifier Index does not?
        } else if(StartingDateIndex > -1 && DateModifierIndex == -1) {
            EventDescription = event.substring(0,StartingDateIndex).trim();
            StartingDate     = event.substring(StartingDateIndex+1).trim();
        //does the Date Modifier Index exist and is it before the Starting Date Index?
        } else if(DateModifierIndex > -1 && DateModifierIndex < StartingDateIndex){
            EventDescription = event.substring(0,DateModifierIndex).trim();
            DateModifier     = event.substring(DateModifierIndex+1,StartingDateIndex).trim();
            StartingDate     = event.substring(StartingDateIndex+1).trim();
        //does the Date Modifier Index exist while the Starting Date Index does not?
        } else if(DateModifierIndex > -1 && StartingDateIndex == -1) {
            EventDescription = event.substring(0,DateModifierIndex).trim();
            DateModifier     = event.substring(DateModifierIndex+1).trim();
        } else {
            EventDescription = event.trim();
        }
        */
        
        log("EventDescription: " + EventDescription)
        log("DateModifier: " + ModifierList["+"])
        log("StartingDate: " + ModifierList["@"])
        log("RepeatPeriod: " + ModifierList["%"])
        //if no event description is given, default to [REDACTED]
        if(EventDescription == ""){
            EventDescription = "[REDACTED]"
        }
        log("Repeated Period: " + ModifierList["%"])
        //trim down the repeat period to just numbers
        var repeatedperiod = "";
        for(var index = 0; index < ModifierList["%"].length; index++){
            log(ModifierList["%"][index])
            //be sure the character can be converted into a number
            if(ModifierList["%"][index] != " " && Number(ModifierList["%"][index]) || Number(ModifierList["%"][index]) == 0 ){
                log("Accepted: " + Number(ModifierList["%"][index]).toString())
                //save the number
                repeatedperiod += ModifierList["%"][index];
            }
        }
        //save only the numbers within the repeatedperiod
        ModifierList["%"] = repeatedperiod;
        log("Repeated Period: " + ModifierList["%"])
        //if no starting date is given, default to the current date
        if(ModifierList["@"] == ""){
            this.Day   = getAttrByName(calendar.id,"Day");
            this.Month = getAttrByName(calendar.id,"Month");
            this.Year  = getAttrByName(calendar.id,"Year");
        } else {
            //otherwise interpret the StartingDate as a date object
            var date0 = this.textToNumbers(ModifierList["@"]);
            this.Day   = date0["Day"];
            this.Month = date0["Month"];
            this.Year  = date0["Year"];
        }
        
        log("Starting Day: " + this.Day)
        log("Starting Month: " + this.Month)
        log("Starting Year: " + this.Year)
        //if no date modifier is given, default to the 'from' date with no modifier at all
        //otherwise add the modifier to the starting date
        if(ModifierList["+"] != ""){
            this.advance(ModifierList["+"]);
        }
        log("Adjusted Day: " + this.Day)
        log("Adjusted Month: " + this.Month)
        log("Adjusted Year: " + this.Year)
        //if the date is <= 0 days away from the current date, we will want to add it to the Log Book instead of the Calendar
        //create an object to look at the difference between the current date and the event date 
        var dateDiff = {}
        dateDiff["Day"]   = this.Day   - getAttrByName(calendar.id,"Day");
        dateDiff["Month"] = this.Month - getAttrByName(calendar.id,"Month");
        dateDiff["Year"]  = this.Year  - getAttrByName(calendar.id,"Year");
        log("dateDiff...")
        log(dateDiff)
        //make the days positive at the expense of the months
        while(dateDiff["Day"] < 0){
            dateDiff["Day"] += this.DaysInAMonth;
            dateDiff["Month"]--;
        }
        //make the months positive at the expense of the years
        while(dateDiff["Month"] < 0){
            dateDiff["Month"] += this.MonthNames.length;
            dateDiff["Year"]--;
        }
        log(dateDiff)
        //if the Year ends up negative, then we are definitely talking about an event in the past
        //also check if you are scheduling a date for today
        if(dateDiff["Year"] < 0 ||
        (dateDiff["Day"] == 0 && dateDiff["Month"] == 0 && dateDiff["Year"] == 0)){
            //chop up the events into an array of dates and event descriptions
            var schedule = this.getSchedule(LogBookNotes);
        //otherwise you are talking about a future event, put it in the calendar        
        }else{
            //chop up the events into an array of dates and event descriptions
            var schedule = this.getSchedule(CalendarNotes);
        }
        log(schedule)
        
        //put the event in the list, but do so in chronological order
        //for ease of comparison, convert the date into # of days since 0/0/0
        var totalDays = this.Day + this.Month*this.DaysInAMonth + this.Year*this.MonthNames.length*this.DaysInAMonth;
        //create an event object that will be defined later
        var eventObj = null;
        for(var i = 0; i < schedule.length; i++){
            if(schedule[i]["Day"] + schedule[i]["Month"]*this.DaysInAMonth + schedule[i]["Year"]*this.MonthNames.length*this.DaysInAMonth 
            > totalDays){
                //setup the event Object
                eventObj = {};
                //fill in all the calculated fields
                eventObj["text"]  = " " + EventDescription;
                //do we need to add a repition period?
                //the period needs to be positive
                if(ModifierList["%"] != "" && Number(ModifierList["%"]) > 0){
                    eventObj["repeat"] = Number(ModifierList["%"]);
                }
                eventObj["Day"]   = this.Day;
                eventObj["Month"] = this.Month;
                eventObj["Year"]  = this.Year;
                //insert the event object here
                schedule.splice(i,0,eventObj);
                //stop searching for a place to put this event object in, we already found it
                break;
            }
        }
        //did you make it to the end of the schedule without inserting the eventObj?
        if(eventObj == null){
            //setup the event Object
            eventObj = {};
            //fill in all the calculated fields
            eventObj["text"]  = " " + EventDescription;
            //do we need to add a repition period?
            //the period needs to be positive
            if(ModifierList["%"] != "" && Number(ModifierList["%"]) > 0){
                eventObj["repeat"] = Number(ModifierList["%"]);
            }
            eventObj["Day"]   = this.Day;
            eventObj["Month"] = this.Month;
            eventObj["Year"]  = this.Year;
            
            
            //add it to the end
            schedule.push(eventObj);
        }
        
        log("eventObj")
            log(eventObj)
        //recheck if we are working with the LogBook or the Calendar
        if(dateDiff["Year"] < 0 ||
        (dateDiff["Day"] == 0 && dateDiff["Month"] == 0 && dateDiff["Year"] == 0)){
            //are we working with the gmnotes or the public notes?
            if(gm){
                //update the character sheet text with the new schedule
                logbook.set("gmnotes","<u>Recorded Hidden Events</u>" + this.scheduleToText(schedule));
                sendChat("System","/w gm The " + GetLink("Log Book") + " has been updated.");
            } else {
                //update the character sheet text with the new schedule
                logbook.set("bio","<u>Recorded Events</u>" + this.scheduleToText(schedule));
                sendChat("System","The " + GetLink("Log Book") + " has been updated.");
            }
        //otherwise you are talking about a future event, put it in the calendar        
        }else{
            //are we working with the gmnotes or the public notes?
            if(gm){
                //update the character sheet text with the new schedule
                calendar.set("gmnotes","<u>Upcoming Hidden Events</u>" + this.scheduleToText(schedule));
                sendChat("System","/w gm The " + GetLink("Calendar") + " has been updated.");
            } else {
                //update the character sheet text with the new schedule
                calendar.set("bio","<u>Upcoming Events</u>" + this.scheduleToText(schedule));
                sendChat("System","The " + GetLink("Calendar") + " has been updated.");
            }
        }
        
        //it made it to the end without error
        return true;
    }
    
    //when time advances, this updates the log book and calendar
    this.updateCalendar = function(){
        log("updateCalendar()")
        //try to load the Calendar
        var calendar =  findObjs({type: 'character', name: "Calendar"})[0];
        //attempt to load the Notes from both the calendar and logbook
        var CalendarNotes   = "";
        var CalendarGMNotes   = "";
        //load up the gm notes
        calendar.get('gmnotes',function(obj){
            CalendarGMNotes = obj;
        });
        //load up the bios
        calendar.get('bio',function(obj){
            CalendarNotes = obj;
        });
        
        //If the notes were not properly loaded..
        //(this always happens on the first try)
        if (CalendarNotes == "" || CalendarGMNotes == ""){
            //rage quit and tell the user why you are rage quiting.
            //the second time we attempt this it should work
            sendChat("System","/w gm Notes are empty.");
            return false;
        }
        
        log("Calendar Notes")
        log(CalendarNotes)
        log("Calendar GMNotes")
        log(CalendarGMNotes)
        
        //convert the calendar into a schedule object
        
        var schedule = this.getSchedule(CalendarNotes);
        
        log("schedule")
        log(schedule)
        
        //calculate the # of days since 0/0/0
        log(this.Day + "/" + this.Month + "/" + this.Year)
        var totalDays = this.Day + this.Month*this.DaysInAMonth + this.Year*this.DaysInAMonth*this.MonthNames.length;
        //record a list of annoucements to make
        var anouncements = [];
        
        //continue working with the schedule until there is nothing left to work with
        while(schedule.length > 0){
            log("schedule[0]")
            log(schedule[0])
            log("schedule[0][\"days\"]")
            log(schedule[0]["Day"] + " + " + schedule[0]["Month"]*this.DaysInAMonth + " + " + schedule[0]["Year"]*this.DaysInAMonth*this.MonthNames.length)
            log("totalDays")
            log(totalDays)
            //is the date now >= to the scheduled event?
            if(schedule[0]["Day"] + schedule[0]["Month"]*this.DaysInAMonth + schedule[0]["Year"]*this.DaysInAMonth*this.MonthNames.length
            <= totalDays){
                log("schedule[0][\"days\"] <= totalDays")
                //does this event have a repeating event?
                if(schedule[0]["repeat"] && schedule[0]["repeat"] > 0){
                    //keep checking to see if this repeating event happens again
                    var baseDays = schedule[0]["Day"] + schedule[0]["Month"]*this.DaysInAMonth + schedule[0]["Year"]*this.DaysInAMonth*this.MonthNames.length;
                    var repeatDays = 0;
                    log("Base Days: " + baseDays.toString());
                    log("Repeat Days: " + schedule[0]["repeat"].toString());
                    log("Current Days: " + totalDays.toString());
                    do{
                        //announce the repeated event
                        sendChat("Calendar","/w gm " + "<em>Since the " + this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + "...</em>" + schedule[0]["text"]);
                        //move the repeating event to its next time
                        repeatDays += Number(schedule[0]["repeat"]);
                        //check if this next time has been passed by
                    }while(baseDays + repeatDays <= totalDays);
                    //ask the gm if they would like to continue this infinite cycle of reminders
                    sendChat("Calendar","/w gm [Continue Cycle](!Event ?{Description|" +  schedule[0]["text"] + "} @ " +  this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"])
                    + " +" + repeatDays.toString() + " days %" + schedule[0]["repeat"].toString() +  " days)");
                } else {
                    //announce the event
                    sendChat("Calendar","/w gm " + "<em>On the " + this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + "...</em> " + schedule[0]["text"]
                    + " [Record It](!?{Public or Private?||gm}Event ?{Description|" +  schedule[0]["text"] + "} @ " +  this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + ")");
                }
                //remove this event from the calendar
                schedule.shift();
                
            } else {
                log("schedule[0][\"days\"] > totalDays")
                //we are making the foolish assumption that the events are in chronological order
                //thus if we are already beyond the totalDays, we should never go under it again                
                //stop searching
                break;
            }
        }
        
        //update the calendar's bio
        calendar.set("bio","<u>Upcoming Events</u>" + this.scheduleToText(schedule));
        
        log("===============================GM SECTION=====================================")
        //convert the hidden calendar into a schedule object
        var schedule = this.getSchedule(CalendarGMNotes);
        log("schedule")
        log(schedule)
        
        //continue working with the hidden schedule until there is nothing left to work with
        while(schedule.length > 0){
            //calculate the total days for this event
            //is the date now >= to the scheduled event?
            if(schedule[0]["Day"] + schedule[0]["Month"]*this.DaysInAMonth + schedule[0]["Year"]*this.DaysInAMonth*this.MonthNames.length
            <= totalDays){
                //does this event have a repeating event?
                if(schedule[0]["repeat"] && schedule[0]["repeat"] > 0){
                    //keep checking to see if this repeating event happens again
                    var baseDays = schedule[0]["Day"] + schedule[0]["Month"]*this.DaysInAMonth + schedule[0]["Year"]*this.DaysInAMonth*this.MonthNames.length;
                    var repeatDays = 0;
                    
                    log("Base Days")
                    log(baseDays)
                    log("Repeat Days")
                    log(schedule[0]["repeat"]);
                    log("Current Days")
                    log(totalDays);
                    do{
                        //announce the repeated event
                        sendChat("Calendar","/w gm " + "<em>Since the " + this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + "...</em> " + schedule[0]["text"]);
                        //move the repeating event to its next time
                        repeatDays += Number(schedule[0]["repeat"]);
                        //check if this next time has been passed by
                    }while(baseDays + repeatDays <= totalDays);
                    //ask the gm if they would like to continue this infinite cycle of reminders
                    sendChat("Calendar","/w gm [Continue Cycle](!gmEvent ?{Description|" +  schedule[0]["text"] + "} @ " +  this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"])
                    + " +" + repeatDays.toString() + " days %" + schedule[0]["repeat"].toString() + " days)");
                } else {
                    //announce the event
                    sendChat("Calendar","/w gm " + "<em>On the " + this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + "...</em> " + schedule[0]["text"]
                    + " [Record It](!?{Public or Private?||gm}Event ?{Description|" +  schedule[0]["text"] + "} @ " +  this.dateToText(schedule[0]["Day"],schedule[0]["Month"],schedule[0]["Year"]) + ")");
                }
                //remove this event from the calendar
                schedule.shift();
                
            } else {
                //we are making the foolish assumption that the events are in chronological order
                //thus if we are already beyond the totalDays, we should never go under it again                
                //stop searching
                break;
            }
        }
        
        //update the calendar's gmnotes
        calendar.set("gmnotes","<u>Upcoming Hidden Events</u>" + this.scheduleToText(schedule));
        
        //nothing bad happened
        return true;
    }
   
   //age a character by a number of days
    this.AgeCharacter = function(charID,days){
        
        //get character's age
        var ageObj = findObjs({ type: 'attribute', characterid: charID, name: "Age" })[0];
        //was anything found?
        if(ageObj == undefined){
            sendChat("System","/w gm Age not found.");
            return;
        }
        //the age should be stated as a pair of strings of 'X years' for the current and 'Y days' for the max
        //convert the strings into numbers
        var ageYears = Number(ageObj.get("current").substring(0,ageObj.get("current").indexOf(" years")));
        var ageDays  = Number(ageObj.get("max").substring(0,ageObj.get("max").indexOf(" days")));
        
        //be sure the years and days were found
        if(ageYears == NaN || ageYears == undefined){
            sendChat("System","/w gm Age.Years invalid. Reseting it to 20 years.");
            ageYears = 20;
        }
        if(ageDays == NaN || ageDays == undefined){
            sendChat("System","/w gm Age.Days invalid. Reseting it to 0 days.");
            ageDays = 0;
        }
        log(ageYears + " years and " + ageDays)
        //increse the age
        ageDays += days;
        
        //let any overflow go into years
        while(ageDays >= this.DaysInAMonth * this.MonthNames.length){
            ageDays -= this.DaysInAMonth * this.MonthNames.length;
            ageYears++;
        }
        log(ageYears + " years and " + ageDays)
        //record the resultant age
        ageObj.set('current',ageYears.toString() + " years");
        ageObj.set('max',ageDays.toString() + " days");
    }
    
}

on("chat:message", function(msg) {
if(msg.type == "api" && msg.content.indexOf("!Time += ") == 0 && playerIsGM(msg.playerid)){
    //load the GM variables
    var storage =  findObjs({type: 'character', name: "Calendar"})[0];
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar(getAttrByName(storage.id,"Day"),getAttrByName(storage.id,"Month"), getAttrByName(storage.id,"Year"));
    //advance the Calendar forward by the stated time
    var currentTime = myCalendar.advance(msg.content.substring(9));
    log("Current Time Pre")
    log(currentTime)
    //update the calendar and log book based on events
    if(!myCalendar.updateCalendar()){
        //if there was an error, do not continue
        return;
    }
    log("Current Time Post")
    log(currentTime)
    //if the update was successful...
    //load up the day variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Day" })[0];
    
    //update the day
    attribObj.set("current",currentTime["Day"]);
    //load up the month variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Month" })[0];
    //update the month
    attribObj.set("current",currentTime["Month"]);
    //load up the year variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Year" })[0];
    //update the year
    attribObj.set("current",currentTime["Year"]);
    
    //age the player characters
    myCalendar.AgeCharacter("-K8GPuGMVrED4Cr4_c5l",currentTime["days"])//Naamah
    myCalendar.AgeCharacter("-K8AP2b2Hjm0JfHh7opN",currentTime["days"])//Bill
    //myCalendar.AgeCharacter("Ken",currentTime["days"])
    
    //report the time
    myCalendar.show("<br>It is now the ", null);
    //get rid of the evidence
    delete myCalendar;
} else if(msg.type == "api" && msg.content == "!Time"){
    //load the GM variables
    var storage =  findObjs({type: 'character', name: "Calendar"})[0];
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar(getAttrByName(storage.id,"Day"),getAttrByName(storage.id,"Month"), getAttrByName(storage.id,"Year"));
    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //report the time
    myCalendar.show("It is currently the ", whisperTarget);
    //get rid of the evidence
    delete myCalendar;
} else if(msg.type == "api" && msg.content.indexOf("!Time ?+ ") == 0){
    //load the GM variables
    var storage =  findObjs({type: 'character', name: "Calendar"})[0];
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar(getAttrByName(storage.id,"Day"),getAttrByName(storage.id,"Month"), getAttrByName(storage.id,"Year"));
    //advance the Calendar forward by the stated time
    var currentTime = myCalendar.advance(msg.content.substring(9));
    //do not save the result!
    
    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //report the time
    myCalendar.show("It will be the ", whisperTarget);
    //get rid of the evidence
    delete myCalendar;
} else if(msg.type == "api" && msg.content.indexOf("!Time ? ") == 0){
    //load the GM variables
    var storage =  findObjs({type: 'character', name: "Calendar"})[0];
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar(getAttrByName(storage.id,"Day"),getAttrByName(storage.id,"Month"), getAttrByName(storage.id,"Year"));
    //advance the Calendar forward by the stated time
    var currentTime = myCalendar.textToNumbers(msg.content.substring(8));

    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //report the time in number format
    sendChat("System", "/w " + whisperTarget + " " + myCalendar.difference(currentTime) + msg.content.substring(8));
    //get rid of the evidence
    delete myCalendar;
} else if(msg.type == "api" && msg.content.indexOf("!Event ") == 0 && playerIsGM(msg.playerid)){
    log(msg.content.substring(7))
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar();
    //add your event to the notes
    myCalendar.addEvent(msg.content.substring(7),false);
    //get rid of the evidence
    delete myCalendar;
} else if(msg.type == "api" && msg.content.indexOf("!gmEvent ") == 0 && playerIsGM(msg.playerid)){
    log(msg.content.substring(9))
    //create the Calendar Object based on the stored GM variables
    myCalendar = new Calendar();
    //add your event to the notes
    myCalendar.addEvent(msg.content.substring(9),true);
    //get rid of the evidence
    delete myCalendar;
}
});
