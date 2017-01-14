    //Re-roll multiple dice a number of times seeking the lowest or highest result
    this.TechRoll = function(rerolls, diceSides, diceNum){
        //how many dice are we rolling each time?
        diceNum = diceNum || 1;
        //is this a D5, D10, D100, etc?
        diceSides = diceSides || 10;
        //how many times are we attempting to reroll this 
        //and are we searching for the lowest (negative) or the highest (positive)
        rerolls = rerolls || -1;
        
        //save the output
        var output = 0;
        //roll the dice for the first time
        //keep rolling dice for the roll up to diceNum
        for(var j = 0; j < diceNum; j++){
            //roll a D5, D10, etc as speciied
            output += randomInteger(diceSides);
        }
        var temproll = 0;
        //keep rerolling for all of the rerolls
        for(var i = 0; i < Math.abs(rerolls); i++){
            //make a temporary variable for each re-roll
            var temproll = 0;    
            //keep rolling dice for the roll up to diceNum
            for(var j = 0; j < diceNum; j++){
                //roll a D5, D10, etc as speciied
                temproll += randomInteger(diceSides);
            }
            //are we seeking the smallest die roll & is this temproll smaller than the saved one?
            //OR
            //are we seeking the largest die roll & is this temproll larger than the saved one?
            if((rerolls < 0 && temproll < output) || (rerolls > 0 && temproll > output)){
                output = temproll;
            }
        }
        //report the final roll
        return output;
    }
    
    //Generates a random weapon to detail a native creature or their vehicle.
    this.RandomWeapon = function(type, tech, qualities, blast, rangemultiplier, clipmultiplier){
      //==input==
        //what type of weapon is this? (Melee, Thrown, Pistol, Basic, Heavy, Superheavy)
        type = type || "melee"
        //what is the tech level of native?
        tech = tech || -3
        //what special abilities have been added to this weapon?
        qualities = qualities || ""
        //add extra blast radius
        blast = blast || -1;
        //a multiplier for the range
        rangemultiplier = rangemultiplier || 1;
        //a multiplier for the clip
        clipmultiplier = clipmultiplier || 1;
        //try to reduce the tech level by one
        tech = tech - 1;
      //==output==
        //create an object that will contain all of the weapon's stats
        weapon = {};
    
        //how many qualities does this weapon have?
        var totalQualities = this.TechRoll(tech,5)-1;
        weapon.Qualities = "";
    
        //which type of weapon are we working with?
        switch(type){
            case "thrown":
                weapon.WeaponName = "Thrown Weapon";
                weapon.Type = "Thrown";
                weapon.Damage =  this.TechRoll(tech,10)-2;
                weapon.DiceNum = this.TechRoll(tech,3,2)-2;
                weapon.Pen =     this.TechRoll(tech,10)-1;
                weapon.Range = -1 * randomInteger(5);  //3 x Str
                break;
            case "pistol":
                weapon.WeaponName = "Pistol Weapon";
                weapon.Type = "Pistol";
                weapon.Damage =  this.TechRoll(tech,10)-2;
                weapon.DiceNum = this.TechRoll(tech,3,2)-2;
                weapon.Pen =     this.TechRoll(tech,10)-1;
                weapon.Range =   this.TechRoll(tech,50);
                //20% chance to be able to fire on single
                weapon.Single =  this.TechRoll(tech,10) > 8
                //20% chance to be able to fire on semiauto
                if(this.TechRoll(tech,10) > 8){
                    weapon.Semi = this.TechRoll(tech,3)+1
                }
                //20% chance to be able to fire on fullauto
                if(this.TechRoll(tech,10) > 8){
                    weapon.Full = this.TechRoll(tech,10)+5
                }
                //you should at least be able to fire on Single if you can't do anything else
                if (!(weapon.Semi || weapon.Full)){
                    weapon.Single = true;
                }
                //the clip size is based on the maximum fire setting
                if(weapon.Full){
                    weapon.Clip = weapon.Full * this.TechRoll(tech,10)
                } else if(weapon.Semi){
                    weapon.Clip = weapon.Semi * this.TechRoll(tech,10)
                } else {
                    weapon.Clip = this.TechRoll(tech,5)
                }
                break;
            case "basic":
                weapon.WeaponName = "Basic Weapon";
                weapon.Type = "Basic";
                weapon.Damage =  this.TechRoll(tech,15)-2;
                weapon.DiceNum = this.TechRoll(tech,3,2)-2;
                weapon.Pen =     this.TechRoll(tech,10)-1;
                weapon.Range =   this.TechRoll(tech,100,2);
                //30% chance to be able to fire on single
                weapon.Single =  this.TechRoll(tech,10) > 7
                //30% chance to be able to fire on semiauto
                if(this.TechRoll(tech,10) > 7){
                    weapon.Semi = this.TechRoll(tech,3)+1
                }
                //30% chance to be able to fire on fullauto
                if(this.TechRoll(tech,10) > 7){
                    weapon.Full = this.TechRoll(tech,10)+5
                }
                //you should at least be able to fire on Single if you can't do anything else
                if (!(weapon.Semi || weapon.Full)){
                    weapon.Single = true;
                }
                //the clip size is based on the maximum fire setting
                if(weapon.Full){
                    weapon.Clip = weapon.Full * this.TechRoll(tech,10)
                } else if(weapon.Semi){
                    weapon.Clip = weapon.Semi * this.TechRoll(tech,10)
                } else {
                    weapon.Clip = this.TechRoll(tech,10)
                }
                break;
            case "heavy":
                weapon.WeaponName = "Heavy Weapon";
                weapon.Type = "Heavy";
                weapon.Damage =  this.TechRoll(tech,20);
                weapon.DiceNum = this.TechRoll(tech,3,2)-2;
                weapon.Pen =     this.TechRoll(tech,10)-1;
                weapon.Range =   this.TechRoll(tech,250,2);
                //40% chance to be able to fire on single
                weapon.Single =  this.TechRoll(tech,10) > 6
                //40% chance to be able to fire on semiauto
                if(this.TechRoll(tech,10) > 6){
                    weapon.Semi = this.TechRoll(tech,3)+1
                }
                //40% chance to be able to fire on fullauto
                if(this.TechRoll(tech,10) > 6){
                    weapon.Full = this.TechRoll(tech,10)+5
                }
                //you should at least be able to fire on Single if you can't do anything else
                if (!(weapon.Semi || weapon.Full)){
                    weapon.Single = true;
                }
                //the clip size is based on the maximum fire setting
                if(weapon.Full){
                    weapon.Clip = weapon.Full * this.TechRoll(tech,20)
                } else if(weapon.Semi){
                    weapon.Clip = weapon.Semi * this.TechRoll(tech,20)
                } else {
                    weapon.Clip = this.TechRoll(tech,20)
                }
                break;
            case "superheavy":
                weapon.WeaponName = "Superheavy Weapon";
                weapon.Type =    "Superheavy";
                weapon.Damage =  this.TechRoll(tech,50);
                weapon.DiceNum = this.TechRoll(tech,5,2)-2;
                weapon.Pen =     this.TechRoll(tech,20)-1;
                weapon.Range =   this.TechRoll(tech,1000,2);
                //40% chance to be able to fire on single
                weapon.Single =  this.TechRoll(tech,10) > 6
                //40% chance to be able to fire on semiauto
                if(this.TechRoll(tech,10) > 6){
                    weapon.Semi = this.TechRoll(tech,3)+1
                }
                //40% chance to be able to fire on fullauto
                if(this.TechRoll(tech,10) > 6){
                    weapon.Full = this.TechRoll(tech,10)+5
                }
                //you should at least be able to fire on Single if you can't do anything else
                if (!(weapon.Semi || weapon.Full)){
                    weapon.Single = true;
                }
                //the clip size is based on the maximum fire setting
                if(weapon.Full){
                    weapon.Clip = weapon.Full * this.TechRoll(tech,20)
                } else if(weapon.Semi){
                    weapon.Clip = weapon.Semi * this.TechRoll(tech,20)
                } else {
                    weapon.Clip = this.TechRoll(tech,20)
                }
                break;
            //case "melee":
            default:
                weapon.WeaponName = "Melee Weapon";
                weapon.Type = "Melee";
                weapon.Damage =  this.TechRoll(tech,10)-3;
                weapon.DiceNum = this.TechRoll(tech,3,2)-2;
                weapon.Pen =     this.TechRoll(tech,10)-1;
                weapon.Range = 0;
        }
        //apply the multipliers and be sure the multiplier is positive
        if(clipmultiplier > 0){
            weapon.Clip *= clipmultiplier;
        } else{
            weapon.Clip = 1;
        }
        if(rangemultiplier > 0){
            weapon.Range *= rangemultiplier;
        } else{
            weapon.Range = 0;
        }
        
        //determine the damage type (Impact, Rending, Explosive, Energy)
        //lower tech nations are much more likely to have impact weapons
        switch(this.TechRoll(tech,10)){
            case 1: case 2: case 3: case 4:
                weapon.DamageType = "I";
                break;
            case 5: case 6: case 7:
                weapon.DamageType = "R";
                break;
            case 8: case 9:
                weapon.DamageType = "X";
                break;
            case 10:
                weapon.DamageType = "E";
                break;
        }
        //will we force the first property to be Primitive?
        if(randomInteger(100) < 1 + -20*tech){
            //add a link to Primitive and prepare for more qualities
            weapon.Qualities += GetLink("Primitive") + ", ";
            //reduce the number of weapon qualities by one
            totalQualities--;
        }
        
        //add the total number of random qualities to the weapon
        var randomQuality;
        //preset all of the valued qualities to negative one
        weapon.Blast = blast;
        weapon.Claws = -1;
        weapon.Concussive = -1;
        weapon.Crippling = -1;
        weapon.Devastating = -1;
        weapon.Felling = -1;
        weapon.Hallucinogenic = -1;
        weapon.Haywire = -1;
        weapon.Proven = -1;
        weapon.Smoke = -1;
        weapon.Toxic = -1;
        weapon.Spray = -1;
        weapon.AreaSaturation = -1;
        for(quality = 0; quality < totalQualities; quality++){
            //if this is a melee weapon generate a random general or melee quality
            if(weapon.Type == "Melee"){
                randomQuality = randomInteger(29+7);
            //otherwise generate a random general or ranged quality
            }else{
                randomQuality = randomInteger(29+16);
            }
            switch(randomQuality){
                case 1:
                    weapon.Qualities += GetLink("Corrosive") + ", ";
                    break;
                case 2:
                    weapon.Qualities += GetLink("Decay") + ", ";
                    break;
                case 3:
                    weapon.Qualities += GetLink("Irradiated") + ", ";
                    break;
                case 4:
                    weapon.Qualities += GetLink("Overcharge") + ", ";
                    break;
                case 5:
                    //start at 0
                    if(weapon.Blast < 0){weapon.Blast = 0;}
                    weapon.Blast += randomInteger(5);
                    break;
                case 6:
                    //start at 0
                    if(weapon.Claws < 0){weapon.Claws = 0;}
                    weapon.Claws += randomInteger(3);
                    break;
                case 7:
                    weapon.Concussive += randomInteger(5);
                    break;
                case 8:
                    //start at 0
                    if(weapon.Crippling < 0){weapon.Crippling = 0;}
                    weapon.Crippling += randomInteger(5);
                    break;
                case 9:
                    weapon.Qualities += GetLink("Deadly Snare") + ", ";
                    break;
                case 10:
                    //start at 0
                    if(weapon.Devastating < 0){weapon.Devastating = 0;}
                    weapon.Devastating += randomInteger(5);
                    break;
                case 11:
                    //start at 0
                    if(weapon.Felling < 0){weapon.Felling = 0;}
                    weapon.Felling += randomInteger(5);
                    break;
                case 12:
                    weapon.Qualities += GetLink("Fire") + ", ";
                    break;
                case 13:
                    weapon.Qualities += GetLink("Force") + ", ";
                    break;
                case 14:
                    weapon.Qualities += GetLink("Gauss") + ", ";
                    break;
                case 15:
                    weapon.Hallucinogenic += randomInteger(5);
                    break;
                case 16:
                    //start at 0
                    if(weapon.Haywire < 0){weapon.Haywire = 0;}
                    weapon.Haywire += randomInteger(5);
                    break;
                case 17:
                    weapon.Proven += randomInteger(5);
                    break;
                case 18:
                    weapon.Qualities += GetLink("Razor Sharp") + ", ";
                    break;
                case 19:
                    weapon.Qualities += GetLink("Rune Weapon") + ", ";
                    break;
                case 20:
                    weapon.Qualities += GetLink("Sanctified") + ", ";
                    break;
                case 21:
                    weapon.Qualities += GetLink("Shocking") + ", ";
                    break;
                case 22:
                    //start at 0
                    if(weapon.Smoke < 0){weapon.Smoke = 0;}
                    weapon.Smoke += randomInteger(5);
                    break;
                case 23:
                    weapon.Qualities += GetLink("Snare") + ", ";
                    break;
                case 24:
                    weapon.Qualities += GetLink("Tainted") + ", ";
                    break;
                case 25:
                    weapon.Qualities += GetLink("Tearing") + ", ";
                    break;
                case 26:
                    weapon.Qualities += GetLink("Tesla") + ", ";
                    break;
                case 27:
                    weapon.Toxic += randomInteger(5);
                    break;
                case 28:
                    weapon.Qualities += GetLink("Unstable") + ", ";
                    break;
                case 29:
                    weapon.Qualities += GetLink("Volatile") + ", ";
                    break;
                default:
                    //for ease of modifying in the future, scale back the random number by the number of generic qualities
                    randomQuality -= 29;
                    //should we generate a melee quality?
                    if(weapon.Type == "Melee"){
                        switch(randomQuality){
                            case 1:
                                weapon.Qualities += GetLink("Balanced") + ", ";
                                break;
                            case 2:
                                weapon.Qualities += GetLink("Defensive") + ", ";
                                break;    
                            case 3:
                                weapon.Qualities += GetLink("Fist") + ", ";
                                break;
                            case 4:
                                weapon.Qualities += GetLink("Flexible") + ", ";
                                break;
                            case 5:
                                weapon.Qualities += GetLink("Powerfield") + ", ";
                                break;
                            case 6:
                                weapon.Qualities += GetLink("Unbalanced") + ", ";
                                break;
                            case 7:
                                weapon.Qualities += GetLink("Unwieldy") + ", ";
                                break;
                        }
                    //otherwise the weapon is ranged. Generate ranged qualities
                    }else{
                        switch(randomQuality){
                            case 1:
                                weapon.Qualities += GetLink("Accurate") + ", ";
                                break;
                            case 2:
                                weapon.Qualities += GetLink("Customised") + ", ";
                                break;
                            case 3:
                                weapon.Qualities += GetLink("Gyro-Stabalised") + ", ";
                                break;
                            case 4:
                                weapon.Qualities += GetLink("Inaccurate") + ", ";
                                break;
                            case 5:
                                weapon.Qualities += GetLink("Living Ammunition") + ", ";
                                break;
                            case 6:
                                weapon.Qualities += GetLink("Maximal") + ", ";
                                break;
                            case 7:
                                weapon.Qualities += GetLink("Melta") + ", ";
                                break;
                            case 8:
                                weapon.Qualities += GetLink("Overheats") + ", ";
                                break;
                            case 9:
                                weapon.Qualities += GetLink("Recharge") + ", ";
                                break;
                            case 10:
                                weapon.Qualities += GetLink("Reliable") + ", ";
                                break;
                            case 11:
                                weapon.Qualities += GetLink("Scatter") + ", ";
                                break;
                            case 12:
                                //have we already added the Spray quality?
                                if(weapon.Spray < 0){
                                    //note that this weapon has the spray quality
                                    weapon.Spray = 0;
                                    //reduce the range to Sqrt[range]
                                    weapon.Range = Math.ceil(Math.sqrt(weapon.Range));
                                } else {
                                    //somehow we rolled Spray multiple times, extend the range of the spray
                                    weapon.Range *= 2;
                                }
                                //roll to see if we are extending the origin point range
                                if(randomInteger(10) == 1){
                                    //extend the origin point range by 100% to 300%
                                    weapon.Spray += weapon.Range * (99 + randomInteger(200))/100
                                }
                                break;
                            case 13:
                                weapon.Qualities += GetLink("Storm") + ", ";
                                break;
                            case 14:
                                weapon.Qualities += GetLink("Twin-linked") + ", ";
                                break;
                            case 15:
                                weapon.Qualities += GetLink("Unreliable") + ", ";
                                break;
                            case 16:
                                weapon.AreaSaturation += weapon.Range / randomInteger(50);
                                break;
                        }
                    }
            }
            
        }
        //add the numerical qualities to the weapons
        if(weapon.Blast >= 0){
            weapon.Qualities += GetLink("Blast") + "(" + weapon.Blast.toString() + "), ";
        }
        if(weapon.Claws >= 0){
            weapon.Qualities += GetLink("Claws") + "(" + weapon.Claws.toString() + "), ";
        }
        if(weapon.Concussive >= 0){
            weapon.Qualities += GetLink("Concussive") + "(" + weapon.Concussive.toString() + "), ";
        }
        if(weapon.Crippling >= 0){
            weapon.Qualities += GetLink("Crippling") + "(" + weapon.Crippling.toString() + "), ";
        }
        if(weapon.Devastating >= 0){
            weapon.Qualities += GetLink("Devastating") + "(" + weapon.Devastating.toString() + "), ";
        }
        if(weapon.Felling >= 0){
            weapon.Qualities += GetLink("Felling") + "(" + weapon.Felling.toString() + "), ";
        }
        if(weapon.Hallucinogenic >= 0){
            weapon.Qualities += GetLink("Hallucinogenic") + "(" + weapon.Hallucinogenic.toString() + "), ";
        }
        if(weapon.Haywire >= 0){
            weapon.Qualities += GetLink("Haywire") + "(" + weapon.Haywire.toString() + "), ";
        }
        if(weapon.Proven >= 0){
            weapon.Qualities += GetLink("Proven") + "(" + weapon.Proven.toString() + "), ";
        }
        if(weapon.Smoke >= 0){
            weapon.Qualities += GetLink("Smoke") + "(" + weapon.Smoke.toString() + "), ";
        }
        if(weapon.Toxic >= 0){
            weapon.Qualities += GetLink("Toxic") + "(" + weapon.Toxic.toString() + "), ";
        }
        if(weapon.Spray >= 0){
            weapon.Qualities += GetLink("Spray") + "(" + weapon.Spray.toString() + "m), ";
        }
        if(weapon.AreaSaturation >= 0){
            weapon.Qualities += GetLink("Area Saturation") + "(" + weapon.AreaSaturation.toString() + "m), ";
        }
        //prepend any preselected qualities
        weapon.Qualities = qualities + ", " + weapon.Qualities;
        //delete the last comma from the Qualities
        weapon.Qualities = weapon.Qualities.substring(0,weapon.Qualities.length - 2);
        //return all the aspects of the weapon
        return weapon;
    }