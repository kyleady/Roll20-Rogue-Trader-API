//constructs the System Object with all of its functions and variables
function System(){
    //Identification Numbers
    this.Sector = "K";     //the sector letter, for identification purposes
    this.SystemNumber = 1; //the system numeral, for identification purposes
    this.PlanetNumber = 1; //the planet numeral, for identification purposes
    this.MoonNumber = 1;   //the moon numeral, for identification purposes
    
    //System Features  
    this.BiosphereAtmosphere = 0; //Due to Haven, Biosphere Planets have higher atmosphere rolls
    this.HavenHabitability = 0; //Due to Haven, Planets have higher habitability rolls
    this.EmpireInhabitants = []; //the preset ruins inhabitants (who are now dead and gone)
    this.EmpireRuins = 0; //number of additional archeotech/xenos ruins in the system
    this.EmpireAbundance = 0; //increase the abundance of all Archeotech/Xenos Ruins by this amount
    this.VoidInhabitants = []; //the preset Starfarer inhabitants
    this.region = 0;             //deontes wether we are in the Inner Cauldron(0), Primary Biosphere(1), or Outer Reaches(2)
    this.InnerCauldron = 0;      //index for the InnerCauldron. Please do not modify.
    this.PrimaryBiosphere = 1;   //index for the Primary Biosphere. Please do not modify.
    this.OuterReaches = 2;       //index for the OuterReaches. Please do not modify.
    this.PlanetBounty = 0; //Due to bounty, Planets have additional Mineral Resources
    
    //Planet Creation
    this.RegionShift = 0; //Shifts the Region for planet generation
    this.OrbitalFeatures = 0; //the number of orbital features aroudn a planet
    this.ResourceReductions = 0; //reduce this many resources of a planet based on colony type
    this.ReductionDice = 0; //reduce the resources by this many D10s
    this.ReductionBase = 0; //reduce the resources by this flat amount
    this.ReductionTypes = ""; //only the resources in this list will be reduced
    this.ResourceCap = 500;  //this is the maximum amount of abundance allowed on this world.
    this.ResourceBonus = 0;  //this is a bonus to any rolls for resource abundance
    this.PlanetExoticBounty = 0; //Due to Bounty, Planets have additional Exotic Mineral Resources
    this.Wasteland = 11;  //what is the chance that the location will be a wasteland?
    this.ExtraCreatures = false; //does this planet have extra creatures?
    
    
//=================================================================================================================================
//Resource Functions
//=================================================================================================================================

    //there are many potential modifiers to the abundance of a resource, this function piles up the generic ones all in one place
    this.calculateAbundance = function (abundance,type){
        abundance = abundance || randomInteger(100);
        type = type || "";
        
        //this bonus applies universally
        abundance += this.ResourceBonus;
        
        //if this resource type is found in the list of resources to reduce
        //AND if there are still reductions to do
        if(this.ReductionTypes.indexOf(type) != -1 && this.ResourceReductions > 0){
            //one of the reductions has been used
            this.ResourceReductions--;
            //reduce the abundance by a flat amount
            abundance -= this.ReductionBase;
            //reduce the abundance by [ReductionDice] D10s
            for(var diceindex = 0; diceindex < this.ReductionDice; diceindex++){
                abundance -= randomInteger(10);
            }
            //increase the abundance by -[ReductionDice] D10s
            for(diceindex = 0; diceindex < -this.ReductionDice; diceindex++){
                abundance += randomInteger(10);
            }
        }
        
        //now that all the modifiers have been applied, be sure the abundance lies in legal means
        if(abundance > this.ResourceCap){abundance = this.ResourceCap;}
        else if(abundance < 0){abundance = 0;} //still output a 0, that way you can see when a race has totally depleted a resource
        
        //return the modified abundance
        return abundance;
    }
    
    //generates a random Mineral resource
    this.RandomMineral = function (abundance, PresetMineral){
        PresetMineral = PresetMineral || "";
        
        //apply all the standard modifiers to the abundance
        abundance = this.calculateAbundance(abundance,"Mineral");
        
        //record the abundance of the minerals in string form
        var output = abundance.toString() + " " + getLink("Abundance") + " of ";
        
        //if the mineral was not already preset, roll for one randomly
        if(PresetMineral == ""){
            switch(randomInteger(10)){
                case 1: case 2: case 3: case 4: output += "Industrial"; break;
                case 5: case 6: case 7: output += "Ornamental"; break;
                case 8: case 9: output += "Radioactive"; break;
                case 10: output += "Exotic"; break;
            }
            output += " " + getLink("Minerals");
        } else {
            output += PresetMineral;
        }
        //return the abundance and mineral in string form
        return output;
    }
    
    //generates a random Organic resource
    this.RandomOrganic = function(abundance){
        //apply the standard modifiers to the abundance of the organic compound
        abundance = this.calculateAbundance(abundance,"Organic Compound");
        //record the modified abundance in string form
        var output = abundance.toString() + " " + getLink("Abundance") + " of ";
        //roll for a random organic compound
        switch(randomInteger(10)){
            case 1: case 2:  output += "Curative"; break;
            case 3: case 4:  output += "Juvenat"; break;
            case 5: case 6:  output += "Toxic"; break;
            case 7: case 8: case 9: output += "Vivid"; break;
            case 10: output += "Exotic"; break;
        }
        output += " " + getLink("Compounds")
        //return the abundance and compound type in string form
        return output;
    } 
    
    //generates a random Xenos Ruin resource
    this.RandomRuin = function(abundance, PresetRuin){
        PresetRuin = PresetRuin || "";
        var output = "";
            
        //if abundance is == "Name" then only return the name of a random xenos ruin
        if(abundance != "Name"){
            //calculate abundance based on the preset resource type, by default, this function produces Xenos ruins
            if(PresetRuin == "Human"){
                abundance = this.calculateAbundance(abundance,"Archeotech");
            } else {
                abundance = this.calculateAbundance(abundance,"Ruin");
            }
            
            //Ruined Empire System Traits increase the abundance of Ruins and Archeotech.
            for(index = 0; index < this.EmpireAbundance; index++){
                abundance += randomInteger(10)+5;
            }
            //record the abundance in string form
            output += abundance.toString() + " " + getLink("Abundance") + " of ";
        }
        
        //if the ruin type was not already preset, randomly generate a ruin type
        if(PresetRuin == ""){
            switch(this.Sector){
                case "K": case "C":
                switch(randomInteger(10)){
                    case 1: case 2: case 3: case 4: output += "Unknown Xenos"; break;
                    case 5: case 6:  output += "Eldar"; break;
                    case 7:  output += "Egarian"; break;
                    case 8:  output += "Yu'Vath"; break;
                    case 9:  output += "Ork"; break;
                    case 10: output += "Kroot"; break;
                }
                break;
                case "J": case "O": case "H":
                switch(randomInteger(10)){
                    case 1: case 2: case 3: case 4: output += "Unknown Xenos"; break;
                    case 5: case 6:  output += "Necron"; break;
                    case 7:  output += "Eldar"; break;
                    case 8:  output += "Ghanathaar"; break;
                    case 9:  output += "Ork"; break;
                    case 10: output += "Kroot"; break;
                }
                break;
                case "S":
                    output += "Unknown Xenos";
                break;
            }
        } else if(PresetRuin == "Human") {
            //human ruins are Archeotech resources
            output += getLink("Archeotech Cache");
        } else {
            //otherwise just add the preset Xenos ruin
            output += PresetRuin;
        }
        
        //if you are not just asking for random ruin type and the ruin is not archeotech
        if(abundance != "Name" && PresetRuin != "Human"){
            //append [Ruins] to the output as the Preset Ruin is just an adjective for this noun
            output += " " + getLink("Ruins");
        }
        
        //return the final result in string form
        return output;
    }
    
//=================================================================================================================================
//Race Functions
//=================================================================================================================================

    //generates a random race depending on the area
    this.RandomRace = function (Habitable,PresetRace){
        PresetRace = PresetRace || "";
        var roll;
        var output = PresetRace;
        
        //if the race has not already been predetermined, select a random one
        if(PresetRace == ""){
            switch(this.Sector){
                case "K":
                if(Habitable){roll = randomInteger(10);} else {roll = randomInteger(7);}   
                switch(roll){
                    case 1: output = "Eldar"; break;
                    case 2: case 3: case 4: output = "Human"; break;
                    case 8: output = "Kroot"; break;
                    case 9: case 10: output = "Orks"; break;
                    case 5: output = "Rak'Gol"; break;
                    //we will generate a random xenos later, save onto the fact that this is an Unknown Race
                    case 6: case 7: 
                        PresetRace = "Unknown";
                    break;
                }
                break;
                case "C":
                if(randomInteger(2) == 1){
                    //there is a very large change that the settlement is human
                    output = "Human";
                }else{
                    if(Habitable){roll = randomInteger(10);} else {roll = randomInteger(8);}   
                    switch(roll){
                        case 1: output = "Eldar"; break;
                        case 2: case 3: case 4: case 5: case 6: output = "Human"; break;
                        case 9: output = "Kroot"; break;
                        case 10: output = "Orks"; break;
                        case 7: output = "Rak'Gol"; break;
                        //we will generate a random xenos later, save onto the fact that this is an Unknown Race
                        case 8: 
                            PresetRace = "Unknown";
                        break;
                    }
                }
                break;
                case "J":
                roll = randomInteger(10);
                switch(roll){
                    case 1: case 2: output = "Tyranid"; break;
                    case 3: output = "Daemon"; break;
                    case 4: case 5: case 6: output = "Human"; break;
                    case 7: case 8: output = "Tau"; break;
                    //we will generate a random xenos later, save onto the fact that this is an Unknown Race
                    case 9: 
                        PresetRace = "Unknown";
                    break;
                    case 10: output = "Necron"; break;
                }
                break;
                case "O":
                roll = randomInteger(10);
                switch(roll){
                    case 1: case 2: case 3: output = "Tyranid"; break;
                    case 4: case 5: case 6: output = "Necron"; break;
                    case 7: output = "Human"; break;
                    case 8: case 9: case 10: 
                        PresetRace = "Unknown";
                    break;
                }
                break;
                case "H":
                roll = randomInteger(10);
                switch(roll){
                    case 1: output = "Tyranid"; break;
                    case 2: case 3:  output = "Daemon"; break;
                    case 4: case 5: case 6: output = "Human"; break;
                    case 7: output = "Necron"; break;
                    case 8: output = "Tau"; break;
                    //we will generate a random xenos later, save onto the fact that this is an Unknown Race
                    case 9: case 10: 
                        PresetRace = "Unknown";
                    break;
                }
                break;
                case "S":
                roll = randomInteger(10);
                switch(roll){
                    case 1: output = "Human"; break;
                    case 2: output = "Necron"; break;
                    case 3: output = "Eldar"; break;
                    case 4: output = "Ork"; break;
                    case 5: output = "Kroot"; break;
                    case 6: output = "Daemon"; break;
                    case 7: output = "Tau"; break;
                    case 8: output = "Tyranid"; break;
                    //we will generate a random xenos later, save onto the fact that this is an Unknown Race
                    case 9: case 10: 
                        PresetRace = "Unknown";
                    break;
                }
                break;
            }
        }
        //if you are not just looking for a name, determine the habitation type
        //the habitation and race combination will determine how the abundances of the resources are affected
        if(Habitable != "Name"){
            output += " - ";
            switch(output){
                case "Eldar - ":
                this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                this.ReductionDice = -2; //reduce the resources by this many D10s
                this.ReductionBase = 0; //reduce the resources by this flat amount
                this.ReductionTypes = "Organic Compound"; //only the resources in this list will be reduced
                if(Habitable){roll = randomInteger(10);}else{roll = randomInteger(7);}
                switch(roll){
                    case 1: case 2: case 3: case 4: case 5: output += "Orbital Habitation"; break;
                    case 6: case 7: output += "Voidfarers"; break;
                    case 8: case 9: case 10: output += "Exodites"; break;
                } break;
                case "Human - ":
                if(Habitable){roll = randomInteger(10);}else{roll = randomInteger(5);}
                switch(roll){
                    case 1: case 2: output += "Advanced Industry";
                    this.ResourceReductions = 3; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 3; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 3: output += "Colony";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = -5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 4: output += "Orbital Habitation"; break;
                    case 5: output += "Voidfarers";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 4; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 6: case 7: output += "Basic Industry";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 2; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 8: case 9: output += "Pre-Industrial";
                    this.ResourceReductions = 2; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 10: output += "Primitive Clans";
                    this.ResourceReductions = 1; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 2; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                } break;
                case "Kroot - ":
                switch(randomInteger(10)){
                    case 8: case 9: case 10:output += "Colony";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = -5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    this.ExtraCreatures = true; //does this planet have extra creatures?
                    break;
                    default: output += "Primitive Clans";
                    this.ResourceReductions = 1; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 2; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                } break;
                case "Orks - ":
                switch(randomInteger(10)){
                    case 5: output += "Colony";
                    this.ResourceReductions = randomInteger(5); //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 2; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.Wasteland = 8;  //what is the chance that the location will be a wasteland?
                    this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                    break;
                    case 6: case 7: case 8: output += "Primitive Clans";
                    this.ResourceReductions = randomInteger(5)-1; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.Wasteland = 10;  //what is the chance that the location will be a wasteland?
                    this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                    break;
                    case 9: case 10: output += "Voidfarers";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.Wasteland = 4;  //what is the chance that the location will be a wasteland?
                    this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                    break;
                    default: output += "Advanced Industry";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 10; //reduce the resources by this many D10s
                    this.ReductionBase = 0; //reduce the resources by this flat amount
                    this.Wasteland = 6;  //what is the chance that the location will be a wasteland?
                    this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                    break;
                } break;
                case "Rak'Gol - ":
                switch(randomInteger(5)){
                    case 1: output += "Colony";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = -5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 2: output += "Orbital Habitation"; break;
                    default: output += "Voidfarers";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 4; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                } break;
                case "Tyranid - ":
                if(Habitable){
                    if(randomInteger(2) == 1){
                        output += "Voidfarers";
                        this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                        this.ReductionDice = 10; //reduce the resources by this many D10s
                        this.ReductionBase = 0; //reduce the resources by this flat amount
                        this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                    } else {
                        output += "Colony";
                        this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                        this.ReductionDice = 5; //reduce the resources by this many D10s
                        this.ReductionBase = 0; //reduce the resources by this flat amount
                        this.ReductionTypes = "Organic Compound"; //only the resources in this list will be reduced
                    }
                }else{
                    output += "Primitive Clans";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 0; //reduce the resources by this many D10s
                    this.ReductionBase = 200; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral, Ruin, Archeotech, Organic Compound"; //only the resources in this list will be reduced
                }
                break;
                case "Necron - ": 
                switch(randomInteger(5)){
                    case 1: output += "Voidfarers";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = -4; //reduce the resources by this many D10s
                    this.ReductionBase = 0; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral, Archeotech, Ruin"; //only the resources in this list will be reduced
                    break;
                    default: output += "Advanced Industry";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = -10; //reduce the resources by this many D10s
                    this.ReductionBase = 0; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral, Archeotech, Ruin"; //only the resources in this list will be reduced
                    break;
                } break;    
                break;
                case "Tau - ": 
                roll = randomInteger(5);
                switch(roll){
                    case 1: output += "Orbital Habitation"; break;
                    case 2: output += "Voidfarers";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 2; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 3: case 4: case 5: output += "Colony";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = -5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                }
                break;
                case "Daemon - ":
                roll = randomInteger(5);
                switch(roll){
                    case 1: output += "Voidfarers";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = -10; //reduce the resources by this many D10s
                    this.ReductionBase = 0; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    default: output += "Primitive Clans";
                    this.ResourceReductions = 1000; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = -5; //reduce the resources by this many D10s
                    this.ReductionBase = 0; //reduce the resources by this flat amount
                    this.ReductionTypes = "Organic Compound"; //only the resources in this list will be reduced
                    break;
                }    
                break;
                default:
                if(Habitable){roll = randomInteger(10);}else{roll = randomInteger(4);}
                switch(roll){
                    case 1: output += "Advanced Industry";
                    this.ResourceReductions = 3; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 3; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 2: output += "Colony";
                    this.ResourceReductions = Infinity; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = -5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 3: output += "Orbital Habitation"; break;
                    case 4: output += "Voidfarers";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 4; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 5: case 6: output += "Basic Industry";
                    this.ResourceReductions = 5; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 2; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 7: case 8: output += "Pre-Industrial";
                    this.ResourceReductions = 2; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 5; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                    case 9: case 10: output += "Primitive Clans";
                    this.ResourceReductions = 1; //reduce this many resources of a planet based on colony type
                    this.ReductionDice = 1; //reduce the resources by this many D10s
                    this.ReductionBase = 2; //reduce the resources by this flat amount
                    this.ReductionTypes = "Mineral"; //only the resources in this list will be reduced
                    break;
                } break;
            }
        }
        //if the unknown race has not been generated yet, generate it now
        if(PresetRace == "Unknown"){
            //is this race being stored generally?
            if(output == "" || output == "Unknown"){
                //the xenos has spread across the solar system, make it a void faring race at base
                output = this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString());
            } else {
                //generate xenos based on the Civilization Type (which is stored in native)
                output = this.RandomCreature("native " + output.toLowerCase(),this.Sector + "-" + this.SystemNumber.toString() + "-" + this.PlanetNumber.toString()) + output;
            }
        }
        //return the random inhabitants
        return output;
    }
    
    //roll for a random pirate fleet type to plague this system
    this.RandomPirate = function(){
        switch(this.Sector){
            case "K":
            //Kronos Pirates
            switch(randomInteger(10)){
                case 1: case 2: return "Dark Eldar"; break;
                case 3: case 4: return "Eldar"; break;
                case 5: case 6: return "Orks"; break;
                case 7: return "Chaos"; break;
                case 8: return "Renegade"; break;
                case 9: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break; 
                case 10: return "Rak’Gol"; break;
            }
            break;
            case "C":
            if(randomInteger(2) == 1){
                //there is a very large change that the settlement is human
                return "Human";
            }else{
                switch(randomInteger(10)){
                    case 1: return "Eldar"; break;
                    case 2: case 3: case 4: case 5:  return "Human"; break;
                    case 6: return "Dark Eldar"; break;
                    case 7: return "Kroot"; break;
                    case 8: return "Orks"; break;
                    case 9: return "Rak'Gol"; break;
                    case 10: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break;
                }
            }
            break;
            case "J":
            switch(randomInteger(10)){
                case 1: return "Eldar"; break;
                case 2: return "Dark Eldar"; break;
                case 3: case 4: case 5: case 6: return "Human"; break;
                case 7: case 8: case 9: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break;
                case 10: return "Necron"; break;
            }
            break;
            case "O":
            switch(randomInteger(10)){
                case 1: return "Eldar"; break;
                case 2: return "Dark Eldar"; break;
                case 3: case 4: case 5: case 6: return "Necron"; break;
                case 7: return "Human"; break;
                case 8: case 9: case 10: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break;
            }
            break; 
            case "H":
            switch(randomInteger(10)){
                case 1: return "Eldar"; break;
                case 2: return "Dark Eldar"; break;
                case 3: case 4: case 5: return "Human"; break;
                case 6: case 7: return "Necron"; break;
                case 8: case 9: case 10: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break;
            }
            break; 
            case "S":
            switch(randomInteger(10)){
                case 1: return "Human"; break;
                case 2: return "Necron"; break;
                case 3: return "Eldar"; break;
                case 4: return "Ork"; break;
                case 5: return "Kroot"; break;
                case 6: return "Daemon"; break;
                case 7: return "Tau"; break;
                case 8: return "Tyranid"; break;
                case 9: case 10: return this.RandomCreature("native voidfarer",this.Sector + "-" + this.SystemNumber.toString()); break;
            }
            break;
        }        
    }

//=================================================================================================================================
//Adventure Functions
//=================================================================================================================================

    //Generates a random planetside adventure that could appear on just about any physical location
    this.RandomAdventure = function(){
        //the function will gather the information into a string
        var output = "";
        //generate a profit motive
        output += "<li><strong>Profit Motive</strong>: ";
        switch(randomInteger(10)){
            
            case 1: case 2: 
                output += "Lost Treasures - ";
                switch(randomInteger(10)){
                    case 1: case 2: output += "Lost Explorator</li>"; break;
                    case 3: case 4: output += "Cold Trade Ratlines</li>"; break;
                    case 5: case 6: case 7: output += "Martyr's Toil</li>"; break;
                    case 8: case 9: output += "Winterscale's Lost World</li>"; break;
                    case 10: output += "A Missing Dynasty</li>"; break;
                }break;
            
            case 3: case 4: //Undiscovered worlds
                output += "Undiscovered Worlds - ";
                switch(randomInteger(10)){
                    case 1: case 2: case 3: output += "Heretic Gold</li>"; break;
                    case 4: case 5: output += "Dark Secrets of the Yu'Vath</li>"; break;
                    case 6: case 7: output += "Bones of the Eldar</li>"; break;
                    case 8: case 9: output += "A Jewel Amidst the Sand</li>"; break;
                    case 10: output += "Off the Well-Tread Path</li>"; break;
                }break;
            
            case 5: case 6://Imperial Interest
                output += "Imperial Interest - ";
                switch(randomInteger(10)){
                    case 1: case 2: case 3: output += "The Green Menace</li>"; break;
                    case 4: case 5: case 6: output += "Marauders and Pirates</li>"; break;
                    case 7: case 8: output += "A Personal Errand</li>"; break;
                    case 9: case 10: output += "Echos of Gradneur</li>"; break;
                }break;
            case 7: case 8: //Mapping the Void
                output += "Mapping the Void - ";
                switch(randomInteger(10)){
                    case 1: case 2:  output += "Across the Expanse</li>"; break;
                    case 3: case 4: case 5: output += "A Better Path</li>"; break;
                    case 6: case 7: output += "Untouched by Humanity</li>"; break;
                    case 8: case 9: output += "Gifts of the Machine God</li>"; break;
                    case 10: output += "Safe Passage</li>"; break;
                }break;
            case 9: //Holy Pilgrimage
                output += "Holy Pilgrimage - ";
                switch(randomInteger(10)){
                    case 1: case 2: case 3: output += "Footsteps of Drusus</li>"; break;
                    case 4: case 5: case 6: output += "Winterscale's Resting Place</li>"; break;
                    case 7: case 8: output += "The Lost Crusade</li>"; break;
                    case 9: case 10: output += "Broken Shrine</li>"; break;
                }break;
            case 10: //Ancient Glories
                output += "Ancient Glories - ";
                switch(randomInteger(10)){
                    case 1: case 2: case 3:  output += "Colony of Man</li>"; break;
                    case 4: case 5: output += "Powder Keg</li>"; break;
                    case 6: case 7: output += "Descendants of the God Emperor</li>"; break;
                    case 8: case 9: output += "A Failed Mission</li>"; break;
                    case 10: output += "Imperial Cache</li>"; break;
                }break;
            
        }
        
        //generate an encounter site
        output += "<li><strong>Encounter Site</strong>: ";
        switch(randomInteger(10)){
            
            case 1: output += "Derelict Vessel - "; 
            switch(randomInteger(5)){
                case 1: output += "Automated Defences"; break;
                case 2: output += "Vicious Residents"; break;
                case 3: output += "Structural Decay"; break;
                case 4: output += "Ion Storm"; break;
                case 5: output += "The World Inverted"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Prime Salvage"; break;
                case 2: output += "Valuable Survivors"; break;
                case 3: output += "Lost Cargo"; break;
            }break;
            case 2: output += "Death Zone - "; 
            switch(randomInteger(5)){
                case 1: output += "Sinkhole"; break;
                case 2: output += "Lingering Curses"; break;
                case 3: output += "Insane Machines"; break;
                case 4: output += "Rad Storm"; break;
                case 5: output += "Sandstorm"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Rare Minerals"; break;
                case 2: output += "Ancient Plunder"; break;
                case 3: output += "New Colonies"; break;
            }break;
            case 3: output += "Lost City - "; 
            switch(randomInteger(5)){
                case 1: output += "Hostile Inhabitants"; break;
                case 2: output += "Pitfall Trap"; break;
                case 3: output += "Snare"; break;
                case 4: output += "Weapon Trap"; break;
                case 5: output += "Urban Decay"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Safe Harbour"; break;
                case 2: output += "Secret Lore"; break;
                case 3: output += "Glory and Renown"; break;
            }break;
            case 4: output += "Warrens and Hollows - "; 
            switch(randomInteger(5)){
                case 1: output += "Toxic Spores"; break;
                case 2: output += "Twisting Labyrinth"; break;
                case 3: output += "Natural Snare"; break;
                case 4: output += "Digestion Pit"; break;
                case 5: output += "Bioelectric Field"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Meat Locker"; break;
                case 2: output += "Purge and Cleanse"; break;
                case 3: output += "Rare Specimens"; break;
            }break;
            case 5: output += "Xenoform Biome - "; 
            switch(randomInteger(5)){
                case 1: output += "Hallucinogenic Spores"; break;
                case 2: output += "Shifting Maze"; break;
                case 3: output += "Oppressive Mind"; break;
                case 4: output += "Acid Pool"; break;
                case 5: output += "Aggressive Antibodies"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(2)){
                case 1: output += "Cleared for Colonization"; break;
                case 2: output += "Unnatural Interest"; break;
            }break;
            case 6: output += "Hidden Oasis - "; 
            switch(randomInteger(5)){
                case 1: output += "Native Predators"; break;
                case 2: output += "Deadly Flora"; break;
                case 3: output += "Natural Traps"; break;
                case 4: output += "Hostile Xenos"; break;
                case 5: output += "Renegade Psyker"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Profitable Resources"; break;
                case 2: output += "Those That Never Leave"; break;
                case 3: output += "Trade Centre Establishment"; break;
            }break;
            case 7: output += "Cavern - "; 
            switch(randomInteger(5)){
                case 1: output += "Cave-In!"; break;
                case 2: output += "Dwellers Within"; break;
                case 3: output += "Natural Traps"; break;
                case 4: output += "Horrors from the Dark"; break;
                case 5: output += "Passages Without End"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Profitable Resources"; break;
                case 2: output += "Safe Havens"; break;
                case 3: output += "Lost Relics"; break;
            }break;
            case 8: output += "Jungle - "; 
            switch(randomInteger(5)){
                case 1: output += "Apex Hunters"; break;
                case 2: output += "Dangerous Terrain"; break;
                case 3: output += "Xenos Tribes"; break;
                case 4: output += "Intense Weather"; break;
                case 5: output += "Deadly Swarms"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Xenotech Cache"; break;
                case 2: output += "New Species"; break;
                case 3: output += "Lost Colony"; break;
            }break;
            case 9: output += "Chaos Scarred Region - "; 
            switch(randomInteger(5)){
                case 1: output += "Daemonic Incurions"; break;
                case 2: output += "Corrupting Terrain"; break;
                case 3: output += "Unnatural Gravities"; break;
                case 4: output += "Corrosive Air"; break;
                case 5: output += "Mutant Attack"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(2)){
                case 1: output += "Wonders of the Expanse"; break;
                case 2: output += "Potent Relics"; break;
            }break;
            case 10: output += "Ancient Warzone - "; 
            switch(randomInteger(5)){
                case 1: output += "Active Defences"; break;
                case 2: output += "Unexploded Munitions"; break;
                case 3: output += "Warrior of the Long Watch"; break;
                case 4: output += "Radiation Slag"; break;
                case 5: output += "Tectonic Disruptions"; break;
            }
            output += "</li><li><strong>Reward</strong>: ";
            switch(randomInteger(3)){
                case 1: output += "Weapons Cache"; break;
                case 2: output += "Relics of Battle"; break;
                case 3: output += "Unknown Archeotech"; break;
            }break;
        }
        output += "</li>";
        
        
        //Dangers
        var EncounterDangers = 1;
        while(EncounterDangers > 0){
            if(randomInteger(10) == 1){
                //This Danger needs more Danger
                EncounterDangers += 2;
            }
            else {
                output += "<li><strong>Danger</strong>: ";
                switch(randomInteger(15)){
                    case 1: output += "Strange Gravity"; break;
                    case 2: output += "Endless Night"; break;
                    case 3: output += "Enduring Day"; break;
                    case 4: output += "Baleful Stars"; break;
                    case 5: output += "Irradiated"; break;
                    case 6: output += "Temperature Extremes"; break;
                    case 7: output += "Rage of Storms"; break;
                    case 8: output += "Atmospheric Rot"; break;
                    case 9: output += "Corruptive Rain"; break;
                    case 10: output += "Layered Cloud"; break;
                    case 11: output += "Toxic Jungle"; break;
                    case 12: output += "Chemical Rivers and Lakes"; break;
                    case 13: output += "Broken Ground"; break;
                    case 14: output += "Volcanic Activity"; break;
                    case 15: output += "Warp Touched"; break;
                }
                output += "</li>";
            }
            EncounterDangers--;
        }                
        
        //Complication
        output += "<li><strong>Complication</strong>: ";
        switch(randomInteger(10)){
            case 1: output += "The Passing Storm"; break;
            case 2: output += "The Green Menace"; break;
            case 3: output += "Marked for Death"; break;
            case 4: output += "Scoundrels!"; break;
            case 5: output += "Devouring Infection"; break;
            case 6: output += "Hunter and Prey"; break;
            case 7: output += "In Shadows Cast"; break;
            case 8: output += "Tomb of the Ancients - "; 
            switch(randomInteger(4)){
                case 1: output += "Nightmare Globe"; break;
                case 2: output += "Temporal Sink"; break;
                case 3: output += "Lightning Spire"; break;
                case 4: output += "Stasis Trap"; break;
            }break;
            case 9: output += "Silence Amongst the Stars"; break;
            case 10: output += "Rak'Gol Scouts"; break;
        }
        output += "</li>";
        //return the adventure in string form
        return output;
    }
    

//=================================================================================================================================
//System Element Functions
//=================================================================================================================================

    //before we head to the planetary bodies, we need a function that creates handouts for the planets
    this.RandomPlanet = function (Moon,MaxSize){
        //if moon was not mentioned, assume it is not a moon
        Moon = Moon || false;
        //if a max size was not mentioned, assume there is no limit
        MaxSize = MaxSize || 10;

        //create temporary variables
        var output = ""; //stores the text sumary of the planet
        
        var PlanetGravity = 0;  //this function could be called as a moon and so we do not want to interrupt the host Gravity
        var Atmosphere = 0; //this varable records the atmospheric presence of the planet
        var Composition = 0; //this variable records the atmosphere composition
        var Climate = 0; //this variable records the Climate on the planet
        var Habitability = 0; //this variable records how habitable the planet is
        var TerritoryNumber = 1;//this variable labels each territory with a number
        var Size = 0; //this variable records the size of the planet, this provides an upper limit for the size of its moons
        
        var i; //a simple counter variable that can be turned into a string
        var Die;
        var k;
        
        //reset object variables
        this.ResourceBonus = 0;  //this is a bonus to any rolls for resource abundance
        this.ResourceCap = 500;
        this.ResourceReductions = 0; //reduce this many resources of a planet based on colony type
        this.ReductionDice = 0; //reduce the resources by this many D10s
        this.ReductionBase = 0; //reduce the resources by this flat amount
        this.ReductionTypes = ""; //only the resources in this list will be reduced
        this.Wasteland = 11;  //what is the chance that the location will be a wasteland?
        this.ExtraCreatures = false; //does this planet have extra creatures?
        
        //reset non-Moon object variables
        if(!Moon){
            this.MoonNumber = 1;
            this.OrbitalFeatures = 0;
            this.RegionShift = 0;
        }
        
        //Generate the Body of the Planet/Moon
        output += "<ul><li><strong>Body</strong>: ";
        
        //roll a random size for the planet
        Size = randomInteger(10);
        //be sure that the body is not larger than the host planet
        if(Size > MaxSize){Size = MaxSize;}
        
        //the size of the body applies a modifer to the roll for gravity
        //it can also alter rolls for resources
        switch(Size){
            case 1: output += "Low-Mass"; 
            PlanetGravity = -7;  
            this.ResourceCap = 40; 
            break;
            case 2: case 3: output += "Small"; 
            PlanetGravity = -5;
            break;
            case 4: output += "Small and Dense"; 
            this.ResourceBonus = 10;
            break;
            case 5: case 6: case 7: output += "Large"; break;
            case 8: output += "Large and Dense"; 
            PlanetGravity = 5;
            this.ResourceBonus = 10;
            break;
            case 9: case 10: output += "Vast"; 
            PlanetGravity = 4;
            break;
        }
        //close this bullet point
        output += "</li>";
        
        //Generate the Gravity of the Planet/Moon
        output += "<li><strong>" + getLink("Gravity") + "</strong>: ";
        PlanetGravity += randomInteger(10);
        
        //the gravity of the planet determines the number of Orbital Features, only if this Planet is not a Moon. Moons don't get their own moons
        //further the gravity provides a bonus to atmosphere rolls
        if(PlanetGravity <= 2) {
           output  += "Low";
           Atmosphere -= -2;
           if(!Moon){this.OrbitalFeatures = randomInteger(5)-3;}
        } else if(PlanetGravity >= 3 && PlanetGravity <= 8) {
           output += "Normal";
           if(!Moon){this.OrbitalFeatures = randomInteger(5)-2;}
        } else  { //if(PlanetGravity >= 9)
           output += "High";
           Atmosphere += 1;
           if(!Moon){this.OrbitalFeatures = randomInteger(5)-1;}
        }
        //close this bullet point
        output += "</li>";
        
        //Generate the Atmosphere of the Planet
        output += "<li><strong>" + getLink("Atmosphere") + "</strong>: ";
        
        //roll for the atmosphere
        Atmosphere += randomInteger(10);
        
        //haven systems have an atmosphere bonus for being in the Primary Biosphere
        if(this.region == this.PrimaryBiosphere){Atmosphere += this.BiosphereAtmosphere;}
        
        if(Atmosphere <= 1) {
            output  += "-";
        } else if(Atmosphere >= 2 && Atmosphere <= 4) {
            output += "Thin & ";
        } else if(Atmosphere >= 5 && Atmosphere <= 9) {
            output += "Moderate & ";
        } else { //if(Atmosphere >= 10)
            output += "Heavy & ";
        }
        
        //if there is an atmosphere, generate its composition
        if(Atmosphere >= 2){
            Composition += randomInteger(10);
            //haven systems have an exceptional bonus for the purity of Primary Biosphere Air quality
            if(this.region + this.RegionShift == this.PrimaryBiosphere){Composition += this.BiosphereAtmosphere + this.BiosphereAtmosphere;}
            switch(Composition) {
                case 1: output += "Deadly"; break;
                case 2: output += "Corrosive"; break;
                case 3: case 4: case 5: output += "Toxic"; break;
                case 6: case 7: output += "Tainted"; break;
                default: output += "Pure"; break;
            }
        }
        //close this bullet point
        output += "</li>";
        
        //Generate the Atmosphere of the Planet
        output += "<li><strong>" + getLink("Climate") + "</strong>: ";
        //Climate is pre determined if there is no atmosphere
        //Climite strongly affects Habitability
        if(Atmosphere <= 1) {
            if(this.region + this.RegionShift >= this.OuterReaches){
                output += "Ice World";
                Climate = 11;
            } else {
                output += "Burning World";
                Climate = 0;
            }
            Habitability = -7;
        } else {
            //roll for a random Climate
            Climate = randomInteger(10);
            //adjust the roll for the solar region
            if(this.region + this.RegionShift <= this.InnerCauldron){Climate -= 6;}
            if(this.region + this.RegionShift >= this.OuterReaches){Climate += 6;}   
            
            if(Climate <= 0) {
                output += "Burning World";
                Habitability = -7;
            } else if(Climate >= 1 && Climate <= 3) {
                output += "Hot World";
                Habitability = -2;
            } else if(Climate >= 4 && Climate <= 7) {
                output += "Temperate World";
                Habitability = 0;
            } else if(Climate >= 8 && Climate <= 10) {
                output += "Cold World";
                Habitability = -2;
            } else {
                output += "Ice World";
                Habitability = -7;
            }
        }
        //close this bullet point
        output += "</li>";
        
        //Generate the Habitability of the Planet
        output += "<li><strong>Habitability</strong>: ";
        //roll for the habitability, adding in the bonus for Haven Systems
        Habitability += randomInteger(10)+this.HavenHabitability;
        if(Habitability <= 1){
            output += "Inhospitable";
        } else if(Habitability >= 2 && Habitability <= 3 ) {
            output += "Trapped Water";
        } else if(Habitability >= 4 && Habitability <= 5 ) {
            output += "Liquid Water";
        } else if(Habitability >= 6 && Habitability <= 7 ) {
            output += "Limited Ecosystem";
        } else {
            output += "Verdant";
        }
        //end bullet point
        output += "</li>";
        
        //generate discernable landmasses, if there is water, it is more likely to have distinct landmasses
        //there is a small chance that there won't be any landmasses, thus a planet submerged in water
        if((Habitability <= 3 && randomInteger(10) >= 8)||(Habitability >= 4 && randomInteger(10) >= 4)){
            i = randomInteger(Size)+randomInteger(Size) - 2;
        }else {
            i = 1
        }
        output += "<li><strong>Landmasses</strong>: " + i.toString() + "</li>";
        
        //generate the Inhabitants of the Planet
        output += "<li><strong>Inhabitants</strong>: ";
        //the likelihood of sentient inhabitants has a 3x increase if the world is habitable
        //the likelihood of sentient inhabitants has a 3x increase if the system is owned by a void faring civilization, it will be one of the preset civilizations and it will be a civilization capable of surviving on an inhabitable world
        if(this.VoidInhabitants.length > 0 && ((Habitability >= 6 && randomInteger(10) >= 2) || (Habitability < 6 && randomInteger(10) == 8))){
            output += this.RandomRace(false,this.VoidInhabitants[randomInteger(this.VoidInhabitants.length)-1]);    
        } else if(Habitability >= 6 && randomInteger(10) >= 8) {
            output += this.RandomRace(true);
        } else if(Habitability < 6 && randomInteger(10) == 10) {
            output += this.RandomRace(false);
        } else {
            output += "-";
        }
        output += "</li>"
        
        //generate planetary mineral resources
        //the amount of resources depends on the size of the planet
        if(Size <= 4) {
            i = randomInteger(5)-2;
        } else if(Size <= 8){
            i = randomInteger(5);
        } else {
            i = randomInteger(10);
        }
        //increase the amount of distinct resources by the any System Feature Bonuses
        i += this.PlanetBounty;
        //add the random Minerals
        while(i > 0){
            output += "<li>" + this.RandomMineral() + "</li>";
            i--;
        }
        
        //generate the additional resources of the planet
        //the amount is dependant on the size of the planet
        if(Size <= 4) {
            i = randomInteger(5)-3;
        } else if(Size <= 8){
            i = randomInteger(5)-2;
        } else {
            i = randomInteger(5)-1;
        }
        while(i > 0){
            output += "<li>";
           //determine the category of this additional resources                
            switch(randomInteger(10)){
                case 5: case 6:
                output += this.RandomRuin(randomInteger(100),"Human"); //Archeotech
                break;
                case 7: case 8: 
                output += this.RandomRuin();
                break;
                case 9: case 10:
                //only rather habitable planets should house organic resources
                if(Habitability >= 6){
                    output += this.RandomOrganic();
                    break;
                }
                default:
                output += this.RandomMineral();
                break;
            }
            i--;
            output += "</li>";
        }
        
        //generate mandatory exotic bounties
        for(var i = 0; i < this.PlanetExoticBounty; i++){
            output += "<li>" + this.RandomMineral(randomInteger(100),"Exotic " + getLink("Minerals"))+ "</li>";
        }
        
        //generate mandatory extra ruins
        //for each result of Empire
        for(var i = 0; i < this.EmpireRuins; i++){
            //add D3-1 ruins to this planet
            for(k = randomInteger(3)-1; k > 0; k--){
                //add a random ruin from the available presets
                output += "<li>" + this.RandomRuin(randomInteger(100),this.EmpireInhabitants[randomInteger(this.EmpireInhabitants.length)-1]) + "</li>";
            }
        }
        
        //generate the noteworthy areas of the planet, defined as territories
        i = randomInteger(5);
        //modify the number of notable territories, based on the habitability of the planet
        if(Habitability < 6) { 
            i -= 4;
        } else if(Habitability >= 8) {
            i += 2;
        }
        
        //modify the number of territories, based on the size of the planet
        if(Size <= 4) { //small worlds
            i += -2;
        } else if(Size >= 9) { //vast worlds
            i += 3;
        }
        
        //generate at least one territory
        do{
            //label the territory
            var locationLabel = this.Sector + "-" + this.SystemNumber.toString() + "-" + this.PlanetNumber.toString(); 
            //add the Moon label if it is a moon
            if(Moon){locationLabel += "-" + this.MoonNumber.toString();}
            //add the Territory Number and move it up one
            locationLabel += "-" + TerritoryNumber.toString();
            output += "<li><strong>Territory " + locationLabel + "</strong>: ";
            TerritoryNumber++;
            
            //the types of territories available are dependant on the habitability of the planet
            if(Habitability < 4){
                Die = randomInteger(2);
            } else if(Habitability < 6) {
                Die = randomInteger(3);
            } else  {
                Die = randomInteger(5);
            }
            //save the details of the territory now and construct it afterwards
            var Territory = {}
            //get a list of traits ready
            Territory.Traits = [];
            //get a list of features ready            
            Territory.Landmarks = [];
            //has this territory been reduced to a wasteland?
            if(randomInteger(10) >= this.Wasteland){
                //autoset the territory type to wasteland
                Die = 1;
            }
            //does this territory have extra creatures?
            if(this.ExtraCreatures && randomInteger(2) == 1){
                Territory.Traits.push("Notable Species");
            }
            //determine the territory type with the Die roll
            switch(Die){
                case 1: 
                Territory.Type = "Wasteland";
                //output += "Wasteland</li><ul>";
                //die will be recycled as a counter for the number of traits on this territory
                Die = 1;
                while(Die > 0){
                    switch(randomInteger(20)){
                        case 1: case 2: case 3: case 4: //Desolate
                        Territory.Traits.push("Desolate");
                        //output += "<li>Desolate</li>";
                        break;
                        case 5: case 6: case 7: case 8: //Expansive
                        Territory.Traits.push("Expansive");
                        //output += "<li>Expansive</li>";
                        break;
                        case 9: case 10: case 11: case 12: case 13: case 14: //Extreme Temperature
                        Territory.Traits.push("Extreme Temperature");
                        //output += "<li>Extreme Temperature</li>";
                        break;
                        case 15: //Notable Species
                        Territory.Traits.push("Notable Species");
                        //output += "<li>Notable Species - " + this.RandomCreature("wasteland ") + "</li>";
                        break;
                        case 16: //Ruined
                        Territory.Traits.push("Ruined");
                        //output += "<li>Ruined</li>";
                        break;
                        case 17: case 18: case 19: //Unusual Location
                        Territory.Traits.push("Unusual Location");
                        //output += "<li>Unusual Location</li>";
                        break;
                        case 20:
                        Die += 2; //This territory has multiple traits. Roll again for this trait and again for the new trait.
                        break;
                    }
                    Die--;
                }
                break;
                case 2:
                Territory.Type = "Mountains";
                //output += "Mountains</li><ul>";
                //die will be recycled as a counter for the number of traits on this territory
                Die = 1;
                while(Die > 0){
                    switch(randomInteger(20)){
                        case 1: case 2: case 3: case 4: case 5: //Boundary
                        Territory.Traits.push("Boundary");
                        //output += "<li>Boundary</li>";
                        break;
                        case 6: case 7: case 8: case 9: case 10://Expansive
                        Territory.Traits.push("Expansive");
                        //output += "<li>Expansive</li>";
                        break;
                        case 11: case 12: case 13:  //Extreme Temperature
                        Territory.Traits.push("Extreme Temperature");
                        //output += "<li>Extreme Temperature</li>";
                        break;
                        case 14: case 15: //Foothills
                        Territory.Traits.push("Foothills");
                        //output += "<li>Foothills</li>";
                        break;
                        case 16: case 17://Notable Species
                        Territory.Traits.push("Notable Species");
                        //output += "<li>Notable Species - " + this.RandomCreature() + "</li>";
                        break;
                        case 18: case 19: //Unusual Location
                        Territory.Traits.push("Unusual Location");
                        //output += "<li>Unusual Location</li>";
                        break;
                        case 20:
                        Die += 2; //This territory has multiple traits. Roll again for this trait and again for the new trait.
                        break;
                    }
                    Die--;
                }
                break;
                case 3: 
                Territory.Type = "Swamp";
                //output += "Swamp</li><ul>";
                //die will be recycled as a counter for the number of traits on this territory
                Die = 1;
                while(Die > 0){
                    switch(randomInteger(20)){
                        case 1: case 2: //Expansive
                        Territory.Traits.push("Expansive");
                        //output += "<li>Expansive</li>";
                        break;
                        case 3: case 4: case 5: case 6: //Extreme Temperature
                        Territory.Traits.push("Extreme Temperature");
                        //output += "<li>Extreme Temperature</li>";
                        break;
                        case 7: case 8: case 9:  //Notable Species
                        Territory.Traits.push("Notable Species");
                        //output += "<li>Notable Species - " + this.RandomCreature() + "</li>";
                        break;
                        case 10: case 11: case 12: case 13: //Stagnant
                        Territory.Traits.push("Stagnant");
                        //output += "<li>Stagnant</li>";
                        break;
                        case 14: case 15://Unusual Location
                        Territory.Traits.push("Unusual Location");
                        //output += "<li>Unusual Location</li>";
                        break;
                        case 16: case 17: case 18: case 19: //Virulent
                        Territory.Traits.push("Virulent");
                        //output += "<li>Virulent</li>";
                        break;
                        case 20:
                        Die += 2; //This territory has multiple traits. Roll again for this trait and again for the new trait.
                        break;
                    }
                    Die--;
                }
                break;
                case 4: 
                Territory.Type = "Plains";
                //output += "Plains</li><ul>";
                //die will be recycled as a counter for the number of traits on this territory
                Die = 1;
                while(Die > 0){
                    switch(randomInteger(20)){
                        case 1: case 2: //Broken Ground
                        Territory.Traits.push("Broken Ground");
                        //output += "<li>Broken Ground</li>";
                        break;
                        case 3: case 4: case 5: case 6: 
                        Territory.Traits.push("Expansive");
                        //output += "<li>Expansive</li>";
                        break;
                        case 7: case 8: case 9:  //Extreme Temperature
                        Territory.Traits.push("Extreme Temperature");
                        //output += "<li>Extreme Temperature</li>";
                        break;
                        case 10: case 11: case 12: case 13: case 14: //Fertile
                        Territory.Traits.push("Fertile");
                        //output += "<li>Fertile</li>";
                        break;
                        case 15: case 16: case 17://Notable Species
                        Territory.Traits.push("Notable Species");
                        //output += "<li>Notable Species - " + this.RandomCreature() + "</li>";
                        break;
                        case 18: case 19: //Unusual Location
                        Territory.Traits.push("Plains");
                        //output += "<li>Unusual Location</li>";
                        break;
                        case 20:
                        Die += 2; //This territory has multiple traits. Roll again for this trait and again for the new trait.
                        break;
                    }
                    Die--;
                }
                break;
                case 5:
                Territory.Type = "Forest";
                //output += "Forest</li><ul>";
                //die will be recycled as a counter for the number of traits on this territory
                Die = 1;
                while(Die > 0){
                    switch(randomInteger(20)){
                        case 1:
                        Territory.Traits.push("Exotic Nature");
                        //output += "<li>Exotic Nature</li>";
                        break;
                        case 2: case 3: case 4: case 5: //Expansive
                        Territory.Traits.push("Expansive");
                        //output += "<li>Expansive</li>";
                        break;
                        case 6: case 7: case 8:  //Extreme Temperature
                        Territory.Traits.push("Extreme Temperature");
                        //output += "<li>Extreme Temperature</li>";
                        break;
                        case 9: case 10: case 11: case 12: case 13: //Notable Species
                        Territory.Traits.push("Notable Species");
                        //output += "<li>Notable Species - " + this.RandomCreature() + "</li>";
                        break;
                        case 14: case 15: case 16: //Unique Compound
                        Territory.Traits.push("Unique Compound - " + this.RandomOrganic());
                        //output += "<li>Unique Compound - " + this.RandomOrganic() + "</li>"
                        break;
                        case 17: case 18: case 19: //Unusual Location
                        Territory.Traits.push("Unusual Location");
                        //output += "<li>Unusual Location</li>";
                        break;
                        case 20:
                        Die += 2; //This territory has multiple traits. Roll again for this trait and again for the new trait.
                        break;
                    }
                    Die--;
                }
                break;
            }
            
            //add landmarks to this territory
            Die = randomInteger(5);
            //modify the number of landmarks by the Size of the planet
            //modify the number of territories, based on the size of the planet
            if(Size >= 5) { //large worlds
                Die += 2;
            } else if(Size >= 9) { //vast worlds
                Die += 3;
            }
            //add the landmarks
            while(Die > 0){
                //roll for a random landmark
                switch(randomInteger(20)){
                    case 1: case 2: case 3: case 4:
                        Territory.Landmarks.push("Canyon");
                        //output += "<li>Canyon</li>";
                    break;
                    case 5: case 6: case 7:
                        Territory.Landmarks.push("Cave Network");
                        //output += "<li>Cave Network</li>";
                    break;
                    case 8: case 9:
                        Territory.Landmarks.push("Crater");
                        //output += "<li>Crater</li>";
                    break;
                    case 10: case 11: case 12: case 13:
                        Territory.Landmarks.push("Mountain");
                        //output += "<li>Mountain</li>";
                    break;
                    case 14: case 15:
                        Territory.Landmarks.push("Volcano");
                        //output += "<li>Volcano</li>";
                    break;
                    case 16:
                    if(Habitability >= 2 && Climate >= 4) {
                        Territory.Landmarks.push("Glacier");
                        //output += "<li>Glacier</li>";
                    }else {
                        Die++;
                    }
                    break;
                    case 17:
                    if(Atmosphere >= 2) {
                        Territory.Landmarks.push("Perpetual Storm");
                        //output += "<li>Perpetial Storm</li>";
                    }else {
                        Die++;
                    }
                    break;
                    case 18:
                    if(Habitability >= 4) {
                        Territory.Landmarks.push("Inland Sea");
                        //output += "<li>Inland Sea</li>";
                    } else {
                        Die++;
                    }
                    break;
                    case 19:
                    if(Habitability >= 4) {
                        Territory.Landmarks.push("Reef");
                        //output += "<li>Reef</li>";
                    } else {
                        Die++;
                    }
                    break;
                    case 20:
                    if(Habitability >= 4) {
                        Territory.Landmarks.push("Whirlpool");
                        //output += "<li>Whirlpool</li>";
                    } else {
                        Die++;
                    }
                    break;
                }
                Die--;
            }
            //construct and output the territory
            //type
            output += Territory.Type + "</li><ul>";
            //traits
            for(territoryIndex = 0; territoryIndex < Territory.Traits.length; territoryIndex++){
                if(Territory.Traits[territoryIndex] != "Notable Species"){
                    output += "<li>" + Territory.Traits[territoryIndex] + "</li>";
                } else {
                    //this is the point of the territory object
                    //I want to take into account all the landmarks, traits, territory type, and habitability
                    //start by generating a list of possible environment adaptations
                    //every habitable planet can always support a deathworld species
                    var possibleAdaptations = ["deathworld"];
                    //what is the temperature of the planet?
                    if(Climate <= 3){
                        //the planet is exceptionally hot
                        possibleAdaptations.push("volcanic");
                    } else if (Climate >= 8){
                        //the planet is exceptionally cold
                        possibleAdaptations.push("ice");
                    } else {
                        //the planet's temperature is juuuust right
                        possibleAdaptations.push("temperate");
                    }
                    //what is the territory type?
                    if(Territory.Type == "Forest"){
                        possibleAdaptations.push("jungle");
                    } else if(Territory.Type == "Wasteland"){
                        possibleAdaptations.push("desert");
                    } else if(Territory.Type == "Swamp"){
                        possibleAdaptations.push("ocean");
                    }
                    //search through the traits
                    for(traitIndex = 0; traitIndex < Territory.Traits.length; traitIndex++){
                        if(Territory.Traits[traitIndex] == "Extreme Temperature"){
                            //what is the temperature of the planet?
                            if(Climate <= 3){
                                //the planet is already hot, but this location is even hotter 
                                possibleAdaptations.push("volcanic");
                            } else if (Climate >= 8){
                                //the planet is already cold, but this location is even colder
                                possibleAdaptations.push("ice");
                            } else if(randomInteger(2) == 1){
                                //this specific location is reasonably cold
                                possibleAdaptations.push("ice");
                            } else {
                                //this specific location is reasonably cold
                                possibleAdaptations.push("volcanic");
                            }
                        } else if(Territory.Traits[traitIndex] == "Unusual Location"){
                            possibleAdaptations.push("exotic");
                        }
                    }
                    //landmarks
                    for(landmarkIndex = 0; landmarkIndex < Territory.Landmarks.length; landmarkIndex++){
                        switch(Territory.Landmarks[landmarkIndex]){
                            case "Inland Sea": 
                            case "Reef":
                            case "Whirlpool":
                                possibleAdaptations.push("ocean");
                            break;
                            case "Volcano":
                                possibleAdaptations.push("volcanic");
                            break;
                            case "Glacier":
                                possibleAdaptations.push("ice");
                            break;
                        }
                    }
                    //is this world even habitable?
                    if(Habitability <= 1){
                        //only exotic creatures can exist here
                        possibleAdaptations = ["exotic"];
                    } else if(possibleAdaptations.length == 0){
                        possibleAdaptations[0] = "";
                    } else {
                        //select a random adaptation
                        possibleAdaptations[0] = possibleAdaptations[randomInteger(possibleAdaptations.length)-1];
                    }
                    log(possibleAdaptations)
                    //does this adaptation support a large number of plants?
                    //if it does, 1/2 chance to be a plant  
                    if(possibleAdaptations[0] == "volcanic" 
                    || possibleAdaptations[0] == "ice"
                    || possibleAdaptations[0] == "desert"
                    || randomInteger(2) == 1){
                        //create a fauna xenos
                        output += "<li>Notable Species - " + this.RandomCreature("fauna " + possibleAdaptations[0],locationLabel) + "</li>";
                    } else {
                        //create a flora xenos
                        output += "<li>Notable Species - " + this.RandomCreature("flora " + possibleAdaptations[0],locationLabel) + "</li>";
                    }
                }
            }
            //landmarks
            output += "<li><strong>Landmarks</strong></li><ul>"
            for(territoryIndex = 0; territoryIndex < Territory.Landmarks.length; territoryIndex++){
                output += "<li>" + Territory.Landmarks[territoryIndex] + "</li>";
            }
            //each territory has a chance for an adventure
            if(randomInteger(10) == 1) {
                output += this.RandomAdventure();
            }
            //close up the bullet point group for the territory
            output += "</ul></ul>";
            
            i--;
        }while(i > 0);
        
        //reset object variables
        this.ResourceBonus = 0;  //this is a bonus to any rolls for resource abundance
        this.ResourceCap = 500;
        this.ResourceReductions = 0; //reduce this many resources of a planet based on colony type
        this.ReductionDice = 0; //reduce the resources by this many D10s
        this.ReductionBase = 0; //reduce the resources by this flat amount
        this.ReductionTypes = ""; //only the resources in this list will be reduced
        this.Wasteland = 11;  //what is the chance that the location will be a wasteland?
        this.ExtraCreatures = false; //does this planet have extra creatures?
        
        //Moons cannot generate orbital features, otherwise things could get crazy
        if(!Moon){
            //be sure at least one orbital feature will have a chance at being generated
            //generate Orbital Features for the Planet
            do {
                //generate a random oribital feature, influenced by the gravity of the planet
                i = randomInteger(100);
                if(i >= 46 && i <= 60) {
                    output += "<li><strong>Large Asteroid</strong></li>";
                } else if(i >= 61 && i <= 90) {
                    output += "<li><strong>Lesser Moon</strong>: " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "-" + this.MoonNumber + "</li>";
                    this.MoonNumber++; //another moon has been added to this body
                    i = randomInteger(100)-10;
                    if(randomInteger(2) == 2 && i > 0){
                        output += "<ul><li>" + this.RandomMineral(i) + "</li></ul>";
                    }
                    //each mini moon has a chance to house a lovely lovely adventure, but it is tiny
                    if(randomInteger(100) == 1) {
                        output += this.RandomAdventure();
                    }
                } else if(i >= 86) { 
                    output += "<li><strong>Moon</strong>: "  + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "-" + this.MoonNumber + "</li>";
                    if(this.Sector == "S"){Size = 10;} //larger objects orbitting smaller objects is one of the tammer happenings in the Screaming Vortex
                    output += this.RandomPlanet("Moon",Size);
                }
                this.OrbitalFeatures--;
            } while(this.OrbitalFeatures > 0);
        }
        
        //close bullet point group
        output += "</ul>";
        
        //do not increase the Planet Counter if this is a Moon
        //do not increase the Moon Number if this is a Planet
        if(!Moon){this.PlanetNumber++;}else{this.MoonNumber++;}
        
        //deliver the summary of the planet
        return output;
    }
    
    //Generates a list of warp connections for the system
    this.WriteWarpRoutes = function(connections){
        //create an output variable
        var textOutput = "";
        //start off with any connections to other systems
        //but only do so if there are connections to work with
        if(connections){
            //divide the list of connections into discrete pieces
            var TravelTime = []; //how long does it normally take to travel this route?
            var RouteStability = []; //what is the stability of the route?
            var DestinationID = []; //what is the ID of the token this system connects to?
            
            var piece = "";
            var pieces = [];
            //dismantle the input piece by piece
            for(var i = 0; i < connections.length; i++){
                //break up the connection input by spaces and parens
                if(connections[i] == ' ' || connections[i] == '(' || connections[i] == ')' || connections[i] == "<" || connections[i] == ">"){
                    //be sure we have something worth saving
                    if(piece != "" && piece != "-" && piece != "br"){
                        //save this piece
                        pieces.push(piece);
                    }
                    //reset the piece
                    piece = "";
                } else {
                    //otherwise we must have something worth saving
                    piece += connections[i];
                }
            }
            //save any leftover pieces
            //be sure we have something worth saving
            if(piece != "" && piece != "-" && piece != "br"){
                //save this piece
                pieces.push(piece);
            }
            //convert the pieces into into text
            textOutput += "Warp Routes<br><ul>";
            //step through the pieces we have collected
            for(var i = 0; i < pieces.length; i += 3){
                //be sure we have all three pieces to work with
                if(pieces[i+2]){
                    //start this bullet point
                    textOutput += "<li>";
                    //does the connected token represent anything?
                    var connectedGraphic = getObj('graphic',pieces[i+2]);
                    //was this graphic found and does it represent anything?
                    if(connectedGraphic && connectedGraphic.get("represents")){
                        textOutput += "<u><a href=\"http://journal.roll20.net/character/" + connectedGraphic.get("represents") + "\">" + connectedGraphic.get("name") +  "</a></u>"; 
                    } else {
                        textOutput += "?????";
                    }
                    //add the number of days this journey should take
                    textOutput += " - " + pieces[i+1] + " days";
                    //add the stability of the route
                    textOutput += " (" + pieces[i] + ")";
                    //close off this bullet point
                    textOutput += "</li>";
                }
            }
            //close off this bullet point section
            textOutput += "</ul>";
        }
        
        return textOutput;
    }
    
    //Generates the System with Planets, Territories, and Xenos. Saves it into a handout.
    this.Generate = function(input,connections){
      //default the connections input to blank
      if(connections == undefined){
          connections = "";
      }
      //create an object to output at the end of this function
      var output = {};
      //Reset these global variables
      this.Sector = "K";    //this identifies the sector the System is in
      this.SystemNumber = 1; //the system numeral, for identification purposes
      this.PlanetNumber = 1; //the planet numeral, for identification purposes
      this.MoonNumber = 1;
      //figure out which Sector this new System belongs in
      if(input.length > 11){
        this.Sector = input[11];
        this.Sector = this.Sector.toUpperCase();
        switch(this.Sector){
            case "J": //Jericho Reach ~ Replace Haven with Bountiful
            case "H": //Hadex Anomaly ~ As Jericho Reach + Replace Warp Statis with Warp Turbulence
            case "O": //Outer Reaches ~ As Jericho Reach + Replace Starefarers with Bountiful + Habitability -= 1
            case "C": //Calaxis Sector ~ Do not add any system features
            case "S": //Screaming Vortex ~ Abolish logical rules, let it get out of hand. Replace Warp Stasis with Warp Turbulence
            break;
            default: this.Sector = "K"; //Kronos Expanse ~ Increase System Features by 2
        }
      }
      
      //keep searching for New World i until you don't find it 
      
      var UniqueName = 'System ' + this.Sector + "-" + this.SystemNumber.toString();
      var OldSystems = findObjs({ type: 'character', name: UniqueName });      
      while(OldSystems.length > 0){
          this.SystemNumber++;
          UniqueName = 'System ' + this.Sector + "-" + this.SystemNumber.toString();
          OldSystems = findObjs({ type: 'character', name: UniqueName });
      }
      
    //create the handout with the unique name  
      var NewSystem = createObj("character", {
        name:  UniqueName
      });
      
    //save the character sheet id
    output.id = NewSystem.id;
    output.SystemName = UniqueName;
    //System Generation Variables
    //set up the Notes and GMNotes for the handout
    var Notes = "";
    var GMNotes = "";
    
    //general storage for numbers, both counters and random Ints
    var Die = 1;
    var i = 0; 
    var j = 0;
    
    //System Features
    var FeaturesTotal = 0; //# of Features in the system.
    var AsteroidBounty = 0; //Due to bounty, Asteroids could receive additional resources
    var PlanetMinimum = 0; // the minimum number of planets in this system
    
    //System Elements
    var AsteroidBelts = [0,0,0];    //determines the population of this element in each Solar Zone
    var AsteroidClusters = [0,0,0]; //determines the population of this element in each Solar Zone
    var DerelictStations = [0,0,0]; //determines the population of this element in each Solar Zone
    var DustClouds = [0,0,0];       //determines the population of this element in each Solar Zone
    var GasGiants = [0,0,0];        //determines the population of this element in each Solar Zone
    var GravityRiptides = [0,0,0];  //determines the population of this element in each Solar Zone
    var Planets = [0,0,0];          //determines the population of this element in each Solar Zone
    var RadiationBursts = [0,0,0];  //determines the population of this element in each Solar Zone
    var SolarFlares = [0,0,0];      //determines the population of this element in each Solar Zone
    var StarshipGraveyards = [0,0,0];//determines the population of this element in each Solar Zone
    var ResourceType;               //storage variable for the type of Resource that will be present in the element
    
    //Star Creation
    var StarsTotal = 1;         //# of Stars in the system
    var Elements = [0,0,0];     //determines the bonus number of system elements in this region. Can be negative.
    
    //Gas Giant Creation
    var Gravity = 0;  //determines the gravity of the planet
    
    ///write any warp routes down if they exist
    GMNotes += this.WriteWarpRoutes(connections);
    
    //=====System Features=====
    //The Calaxis Sector has 0 features as the remaining worlds as rather unnotable
    if(this.Sector == "C"){
        FeaturesTotal = 0;
    } else {
        GMNotes += "System Features<br><ul>";
        FeaturesTotal += randomInteger(5);
        //the Kronos Expanse has D5 features, all others have D5-2
        if(this.Sector != "K"){
            FeaturesTotal -= 2;
            if(FeaturesTotal < 1){FeaturesTotal = 1;}
        }
    }
    //The Outer Reaches are a hauntingly dead region of space - reduce the Habitability of all planets by 1
    if(this.Sector == "O"){this.HavenHabitability--;}
    //The Screaming Vortex is a nightmarish fantsay where the inanimate wakes into imagination
    if(this.Sector == "S"){this.HavenHabitability += 10;}
    //add the System Features to the GMNotes
    while(FeaturesTotal > 0){
        //start this bullet point
        GMNotes += "<li>";
        //add a random system feature to the system
        FeaturesTotal--;
        //roll for a random System Feature
        i = randomInteger(10);
        
        //Handles all the Sector specific exceptions
        //Replace Pirate Den with a biased reroll in the Outer Reaches (few Pirates have survived the creeping ruin of the Tyranids and Necrons)
        if(i == 5 && this.Sector == "O"){i = randomInteger(5);}
        //Replace Haven with Bounty in the Outer Reaches, Jericho Reach, and Hadex Anomely
        if(i == 3 && (this.Sector == "O" || this.Sector == "J" || this.Sector == "H")){i = 1;}
        //replace Warp Turbulence with a chance for Warp Stasis in the Outer Reaches
        if(i == 10 && this.Sector == "O"){i = 8 + randomInteger(2);}
        //replace Warp Stasis with a chance for Warp Turbulence in the Screaming Vortex and Hadex Anomely
        if(i == 9 && (this.Sector == "H" || this.Sector == "S")){i = 8 + randomInteger(2);}
        
        //based on what was rolled and editted, add a System Element
        switch(i) {
            case 1: GMNotes += "<strong>Bountiful</strong>: ";
            switch(randomInteger(4)){
                case 1: GMNotes += "Add one Asteroid Belt or Asteroid Cluster to any one Solar Zone."; 
                    if(randomInteger(2) == 1){AsteroidBelts[randomInteger(3)-1]++;}else{AsteroidClusters[randomInteger(3)-1]++;}
                break;
                case 2: GMNotes += "Roll an additional time on Table 1-20 Mineral Resources for each Asteroid Belt and Cluster."; 
                    AsteroidBounty++;
                break;
                case 3: GMNotes += "Roll one additional time on Table 1-20 Minderal Resources when generating Planets in this System";
                    this.PlanetBounty++;
                break;
                case 4: GMNotes += "Add one Exotic Resource to the Mineral Resources on each Planet";
                    this.PlanetExoticBounty++;
                break;
            } break;
            case 2: GMNotes += "<strong>Gravity Tides</strong>: ";
            switch(randomInteger(3)){
                case 1: GMNotes += "Add D5 " + getLink("Gravity Tides") +  " to random Solar Zones."; 
                    i = randomInteger(5);
                    while(i > 0){GravityRiptides[randomInteger(3)-1]++; i--;}                
                break;                    
                case 2: GMNotes += "The gravity wells surrounding Planets in this System churn like whirlpools, battering orbiting vessels with their fluctuations. Safely entering orbit with a voidship requires a Difficult (–10) " + getLink("Pilot") + "(Space Craft) Test, causing the loss of 1 point of Hull Integrity for every two Degrees of Failure. Small craft can enter and exit the gravity well only after the pilot passes a Very Hard (–30)" + getLink("Pilot") + "(Flyers) Test. Every full day spent in orbit requires an additional " + getLink("Pilot") + " Test"; break;
                case 3: GMNotes += "Travel between Planets within this System takes half the usual time."; break;
            } break;
            case 3: GMNotes += "<strong>Haven</strong>: "; 
            switch(randomInteger(3)){
                case 1: GMNotes += "Add one Planet to each Solar Zone."; 
                Planets[this.InnerCauldron]++; Planets[this.PrimaryBiosphere]++; Planets[this.OuterReaches]++;
                break;
                case 2: GMNotes += "Planets within the System’s Primary Biosphere receive +1 to the result of the roll on Table 1–9: Atmospheric Presence and +2 to the result of the roll on Table 1–10: Atmospheric Composition (see page 21).";
                    this.BiosphereAtmosphere++;
                break;
                case 3: GMNotes += "Planets in this System add +2 to the result of any roll they make on Table 1–12: Habitability (see page 23)."; 
                    this.HavenHabitability += 2;
                break;
            } break;
            case 4: GMNotes += "<strong>Ill-Omened</strong>: "; 
            switch(randomInteger(7)){
                case 1: GMNotes += "Any ship entering the System for the first time loses 1d5 Morale, unless one of the Explorers passes a Challenging (+0) [Charm] or [Intimidate] Test. If the nature and reputation of the System was known to the crew ahead of time, the Test difficulty and Morale loss for failure might be higher at the GM’s discretion."; break;
                case 2: GMNotes += "All Morale loss suffered within this System is increased by 1, as the crew attribute whatever misfortune they suffer to the malevolent will of their surroundings. This does not apply to Morale lost for entering a System the first time (even the most fearful voidsman’s imagination can only concoct so many horrors!)."; break;
                case 3: GMNotes += "Any " + getLink("Fear") +  " Tests made within the System are made at an additional –10 penalty."; break;
                case 4: GMNotes += "When spending a " + getLink("Fate Point") +  " within this System, roll 1d10. On a 9, it has no effect. If it was spent to alter a Test in some way, it counts as the only Fate Point that can be used for that Test as normal, even though it had no effect. Void Born Explorers recover " + getLink("Fate Point") +  "s lost in this manner (thanks to the result of 9) as normal."; break;
                case 5: GMNotes += "All Willpower Tests made within this System are made at a –10 penalty."; break;
                case 6: GMNotes += "Whenever an Explorer would gain " + getLink("Insanity") +  " Points while within this System, double the amount of Insanity Points he gains."; break;
                case 7: GMNotes += "Attempting to use Psychic Techniques from the Divination Discipline to gain information about the System or anything within it requires the user to pass a Difficult (–10) " + getLink("Fear") +  " Test before he can attempt the " + getLink("Focus Power Test") +  "."; break;
            } break;
            case 5: GMNotes += "<strong>Pirate Den</strong>: "; 
            i = randomInteger(5)+4;
            GMNotes += i.toString() + " " + this.RandomPirate() + " ships";
            if(randomInteger(10) > 4){GMNotes += " and one space station";}
            GMNotes += ".";
            break;
            case 6: GMNotes += "<strong>Ruined Empire</strong>: ";
            if(randomInteger(3) == 1){StarshipGraveyards[this.InnerCauldron]++;}
            if(randomInteger(3) == 1){StarshipGraveyards[this.PrimaryBiosphere]++;}
            if(randomInteger(3) == 1){StarshipGraveyards[this.OuterReaches]++;}
            if(randomInteger(3) == 1){DerelictStations[this.InnerCauldron]++;}
            if(randomInteger(3) == 1){DerelictStations[this.PrimaryBiosphere]++;}
            if(randomInteger(3) == 1){DerelictStations[this.OuterReaches]++;}                    
            this.EmpireRuins++;
            this.EmpireAbundance++;
            switch(randomInteger(2)){
                case 1: GMNotes += "Add a Xenos Ruins Resource to 1d4 of the Planets in this System. If there are not enough Planets in the System, make up the difference by adding the remaining ruins as Starship Graveyards or Derelict Stations to the System. Increase the Abundance of any Xenos Ruins by 1d10+5 (see page 31).";
                    this.EmpireInhabitants.push(this.RandomRuin("Name"));
                break;
                case 2: GMNotes += "Add an Archeotech Cache Resource to 1d4 of the Planets in this System. If there are not enough Planets in the System, make up the difference by adding the remaining ruins as Starship Graveyards or Derelict Stations to the System. Increase the Abundance of any Archeotech Caches by 1d10+5 (see page 28).";
                    this.EmpireInhabitants.push("Human");
                break;
            } break;
            case 7: GMNotes += "<strong>Starfarers</strong>: ";
            GMNotes += "If the System contains less than four Planets after all System Elements have been generated, the GM should add additional Planets until the Region contains at least four Planets. A common civilisation is spread across the System Features in this System. The liklihood of inhabitation increases to 2+ on habitable planets and 5+ on inhabitable planets. This might be either a non-Imperial human nation or a race of previously unknown, sentient xenos. During the Planet Creation process for this System, all Planets with a native civilisation are automatically inhabited by the appropriate species at a Development level of Voidfarers, Colony, or Orbital Habitation, as appropriate. At least one Planet has a native population at the Voidfarers Development level. Any Habitable Planet not populated by the Starfarers generates Inhabitants normally.";
                    PlanetMinimum += 4;
                    this.VoidInhabitants.push(this.RandomRace("Name"));
            break;
            case 8: GMNotes += "<strong>Stellar Anomaly</strong>: "; 
            switch(randomInteger(3)){
                case 1:
                GMNotes += "Reduce the number of Planets generated by 2, as the presence of a Stellar Anomaly tends to disrupt the formation of any bodies smaller than itself.";
                Planets[randomInteger(3)-1]--; 
                Planets[randomInteger(3)-1]--;
                break;
                case 2: GMNotes += getLink("Scholastic Lore") +  "(Astromancy) and " + getLink("Navigation") +  "(Stellar) Tests made to plot routes through the System, or to determine position within it, receive a +10 bonus."; break;
                case 3: GMNotes += "The massive forces exerted by a Stellar Anomaly sometimes seems to stabilise local Warp routes, though many dismiss this as voidsmen’s superstition and no record exists of any Navigator’s comment on the matter. Ships travelling through the System only need to roll for Warp Travel Encounters for every seven full days of travel (or once, for a trip of under seven days). However, the same forces make the necessity of occasional drops into realspace for course adjustment into an additional hazard. On any result of doubles when rolling for a Warp Travel encounter, the vessel runs afoul of a hazard in realspace instead of applying the normally generated result. The effects of such hazards can be extrapolated from similar System Elements, such as Gravity Riptides, Radiation Bursts, or Solar Flares."; break;
            } break;
            case 9: GMNotes += "<strong>Warp Stasis</strong>: "; 
            switch(randomInteger(4)){
                case 1: GMNotes += "Travel to and from the System is becalmed. Double the base travel time of any trip entering or leaving the area. The time required to send Astrotelepathic messages into or out of the System is likewise doubled. In addition, pushing a coherent message across its boundaries requires incredible focus; Astropaths suffer a –3 penalty to their Psy Rating for the purposes of sending Astrotelepathic messages from this System."; break;
                case 2: GMNotes += getLink("Focus Power Test") +  "s and " + getLink("Psyniscience") +  " Tests within the System are made at a –10 penalty."; break;
                case 3: GMNotes += "Psychic Techniques cannot be used at the Push level within the System."; break;
                case 4: GMNotes += "When rolling on Table 6–2: Psychic Phenomena (see page 160 of the ROGUE TRADER Core Rulebook) within this System, roll twice and use the lower result."; break;
            } break;
            case 10: GMNotes += "<strong>Warp Turbulence</strong>: "; 
            switch(randomInteger(5)){
                case 1: GMNotes += "Navigators suffer a –10 penalty to " + getLink("Navigation") +  "(Warp) Tests for Warp Jumps that begin or end in this System."; break;
                case 2: GMNotes += "Add +10 to all rolls for on Table 6–2: Psychic Phenomena (see page 160 of the ROGUE TRADER Core Rulebook) made within the System."; break;
                case 3: GMNotes += "Whenever an Explorer would gain " + getLink("Corruption") +  " Points within the System, increase the amount gained by 1."; break;
                case 4: GMNotes += "Add +1 to the Psy Rating of any Psychic Technique used at the Unfettered or Push levels."; break;
                case 5: GMNotes += "One of the Planets in the System is engulfed in a permanent Warp storm, rendering it inaccessible to all but the most dedicated (and insane) of travellers. " + getLink("Navigation") +  "(Warp) Tests made within this System suffer a –20 penalty due to the difficulty of plotting courses around this hazard."; break;
            } break;
            break;
        }
        //end this bullet point
        GMNotes += "</li>";
    }
    //close up the bullet point group
    GMNotes += "</ul>";
    
    
    //=====Star Creation=====
    GMNotes += "<br>Stars<br><ul>";
    Notes += "Stars<br><ul>";
    //record the size and type of stars in this system
    output.StarSizes = [];
    output.StarTypes = [];
    //add stars to the system. At setup, the number of stars was set to 1
    while(StarsTotal > 0){
        //we are making a star right now, knock it off the list of stars to make
        StarsTotal--;
        //roll to see the type of star ahead of time
        //roll = randomInteger(10);
        roll = randomInteger(10);
        //rolls of 9+ mean there's an extra star, we will calculate the star sizes later and seporately
        if(roll < 9){
            //what is the star size?
            GMNotes += "<li><strong>";
            Notes += "<li><strong>";
            switch(randomInteger(10)){
                case 1: case 2: case 3:
                    GMNotes += "Sub-";
                    Notes += "Sub-";
                    Elements[this.InnerCauldron] += randomInteger(3);
                    Elements[this.PrimaryBiosphere] += randomInteger(3);
                    Elements[this.OuterReaches] += randomInteger(3);
                    output.StarSizes.push(1);
                break;
                case 4: case 5: case 6: case 7:
                    Elements[this.InnerCauldron] += randomInteger(5);
                    Elements[this.PrimaryBiosphere] += randomInteger(5);
                    Elements[this.OuterReaches] += randomInteger(5);
                    output.StarSizes.push(2);
                break;
                case 8: case 9: case 10:
                    GMNotes += "Supra-";
                    Notes += "Supra-";
                    Elements[this.InnerCauldron] += randomInteger(10);
                    Elements[this.PrimaryBiosphere] += randomInteger(10);
                    Elements[this.OuterReaches] += randomInteger(10);
                    output.StarSizes.push(4);
                break;
            }
        }
        //what is the star type?
        switch(roll){
            case 1: 
                GMNotes += "Mighty</strong>: The fierce light of this star dominates its system utterly. Its coloration is likely to be blue or blue-white. The Inner Cauldron is dominant, and the Primary Biosphere is weak.</li>";
                Notes += "Mighty</strong>: The fierce light of this star dominates its system utterly. Its coloration is likely to be blue or blue-white.</li>";
                Elements[this.InnerCauldron] += randomInteger(3);
                Elements[this.PrimaryBiosphere] -= randomInteger(3);
                output.StarTypes.push("#00ffff");
                break;
            case 2: case 3: case 4:
                GMNotes += "Vigorous</strong>: A steady illumination burns forth from the heart of this star. Its coloration is likely to be a pure white.</li>";
                Notes += "Vigorous</strong>: A steady illumination burns forth from the heart of this star. Its coloration is likely to be a pure white.</li>";
                output.StarTypes.push("#ffffff");
                break;
            case 5: case 6: 
                GMNotes += "Luminous</strong>: Though it is has been long aeons since this star has shone at its brightest, a constant glow nonetheless provides for the system. It is likely to be yellow or yellow-orange in colour. The Inner Cauldron is weak.</li>";
                Notes += "Luminous</strong>: Though it is has been long aeons since this star has shone at its brightest, a constant glow nonetheless provides for the system. It is likely to be yellow or yellow-orange in colour.</li>";
                Elements[this.InnerCauldron] -= randomInteger(3);
                output.StarTypes.push("#ffff00");
                break;
            case 7: 
                GMNotes += "Dull</strong>: The end of the star’s life advances inexorably, although it can still burn for millennia yet. Many stars of this type are of a vast size, seemingly incongruous with their wan light. Its coloration is likely a sullen red. The Outer Reaches are Dominant.</li>";
                Notes += "Dull</strong>: The end of the star’s life advances inexorably, although it can still burn for millennia yet. Many stars of this type are of a vast size, seemingly incongruous with their wan light. Its coloration is likely a sullen red.</li>";
                Elements[this.OuterReaches] += randomInteger(3);
                output.StarTypes.push("#ff0000");
                break;
            case 8:
                GMNotes += "Anomalous</strong>: The star is an unnatural outlier, shedding a strange light that behaves in ways it should not. Its light can be of any colour, even one that is not typical for a star, from bilious green to barely-visible purple. The Game Master can choose to make one Solar Zone dominant or weak at his discretion.</li>";
                Notes += "Anomalous</strong>: The star is an unnatural outlier, shedding a strange light that behaves in ways it should not. Its light can be of any colour, even one that is not typical for a star, from bilious green to barely-visible purple.</li>";
                Elements[this.InnerCauldron] += (randomInteger(7)-4);
                Elements[this.PrimaryBiosphere] += (randomInteger(7)-4);
                Elements[this.OuterReaches] += (randomInteger(7)-4);
                output.StarTypes.push("#ff00ff");
                break;
            case 9: case 10:
                StarsTotal += 2; //the system is at least binary. Roll again for both this star and the new one.
                break;
        }
    }    
    //close a bullet point group
    GMNotes += "</ul>";
    Notes += "</ul>";
    
    //=====System Elements=====
    
    //be sure there is at least one chance to generate an element in each region
    if(Elements[this.InnerCauldron] < 1){Elements[this.InnerCauldron] = 1;}
    if(Elements[this.PrimaryBiosphere] < 1){Elements[this.PrimaryBiosphere] = 1;}
    if(Elements[this.OuterReaches] < 1){Elements[this.OuterReaches] = 1;}
    
    //generate Inner Cauldron Elements
    for(j = 0; j < Elements[this.InnerCauldron]; j++) {
        i = randomInteger(100);
        //if i < 20 then no element
        if(i >= 21 && i <= 29){
            AsteroidClusters[this.InnerCauldron]++;
        } else if(i >= 30 && i <= 41) {
            DustClouds[this.InnerCauldron]++;
        } else if(i >= 42 && i <= 45) {
            GasGiants[this.InnerCauldron]++;
        } else if(i >= 46 && i <= 56) {
            GravityRiptides[this.InnerCauldron]++;
        } else if(i >= 57 && i <= 76) {
            Planets[this.InnerCauldron]++;
        } else if(i >= 77 && i <= 88) {
            RadiationBursts[this.InnerCauldron]++;
        } else if(i >= 89) {
            SolarFlares[this.InnerCauldron]++;
        }
    }
    
    //generate Primary Biosphere Elements
    for(j = 0; j < Elements[this.PrimaryBiosphere]; j++) {
         i = randomInteger(100);
        //if i < 20 then no element
        if(i >= 21 && i <= 30){
            AsteroidBelts[this.PrimaryBiosphere]++;
        } else if(i >= 31 && i <= 41) {
            AsteroidClusters[this.PrimaryBiosphere]++;
        } else if(i >= 42 && i <= 47) {
            DerelictStations[this.PrimaryBiosphere]++;
        } else if(i >= 48 && i <= 58) {
            DustClouds[this.PrimaryBiosphere]++;
        } else if(i >= 59 && i <= 64) {
            GravityRiptides[this.PrimaryBiosphere]++;
        } else if(i >= 65 && i <= 93) {
            Planets[this.PrimaryBiosphere]++;
        } else if(i >= 94) {
            StarshipGraveyards[this.PrimaryBiosphere]++;
        }
    }
    
    //generate Outer Reaches Elements
    for(j = 0; j < Elements[this.OuterReaches]; j++) {
         i = randomInteger(100);
        //if i < 20 then no element
        if(i >= 21 && i <= 29){
            AsteroidBelts[this.OuterReaches]++;
        } else if(i >= 30 && i <= 40) {
            AsteroidClusters[this.OuterReaches]++;
        } else if(i >= 41 && i <= 46) {
            DerelictStations[this.OuterReaches]++;
        } else if(i >= 47 && i <= 55) {
            DustClouds[this.OuterReaches]++;
        } else if(i >= 56 && i <= 73) {
            GasGiants[this.OuterReaches]++;
        } else if(i >= 74 && i <= 80) {
            GravityRiptides[this.OuterReaches]++;
        } else if(i >= 81 && i <= 93) {
            Planets[this.OuterReaches]++;
        } else if(i >= 94) {
            StarshipGraveyards[this.OuterReaches]++;
        }
    }
    
    //be sure there are no negative planets
    for(var i = 0; i < 3; i++){
        if(Planets[i]<0){Planets[i] = 0;}
    }
    
    //be sure the number of planets meets the required minimum for starfarer's System Feature
    while(Planets[this.InnerCauldron]+Planets[this.PrimaryBiosphere]+Planets[this.OuterReaches] < PlanetMinimum){
        Planets[randomInteger(3)-1]++;
    }
    
    //detail the elements
    for(this.region = 0; this.region < 3; this.region++){
        //add the title for the region
        switch(this.region){ 
            case 0: 
                GMNotes += "<hr><strong>Inner Cauldron</strong><br><br>"; 
                Notes += "<strong>Inner Cauldron</strong><ul>"; 
            break;
            case 1: 
                GMNotes += "<hr><strong>Primary Biosphere</strong><br><br>";
                Notes += "<strong>Primary Biosphere</strong><ul>"; 
            break;
            case 2: 
                GMNotes += "<hr><strong>Outer Reaches</strong><br><br>";
                Notes += "<strong>Outer Reaches</strong><ul>"; 
            break;
        }
        
        //Add Asteroid Belts
        for(j = 0; j < AsteroidBelts[this.region]; j++){
            GMNotes += getLink("Asteroid Belt") + "<ul>";
            Notes += "<li>" + getLink("Asteroid Belt") + "</li>";
            //add a random number of minerals, including any System Feature Bonuses
            i = randomInteger(5) + AsteroidBounty;
            while(i > 0) {
                i--;
                GMNotes += "<li>" + this.RandomMineral() + "</li>";
                //each asteroid belt has a chance to house hidden wonder
                if(randomInteger(100) == 1) {
                    GMNotes += this.RandomAdventure();
                }
            }
            GMNotes += "</ul>";
        }
        
        //Add Asteroid Clusters
        for(j = 0; j < AsteroidClusters[this.region]; j++){
            GMNotes += getLink("Asteroid Cluster") + "<ul>";
            Notes += "<li>" + getLink("Asteroid Cluster") + "</li>";
            //add a random number of minerals, including any System Feature Bonuses
            i = randomInteger(5) + AsteroidBounty;
            while(i > 0) {
                i--;
                GMNotes += "<li>" + this.RandomMineral() + "</li>";
                //each asteroid cluster has a chance to house hidden wonder
                if(randomInteger(100) == 1) {
                    GMNotes += this.RandomAdventure();
                }
            }
            
            GMNotes += "</ul>";
        }
        
        //Add Derelict Stations
        for(j = 0; j < DerelictStations[this.region]; j++){
            GMNotes += "Derelict Station<ul><li>";
            Notes += "<li>Derelict Station</li>";
            //if there is a resident empire ruin, go with that ruin, otherwise, make it random
            if(this.EmpireInhabitants.length > 0){
                ResourceType = this.EmpireInhabitants[randomInteger(this.EmpireInhabitants.length)-1];
            } else {
                ResourceType = this.RandomRuin("Name");
            }
            GMNotes += "<strong>" + ResourceType + " station</strong>";
            /*
            //What kind of station is this and what type of resources does it contain?
            //if there is a ruined empire, i is a string that records the race
            //if there is no preset ruin, i is a random number
            //once a race has been selected, a random station type is often rolled for
            if(i === "Egarian" || (Number(i) >= 1 && Number(i) <= 10)) {
                ResourceType = "Egarian";
                GMNotes += "<strong>Egarian Void-maze</strong>: The station is a bafflfling construct of crystals with no readily apparent purpose or function, but built along similar geometrical principles as the dead cities of the Egarian Dominion.";
                
            } else if(i === "Eldar" || (Number(i) >= 11 && Number(i) <= 20)) {
                ResourceType = "Eldar";
                switch(randomInteger(3)){
                    case 1: GMNotes += "<strong>Eldar Gate</strong>: This vast Eldar contraption resembles nothing so much as the frame of an enormous door, but only the empty void shows through it. No amount of searching yields a sign of its purpose or function."; break;
                    default: GMNotes += "<strong>Eldar Orrery</strong>: The station is constructed of the smooth, bone-like material from which the Eldar make their ships, and is riddled with cloistered cells. Examination by a Navigator or psyker hints at a long-vanished power permeating the structure."; break;
                }
            } else if(i === "Ork" || (Number(i) >= 26 && Number(i) <= 40)) {
                ResourceType = "Ork";
                GMNotes += "<strong>Ork Rok</strong>: From the outside, this “station” appears to be nothing more than a lonely, out of the way asteroid. Despite its appearance, it has been thoroughly hollowed out, and fifilled with dubious Orky technology. Some of the technology might even have worked at one point.";
            } else if(i === "Human" || (Number(i) >= 41 && Number(i) <= 65)) {
                ResourceType = "Human";
                switch(randomInteger(5)){
                    case 1: case 2: GMNotes += "<strong>STC Defence Station</strong>: The core of the station is based off a standard pattern derived from Standard Template Construct technology, like countless others throughout the Imperium. What remains of the banks of weapon batteries and torpedo bays indicates that it was once intended to safeguard a human colony from attack."; break;
                    default: GMNotes += "<strong>STC Monitor Station</strong>: The core of the station is based off a standard pattern derived from Standard Template Construct technology, like countless others throughout the Imperium. Despite its age, the hull still bristles with auger arrays and reception panels that indicate its former use as a communications or intelligence hub."; break;
                }
            } else {
                ResourceType = "Unknown Xenos";
                switch(randomInteger(7)){
                    case 1: case 2: GMNotes += "<strong>Stryxis Collection</strong>: Calling this accumulation of wreckage and junk a space station would insult an Ork Mek, much less a shipwright of the Adeptus Mechanicus. The only explanation for its accretion comes from the vox-beacon broadcasting some kind of territorial claim by the Stryxis."; break;
                    case 3: case 4: GMNotes += "<strong>Xenos Defence Station</strong>: The architecture of the station does not match any examples yet encountered, but it is clearly inhuman in origin. Though the technology that comprises it is strange, there is no mistaking the intended purpose of its decaying armaments."; break;
                    default: GMNotes += "<strong>Xenos Monitor Station</strong>: The architecture of the station does not match any examples yet encountered, but it is clearly inhuman in origin. Its purpose is hard to ascertain for sure, but some of the arcane devices that line its hull resemble vox hubs and other necessities for a deep space monitor station."; break;
                }
            }
            */
            GMNotes += "</li>";
            
            //exactly how many resources does it contain?
            for(k = randomInteger(5)-1; k > 0; k--) {
                GMNotes += "<li>" + this.RandomRuin(randomInteger(100),ResourceType) + "</li>";
            }
            //each derelict station has a chance to house hidden perils
            if(randomInteger(10) == 1) {
                GMNotes += this.RandomAdventure();
            }
            GMNotes += "</ul>";
        }
        
        //Add Dust Clouds
        if(DustClouds[this.region] > 0) {
            GMNotes += getLink("Dust Cloud") + "(x" + DustClouds[this.region].toString() + ")<br><br>";
            Notes += "<li>" + getLink("Dust Cloud") + "(x" + DustClouds[this.region].toString() + ")</li>";
        }
        
        //Add Gravity Riptides
        if(GravityRiptides[this.region] > 0) {
            GMNotes += getLink("Gravity Riptide") + "(x" + GravityRiptides[this.region].toString() + ")<br><br>";
            //For right now I am not going to make Gravity Tides freely available to the player
            //Notes += "<li>" + getLink("Gravity Riptide") + "(x" + GravityRiptides[this.region].toString() + ")</li>";
        }
        
        //Add Radiation Bursts
        if(RadiationBursts[this.region] > 0) {
            GMNotes += getLink("Radiation Burst") + "(x" + RadiationBursts[this.region].toString() + ")<br><br>";
            //For right now I am not going to make Radiation Bursts freely available to the player
            //Notes += "<li>" + getLink("Radiation Burst") + "(x" + RadiationBursts[this.region].toString() + ")</li>";
        }
        
        //Add Solar Flares
        if(SolarFlares[this.region] > 0) {
            GMNotes += getLink("Solar Flare") + "(x" + SolarFlares[this.region].toString() + ")<br><br>";
            //For right now I am not going to make Solar Flares freely available to the player
            //Notes += "<li>" + getLink("Solar Flare") + "(x" + SolarFlares[this.region].toString() + ")</li>";
        }
        
        //Add Starship Graveyards
        for(j = 0; j < StarshipGraveyards[this.region]; j++){
            GMNotes += getLink("Starship Graveyard") + "<ul>";
            Notes += "<li>" + getLink("Starship Graveyard") + "</li>";
            ResourceType = [0,0];
            for(k = 0; k < ResourceType.length; k++){
                //if there is a preset empire, go with the ruined empire. Otherwise generate a random ship
                if(k < this.EmpireInhabitants.length)
                {
                    ResourceType[k] = this.EmpireInhabitants[randomInteger(this.EmpireInhabitants.length)-1];
                }else {
                    ResourceType[k] = this.RandomRuin("Name");
                }
            }
            //note what lead to this wasteland
            GMNotes += "<li>";
            switch(randomInteger(20)){
                case 1: case 2: case 3:
                    GMNotes += "<strong>Crushed Defence Force/Routed Invasion</strong>: The wreckage is all that remains of a defeated battlefleet. Whichever side of the long-ago conflict that fielded these vessels was decisively defeated, with most or all of the hulks belonging to the same force. The graveyard consists of " + (randomInteger(5) + randomInteger(5)) + " ships, of which most or all have been shattered beyond any value.";
                break;
                case 4:
                    GMNotes += "<strong>Fleet Engagement</strong>: A massive conflict once raged here, as evidenced by the abundance of battle-scarred hulls left behind by both sides. The graveyard consists of " + (randomInteger(10)+6) + " hulks, and can also include vast fields of unexploded mines, spent volleys of torpedoes, or the drifting wings of attack craft. Roughly half of the ships and materiel expended came from each side. The fury of the conflict consumed much of value, but the sturdy construction of warships means that at least a few of them might be worth salvaging.";
                break;
                case 5: case 6: case 7:
                    GMNotes += "<strong>Lost Explorers</strong>: These ships were not lost to enemy action, but to overextended supply vaults, or the failure of long suffering vital systems. The expedition is unlikely to include as many as even half a dozen ships, but few (if any) of them have deteriorated enough to prohibit salvage efforts.";
                break;
                case 8: case 9: case 10: case 11: case 12: case 13:
                    GMNotes += "<strong>Plundered Convoy</strong>: A lost shipping lane of some kind might have once crossed this system, as evidenced by this gutted procession of transports and cargo vessels. Their holds have been long since emptied, but it is possible their attackers might have missed something of value. There are " + (randomInteger(5)+2) + " ships in the convoy, of which most or all remain intact enough to allow boarding, but little else."
                break;
                case 14: case 15: case 16: case 17: case 18:
                    GMNotes += "<strong>Skirmish</strong>: Elements from two different battlefleets clashed here, with each leaving behind a handful of their complement. The graveyard consists of " + (randomInteger(5)+3) + " hulks. Roughly half of the ships came from each side. The fury of the conflict all ships involved, but the sturdy construction of warships means that at least a few of them might be worth salvaging."
                break;
                case 19: case 20:
                    GMNotes += "<strong>Unknown Provenance</strong>: The bizarre assortment of different vessels drifting past defies easy explanation. It is likely to bring to mind the eerie legends of the Processional of the Damned, where broken ships from across the Expanse arrive like spectres in some strange afterlife. Whether associated with that haunted realm, or the result of some more mundane confusion, the graveyard consists of the twisted wreckage of dozens of utterly ruined ships of all kinds, as well as " + (randomInteger(5)) + " hulks in varying degrees of integrity. None of the hulks share an origin."
                break;
            }
            GMNotes += "</li>"
            //add all the noteworthy ships
            for(k = randomInteger(10) + 2; k > 0; k--) {
                //note the abundance of the random resource
                GMNotes += "<li>" + this.RandomRuin(randomInteger(10) + randomInteger(10) + 25,ResourceType[randomInteger(2)-1]) + "</li>";
                //each ship has their own chance for danger, but to keep it reasonable the chance is small (1/100).
                if(randomInteger(100) == 1) {
                    GMNotes += this.RandomAdventure();
                }
            }
            
            //close the bullet group
            GMNotes += "</ul>";
        }
        
        
        
        //Add Planets
        for(j = 0; j < Planets[this.region]; j++){
            GMNotes += getLink("Planet") + " " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber;
            Notes += "<li>" + getLink("Planet") + " " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "</li>";
            GMNotes += this.RandomPlanet();
        }
        
        //Add Gas Giants
        for(j = 0; j < GasGiants[this.region]; j++){
            GMNotes += getLink("Gas Giant") + " " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "<ul>";
            Notes += "<li>" + getLink("Gas Giant") + " " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "</li>";
            //reset temporary planet generation variables
            Gravity = 0;
            this.RegionShift = 0;
            this.OrbitalFeatures = 0;
            this.MoonNumber = 1;
            
            //Generate the Body of the Gas Giant
            GMNotes += "<li><strong>Body</strong>: ";
            
            switch(randomInteger(10)){
                case 1: case 2: GMNotes += "Gas Dwarf"; 
                Gravity = -5;
                break;
                case 3: case 4: case 5: case 6: case 7: case 8: GMNotes += "Gas Giant"; break;
                case 9: case 10: GMNotes += "Gas Titan";
                Gravity = 3;
                if(randomInteger(10) > 7 && this.region != this.InnerCauldron) {
                    Gravity = 9;
                    this.RegionShift = -1;
                } else {
                    Gravity = 3;
                }
                break;
            }
            //close this bullet point
            GMNotes += "</li>";
            
            //Generate the Gravity of the Gas Giant
            GMNotes += "<li><strong>Gravity</strong>: ";
            i = Gravity + randomInteger(10);
            //now that Gravity is recorded for the purposes of random Gravity, the variable Gravity will used to determine Gravity's influence on the previlance of Orbital Features
            if(i <= 2) {
               GMNotes  += "Weak";
               Gravity = 10;
               this.OrbitalFeatures = randomInteger(10)-5;
            } else if(i >= 3 && i <= 6) {
               GMNotes += "Strong";
               Gravity = 15;
               this.OrbitalFeatures = randomInteger(10)-3;
            } else if(i >= 7 && i <= 9) {
               GMNotes += "Powerful";
               Gravity = 20;
               this.OrbitalFeatures = randomInteger(10)+2;
            } else { //if(i >= 10)
               GMNotes += "Titanic";
               Gravity = 30;
               this.OrbitalFeatures = randomInteger(5)+randomInteger(5)+randomInteger(5)+3;
            }
            //close this bullet point
            GMNotes += "</li>";
            
            //be sure at least one orbital feature will have a chance at being generated
            //generate Orbital Features for the Gas Giant
            do {
                //generate a random oribital feature, influenced by the gravity of the planet
                i = randomInteger(100)+Gravity;
                if(i >= 21 && i <= 35) {
                    GMNotes += "<li><strong>Planetary Rings</strong>: Debris</li>";
                } else if(i >= 36 && i <= 50) {
                    GMNotes += "<li><strong>Planetary Rings</strong>: Dust</li>";
                } else if(i >= 51 && i <= 85) {
                    GMNotes += "<li><strong>Lesser Moon</strong>: " + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "-" + this.MoonNumber + "</li>";
                    this.MoonNumber++; //another moon has been added to this body
                    if(randomInteger(2) == 2){
                        GMNotes += "<ul><li>" + this.RandomMineral(randomInteger(5)+randomInteger(5)+randomInteger(5)+randomInteger(5)+randomInteger(5)+5) + "</li></ul>";
                    }
                    //each mini moon has a chance to house a lovely lovely adventure, but it is tiny
                    if(randomInteger(100) == 1) {
                        GMNotes += this.RandomAdventure();
                    }
                } else if(i >= 86) {
                    GMNotes += "<li><strong>Moon</strong>: "  + this.Sector + "-" + this.SystemNumber + "-" + this.PlanetNumber + "-" + this.MoonNumber + "</li>";
                    GMNotes += this.RandomPlanet("Moon");
                }
                this.OrbitalFeatures--;
            } while(this.OrbitalFeatures > 0);
            this.PlanetNumber++; //another planet like body has been added to the System
            //close the bullet point group
            GMNotes += "</ul>";
        }
        Notes += "</ul>"
    }
    
    //record the Handout Notes
    NewSystem.set('bio',Notes);
    NewSystem.set('gmnotes',GMNotes);
    
    //edit the gmnotes of the handout
    sendChat("System", "/w gm Generated " + getLink(UniqueName, "http://journal.roll20.net/character/" + NewSystem.id));
    
    //output the id of the character sheet and a list of the stars
    return output;
    }
   
}

on("chat:message", function(msg) {
if(msg.type == "api" && msg.content.indexOf("!NewSystem") == 0 && playerIsGM(msg.playerid) && msg.selected == undefined) {
    mySystem = new System();
    mySystem.Generate(msg.content);
    delete mySystem;
} 
});