    //Generates a random Xenos to complicate a planet or adventure. Saves it into a handout.    
    RandomCreature  = function(input,location) {
        input = input || "";
        
        input = input.toLowerCase();
        
        location = location || "";
        
        var CreatureNumber = 1;
        var XenosType = "";
        var XenosBase;
        var XenosWorld = "exotic";
        var XenosSize;
        var NewXenos;
        var XenosDie = 0;
        var ExoticTraits = 0;
        var Mutations = 0;
        var Xenos = {WS: 0, BS:0, S:0, T:0, Ag:0, Wp:0, It:0, Pr:0, Fe:0,
                    Wounds: 0, Fatigue: 0,
                    Arms: 2, Legs: 2, 
                    Armour_H: 0, Armour_RA: 0, Armour_LA: 0, Armour_B: 0, Armour_RL: 0, Armour_LL:0,
                    Unnatural_WS: 0, Unnatural_BS:0, Unnatural_S:0, Unnatural_T:0, Unnatural_Ag:0, Unnatural_Wp:0, Unnatural_It:0, Unnatural_Pr:0, Unnatural_Fe:0,
                    HalfMove: 0, FullMove: 0, Charge: 0, Run: 0,
                    Weapons: "",
                    Damage: 0, Pen: 0, DamageType: "", WeaponName: "", Qualities: "",
                    RDamage: 0, RPen: 0, RDamageType: "", RWeaponName: "", RQualities: "", RRange: 0,
                    NativeWeapons: [],
                    Skills: "", Talents: "", Traits: "", gmnotes: "",
                    Burrower: 0, Civilization: "",
                    isApex: false, isResilient: false, isDeadly: false, isFlexible: 0, isMighty:false,
                    Climb: -1, Swim: -1, Concealment: -1, SilentMove: -1, Shadowing: -1, Dodge: -1, Awareness: -1};
                    
        //create a function to quickly add armour to every location           
        Xenos.ArmourAll = function (increase){
            Xenos.Armour_H  += increase;
            Xenos.Armour_B  += increase;
            Xenos.Armour_LA += increase;
            Xenos.Armour_RA += increase;
            Xenos.Armour_LL += increase;
            Xenos.Armour_RL += increase;
        }
        //create a function to handle multiple Swift Attack Talents
        Xenos.SwiftAttack = function(){
            if(Xenos.Talents.indexOf("Swift Attack") != -1 && Xenos.Talents.indexOf("Lightning Attack") != -1){
                Xenos.WS += 10;
            } else if(Xenos.Talents.indexOf("Swift Attack") != -1) {
                Xenos.Talents += GetLink("Lightning Attack") + "<br>";
            } else {
                Xenos.Talents += GetLink("Swift Attack") + "<br>";
            }
        }
        //create a function for every trait
        Xenos.ImprovedNaturalWeapons = function(){
            if(Xenos.Traits.indexOf("Improved Natural Weapons") != -1){
                Xenos.Damage += 2;
            } else {
                Xenos.Traits += GetLink("Improved Natural Weapons") + "<br>";
            }
        }
        Xenos.Apex = function (){
            Xenos.Traits += "Apex<br>";
            if(Xenos.isApex){
                Xenos.Unnatural_S += Math.floor(Xenos.S/10);
                Xenos.Unnatural_T += Math.floor(Xenos.T/10);
            } else {
                Xenos.WS += 10;
                Xenos.S  += 10;
                Xenos.T  += 10;
                Xenos.Ag += 10;
                Xenos.Pr += 10;
                Xenos.ImprovedNaturalWeapons();
                Xenos.isApex = true;
            }
        }
        Xenos.Amorphous = function(){
            Xenos.T += 10;
            Xenos.Traits += GetLink("Amorphous") + "<br>";
            if(!Xenos.isAmorphous){
                Xenos.isAmorphous = true;
                Xenos.Traits += GetLink("Strange Physiology") + "<br>";
                Xenos.Traits += GetLink("Unnatural Senses") + "<br>";
                Xenos.Traits += GetLink("Fear") + "(2)<br>";
            }
            if(randomInteger(2)==1){
                Xenos.Climb++;
                Xenos.Swim++;
            }
        }
        Xenos.Amphibious = function(){
            Xenos.Traits += GetLink("Amphibious") + "<br>";
        }
        Xenos.Aquatic = function(){
            Xenos.Traits += GetLink("Aquatic") + "<br>";
        }
        Xenos.Arboreal = function(){
            Xenos.Skills += GetLink("Acrobatics") + "+20<br>";
            Xenos.Climb += 3;
            Xenos.Dodge += 3;
            Xenos.Traits += GetLink("Catfall") + "<br>";
            Xenos.Traits += GetLink("Arboreal") + "<br>";
        }
        Xenos.Armoured = function(){
            Xenos.ArmourAll(randomInteger(5));
        }
        Xenos.Crawler = function(){
            if(Xenos.Traits.indexOf("Crawler") == -1){
                Xenos.Traits += GetLink("Crawler") + "<br>";
            }
            if(randomInteger(5) == 1){
                Xenos.Climb++;
            }
        }
        Xenos.Darkling = function(){
            if(Xenos.Traits.indexOf("Blink") == -1){
                Xenos.Traits += GetLink("Blind") + "<br>";
            }
            if(randomInteger(2) == 1){
                if(Xenos.Traits.indexOf("Sonar Sense") == -1){
                    Xenos.Traits += GetLink("Sonar Sense") + "<br>";
                }
            } else {
                if(Xenos.Traits.indexOf("Unnatural Senses") == -1){
                    Xenos.Traits += GetLink("Unnatural Senses") + "<br>";    
                }
            }
            Xenos.Awareness++;
            Xenos.SilentMove++;
            Xenos.Climb++;
            Xenos.Swim++;
        }
        Xenos.Deadly = function(){
            Xenos.WS += 10;
            if(Xenos.isDeadly && Xenos.Qualities.indexOf("Razor Sharp") == -1){
                Xenos.Qualities += GetLink("Razor Sharp") + ", ";
            } else {
                Xenos.ImprovedNaturalWeapons();
            }
        }
        Xenos.Deathdweller = function(){
            if(Xenos.Talents.indexOf("(Radiation)") == -1){
                Xenos.Talents += GetLink("Resistance") + "(Radiation)<br>";
                Xenos.Wounds += 3;
            } else {
                Xenos.Wounds += 2;
                Xenos.T += 5;
            }
        }
        Xenos.Deterrent = function(){
            Xenos.Traits += GetLink("Deterrent") + "<br>";
        }
        Xenos.Disturbing = function(){
            Xenos.Traits += GetLink("Fear") + "<br>";
        }
        Xenos.FadeKind = function(){
            switch(randomInteger(2)){
                case 1: Xenos.Traits += GetLink("Incorporeal") + "<br>"; break;
                case 2: Xenos.Traits += GetLink("Phase") + "<br>"; break;
            }
            if(randomInteger(4)==1){Xenos.Traits += GetLink("Fear") + "<br>";}
        }
        Xenos.Flexible = function(){
            Xenos.Traits += "Flexible<br>";
            //apply a different benefit depending on how many times this result was achieved
            switch(Xenos.isFlexible){
                case 0: 
                    Xenos.Skills += GetLink("Dodge") + "+10<br>"; 
                    Xenos.Qualities += GetLink("Flexible") + ", ";
                break;
                case 1: 
                    Xenos.Qualities += GetLink("Snare") + ", ";
                break;
                default:
                    Xenos.Ag += 10;
                break;
            }
            Xenos.isFlexible++;
        }
        Xenos.FoulAura = function(type){
            Xenos.Traits += GetLink("Foul Aura") + "(" + type + ")<br>";
        }
        Xenos.Frictionless = function(){
            Xenos.Traits += GetLink("Fictionless")  + "<br>";
        }
        Xenos.Gestalt = function(){
            Xenos.T += 10;
            Xenos.Wp += 10;
            Xenos.It -= 10;
            Xenos.Traits += GetLink("Gestalt") + "<br>";
        }
        Xenos.LethalDefences = function(){
            Xenos.Traits += GetLink("Lethal Defences") + "<br>";
        }
        Xenos.Mighty = function(){
            Xenos.Traits += "Mighty<br>";
            //apply a dfferent benefit depending if this was already taken or not
            if(Xenos.isMighty){
                Xenos.Unnatural_S += Math.floor(Xenos.S/10);
            } else {
                Xenos.isMighty = true;
                Xenos.S += 10;
            }
        }
        Xenos.Paralytic = function(){
            Xenos.Qualities += GetLink("Paralytic") + ", ";
        }
        Xenos.ProjectileAttack = function(){
            if(Xenos.BS == 0){
                Xenos.BS = 30;
                Xenos.RDamage = 3;
                switch(randomInteger(3)){
                    case 1: Xenos.RDamageType = "Impact"; 
                    Xenos.RWeaponName = "Weighted Projectile";
                    break;
                    case 2: Xenos.RDamageType = "Rending"; 
                    Xenos.RWeaponName = "Arial Spines";
                    break;
                    case 3: Xenos.RDamageType = "Energy"; 
                    Xenos.RWeaponName = "Acid Spittle";
                    break;
                }
                Xenos.RRange = 15;
            } else {
                Xenos.BS += 10;
                Xenos.RDamage += 1;
                Xenos.RPen += 1;
                Xenos.RRange += 10;
            }
        }
        Xenos.Resilient = function(){
            Xenos.Traits += "Resilient<br>";
            //check to see if the creature already has this trait
            if(Xenos.isResilient){
                //if so, just add unnatural toughness
                Xenos.Unnatural_T += Math.floor(Xenos.T/10);
            } else {
                //if not, record that it does have it now
                Xenos.isResilient = true;
                //and add 10 Toughness
                Xenos.T += 10;
            }
        }
        Xenos.Silicate = function(){
            Xenos.Traits += GetLink("Silicate") + "<br>"; 
            Xenos.Ag -= 10;
            Xenos.ArmourAll(1+randomInteger(5));
            Xenos.Unnatural_S += Math.floor(Xenos.S/10);
            Xenos.Unnatural_T += Math.floor(Xenos.T/10);
        }
        Xenos.Stealthy = function(){
            Xenos.Concealment += 3;
            Xenos.SilentMove += 3;
            Xenos.Shadowing += 3;
        }
        Xenos.Sticky = function(){
            Xenos.Traits += GetLink("Sticky") + "<br>";
        }
        Xenos.SustainedLife = function(){
            Xenos.Traits += GetLink("Sustained Life") + "<br>";
        }
        Xenos.Swift = function(){
            Xenos.Traits += "Swift<br>";
            if(Xenos.isSwift){
                Xenos.Unnatural_Ag += Math.floor(Xenos.Ag/10);
            } else {
                Xenos.isSwift = true;
                Xenos.Ag += 10;
            }
        }
        Xenos.ThermalAdaptation = function(type){
            Xenos.Talents += GetLink("Thermal Adaptation");
            Xenos.T += 5;
            if(Xenos.Talents.indexOf("(Cold)")){
                Xenos.Talents += "(Cold)";
            } else if(Xenos.Talents.indexOf("(Heat)")){
                Xenos.Talents += "(Heat)";
            } else if(type == "Heat") {
                Xenos.Talents += "(Heat)";
            } else if(type == "Cold") {
                Xenos.Talents += "(Cold)";
            }
            Xenos.Talents += "<br>";
        }
        Xenos.Tunneller = function(){
            Xenos.Burrower++;
        }
        Xenos.Unkillable = function(){
            Xenos.Traits += GetLink("Regeneration") + "(1)<br>"; 
            Xenos.Wounds += 5;
        }
        Xenos.UprootedMovement = function(){
            Xenos.Triats += GetLink("Uprooted Movement") + "<br>"
        }
        Xenos.Valuable = function(){
            Xenos.Traits += "Valuable<br>";
        }
        Xenos.Venomous = function(){
            Xenos.Qualities += GetLink("Toxic") + ", ";
        }
        Xenos.Warped = function(){
            Xenos.Traits += GetLink("Mutation") + " - "
            switch(randomInteger(100)){
                case 1:  case 2:  case 3:  case 4:  case 5:  Xenos.Traits += "Grotesque"; break;
                case 6:  case 7:  case 8:  case 9:  case 10: Xenos.Traits += "Tough Hide"; Xenos.ArmourAll(2); break;
                case 11: case 12: case 13: case 14: case 15: Xenos.Traits += "Misshapen"; Xenos.Ag -= randomInteger(10) + randomInteger(10); break;
                case 16: case 17: case 18: case 19: case 20: Xenos.Traits += "Feels No Pain"; Xenos.Wounds += 5; Xenos.Talents += "<br>" + GetLink("Iron Jaw"); break;
                case 21: case 22: case 23: case 24: case 25: Xenos.Traits += "Brute"; Xenos.S += 10; Xenos.T += 10; break;
                case 26: case 27: case 28: case 29: case 30: Xenos.Traits += "Nightsider"; Xenos.Traits += "<br>" + GetLink("Dark Sight"); break;
                case 31: case 32: case 33: case 34: case 35: Xenos.Traits += "Mental Regressive"; 
                switch(randomInteger(10)){
                    case 6: case 7: Xenos.It = Math.round(Xenos.It / 2); break; //halve the characteristic
                    case 8: case 9: break; //do nothing
                    case 10: Xenos.It = 5; break; //set it equal to 5
                    default: Xenos.It -= randomInteger(10); break; //reduce it by D10
                }
                switch(randomInteger(10)){
                    case 6: case 7: Xenos.Pr = Math.round(Xenos.Pr / 2); break; //halve the characteristic
                    case 8: case 9: break; //do nothing
                    case 10: Xenos.Pr = 5; break; //set it equal to 5
                    default: Xenos.Pr -= randomInteger(10); break; //reduce it by D10
                }
                switch(randomInteger(10)){
                    case 6: case 7: Xenos.Wp = Math.round(Xenos.Wp / 2); break; //halve the characteristic
                    case 8: case 9: break; //do nothing
                    case 10: Xenos.Wp = 5; break; //set it equal to 5
                    default: Xenos.Wp -= randomInteger(10); break; //reduce it by D10
                }
                switch(randomInteger(10)){
                    case 6: case 7: Xenos.Fe = Math.round(Xenos.Fe / 2); break; //halve the characteristic
                    case 8: case 9: break; //do nothing
                    case 10: Xenos.Fe = 5; break; //set it equal to 5
                    default: Xenos.Fe -= randomInteger(10); break; //reduce it by D10
                }
                break;
                case 36: case 37: case 38: case 39: case 40: Xenos.Traits += "Malformed Hands"; Xenos.WS -= 10; Xenos.BS -= 10; break;
                case 41: case 42: case 43: case 44: case 45: Xenos.Traits += "Tox Blood"; Xenos.It -= randomInteger(10); Xenos.T -= randomInteger(10); break;
                case 46: case 47: case 48: case 49: case 50: Xenos.Traits += "Hulking"; Xenos.Traits += "<br>" + GetLink("Size") + "(+1)"; Xenos.S += 10; Xenos.Wounds += 5; break;
                case 51: case 52: case 53: case 54: case 55: Xenos.Traits += "Wyrdling"; Xenos.Traits += "<br>" + GetLink("Psy Rating") + "(2)<br>Psychic Technique<br>Psychic Technique"; break;
                case 56: case 57: case 58: case 59:          Xenos.Traits += "Vile Deformity"; Xenos.Traits += "<br>" + GetLink("Fear"); break;
                case 60: case 61: case 62: case 63:          Xenos.Traits += "Aberration"; Xenos.S += 10; Xenos.Ag += 10; Xenos.Fe -= 10; Xenos.It -= randomInteger(10); break;
                case 64: case 65: case 66: case 67:          Xenos.Traits += "Degenerate Mind"; 
                Xenos.It -= randomInteger(10);
                Xenos.Fe -= randomInteger(10);
                switch(randomInteger(3)){
                    case 1: Xenos.Traits += "<br>" + GetLink("Frenzy"); break;
                    case 2: Xenos.Traits += "<br>" + GetLink("Fearless"); break;
                    case 3: Xenos.Traits += "<br>" + GetLink("From Beyond"); break;
                }
                break;
                case 68: case 69: case 70: case 71:          Xenos.Traits += "Ravaged Body"; Die = randomInteger(5); Mutations += Die; ExoticTraits += Die; break;
                case 72: case 73: case 74:                   Xenos.Traits += "Clawed/Fanged"; 
                Xenos.WS += 10;
                if(Xenos.Deadly && Xenos.Qualities.indexOf("Razor Sharp") == -1){
                    Xenos.Qualities += GetLink("Razor Sharp") + ", ";
                } else{
                    Xenos.Deadly = true;
                    if(Xenos.Traits.indexOf("Improved Natural Weapons") != -1){
                        Xenos.Damage += 2;
                    } else {
                        Xenos.Traits += GetLink("Improved Natural Weapons") + "<br>";
                    }
                }
                break;
                case 75: case 76: case 77: case 78:          Xenos.Traits += "Necrophage"; Xenos.Traits += "<br>" + GetLink("Regeneration") + "(1)"; Xenos.T += 10; break;
                case 79: case 80: case 81:                   Xenos.Traits += "Corrupted Flesh"; break;
                case 82: case 83: case 84: case 85:          Xenos.Traits += "Venomous"; Xenos.Traits += "<br>" + GetLink("Toxic"); break;
                case 86: case 87: case 88: case 89:          Xenos.Traits += "Hideous Strength"; Xenos.Unnatural_S += Math.floor(Xenos.S/10); break;
                case 90: case 91:                            Xenos.Traits += "Multiple Appendages"; Xenos.Traits += "<br>" + GetLink("Multiple Arms") + "(1)"; break;
                case 92: case 93:                            Xenos.Traits += "Worm"; Xenos.Wounds += 5; Xenos.Traits += "<br>" + GetLink("Crawler"); break;
                case 94:                                     Xenos.Traits += "Nightmarish"; Xenos.Traits += "<br>" + GetLink("Fear") + "(3)"; break;
                case 95:                                     Xenos.Traits += "Malleable"; Xenos.Ag += 10; break;
                case 96:                                     Xenos.Traits += "Winged"; Die = Math.floor(Xenos.Ag/10) + Xenos.Unnatural_Ag; Xenos.Traits += "<br>" + GetLink("Flyer") + "(" + Die.toString() +  ")"; break;
                case 97:                                     Xenos.Traits += "Corpulent"; Xenos.Wounds += 5; Xenos.Unnatural_T += Math.floor(Xenos.T/10); break;
                case 98:                                     Xenos.Traits += "Shadow Kin"; Xenos.Traits += "<br>" + GetLink("Phase"); Xenos.S -= 10; Xenos.T -= 10; break;
                case 99:                                     Xenos.Traits += "Corrosive Bile"; Xenos.RWeaponName = "Bile"; Xenos.RRange += 1; Xenos.RDamage += 2; Xenos.RQualities += GetLink("Tearing") + ", "; Xenos.RDamageType = "Energy"; break;
                case 100:                                    Xenos.Traits += "Hellspawn"; Xenos.Traits += "<br>" + GetLink("Daemonic") + "<br>" + GetLink("Fear") + "(2)<br>" + GetLink("From Beyond"); break;
            }
            Xenos.Traits += "<br>" + GetLink("Mutation") + " - ?<br>";
        }
        
        //creatures of the hadex anomely have a strong chance to grow one mutation
        if(this.Sector == 'H' || input.indexOf('hadex') != -1){
            Mutations += randomInteger(2)-1;
        }
        //creatures of the screaming vortex are covered in mutaitons
        if(this.Sector == 'S' || input.indexOf('vortex') != -1){
            Mutations += randomInteger(2);
        }
        //Mutations are an Exotic Trait, and thus we need to give the creature access to the exotic traits
        ExoticTraits += Mutations;
    
        //record the xenos type, can be planet, animal, or sentient
        if(input.indexOf('flora') != -1){
            XenosType = "Flora";
        }
        else if(input.indexOf('fauna') != -1){
            XenosType = "Fauna";
        }else if(input.indexOf('native') != -1){
            //Natives are 20x as likely ot have a Fauna base as a Flora Base
            if(randomInteger(21) == 1){
                XenosType = "Flora";
            } else {
                XenosType = "Fauna";
            }
        }
        else {
            //if nothing was selected, select at random
            //don't make it a native unless the GM says so
            //Fauna is 2x as likely to be dangerous to characters as Flora
            switch(randomInteger(3)){
                case 1: XenosType = "Flora"; break;
                case 2: case 3: XenosType = "Fauna"; break;
            }
        }
        
        //determine civilization type of native species
        if(input.indexOf('native') != -1){
            if(input.indexOf('primitive clans') != -1){
                Xenos.Civilization = 'primitive clans';
            } else if(input.indexOf('pre-industrial') != -1){
                Xenos.Civilization = 'pre-industrial';
            } else if(input.indexOf('basic industry') != -1){
                Xenos.Civilization = 'basic industry';
            } else if(input.indexOf('advanced industry') != -1){
                Xenos.Civilization = 'advanced industry';
            } else if(input.indexOf('colony') != -1
                    || input.indexOf('orbital habitation') != -1
                    || input.indexOf('voidfarers') != -1){
                //colonys, oribtal habitations, and voidfaring all require similar levels of intelligence and technology
                Xenos.Civilization = 'voidfarers';
            } else {
                //randomly generate the Civilization
                switch(randomInteger(5)){
                    case 1: Xenos.Civilization = 'primitive clans';   break;
                    case 2: Xenos.Civilization = 'pre-industrial';    break;
                    case 3: Xenos.Civilization = 'basic industry';    break;
                    case 4: Xenos.Civilization = 'advanced industry'; break;
                    case 5: Xenos.Civilization = 'voidfarers';        break;
                }
            }
        }
        
        var UniqueName = XenosType + " ";
        if(location != ""){
            UniqueName += location + "-";
        }
        UniqueName += CreatureNumber.toString();
        
        var OldCreatures = findObjs({ type: 'character', name: UniqueName });      
        
        while(OldCreatures.length > 0){
            CreatureNumber++;
            UniqueName = XenosType + " ";
            if(location != ""){
                UniqueName += location + "-";
            }
            UniqueName += CreatureNumber.toString();
            OldCreatures = findObjs({ type: 'character', name: UniqueName });
        }
        
        //there is little overlap between the three types, proceed based on the type
        switch(XenosType) {
            case 'Flora': 
                //record the plant's size
                if(input.indexOf('diffuse') != -1){
                    XenosSize = 'diffuse';
                } else if(input.indexOf('small') != -1) {
                    XenosSize = 'small';
                } else if(input.indexOf('large') != -1) {
                    XenosSize = 'large';
                } else if(input.indexOf('massive') != -1) {
                    XenosSize = 'massive';
                } else {
                    //determine the size at random
                    switch(randomInteger(10)){
                        case 1: XenosSize = "diffuse"; break;
                        case 2: case 3: case 4: XenosSize = "small"; break;
                        case 5: case 6: case 7: case 8: XenosSize = "large"; break;
                        case 9: case 10: XenosSize = "massive"; break;
                    }
                }
                
                //record the type of plant
                if(input.indexOf('passive') != -1) {
                    XenosBase = 'passive-trap';
                } else if(input.indexOf('active') != -1) {
                    XenosBase = 'active-trap';
                } else if(input.indexOf('combatant') != -1) {
                    XenosBase = 'combatant';
                } else {
                    switch(randomInteger(3)){
                        case 1: XenosBase = 'passive-trap'; break;
                        case 2: XenosBase = 'active-trap'; break;
                        case 3: XenosBase = 'combatant'; break;
                    }
                }
                
                //record the habitat of the plant
                if(input.indexOf("death") != -1) {
                    XenosWorld = 'deathworld'; 
                } else if(input.indexOf("jungle") != -1) {
                    XenosWorld = "jungle";
                } else if(input.indexOf("temperate") != -1) {
                    XenosWorld = "temperate";
                } else if(input.indexOf("ocean") != -1) {
                    XenosWorld = "ocean";
                } else if(input.indexOf("exotic") != -1) {
                    //exotic traits are handled differently as any creature has a small chance of generating one
                    ExoticTraits++;
                } else {
                    switch(randomInteger(4)){
                        case 1: XenosWorld = "deathworld"; break;
                        case 2: XenosWorld = "jungle"; break;
                        case 3: XenosWorld = "temperate"; break;
                        case 4: XenosWorld = "ocean"; break;
                        //Exotic should be a rare and on demand species
                        //case 5: XenosWorld = "exotic"; break;
                    }
                }
                
                //generate the creature
                
                //its base stats are determined by its size
                switch(XenosSize){
                    case 'diffuse': 
                        Xenos.WS = 30;
                        Xenos.S = 10;
                        Xenos.T = 10;
                        Xenos.Ag = 25;
                        Xenos.Pr = 15;
                        Xenos.Wounds = 24;
                        Xenos.Traits += GetLink("Diffuse") + "<br>";
                        Xenos.Traits += GetLink("From Beyond") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.Traits += GetLink("Size") + "(Enormous)<br>";
                        Xenos.HalfMove += 2;
                        Xenos.Traits += GetLink("Strange Physiology") + "<br>";
                        //basic attack
                        Xenos.Damage = 0;
                        Xenos.Pen = 0;
                        switch(randomInteger(3)){
                            case 1: Xenos.DamageType = "Impact"; break;
                            case 2: case 3: Xenos.DamageType = "Rending"; break;
                        }
                        Xenos.WeaponName = "Tendrils";
                    break;
                    case 'small':
                        Xenos.WS = 40;
                        Xenos.S = 35;
                        Xenos.T = 35;
                        Xenos.Ag = 35;
                        Xenos.Pr = 25;
                        Xenos.Wounds = 8;
                        Xenos.Talents += GetLink("Sturdy") + "<br>";
                        Xenos.Traits += GetLink("From Beyond") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.Traits += GetLink("Size") + "(Scrawny)<br>";
                        Xenos.HalfMove -= 1;
                        Xenos.Traits += GetLink("Strange Physiology") + "<br>";
                        //basic attack
                        Xenos.Damage = -1;
                        Xenos.Pen = 0;
                        switch(randomInteger(3)){
                            case 1: Xenos.DamageType = "Impact"; break;
                            case 2: case 3: Xenos.DamageType = "Rending"; break;
                        }
                        Xenos.WeaponName = "Tendrils";
                    break;
                    case 'large':
                        Xenos.WS = 50;
                        Xenos.S = 50;
                        Xenos.T = 50;
                        Xenos.Ag = 20;
                        Xenos.Pr = 35;
                        Xenos.Wounds = 20;
                        Xenos.ArmourAll(2);
                        Xenos.Talents += GetLink("Sturdy") + "<br>";
                        Xenos.Traits += GetLink("From Beyond") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.Traits += GetLink("Size") + "(Enormous)<br>";
                        Xenos.HalfMove += 2;
                        Xenos.Traits += GetLink("Strange Physiology") + "<br>";
                        //basic attack
                        Xenos.Damage = 1;
                        Xenos.Pen = 0;
                        switch(randomInteger(3)){
                            case 1: case 2: Xenos.DamageType = "Impact"; break;
                            case 3: Xenos.DamageType = "Rending"; break;
                        }
                        Xenos.WeaponName = "Tendrils";
                    break;
                    case 'massive': 
                        Xenos.WS = 45;
                        Xenos.S = 65;
                        Xenos.T = 75;
                        Xenos.Ag = 15;
                        Xenos.Pr = 20;
                        Xenos.Wounds = 40;
                        Xenos.ArmourAll(4);
                        Xenos.Talents += GetLink("Sturdy") + "<br>";
                        Xenos.Traits += GetLink("From Beyond") + "<br>";
                        Xenos.Traits += GetLink("Improved Natural Weapons") + "<br>";
                        Xenos.Traits += GetLink("Size") + "(Massive)<br>";
                        Xenos.HalfMove += 3;
                        Xenos.Traits += GetLink("Strange Physiology") + "<br>";
                        Xenos.Traits += GetLink("Swift Attack") + "<br>";
                        //basic attack
                        Xenos.Damage = 3;
                        Xenos.Pen = 0;
                        switch(randomInteger(3)){
                            case 1: case 2: Xenos.DamageType = "Impact"; break;
                            case 3: Xenos.DamageType = "Rending"; break;
                        }
                        Xenos.WeaponName = "Tendrils";
                    break;
                }
                
                //genereate two random traits based on type
                for(var i = 0; i < 2; i++){
                    switch(XenosBase){
                        case 'passive-trap': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Armoured(); break;
                                case 2: Xenos.Deterrent(); break;
                                case 3: Xenos.Frictionless(); break;
                                case 4: Xenos.Sticky(); break;
                                case 5: case 6: Xenos.FoulAura("Soporific"); break;
                                case 7: case 8: Xenos.FoulAura("Toxic"); break;
                                case 9: Xenos.Resilient(); break;
                                case 10: ExoticTraits++; break; //we will roll on the exotic traits later
                            }
                        break; 
                        case 'active-trap': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Armoured(); break;
                                case 2: Xenos.Deadly(); break;
                                case 3: Xenos.Flexible(); break;
                                case 4: Xenos.Mighty(); break;
                                case 5: Xenos.Sticky(); break;
                                case 6: Xenos.Paralytic(); break;
                                case 7: Xenos.Resilient(); break;
                                case 8: case 9: Xenos.Venomous(); break;
                                case 10: ExoticTraits++; break; //we will roll on the exotic traits later 
                            }
                        break;
                        case 'combatant': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Armoured(); break;
                                case 2: Xenos.Deadly(); break;
                                case 3: Xenos.Venomous(); break;
                                case 4: Xenos.Deterrent(); break;
                                case 5: Xenos.Mighty(); break;
                                case 5: Xenos.ProjectileAttack(); break;
                                case 6: Xenos.Paralytic(); break;
                                case 7: case 8: Xenos.Resilient(); break;
                                case 9: Xenos.UprootedMovement(); break;
                                case 10: ExoticTraits++; break; //we will roll on the exotic traits later
                            }
                        break;
                    }
                }
                
                //generate one random trait based on location
                var Die;
                switch(XenosWorld){
                    case 'deathworld': 
                    if(XenosBase == 'passive-trap') {
                        Die = randomInteger(7); //passive trap plants cannot generate aggressive traits
                    } else if(XenosBase == 'active-trap'){
                        Die = randomInteger(9); //trap plants cannot generate combatant traits
                    } else {
                        Die = randomInteger(10); //otherwise, generate away!
                    }
                    switch(Die){
                        case 1: case 2: Xenos.Armoured(); break;
                        case 3: Xenos.Deterrent(); break;
                        case 4: Xenos.Disturbing(); break;
                        case 5: Xenos.Resilient(); break;
                        case 6: Xenos.Unkillable(); break;
                        case 7: Xenos.LethalDefences(); break;
                        case 8: Xenos.Deadly(); break;
                        case 9: Xenos.Mighty(); break;
                        case 10: Xenos.UprootedMovement(); break;
                    }
                    //deathworld species generate two traits
                    if(XenosBase == 'passive-trap') {
                        Die = randomInteger(7); //passive trap plants cannot generate aggressive traits
                    } else if(XenosBase == 'active-trap'){
                        Die = randomInteger(9); //trap plants cannot generate combatant traits
                    } else {
                        Die = randomInteger(10); //otherwise, generate away!
                    }
                    switch(Die){
                        case 1: case 2: Xenos.Armoured(); break;
                        case 3: Xenos.Deterrent(); break;
                        case 4: Xenos.Disturbing(); break;
                        case 5: Xenos.Resilient(); break;
                        case 6: Xenos.Unkillable(); break;
                        case 7: Xenos.LethalDefences(); break;
                        case 8: Xenos.Deadly(); break;
                        case 9: Xenos.Mighty(); break;
                        case 10: Xenos.UprootedMovement(); break;
                    }
                    break;
                    case 'jungle':
                    if(XenosBase == 'passive-trap') {
                        Die = randomInteger(8); //passive trap plants cannot generate aggressive traits
                    } else {
                        Die = randomInteger(10); //otherwise, generate away!
                    }
                    switch(Die){
                        case 1: Xenos.Deterrent(); break;
                        case 2: Xenos.Stealthy(); break;
                        case 3: case 4: Xenos.Flexible(); break;
                        case 5: case 6: Xenos.FoulAura("Soporific"); break;
                        case 7: case 8: Xenos.FoulAura("Toxic"); break;
                        case 9: Xenos.Paralytic(); break;
                        case 10: Xenos.Venomous(); break;
                    }
                    break;
                    case 'temperate': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Armoured(); break;
                        case 2: Xenos.Venomous(); break;
                        case 3: Xenos.Stealthy(); break;
                        case 4: case 5: Xenos.Deterrent();
                        case 6: Xenos.FoulAura("Soporific"); break;
                        case 7: Xenos.FoulAura("Toxic"); break;
                        case 8: Xenos.ProjectileAttack(); break;
                        case 9: case 10: Xenos.Venomous(); break;
                    }
                    break;
                    case 'ocean': 
                    if(XenosBase == 'passive-trap') {
                        Die = randomInteger(5); //passive trap plants cannot generate aggressive traits
                    } else if(XenosBase == 'active-trap'){
                        Die = randomInteger(7); //trap plants cannot generate combatant traits
                    } else {
                        Die = randomInteger(10); //otherwise, generate away!
                    }
                    switch(Die){
                        case 1: case 2: Xenos.Deterrent(); break;
                        case 3: Xenos.Disturbing(); break;
                        case 4: case 5: Xenos.ProjectileAttack(); break;
                        case 6: Xenos.Paralytic(); break;
                        case 7: Xenos.Venomous(); break;
                        case 8: case 9: case 10: Xenos.UprootedMovement(); break;
                    }
                    break;
                }
                
                //generate final traits with Exotic
                while(ExoticTraits > 0){
                    //If this Exotic Trait should be a Mutation, preset the roll to 10
                    if(Mutations > 0){
                        Die = 10;
                        Mutations--;
                    } else {
                        Die = randomInteger(10);
                    }
                    switch(Die){
                        case 1: case 2: Xenos.Disturbing(); break;
                        case 3: Xenos.LethalDefences(); break;
                        case 4: case 5: Xenos.Silicate(); break;
                        case 6: case 7: Xenos.FadeKind(); break;
                        case 8: case 9: Xenos.Unkillable(); break;
                        case 10: Xenos.Warped(); break;
                    }
                    ExoticTraits--;
                }
                break;
                
            case 'Fauna': 
                //record the type of animal
                if(input.indexOf('avian') != -1) {
                    XenosBase = 'avian';
                } else if(input.indexOf('herd') != -1) {
                    XenosBase = 'herd';
                } else if(input.indexOf('predator') != -1) {
                    XenosBase = 'predator';
                } else if(input.indexOf('scavenger') != -1) {
                    XenosBase = 'scavenger';
                } else if(input.indexOf('swarm') != -1) {
                    XenosBase = 'swarm';
                } else {
                    switch(randomInteger(10)){
                        case 1: case 2: XenosBase = 'avian'; break;
                        case 3: case 4: case 5: XenosBase = 'herd'; break;
                        case 6: case 7: XenosBase = 'predator'; break;
                        case 8: case 9: XenosBase = 'scavenger'; break;
                        case 10: XenosBase = 'swarm'; break;
                    }
                }
                
                //record the animal's size
                if(input.indexOf('miniscule') != -1){
                    XenosSize = 'miniscule';
                } else if(input.indexOf('puny') != -1) {
                    XenosSize = 'puny';
                } else if(input.indexOf('scawny') != -1) {
                    XenosSize = 'scrawny';
                } else if(input.indexOf('average') != -1) {
                    XenosSize = 'average';
                } else if(input.indexOf('hulking') != -1) {
                    XenosSize = 'hulking';
                } else if(input.indexOf('enormous') != -1) {
                    XenosSize = 'enormous';
                } else if(input.indexOf('massive') != -1) {
                    XenosSize = 'massive';
                } else {
                    //determine the size at random
                    if(XenosBase != 'swarm'){
                    switch(randomInteger(10)){
                        case 1: XenosSize = "Miniscule"; break;
                        case 2: XenosSize = "Puny"; break;
                        case 3: case 4: XenosSize = "Scawny"; break;
                        case 5: case 6: XenosSize = "Average"; break;
                        case 7: case 8: XenosSize = "Hulking"; break;
                        case 9: XenosSize = "Enormous"; break;
                        case 10: XenosSize = "Massive"; break;
                    }
                    } else {
                    //swarms of xenos must be at least average in size
                    switch(4 + randomInteger(6)){
                        //case 1: XenosSize = "Miniscule"; break;
                        //case 2: XenosSize = "Puny"; break;
                        //case 3: case 4: XenosSize = "Scawny"; break;
                        case 5: case 6: XenosSize = "Average"; break;
                        case 7: case 8: XenosSize = "Hulking"; Xenos.Wounds += 20; break;
                        case 9: XenosSize = "Enormous";        Xenos.Wounds += 40; break;
                        case 10: XenosSize = "Massive";        Xenos.Wounds += 60; break;
                    }
                    }
                }
                
                //record the habitat of the plant
                if(input.indexOf("death") != -1) {
                    XenosWorld = 'deathworld'; 
                } else if(input.indexOf("jungle") != -1) {
                    XenosWorld = "jungle";
                } else if(input.indexOf("temperate") != -1) {
                    XenosWorld = "temperate";
                } else if(input.indexOf("ocean") != -1) {
                    XenosWorld = "ocean";
                } else if(input.indexOf("desert") != -1) {
                    XenosWorld = "desert";
                } else if(input.indexOf("ice") != -1) {
                    XenosWorld = "ice";
                } else if(input.indexOf("volcanic") != -1) {
                    XenosWorld = "volcanic";
                } else if(input.indexOf("exotic") != -1) {
                    //exotic traits are handled differently as any creature has a small chance of generating one
                    ExoticTraits++;
                } else {
                    switch(randomInteger(7)){
                        case 1: XenosWorld = "deathworld"; break;
                        case 2: XenosWorld = "jungle"; break;
                        case 3: XenosWorld = "temperate"; break;
                        case 4: XenosWorld = "ocean"; break;
                        case 5: XenosWorld = "desert"; break;
                        case 6: XenosWorld = "ice"; break;
                        case 7: XenosWorld = "volcanic"; break;
                        //Exotic should be a rare and on demand species
                        //default: XenosWorld = "exotic"; break;
                    }
                }
                
                //generate the creature
                //The Size of the Creauture influences its stats
                if(XenosBase != 'swarm'){
                    switch(XenosSize){
                        case 'Miniscule': Xenos.S -= 25; Xenos.T -= 25; Xenos.Wounds -= 10; Xenos.HalfMove -= 3; break;
                        case 'Puny':      Xenos.S -= 20; Xenos.T -= 20; Xenos.Wounds -= 10; Xenos.HalfMove -= 2; break;
                        case 'Scawny':    Xenos.S -= 10; Xenos.T -= 10; Xenos.Wounds -= 5;  Xenos.HalfMove -= 1; break;
                        case 'Average':   break;
                        case 'Hulking':   Xenos.S += 5;  Xenos.T += 5;  Xenos.Wounds += 5;  Xenos.Ag -= 5;  Xenos.HalfMove += 1; break;
                        case 'Enormous':  Xenos.S += 10; Xenos.T += 10; Xenos.Wounds += 10; Xenos.Ag -= 10; Xenos.HalfMove += 2;break;
                        case 'Massive':   Xenos.S += 20; Xenos.T += 20; Xenos.Wounds += 20; Xenos.Ag -= 20; Xenos.HalfMove += 3; break;
                    }
                }
                Xenos.Traits += GetLink("Size") + "(" + XenosSize + ")<br>";
                
                //each creature has a chance to generate extra arms
                while(randomInteger(5) == 1){
                    Xenos.Arms += 2;
                }
                if(Xenos.Arms > 2){
                    Xenos.Traits += GetLink("Multiple Arms") + "(" + Xenos.Arms + ")<br>";
                }
                
                //each creature has a chance to generate extra legs
                if(XenosBase == 'herd'){
                    Xenos.Legs += 2; //herd beasts are atleast four legged
                }
                while(randomInteger(5) == 1){
                    Xenos.Legs += 2;
                }
                if(Xenos.Legs > 2){
                    Xenos.Traits += GetLink("Multiple Legs") + "(" + Xenos.Legs + ")<br>";
                }
                
                //add in the base profile
                switch(XenosBase){
                    case 'avian': 
                        Xenos.WS += 35;
                        Xenos.S  += 30;
                        Xenos.T  += 30;
                        Xenos.Ag += 45;
                        Xenos.It += 15;
                        Xenos.Pr += 45;
                        Xenos.Wp += 30;
                        Xenos.Wounds += 9;
                        Xenos.Awareness++;
                        Xenos.Traits += GetLink("Bestial") + "<br>";
                        Xenos.Flyer = true;
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.WeaponName = "Talons";
                        Xenos.DamageType = "Rending";
                    break;
                    case 'herd': 
                        Xenos.WS += 25;
                        Xenos.S  += 40;
                        Xenos.T  += 45;
                        Xenos.Ag += 25;
                        Xenos.It += 15;
                        Xenos.Pr += 30;
                        Xenos.Wp += 40;
                        Xenos.Wounds += 14;
                        Xenos.Awareness++;
                        Xenos.Traits += GetLink("Bestial") + "<br>";
                        Xenos.Traits += GetLink("Sturdy") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.WeaponName = "Hooves";
                        Xenos.DamageType = "Impact";
                    break;
                    case 'predator': 
                        Xenos.WS += 50;
                        Xenos.S  += 45;
                        Xenos.T  += 40;
                        Xenos.Ag += 40;
                        Xenos.It += 15;
                        Xenos.Pr += 40;
                        Xenos.Wp += 45;
                        Xenos.Wounds += 15;
                        Xenos.Awareness++;
                        Xenos.Skills += GetLink("Tracking") + "<br>";
                        Xenos.Talents += GetLink("Swift Attack") + "<br>";
                        Xenos.Traits += GetLink("Bestial") + "<br>";
                        Xenos.Traits += GetLink("Brutal Charge") + "(3)<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.WeaponName = "Claws";
                        Xenos.DamageType = "Rending";
                    break;
                    case 'scavenger': 
                        Xenos.WS += 40;
                        Xenos.S  += 35;
                        Xenos.T  += 35;
                        Xenos.Ag += 40;
                        Xenos.It += 15;
                        Xenos.Pr += 40;
                        Xenos.Wp += 35;
                        Xenos.Wounds += 12;
                        Xenos.Awareness++;
                        Xenos.Skills += GetLink("Tracking") + "<br>";
                        Xenos.Traits += GetLink("Bestial") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.WeaponName = "Fangs";
                        Xenos.DamageType = "Rending";
                    break;
                    case 'swarm': 
                        Xenos.WS += 30;
                        Xenos.S  +=  5;
                        Xenos.T  += 10;
                        Xenos.Ag += 35;
                        Xenos.It +=  5;
                        Xenos.Pr += 40;
                        Xenos.Wp += 10;
                        Xenos.Wounds += 10;
                        Xenos.Awareness++;
                        Xenos.Traits += GetLink("Bestial") + "<br>";
                        Xenos.Traits += GetLink("Fear") + "<br>";
                        Xenos.Traits += GetLink("Natural Weapons") + "<br>";
                        Xenos.WeaponName = "Stingers";
                        Xenos.DamageType = "Rending";
                    break;
                }
                
                //add in random traits due to the Xenos Base
                for(var i = 0; i < 2; i++){
                    switch(XenosBase){
                        case 'avian': 
                            switch(randomInteger(10)){
                                case 1: case 2: case 3: Xenos.Deadly(); break;
                                case 4: Xenos.Flexible(); break;
                                case 5: case 6: Xenos.ProjectileAttack(); break;
                                case 7: Xenos.Stealthy(); break;
                                case 8: Xenos.SustainedLife(); break;
                                case 9: Xenos.Swift(); break;
                                case 10: ExoticTraits++; break;
                            }
                        break; 
                        case 'herd': 
                            switch(randomInteger(10)){
                                case 1: case 2:  Xenos.Armoured(); break;
                                case 3: Xenos.Deterrent(); break;
                                case 4: Xenos.LethalDefences(); break;
                                case 5: Xenos.Mighty(); break;
                                case 6: case 7: Xenos.Resilient(); break;
                                case 8: case 9: Xenos.Swift(); break;
                                case 10: ExoticTraits++; break;
                            }
                        break;
                        case 'predator': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Apex(); break;
                                case 2: Xenos.Armoured(); break;
                                case 3: case 4: Xenos.Deadly(); break;
                                case 5: Xenos.Mighty(); break;
                                case 6: if(randomInteger(2) == 1){Xenos.Paralytic();}else{Xenos.Venomous();} break;
                                case 7: Xenos.ProjectileAttack(); break;
                                case 8: Xenos.Stealthy(); break;
                                case 9: Xenos.Swift(); break;
                                case 10: ExoticTraits++; break;
                            }
                        break;
                        case 'scavenger': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Crawler(); break;
                                case 2: Xenos.Darkling(); break;
                                case 3: case 4: Xenos.Deadly(); break;
                                case 5: Xenos.Deathdweller(); break;
                                case 6: Xenos.Disturbing(); break;
                                case 7: Xenos.Flexible(); break;
                                case 8: Xenos.Stealthy(); break;
                                case 9: Xenos.Swift(); break;
                                case 10: ExoticTraits++; break;
                            }
                        break;
                        case 'swarm': 
                            switch(randomInteger(10)){
                                case 1: Xenos.Crawler(); break;
                                case 2: Xenos.Darkling(); break;
                                case 3: case 4: Xenos.Deadly(); break;
                                case 5: Xenos.Deathdweller(); break;
                                case 6: case 7: Xenos.Deterrent(); break;
                                case 8: case 9: Xenos.Disturbing(); break;
                                case 10: ExoticTraits++; break;
                            }
                        break;
                    }
                }
                
                switch(XenosWorld){
                    case 'deathworld': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Apex(); break;
                        case 2: Xenos.Armoured(); break;
                        case 3: Xenos.Deadly(); break;
                        case 4: Xenos.Deathdweller(); break;
                        case 5: Xenos.Disturbing(); break;
                        case 6: Xenos.LethalDefences(); break;
                        case 7: Xenos.Mighty(); break;
                        case 8: Xenos.Resilient(); break;
                        case 9: Xenos.Swift(); break;
                        case 10: Xenos.Unkillable(); break;
                    }
                    //deathworld species get two traits
                    switch(randomInteger(10)){
                        case 1: Xenos.Apex(); break;
                        case 2: Xenos.Armoured(); break;
                        case 3: Xenos.Deadly(); break;
                        case 4: Xenos.Deathdweller(); break;
                        case 5: Xenos.Disturbing(); break;
                        case 6: Xenos.LethalDefences(); break;
                        case 7: Xenos.Mighty(); break;
                        case 8: Xenos.Resilient(); break;
                        case 9: Xenos.Swift(); break;
                        case 10: Xenos.Unkillable(); break;
                    }
                    break;
                    case 'desert': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Crawler(); break;
                        case 2: Xenos.ThermalAdaptation("Cold"); break;
                        case 3: case 4: Xenos.Deathdweller(); break;
                        case 5: case 6: Xenos.Tunneller(); break;
                        default: Xenos.ThermalAdaptation("Heat"); break;
                    }
                    break;
                    case 'ice': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Darkling(); break;
                        case 2: case 3: Xenos.Deathdweller(); break;
                        case 4: Xenos.Silicate(); break;
                        case 10: Xenos.Tunneller(); break;
                        default: Xenos.ThermalAdaptation("Cold");
                    }
                    break;
                    case 'jungle': 
                    switch(randomInteger(10)){
                        case 1: case 2: Xenos.Amphibious(); break;
                        case 3: case 4: case 5: Xenos.Arboreal(); break;
                        case 6: case 7: Xenos.Crawler(); break;
                        case 8: Xenos.Paralytic(); break;
                        case 9: Xenos.Stealthy(); break;
                        case 10: Xenos.Venomous(); break;
                    }
                    break;
                    case 'ocean': 
                    switch(randomInteger(10)){
                        case 1: case 2: case 3: case 4: Xenos.Amphibious(); break;
                        default: Xenos.Aquatic(); break;
                    }
                    break;
                    case 'temperate': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Amphibious(); break;
                        case 2: Xenos.Aquatic(); break;
                        case 3: Xenos.Arboreal(); break;
                        case 4: Xenos.Armoured(); break;
                        case 5: Xenos.Crawler(); break;
                        case 6: Xenos.Mighty(); break;
                        case 7: Xenos.Resilient(); break;
                        case 8: Xenos.Stealthy(); break;
                        case 9: Xenos.Swift(); break;
                        case 10: ExoticTraits++; break;
                    }
                    break;
                    case 'volcanic': 
                    switch(randomInteger(10)){
                        case 1: Xenos.Armoured(); break;
                        case 2: case 3: Xenos.Deathdweller(); break;
                        case 4: Xenos.SustainedLife(); break;
                        case 10: Xenos.Tunneller(); break;
                        default: Xenos.ThermalAdaptation("Heat"); break;
                    }
                    break;
                }
                
                //generate final traits with any Exotic points that have built up
                while(ExoticTraits > 0){
                    //If this Exotic Trait should be a Mutation, preset the roll to 10
                    if(Mutations > 0){
                        Die = 10;
                        Mutations--;
                    } else {
                        Die = randomInteger(10);
                    }
                    switch(Die){
                        case 1: Xenos.Amorphous(); break;
                        case 2: Xenos.Darkling(); break;
                        case 3: Xenos.Disturbing(); break;
                        case 4: Xenos.FadeKind(); break;
                        case 5: Xenos.Gestalt(); break;
                        case 6: Xenos.Silicate(); break;
                        case 7: Xenos.SustainedLife(); break;
                        case 8: Xenos.LethalDefences(); break;
                        case 9: Xenos.Unkillable(); break;
                        case 10: Xenos.Warped(); break;
                    }
                    ExoticTraits--;
                }
                
                break;
            //case 'Native': break;  at base a native will be a flora or fauna
        }
        
        //add in benefits if the creature is sentient
        if(input.indexOf('native') != -1){
            //first add mind related benefits available to all sentient beings
            if(Xenos.BS <= 0){
                Xenos.BS += randomInteger(30);
            }
            if(Xenos.It <= 0){
                Xenos.It += randomInteger(30);
            } else {
                Xenos.It += randomInteger(10);
            }
            if(Xenos.Wp <= 0){
                Xenos.Wp += randomInteger(30);
            } else {
                Xenos.Wp += randomInteger(10);
            }
            if(Xenos.Fe <= 0){
                Xenos.Fe += randomInteger(30);
            } else {
                Xenos.Fe += randomInteger(10);
            }
            //beings that have evolved past the primitive stage gain an extra boost to their mind
            if(Xenos.Civilization != 'primitive clans'){
                Xenos.BS += randomInteger(30);
                Xenos.It += randomInteger(30);
                Xenos.Wp += randomInteger(30);
                Xenos.Fe += randomInteger(30);
            }
            //determine which weapons this Native Race will get
            //primitive clans are only likely to have melee and thrown weapons
            if(Xenos.Civilization == 'primitive clans'){
                //do they have melee weapons?
                if(randomInteger(100) <= 90){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("melee",-3);
                }
                //do they have thrown weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("thrown",-3);
                }
                //do they have pistol weapons?
                if(randomInteger(100) <= 5){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("pistol",-3);
                }
                //do they have basic weapons?
                if(randomInteger(100) <= 5){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("basic",-3);
                }
                //do they have heavy weapons?
                if(randomInteger(100) <= 5){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("heavy",-3);
                }
                
            }else{
                //determine the tech level
                switch(Xenos.Civilization){
                    case 'pre-industrial':
                        Xenos.WeaponTech = -2;
                        break;
                    case 'basic industry':
                        Xenos.WeaponTech = -1;
                        break;
                    case 'advanced industry':
                        Xenos.WeaponTech = 0;
                        break;
                    case 'voidfarers':
                        Xenos.WeaponTech = 1;
                        break;
                }
                
                //do they have melee weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("melee",Xenos.WeaponTech);
                }
                //do they have thrown weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("thrown",Xenos.WeaponTech);
                }
                //do they have pistol weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("pistol",Xenos.WeaponTech);
                }
                //do they have basic weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("basic",Xenos.WeaponTech);
                }
                //do they have heavy weapons?
                if(randomInteger(100) <= 50){
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = this.RandomWeapon("heavy",Xenos.WeaponTech);
                }
            }
            /*
            //determine the society's weapon tech level
            //weapons of an unknown civilization are wildly unpredictable
            //however the more advanced the civilization's general technology is, the mroe advanced the weapons tend to be
            Xenos.WeaponTech = 0;
            switch(Xenos.Civilization){
                case 'primitive clans': 
                    switch(randomInteger(31)){
                        //pre industry weapons 8/31 ~ 26%
                        case 17: case 18: case 19: case 20:
                        case 21: case 22: case 23: case 24:
                            Xenos.WeaponTech = 10 + randomInteger(10);
                        break;
                        //basic industry weapons 4/31 ~ 13%
                        case 25: case 26: case 27: case 28:
                            Xenos.WeaponTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/31 ~ 6%
                        case 29: case 30:
                            Xenos.WeaponTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/31 ~ 3%
                        case 31: 
                            Xenos.WeaponTech = 40 + randomInteger(10);
                        break;
                         //primitive weapons 16/31 ~ 52%
                        default:
                            Xenos.WeaponTech = randomInteger(10);
                        break;
                    }
                    break;
                case 'pre-industrial': 
                    switch(randomInteger(19)){
                        //primitive weapons 4/19 ~ 21%
                        case 9: case 10: case 11: case 12:
                            Xenos.WeaponTech = randomInteger(10);
                        break;
                        //basic industry weapons 4/19 ~ 21%
                        case 13: case 14: case 15: case 16:
                            Xenos.WeaponTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/19 ~ 11%
                        case 17: case 18:
                            Xenos.WeaponTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/19 ~ 5%
                        case 19: 
                            Xenos.WeaponTech = 40 + randomInteger(10);
                        break;
                         //pre-industrial weapons 8/19 ~ 42%
                        default:
                            Xenos.WeaponTech = 10 + randomInteger(10);
                        break;
                    }
                    break;
                case 'basic industry': 
                    switch(randomInteger(10)){
                        //primitive weapons 1/10 ~ 10%
                        case 1:
                            Xenos.WeaponTech = randomInteger(10);
                        break;
                        //pre-industrial weapons 2/10 ~ 20%
                        case 2: case 3:
                            Xenos.WeaponTech = 10 + randomInteger(10);
                        break;
                        //basic industry weapons 4/10 ~ 40%
                        case 4: case 5: case 6: case 7:
                            Xenos.WeaponTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/10 ~ 20%
                        case 8: case 9:
                            Xenos.WeaponTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/10 ~ 10%
                        case 10: 
                            Xenos.WeaponTech = 40 + randomInteger(10);
                        break;
                    }
                break;
                case 'advanced industry': 
                    switch(randomInteger(19)){
                        //voidfarer weapons 4/19 ~ 21%
                        case 9: case 10: case 11: case 12:
                            Xenos.WeaponTech = 40 + randomInteger(10);
                        break;
                        //basic industry weapons 4/19 ~ 21%
                        case 13: case 14: case 15: case 16:
                            Xenos.WeaponTech = 20 + randomInteger(10);
                        break;
                        //pre industrial weapons 2/19 ~ 11%
                        case 17: case 18:
                            Xenos.WeaponTech = 10 + randomInteger(10);
                        break;
                        //primitive weapons 1/19 ~ 5%
                        case 19: 
                            Xenos.WeaponTech =  randomInteger(10);
                        break;
                         //advanced industrial weapons 8/19 ~ 42%
                        default:
                            Xenos.WeaponTech = 30 + randomInteger(10);
                        break;
                    }
                    break;
                case 'voidfarers': 
                    switch(randomInteger(31)){    
                        //advanced industry weapons 8/31 ~ 26%
                        case 17: case 18: case 19: case 20:
                        case 21: case 22: case 23: case 24:
                            Xenos.WeaponTech = 30 + randomInteger(10);
                        break;
                        //basic industry weapons 4/31 ~ 13%
                        case 25: case 26: case 27: case 28:
                            Xenos.WeaponTech = 20 + randomInteger(10);
                        break;
                        //preindustrial weapons 2/31 ~ 6%
                        case 29: case 30:
                            Xenos.WeaponTech = 10 + randomInteger(10);
                        break;
                        //primitive weapons 1/31 ~ 3%
                        case 31: 
                            Xenos.WeaponTech =  randomInteger(10);
                        break;
                         //voidfarer weapons 16/31 ~ 52%
                        default:
                            Xenos.WeaponTech = 40 + randomInteger(10);
                        break;
                    }
                break;
            }
            */
            //determine the society's armour tech level
            //the armour of an unknown civilization is widly unpredictable
            //though, those of a more advanced civilization are generally going to have more advanced armour
            Xenos.ArmourTech = 0;
            switch(Xenos.Civilization){
                case 'primitive clans': 
                    switch(randomInteger(31)){
                        //pre industry weapons 8/31 ~ 26%
                        case 17: case 18: case 19: case 20:
                        case 21: case 22: case 23: case 24:
                            Xenos.ArmourTech = 10 + randomInteger(10);
                        break;
                        //basic industry weapons 4/31 ~ 13%
                        case 25: case 26: case 27: case 28:
                            Xenos.ArmourTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/31 ~ 6%
                        case 29: case 30:
                            Xenos.ArmourTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/31 ~ 3%
                        case 31: 
                            Xenos.ArmourTech = 40 + randomInteger(10);
                        break;
                         //primitive weapons 16/31 ~ 52%
                        default:
                            Xenos.ArmourTech = randomInteger(10);
                        break;
                    }
                    break;
                case 'pre-industrial': 
                    switch(randomInteger(19)){
                        //primitive weapons 4/19 ~ 21%
                        case 9: case 10: case 11: case 12:
                            Xenos.ArmourTech = randomInteger(10);
                        break;
                        //basic industry weapons 4/19 ~ 21%
                        case 13: case 14: case 15: case 16:
                            Xenos.ArmourTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/19 ~ 11%
                        case 17: case 18:
                            Xenos.ArmourTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/19 ~ 5%
                        case 19: 
                            Xenos.ArmourTech = 40 + randomInteger(10);
                        break;
                         //pre-industrial weapons 8/19 ~ 42%
                        default:
                            Xenos.ArmourTech = 10 + randomInteger(10);
                        break;
                    }
                    break;
                case 'basic industry': 
                    switch(randomInteger(10)){
                        //primitive weapons 1/10 ~ 10%
                        case 1:
                            Xenos.ArmourTech = randomInteger(10);
                        break;
                        //pre-industrial weapons 2/10 ~ 20%
                        case 2: case 3:
                            Xenos.ArmourTech = 10 + randomInteger(10);
                        break;
                        //basic industry weapons 4/10 ~ 40%
                        case 4: case 5: case 6: case 7:
                            Xenos.ArmourTech = 20 + randomInteger(10);
                        break;
                        //advanced industry weapons 2/10 ~ 20%
                        case 8: case 9:
                            Xenos.ArmourTech = 30 + randomInteger(10);
                        break;
                        //voidfarer weapons 1/10 ~ 10%
                        case 10: 
                            Xenos.ArmourTech = 40 + randomInteger(10);
                        break;
                    }
                break;
                case 'advanced industry': 
                    switch(randomInteger(19)){
                        //voidfarer weapons 4/19 ~ 21%
                        case 9: case 10: case 11: case 12:
                            Xenos.ArmourTech = 40 + randomInteger(10);
                        break;
                        //basic industry weapons 4/19 ~ 21%
                        case 13: case 14: case 15: case 16:
                            Xenos.ArmourTech = 20 + randomInteger(10);
                        break;
                        //pre industrial weapons 2/19 ~ 11%
                        case 17: case 18:
                            Xenos.ArmourTech = 10 + randomInteger(10);
                        break;
                        //primitive weapons 1/19 ~ 5%
                        case 19: 
                            Xenos.ArmourTech =  randomInteger(10);
                        break;
                         //advanced industrial weapons 8/19 ~ 42%
                        default:
                            Xenos.ArmourTech = 30 + randomInteger(10);
                        break;
                    }
                    break;
                case 'voidfarers': 
                    switch(randomInteger(31)){    
                        //advanced industry weapons 8/31 ~ 26%
                        case 17: case 18: case 19: case 20:
                        case 21: case 22: case 23: case 24:
                            Xenos.ArmourTech = 30 + randomInteger(10);
                        break;
                        //basic industry weapons 4/31 ~ 13%
                        case 25: case 26: case 27: case 28:
                            Xenos.ArmourTech = 20 + randomInteger(10);
                        break;
                        //preindustrial weapons 2/31 ~ 6%
                        case 29: case 30:
                            Xenos.ArmourTech = 10 + randomInteger(10);
                        break;
                        //primitive weapons 1/31 ~ 3%
                        case 31: 
                            Xenos.ArmourTech =  randomInteger(10);
                        break;
                         //voidfarer weapons 16/31 ~ 52%
                        default:
                            Xenos.ArmourTech = 40 + randomInteger(10);
                        break;
                    }
                break;
            }
            /*
            //add the weapons based on technology level 
            switch(Xenos.WeaponTech){
                //=================
                //PRIMITIVE WEAPONS - Primitive Quality
                //=================
                case 1:  case 2:  break; //even tool use is beyond them, no weapons at all
                case 3:  case 4:  
                    //small rocks and branches
                    //thrown rocks
                    
                    //stick
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Stick";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = -2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", ";
                break; 
                case 5:  case 6:
                    //bigger is better: large weapons and rock
                    //thrown large rocks
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Large Rock";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = (Math.floor(Xenos.S/10) + Xenos.Unnatural_S);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                    //large stick
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Large Stick";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", " + GetLink("Unwieldy");
                break; 
                case 7:  
                    //sharper rocks and sticks
                    //thrown large rocks
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Sharp Rock";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = -2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 3*(Math.floor(Xenos.S/10) + Xenos.Unnatural_S);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                    //large stick
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Sharp Stick";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = -2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                break;
                case 8:  
                    //bow and arrow
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Bow and Stick";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = -2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", " + GetLink("Reliable") + ", " + GetLink("Inaccurate");
                break;
                case 9:  
                    //sticks with sharpened rock head, (spear)
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Spear";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                break;
                case 10: 
                    //arrows with arrowheads
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Bow";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 20;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                break; 
                //======================
                //PRE-INDUSTRIAL WEAPONS - Primitive Quality
                //======================
                case 12: case 11: 
                    //bronze sword
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Bronze Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", " + GetLink("Balanced");
                break;
                case 14: case 13: 
                    //iron sword
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Iron Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", " + GetLink("Balanced");
                break; //iron age
                case 16: case 15:
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Steel Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive") + ", " + GetLink("Balanced");
                break; 
                case 17:
                    //long bow
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Long Bow";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 30;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                break; 
                case 18: 
                    //crossbow
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Crossbow";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Primitive");
                break; //crossbow                
                case 19:
                    //guns, pistols
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Pistol";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 15;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Inaccurate") + ", " + GetLink("Primitive");
                break; 
                case 20:
                    //cannon
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Cannon";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 4;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 35;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Inaccurate") + ", " + GetLink("Primitive");
                break;
                //======================
                //BASIC INDUSTRY WEAPONS
                //======================
                case 21:
                    //multi-person machine guns - primitive
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Stationary Machine Gun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 100;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 4;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 50;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Inaccurate") + ", " + GetLink("Primitive");
                break; 
                case 22:
                    //multi-shot guns - primitive
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Personal Machine Gun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = 2;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = 30;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 3;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 30;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Inaccurate") + ", " + GetLink("Primitive");
                break; 
                case 23: 
                    //grenades
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Grenade";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "X";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 3 * (Math.floor(Xenos.S/10) + Xenos.Unnatural_S);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Blast") + "(" + randomInteger(5) + ")";
                break; //grenades
                case 24: 
                    //bombs
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Bomb";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(6)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "X";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = (Math.floor(Xenos.S/10) + Xenos.Unnatural_S);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Blast") + "(" + randomInteger(10) + ")";
                break;
                case 25:
                    //single person machine guns
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Machinegun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Inaccurate") + ", " + GetLink("Primitive");
                break; 
                case 26: 
                    //flame weapon
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Flamer";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(20);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(10)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Spray") + ", " + GetLink("Flame");
                break;
                case 27: 
                    //chemical weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Acid Spray";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(20);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(10)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Spray") + ", " + GetLink("Toxic");    
                break; 
                case 28: 
                    //advanced single shot guns!
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Rifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = "";
                break; 
                case 29: 
                    //advanced machine guns - not primitive!
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Autogun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = "";
                break; 
                case 30: 
                    //radioactive weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Radbeam";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(10);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(10)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Irradiated");
                break; 
                //=========================
                //ADVANCED INDUSTRY WEAPONS
                //=========================
                case 31: 
                    //autogun with motion predictor
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Autogun Motion Predictor";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Motion Predictor");
                break;
                case 32:
                    //autogun with anti-armoour rounds
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Anti-Armour Autogun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 2+randomInteger(4);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = "";
                break; 
                case 33: 
                    //sniper rifles
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Sniper Rifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(4)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 2+randomInteger(6);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Accurate") + ", " + GetLink("Reliable") + GetLink("Silencer");
                break; 
                case 34:
                    //full auto hand held weaponry
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Autogun Mk2";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*10;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Full = 4+randomInteger(6);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = "";
                break; 
                case 35: 
                    //single fire las weaponry
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Lasrifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*40;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Reliable");
                break;
                case 36: 
                    //rapid fire las weaponry
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Lasgun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(5)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*40;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Reliable");
                break;
                case 37:
                    //large chain weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Chain Hammer";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Tearing") + ", " + GetLink("Unwieldy");
                break;
                case 38: 
                    //balanced chain weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Chain Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "R";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Tearing") + ", " + GetLink("Balanced");
                break;
                case 39:
                    //Unwieldy Shock weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Thunder Hammer";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Shocking") + ", " + GetLink("Unwieldy");
                break; 
                case 40:
                    //Balanced Shock Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Shock Batton";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "I";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Shocking") + ", " + GetLink("Balanced");
                break; 
                //==================
                //VOID FARER WEAPONS
                //==================
                case 41: 
                    //Single Shot Bolter
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Boltrifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(9)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*40;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "X";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Tearing");
                break; 
                case 42:
                    //Rapid Fire Bolter Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Boltrifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(9)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*40;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "X";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1+randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Tearing");
                break; 
                case 43:
                    //Unbalanced Power Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Power Fist";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Power Field") + ", " + GetLink("Unwieldy");
                break; 
                case 44:
                    //Balanced Power Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Power Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Power Field") + ", " + GetLink("Balanced");
                break; 
                case 45:
                    //Single Shot Plasma Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Plasmarifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(12);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(12);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Overheats") + ", " + GetLink("Blast") + "(" + randomInteger(3) + ")";
                break; 
                case 46: 
                    //Rapid Fire Plasma Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Plasmarifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(12);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(12);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1 + randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(30)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Overheats") + ", " + GetLink("Blast") + "(" + randomInteger(3) + ")";
                break; 
                case 47:
                    //Single Shop Melta Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Melta Rifle";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(15)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(25)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Melta");
                break; 
                case 48: 
                    //Rapid Fire Melta Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Meltagun";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(15)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(25)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Clip = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Semi = 1 + randomInteger(3);
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = randomInteger(5)*5;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Melta");
                break; 
                case 49:
                    //Unbalanced Force Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Force Hammer";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(11)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Force") + ", " + GetLink("Unwieldy");
                break; 
                case 50:
                    //Balanced Force Weapons
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length] = {};
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].WeaponName = "Force Sword";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Damage = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Pen = randomInteger(3)-1;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].DamageType = "E";
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Range = 0;
                    Xenos.NativeWeapons[Xenos.NativeWeapons.length - 1].Qualities = GetLink("Force") + ", " + GetLink("Balanced");
                break;
            }
            */
            //determine the name and the strength of the native's armour
            var ArmourBase = 0;
            switch(Xenos.ArmourTech){
                //=====================
                //PRIMITIVE CLAN ARMOUR
                //=====================
                case 1: case 2: case 3: case 4: case 5:  
                    //still running around naked
                    Xenos.ArmourName = "Warpaints";        
                break; 
                case 6: case 7: case 8: case 9: case 10:
                    Xenos.ArmourName = "Hides";
                    ArmourBase = 1;
                break; 
                //===================
                //PRE-INDUSTRY ARMOUR
                //===================
                case 11: case 12:
                    Xenos.ArmourName = "Bronze Armour";
                    ArmourBase = 1;
                    //slows the native down
                    Xenos.Ag -= 15;
                break;
                case 13: case 14:
                    Xenos.ArmourName = "Iron Armour";
                    ArmourBase = 2;
                    //slows the native down
                    Xenos.Ag -= 15;
                break;
                case 15: case 16:
                    Xenos.ArmourName = "Bronze Armour";
                    ArmourBase = 2;
                    //doesn't slow the native down as much
                    Xenos.Ag -= 5;
                break;
                case 17: case 18: case 19: case 20: 
                    //native wear's colourful clothing that offers no combat benefit
                    Xenos.ArmourName = "Colourful Cloth";
                break;
                //=====================
                //BASIC INDUSTRY ARMOUR
                //=====================
                case 21: case 22: case 23: case 24: case 25:
                case 26: case 27: case 28: case 29: case 30:
                    //native wear's clothing that offers no protection, but does help it with concealment
                    Xenos.ArmourName = "Camouflage";
                break;
                //========================
                //ADVANCED INDUSTRY ARMOUR
                //========================
                case 31: case 32:
                    Xenos.ArmourName = "Bullet Proof Vest";
                    ArmourBase = 2;
                break;
                case 33: case 34:
                    //flack armour
                    Xenos.ArmourName = "Flack Cloak";
                    ArmourBase = 3;
                break;
                case 35: case 36:
                    //flack armour
                    Xenos.ArmourName = GetLink("Flack Armour");
                    //armour everything but the head
                    ArmourBase = 3;
                break;
                case 37: case 38:
                    //mesh armour
                    Xenos.ArmourName = "Mesh Armour";
                    ArmourBase = 4;
                break;
                case 39: case 40:
                    //mesh armour
                    Xenos.ArmourName = GetLink("Reflective") +  " Mesh";
                    ArmourBase = 4;
                break;
                //================
                //VOIDFARER ARMOUR
                //================
                case 41: case 42: case 43:
                    //carapace armour
                    Xenos.ArmourName = "Light Carapace Armour";
                    ArmourBase = 5;
                break;
                case 44: case 45: case 46:
                    //carapace armour
                    Xenos.ArmourName = "Heavy Carapace Armour";
                    ArmourBase = 6;
                    Xenos.Ag -= 5;
                break;
                case 47: case 48:
                    //power armour
                    Xenos.ArmourName = "Light Power Armour";
                    ArmourBase = 7;
                    Xenos.S += 10;
                break;
                case 49:
                    //power armour
                    Xenos.ArmourName = "Power Armour";
                    ArmourBase = 8;
                    Xenos.S += 20;
                break;
                case 50:
                    //terminator armour
                    Xenos.ArmourName = "Terminator Armour";
                    ArmourBase = 10;
                    Xenos.S += 30;
                break;
            }
            //equip the armour
            //and note where the armour is being equipped
            Xenos.ArmourName += " ";
            //armour is sometimes worn on the head
            if(randomInteger(3) != 1){
                Xenos.Armour_H += ArmourBase;
                Xenos.ArmourName += "H/"
            }
            //armour is often worn on the body
            if(randomInteger(10) != 1){
                Xenos.Armour_B += ArmourBase;
                Xenos.ArmourName += "B/"
            }
            //armour is sometimes worn on the arms
            if(randomInteger(3) != 1){
                Xenos.Armour_LA += ArmourBase;
                Xenos.Armour_RA += ArmourBase;
                //rarely armour will be worn on only one of the arms
                if(randomInteger(10) == 1){
                    //pick an arm to take the armour off
                    if(randomInteger(2) == 1){
                        Xenos.Armour_LA -= ArmourBase;
                        //there is only armour on the right arm
                        Xenos.ArmourName += "RA/";
                    } else {
                        Xenos.Armour_RA -= ArmourBase;
                        //there is only armour on the left arm
                        Xenos.ArmourName += "LA/";
                    }
                } else {
                    //the armour was kept on both arms
                    Xenos.ArmourName += "A/";
                }
            }
            //armour is sometimes worn on the legs
            if(randomInteger(3) != 1){
                Xenos.Armour_LL += ArmourBase;
                Xenos.Armour_RL += ArmourBase;
                //rarely armour will be worn on only one of the legs
                if(randomInteger(10) == 1){
                    //pick a leg to take the armour off
                    if(randomInteger(2) == 1){
                        Xenos.Armour_LL -= ArmourBase;
                        //there is only armour on the right leg
                        Xenos.ArmourName += "RL/";
                    } else {
                        Xenos.Armour_RL -= ArmourBase;
                        //there is only armour on the left leg
                        Xenos.ArmourName += "LL/";
                    }
                } else {
                    //the armour was kept on both legs
                    Xenos.ArmourName += "L/";
                }
            }
            //remove the last character of the Name for trimming purposes
            Xenos.ArmourName = Xenos.ArmourName.substr(0,Xenos.ArmourName.length-1);
            //add language based on NOTHING
            var languages = 1;
            Xenos.Language = "";
            while(languages > 0){
                //generate a random language structure
                switch(randomInteger(15)){
                    case 1:  Xenos.Language += "High Gothic Competancy";      break;
                    case 2:  Xenos.Language += "Low Gothic Relic";            break;
                    case 3:  Xenos.Language += "Orkish Roots";                break;
                    case 4:  Xenos.Language += "Ancient Eldar Heritage";      break;
                    case 5:  Xenos.Language += "Necrontyr Grammer Structure"; break;
                    case 6:  Xenos.Language += "Telepathic";                  break;
                    case 7:  Xenos.Language += "Chameleon Surfaces";          break;
                    case 8:  Xenos.Language += "Sublte Facial Movements";     break;
                    case 9:  Xenos.Language += "Appendage Facilitated";       break;
                    case 10: Xenos.Language += "Full Body";                   break;
                    case 11: Xenos.Language += "Intuitive Communicators";     break;
                    case 12: Xenos.Language += "Ultra High Frequency";        break;
                    case 13: Xenos.Language += "Sub Audible";                 break;
                    case 14: Xenos.Language += "Compound"; languages += 2;    break;
                    case 15: Xenos.Language += "Multi-lingual"; languages += 2; break;
                }
                Xenos.Language += ", ";
                languages--;
            }
            //delete the last comma and space
            Xenos.Language = Xenos.Language.substring(0,Xenos.Language.length-2);
            //add culture based on NOTHING
            switch(randomInteger(10)){
                case 1:  Xenos.Culture = "Merchant"; break;
                case 2:  Xenos.Culture = "Hunter"; break;
                case 3:  Xenos.Culture = "Feudal"; break;
                case 4:  Xenos.Culture = "Raider"; break;
                case 5:  Xenos.Culture = "Nomadic"; break;
                case 6:  Xenos.Culture = "Hivemind"; break;
                case 7:  Xenos.Culture = "Scavenger"; break;
                case 8:  Xenos.Culture = "Theocracy"; break;
                case 9:  Xenos.Culture = "Tradition"; break;
                case 10: Xenos.Culture = "Cannibal"; break;
            }
        }
        
        //Calcuate Burrower
        if(Xenos.Burrower > 0){
            Die = Xenos.Unnatural_S + Math.floor(Xenos.S/10); //start with the creature's strength bonus
            Die += 2*(Xenos.Burrower-1); //Add 2 Burrower for each instane of the trait
            Xenos.Traits += GetLink("Burrower") + "(" + Die.toString() + ")"; //Write it down
        }
        if(Xenos.Climb >= 0){
            Xenos.Skills += GetLink("Climb");
            if(Xenos.Climb > 0){
                Die = Xenos.Climb * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Swim >= 0){
            Xenos.Skills += GetLink("Swim");
            if(Xenos.Swim > 0){
                Die = Xenos.Swim * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Concealment >= 0){
            Xenos.Skills += GetLink("Concealment");
            if(Xenos.Concealment > 0){
                Die = Xenos.Concealment * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.SilentMove >= 0){
            Xenos.Skills += GetLink("Silent Move");
            if(Xenos.SilentMove > 0){
                Die = Xenos.SilentMove * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Shadowing >= 0){
            Xenos.Skills += GetLink("Shadowing");
            if(Xenos.Shadowing > 0){
                Die = Xenos.Shadowing * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Dodge >= 0){
            Xenos.Skills += GetLink("Dodge");
            if(Xenos.Dodge > 0){
                Die = Xenos.Dodge * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Awareness >= 0){
            Xenos.Skills += GetLink("Awareness");
            if(Xenos.Awareness > 0){
                Die = Xenos.Awareness * 10;
                Xenos.Skill += "+" + Die.toString();
            }
            Xenos.Skills += "<br>";
        }
        if(Xenos.Flyer){
            var flyerSpeed = 2*(Math.floor(Xenos.Ag/10) + Xenos.Unnatural_Ag);
             Xenos.Traits += GetLink("Flyer") + "(" + flyerSpeed.toString() + ")<br>";
        }
        //calculate movement if not a plant, plants don't move (but walking plants do!)
        if(XenosType != 'flora' || Xenos.Traits.indexOf("Uprooted Movement") != -1){
            //Ag+Unnatural Ag
            Xenos.HalfMove += Math.floor(Xenos.Ag/10) + Xenos.Unnatural_Ag;
            //Size was already accounted for
            //Be sure teh creature can move
            if(Xenos.HalfMove <= 0){Xenos.HalfMove = 1;}
            //Multiple Legs
            Xenos.HalfMove *= Xenos.Legs;
            Xenos.HalfMove /= 2;
            
            //Calculate the other movement rates from this base move
            Xenos.FullMove = 2*Xenos.HalfMove;
            Xenos.Charge   = 3*Xenos.HalfMove;
            Xenos.Run      = 6*Xenos.HalfMove;
        } else {
            //potted plants don't move!
            Xenos.HalfMove = 0;
        }
        
        //create the character sheet
        NewXenos = createObj("character", {
            name: UniqueName
        });
        
        //Compile the Weapons Stats
        //Check to see if the weapon is primitive
        if(Xenos.Traits.indexOf("Improved Natural Weapons") == -1){
            Xenos.Qualities += GetLink("Primitive") + ", ";
        }
        //convert the creatures attack into text and save it in Xenos.Weapons
        Xenos.Weapons = Xenos.WeaponName + " (D10";
        Die = Xenos.Damage + Xenos.Unnatural_S + Math.floor(Xenos.S/10);
        if(Die > 0){
            Xenos.Weapons += "+" + Die.toString();
        } else if(Die < 0){
            Xenos.Weapons += Die.toString();
        }
        if(Xenos.DamageType == "Explosive" || Xenos.DamageType.length == 0){
            Xenos.Weapons += " " + GetLink("X");
        } else {
            Xenos.Weapons += " " + GetLink(Xenos.DamageType[0]);
        }
        Xenos.Weapons += "; Pen " + Xenos.Pen;
        if(Xenos.Qualities.length > 2){
            Xenos.Weapons += "; "  + Xenos.Qualities.substring(0,Xenos.Qualities.length-2);
        }
        Xenos.Weapons += ")<br>";
        
        //convert to ability
        var AbilityText = "/w gm - @{character_name} deals [[";
        if(Xenos.Qualities.indexOf("Tearing") != -1){
            AbilityText += "2D10k1"
        } else{
            AbilityText += "D10"
        }
        AbilityText += "+" + Xenos.Damage.toString() + "]] ";
        switch(Xenos.DamageType){
            case "I": AbilityText += "Impact"; break;
            case "R": AbilityText += "Rending"; break;
            case "E": AbilityText += "Energy"; break;
            case "X": AbilityText += "Explosive"; break;
        }
        AbilityText += " Damage, ";
        AbilityText += "[[" + Xenos.Pen + "]] Pen";
        if(Xenos.Qualities.length > 2){
            AbilityText += ", "  + Xenos.Qualities.substring(0,Xenos.Qualities.length-2);
        }
        AbilityText += " with " + Xenos.WeaponName;
        createObj("ability", {
            name: Xenos.WeaponName,
            action: AbilityText,
            istokenaction: true,
            characterid: NewXenos.id
        });
        
        //be sure there is a ranged attack to detail
        if(Xenos.RRange != 0){
            //convert to text
            Xenos.Weapons += Xenos.RWeaponName;
            Xenos.Weapons += " (" + Xenos.RRange + "m; S/-/-;";
            Xenos.Weapons += " D10";
            if(Xenos.Damage > 0){
                Xenos.Weapons += "+" + Xenos.RDamage.toString();
            } else if(Xenos.RDamage < 0){
                Xenos.Weapons += Xenos.RDamage.toString();
            }
            if(Xenos.RDamageType == "Explosive" || Xenos.RDamageType.length == 0){
                Xenos.Weapons += " " + GetLink("X");
            } else {
                Xenos.Weapons += " " + GetLink(Xenos.RDamageType[0]);
            }
            Xenos.Weapons += "; Pen " + Xenos.RPen;
            if(Xenos.RQualities.length > 2){
                Xenos.Weapons += "; "  + Xenos.RQualities.substring(0,Xenos.RQualities.length-2);
            }
            Xenos.Weapons += ")<br>";
            
            //convert to ability
            AbilityText = "/w gm - @{character_name} deals [[";
            if(Xenos.RQualities.indexOf("Tearing") != -1){
                AbilityText += "2D10k1"
            } else{
                AbilityText += "D10"
            }
            AbilityText += "+" + Xenos.RDamage.toString() + "]] ";
            switch(Xenos.RDamageType){
                case "I": AbilityText += "Impact"; break;
                case "R": AbilityText += "Rending"; break;
                case "E": AbilityText += "Energy"; break;
                case "X": AbilityText += "Explosive"; break;
            }
            AbilityText += " Damage, ";
            AbilityText += "[[" + Xenos.RPen + "]] Pen";
            if(Xenos.RQualities.length > 2){
                AbilityText += ", "  + Xenos.RQualities.substring(0,Xenos.RQualities.length-2);
            }
            AbilityText += " with " + Xenos.RWeaponName;
            createObj("ability", {
                name: Xenos.RWeaponName,
                action: AbilityText,
                istokenaction: true,
                characterid: NewXenos.id
            });
        }        
        
        //step through all the native weapons
        for(weaponIndex = 0; weaponIndex < Xenos.NativeWeapons.length; weaponIndex++){
            //write out the details of the weapon
            Xenos.Weapons += Xenos.NativeWeapons[weaponIndex].WeaponName + " (";
            //detail the range of the weapon
            if(Xenos.NativeWeapons[weaponIndex].Range > 0){
                //add the range of the weapon
                Xenos.Weapons += Xenos.NativeWeapons[weaponIndex].Range.toString() + "m; ";
                //can this weapon fire on single?
                if(Xenos.NativeWeapons[weaponIndex].Single){
                    Xenos.Weapons += "S";
                }else{
                    Xenos.Weapons += "-";
                }
                
                Xenos.Weapons += "/";
                //detail the number of semi auto shots
                if(Xenos.NativeWeapons[weaponIndex].Semi > 0){
                    Xenos.Weapons += Xenos.NativeWeapons[weaponIndex].Semi.toString();
                } else {
                    Xenos.Weapons += "-";
                }
                Xenos.Weapons += "/";
                //detail the number of full auto shots
                if(Xenos.NativeWeapons[weaponIndex].Full > 0){
                    Xenos.Weapons += Xenos.NativeWeapons[weaponIndex].Full.toString();
                } else {
                    Xenos.Weapons += "-";
                }
                Xenos.Weapons += "; ";
            //is the weapon thrown?
            }else if(Xenos.NativeWeapons[weaponIndex].Range < 0){
                //multiply the range by the creature's strength bonus
                Xenos.Weapons += (-Xenos.NativeWeapons[weaponIndex].Range * (Xenos.Unnatural_S + Math.floor(Xenos.S/10))).toString() + "m; ";
            }
            //detail the damage
            //is the weapon using D5s?
            if(Xenos.NativeWeapons[weaponIndex].DiceNum == 0){
                Xenos.Weapons +=  "D5";
            //is the weapon usingjust one D10?
            }else if(Xenos.NativeWeapons[weaponIndex].DiceNum == 1){
                Xenos.Weapons +=  "D10";
            //otherwise, show how many D10s the wepaon is using
            }else{
                Xenos.Weapons += Xenos.NativeWeapons[weaponIndex].DiceNum.toString() + "D10";    
            }
            
            var totalDamage = Xenos.NativeWeapons[weaponIndex].Damage;
            //melee weapons have S bonus added to their damage
            if(Xenos.NativeWeapons[weaponIndex].Range == 0){
                totalDamage += Math.floor(Xenos.S/10) + Xenos.Unnatural_S;
            }
            if(totalDamage > 0){
                Xenos.Weapons += "+" + totalDamage.toString();
            } else if(totalDamage < 0){
                Xenos.Weapons += totalDamage.toString();
            }
            
            //detail the damage type
            Xenos.Weapons += " " + GetLink(Xenos.NativeWeapons[weaponIndex].DamageType);
            Xenos.Weapons += "; Pen " + Xenos.NativeWeapons[weaponIndex].Pen.toString();
            if(Xenos.NativeWeapons[weaponIndex].Qualities.length != ""){
                Xenos.Weapons += "; " + Xenos.NativeWeapons[weaponIndex].Qualities;
            }
            Xenos.Weapons += ")<br>";
            
            //create a token ability for this weapon
            //convert to ability
            AbilityText = "/w gm - @{character_name} deals [[";
            //does this weapon have tearing?
            if(Xenos.NativeWeapons[weaponIndex].Qualities.indexOf("Tearing") != -1){
                 //detail the damage
                //is the weapon using D5s?
                if(Xenos.NativeWeapons[weaponIndex].DiceNum == 0){
                    AbilityText +=  "2D5k1";
                //otherwise, show how many D10s the wepaon is using
                }else{
                    AbilityText += (1+Xenos.NativeWeapons[weaponIndex].DiceNum).toString() + "D10";    
                }
            } else{
                //detail the damage
                //is the weapon using D5s?
                if(Xenos.NativeWeapons[weaponIndex].DiceNum == 0){
                    AbilityText +=  "D5";
                //otherwise, show how many D10s the wepaon is using
                }else{
                    AbilityText += Xenos.NativeWeapons[weaponIndex].DiceNum.toString() + "D10";    
                }
            }
            AbilityText += "+" + totalDamage.toString() + "]] ";
            switch(Xenos.NativeWeapons[weaponIndex].DamageType){
                case "I": AbilityText += "Impact"; break;
                case "R": AbilityText += "Rending"; break;
                case "E": AbilityText += "Energy"; break;
                case "X": AbilityText += "Explosive"; break;
            }
            AbilityText += " Damage, ";
            AbilityText += "[[" + Xenos.NativeWeapons[weaponIndex].Pen + "]] Pen";
            if(Xenos.NativeWeapons[weaponIndex].Qualities != ""){
                AbilityText += ", "  + Xenos.NativeWeapons[weaponIndex].Qualities;
            }
            AbilityText += " with a(n) " + Xenos.NativeWeapons[weaponIndex].WeaponName;
            createObj("ability", {
                name: Xenos.NativeWeapons[weaponIndex].WeaponName,
                action: AbilityText,
                istokenaction: true,
                characterid: NewXenos.id
            });
        }
        
        //Compile the GM Notes
        //start with the classifications of this xenos
        Xenos.gmnotes += "<strong>Type</strong>: " + XenosType + "<br>";
        Xenos.gmnotes += "<strong>Size</strong>: " + XenosSize + "<br>";
        Xenos.gmnotes += "<strong>Base</strong>: " + XenosBase + "<br>";
        Xenos.gmnotes += "<strong>World</strong>: " + XenosWorld + "<br>";
        //note the civilized classifications if the nexos is civilized
        if(Xenos.Civilization != ""){
            Xenos.gmnotes += "<strong>Civilization</strong>: " + Xenos.Civilization + "<br>";
            Xenos.gmnotes += "<strong>Culture</strong>: " + Xenos.Culture + "<br>";
            Xenos.gmnotes += "<strong>Language</strong>: " + Xenos.Language + "<br>";
        }
        
        
        
        //Movement
        //setup the title row
        Xenos.gmnotes += "<br><table><tbody><tr><td><strong>Half</strong></td><td><strong>Full</strong></td><td><strong>Charge</strong></td><td><strong>Run</strong></td></tr>";
        //add the Half Move
        Xenos.gmnotes += "<tr><td>" + Xenos.HalfMove + "</td>";
        //add the Full Move
        Xenos.gmnotes += "<td>" + Xenos.FullMove + "</td>";
        //add the Charge Move
        Xenos.gmnotes += "<td>" + Xenos.Charge + "</td>";
        //add the Run Move
        Xenos.gmnotes += "<td>" + Xenos.Run + "</td>";
        //close up the table
        Xenos.gmnotes += "</tbody></table>";
        
        //Weapons
        Xenos.gmnotes += "<br><strong><u>Weapons</u></strong><br>" + Xenos.Weapons;
        
        //Gear
        Xenos.gmnotes += "<br><strong><u>Gear</u></strong><br>";
        //if this creature is civilized, list their armour (however insignificant it may be)
        if(Xenos.Civilization != ""){
            Xenos.gmnotes += Xenos.ArmourName + "<br>";
        }
        
        //Talents
        Xenos.gmnotes += "<br><strong><u>Talents</u></strong><br>" + Xenos.Talents;
        //Traits
        Xenos.gmnotes += "<br><strong><u>Traits</u></strong><br>" + Xenos.Traits;
        //Skills
        Xenos.gmnotes += "<br><strong><u>Skills</u></strong><br>" + Xenos.Skills;
        
        //record the GM Notes
        NewXenos.set('gmnotes',Xenos.gmnotes);
        
        //Bring stats to their minimum, and if they are already past that, add D5-1 for a bit of uncertainty
        if(Xenos.WS <= 0){Xenos.WS = 0}else{Xenos.WS += randomInteger(5)-1;}
        if(Xenos.BS <= 0){Xenos.BS = 0}else{Xenos.BS += randomInteger(5)-1;}
        if(Xenos.S  <= 0){Xenos.S  = 0}else{Xenos.S  += randomInteger(5)-1;}
        if(Xenos.T  <= 0){Xenos.T  = 0}else{Xenos.T  += randomInteger(5)-1;}
        if(Xenos.Ag <= 0){Xenos.Ag = 0}else{Xenos.Ag += randomInteger(5)-1;}
        if(Xenos.Wp <= 0){Xenos.Wp = 0}else{Xenos.Wp += randomInteger(5)-1;}
        if(Xenos.Pr <= 0){Xenos.Pr = 0}else{Xenos.Pr += randomInteger(5)-1;}
        if(Xenos.It <= 0){Xenos.It = 0}else{Xenos.It += randomInteger(5)-1;}
        if(Xenos.Fe <= 0){Xenos.Fe = 0}else{Xenos.Fe += randomInteger(5)-1;}
        
        if(Xenos.Wounds <= 3){Xenos.Wounds = 3}else{Xenos.Wounds += randomInteger(5)-1;}
        
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
        if(WaitingRooms[0] != undefined){
            WaitingRoom = WaitingRooms[0];
        } else {
            //if the room does not exist, make it exist
            WaitingRoom = createObj("page", {name: "Creature Creation"});
        }
        
        //create the token in the room
        var Token = createObj("graphic", {pageid: WaitingRoom.id, name: UniqueName, height: 70, width:70, left: 35, top: 35, layer: "objects", imgsrc: "https://s3.amazonaws.com/files.d20.io/images/3360725/NFy-FPDogVUZbxiRowb2Ag/thumb.png?1394439373"});
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
        Token.set("represents", NewXenos.id);
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
        createObj("attribute", {name: "WS", current: Xenos.WS, max: Xenos.WS, characterid: NewXenos.id});
        createObj("attribute", {name: "BS", current: Xenos.BS, max: Xenos.BS, characterid: NewXenos.id});
        createObj("attribute", {name:  "S", current: Xenos.S,  max: Xenos.S,  characterid: NewXenos.id});
        createObj("attribute", {name:  "T", current: Xenos.T,  max: Xenos.T,  characterid: NewXenos.id});
        createObj("attribute", {name: "Ag", current: Xenos.Ag, max: Xenos.Ag, characterid: NewXenos.id});
        createObj("attribute", {name: "Wp", current: Xenos.Wp, max: Xenos.Wp, characterid: NewXenos.id});
        createObj("attribute", {name: "It", current: Xenos.It, max: Xenos.It, characterid: NewXenos.id});
        createObj("attribute", {name: "Per",current: Xenos.Pr, max: Xenos.Pr, characterid: NewXenos.id});
        createObj("attribute", {name: "Fe", current: Xenos.Fe, max: Xenos.Fe, characterid: NewXenos.id});
        
        //Stats: Wounds, Fatigue, Fate
        createObj("attribute", {name: "Wounds",  current: Xenos.Wounds, max: Xenos.Wounds, characterid: NewXenos.id});
        createObj("attribute", {name: "Fatigue", current: 0, max: Xenos.Fatigue, characterid: NewXenos.id});
        createObj("attribute", {name: "Fate",    current: 0, max: 0, characterid: NewXenos.id});
        //Armour: H,RA,LA,B,RL,LL
        createObj("attribute", {name: "Armour_H",  current: Xenos.Armour_H,  max: Xenos.Armour_H,  characterid: NewXenos.id});
        createObj("attribute", {name: "Armour_RA", current: Xenos.Armour_RA, max: Xenos.Armour_RA, characterid: NewXenos.id});
        createObj("attribute", {name: "Armour_LA", current: Xenos.Armour_LA, max: Xenos.Armour_LA, characterid: NewXenos.id});
        createObj("attribute", {name: "Armour_B",  current: Xenos.Armour_B,  max: Xenos.Armour_B,  characterid: NewXenos.id});
        createObj("attribute", {name: "Armour_RL", current: Xenos.Armour_RL, max: Xenos.Armour_RL, characterid: NewXenos.id});
        createObj("attribute", {name: "Armour_LL", current: Xenos.Armour_LL, max: Xenos.Armour_LL, characterid: NewXenos.id});
        //PR
        createObj("attribute", {name: "PR", current: 0, max: 0, characterid: NewXenos.id});
        //Unnatural Characteristics: WS,BS,S,T,Ag,Wp,It,Per,Fe
        createObj("attribute", {name: "Unnatural WS", current: Xenos.Unnatural_WS, max: Xenos.Unnatural_WS, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural BS", current: Xenos.Unnatural_BS, max: Xenos.Unnatural_BS, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural S",  current: Xenos.Unnatural_S,  max: Xenos.Unnatural_S,  characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural T",  current: Xenos.Unnatural_T,  max: Xenos.Unnatural_T,  characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural Ag", current: Xenos.Unnatural_Ag, max: Xenos.Unnatural_Ag, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural Wp", current: Xenos.Unnatural_Wp, max: Xenos.Unnatural_Wp, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural It", current: Xenos.Unnatural_It, max: Xenos.Unnatural_It, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural Per",current: Xenos.Unnatural_Pr, max: Xenos.Unnatural_Pr, characterid: NewXenos.id});
        createObj("attribute", {name: "Unnatural Fe", current: Xenos.Unnatural_Fe, max: Xenos.Unnatural_Fe, characterid: NewXenos.id});
        
        //alert the gm
        sendChat("System","/w gm Created " + GetLink(UniqueName,"http://journal.roll20.net/character/" + NewXenos.id));
        
        return GetLink(UniqueName,"http://journal.roll20.net/character/" + NewXenos.id);
    }
	
on("chat:message", function(msg) {
if(msg.type == 'api' && msg.content.indexOf('!NewXenos') == 0 && playerIsGM(msg.playerid)){
    mySystem = new System();
    mySystem.RandomCreature(msg.content.substring(10).toLowerCase());
    delete mySystem;
}
});