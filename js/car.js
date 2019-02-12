$(document).ready(function(){
    //Build a Car
    function Car(length, doors) {  
        //console.log(length, doors);
        if (length<7) {
            alert("We cannot build that small car.");
            throw "We cannot build that small car.";
        }
        else if (doors<1) {
            alert("We cannot enter a doorless car.");
            throw "We cannot enter a doorless car.";
        }
        else if (((length-3)/doors)<2) {
            alert("We cannot fit that many doors in that car.");
            throw "We cannot fit that many doors in that car.";
        }
        else {
            this.length = length;
            this.doors = doors;
            this.middle = (length<14 ? (length-5) : length%2===0 ? 5:6);
            this.frontAxle = (length<14) ? 1 : (Math.floor((length-14)/4) + 2);
            this.rearAxle = (length<12) ? 1 : (Math.floor((length-12)/4) + 2);
            this.frontDoors = Math.ceil(doors/2);
            this.rearDoors = Math.floor(doors/2);
            this.body = (length-3)-(doors*2);
            this.top = {
                component : "&nbsp;" + ("_").repeat(this.length-3)
            }
            this.body = {
                component : "\n" + "|" + ("[]").repeat(this.rearDoors) + "&#959;".repeat(this.body) + ("[]").repeat(this.frontDoors) + "\\"
            };
            this.chassis = {
                component : "\n" + ("-o").repeat(this.rearAxle) + ("-").repeat(this.middle) + ("o-").repeat(this.frontAxle) + "'"
            };
        }            
    }

    function testCars(length, doors) {
        var car = new Car(length, doors);
        //var value = car.body.component + car.chassis.component;
        $("#result").empty();
        $("#result").append(car.top.component);
        $("#result").append(car.body.component);
        $("#result").append(car.chassis.component);

    }

    $('#car-input').click(function(){
        var lengthIn = parseInt($("#length-input").val().trim());
        var doorsIn = parseInt($("#doors-input").val().trim());
        testCars(lengthIn,doorsIn);
        $("#length-input").val('');
        $("#doors-input").val('');
    });

});
