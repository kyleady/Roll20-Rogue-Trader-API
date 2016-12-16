//Generates a random vehicle for the use of a native Xenos
    this.RandomVehicle = function(type, tech, creature){
        //type is selected outside of this function, the type will determine the weapons, size, movement, and special abilities
        //the possibilities for type are as follows: miniature, light vehicle, transport, heavy vehicle, artillery, fighter, bomber, lander, titan
        
        //tech is selected outside of this function, it 
        //the possibilities for tech range from -3 to 1
        
        //creature is the entire creature object with all of its stats and abilities
        
        //create an object to contain all of the vehicle stats
        vehicle =  {WS: 0, BS:0, S:0, T:0, Ag:0, Wp:0, It:0, Pr:0, Fe:0,
                    Unnatural_WS: 0, Unnatural_BS:0, Unnatural_S:0, Unnatural_T:0, Unnatural_Ag:0, Unnatural_Wp:0, Unnatural_It:0, Unnatural_Pr:0, Unnatural_Fe:0,
                    Weapons: [], 
                    MType: "",
                    TSpeed: 0,
                    AUs: 0,
                    CSpeed: 0,
                    SIntegrity: 0,
                    Size: 0,
                    FArmour: 0, SArmour: 0, RArmour: 0,
                    CarryC: 0,
                    Special: ""};
        
        //use the vehicle type to generate all of its weapons and bonuses
        switch(type){
            case "miniature":
                //store the speed tech modifier
                vehicle.CSpeed = 0;
                //generate a size for the vehicle
                vehicle.Size = creature.Size + 1 - randomInteger(3);
                //generate weapons for the vehicle
                if(randomInteger(2) == 1){
                    vehicle.Weapons[0] = this.RandomWeapon("pistol", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = randomInteger(6);
                } else {
                    vehicle.Weapons[0] = this.RandomWeapon("basic", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = randomInteger(2);
                }
                //note any special abilities
                vehicle.Special += "<strong>Unpiloted</strong>: Ignores Jarring Blow, Staggered, and other pilot targeted effects.<br>";
                break;
            case "light vehicle":
                //store the speed tech modifier
                vehicle.CSpeed = 2;
                //generate a size for the vehicle
                vehicle.Size = creature.Size + randomInteger(2) - 1;
                //generate weapons for the vehicle
                if(randomInteger(3) == 1){
                    vehicle.Weapons[0] = this.RandomWeapon("basic", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = randomInteger(3);
                } else {
                    vehicle.Weapons[0] = this.RandomWeapon("heavy", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = 1;
                }
                //chance for an additional weapon
                if(randomInteger(2) == 1){
                    if(randomInteger(3) > 1){
                        vehicle.Weapons[1] = this.RandomWeapon("basic", tech)
                        //duplicate this weapon a random number of times
                        vehicle.Weapons[1].Num = 1;
                    } else {
                        vehicle.Weapons[1] = this.RandomWeapon("heavy", tech)
                        //duplicate this weapon a random number of times
                        vehicle.Weapons[1].Num = 1;
                    }
                }
                //note any special abilities
                vehicle.Special += "";
                break;
            case "transport":
                //store the speed tech modifier
                vehicle.CSpeed = 1;
                //generate a size for the vehicle
                vehicle.Size = creature.Size + randomInteger(3);
                //generate weapons for the vehicle
                if(randomInteger(3) == 1){
                    vehicle.Weapons[0] = this.RandomWeapon("basic", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = randomInteger(3);
                } else {
                    vehicle.Weapons[0] = this.RandomWeapon("heavy", tech)
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[0].Num = 1;
                }
                //chance for an additional weapon
                if(randomInteger(10) > 1){
                    vehicle.Weapons.push(this.RandomWeapon("basic", tech));
                    //duplicate this weapon a random number of times
                    vehicle.Weapons[1].Num = 1;
                }
                //note any special abilities
                vehicle.Special += "<strong>Carrying Capacity</strong>: Can transport " + (vehicle.Size - creature.Size).toString() + " units.<br>";
                break;
            case "heavy vehicle":
                break;
            case "artillery":
                break;
            case "fighter":
                break;
            case "bomber":
                break;
            case "lander":
                break;
            case "titan":
                break;
        }
        
        //randomly determine movement type
        switch(this.TechRoll(tech-1,10)){
            case 1:  
                vehicle.Movement = "beast";
                break;
            case 2:  
                vehicle.Movement = "chariot";
                break;
            case 3: case 4: case 5:  
                vehicle.Movement = "locomotion";
                break;
            case 6: case 7: case 8:
                vehicle.Movement = "walker";
                break;
            case 9: case 10:
                vehicle.Movement = "skimmer";
                break;
        }
        
        
    }