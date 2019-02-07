$(document).ready(function(){
//Battle Ships
function damagedOrSunk (board, attacks){
    var answer = { sunk : 0, damaged: 0, notTouched: 0, points: 0 };
    function Boat(num, length) {
        this.num = num;
        this.length = length;
        this.hits = 0;
        this.checkHit = function() {
            for (var a = 0; a<attacks.length; a++) {
                var hitSpace = board[board.length-attacks[a][1]][attacks[a][0]-1];
                console.log(hitSpace);
                if (hitSpace===num) {
                    this.length--;
                    this.hits++;
                    if (this.length===0) {
                        answer.sunk++
                        answer.points++
                    }
                }
            }
            if (this.hits===0) {
                answer.points--;
                answer.notTouched++;
            }
            else if (this.hits>0 && this.length>0) {
                answer.points+=.5;
                answer.damaged++;
            }
        }
    }
    var boatArr = [0,0,0]

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j]===1) {
                boatArr[0]++;
            }
            else if (board[i][j]===2) {
                boatArr[1]++;
            }
            else if (board[i][j]===3) {
                boatArr[2]++;
            }
        }
    }

    for (var b = 0; b<boatArr.length; b++) {
        if (boatArr[b]>0) {
            let boat = new Boat((b+1), boatArr[b]);
            boat.checkHit();
        }
    }            
    return answer;
}

var board = [ [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0] ];
    
var attacks = [[3, 1], [3, 2], [3, 3]];
//console.log(damagedOrSunk(board, attacks), "{ sunk: 1, damaged: 0 , notTouched: 0, points: 1 }");

//Build a Car
function Car(length, doors) {  
    //console.log(length, doors);
    if (length<7) {
        throw "We cannot build that small car.";
    }
    else if (doors<1) {
        throw "We cannot enter a doorless car.";
    }
    else if (((length-3)/doors)<2) {
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
            component : " " + ("_").repeat(length-3)
        }
        this.body = {
            component : "|" + ("[]").repeat(this.rearDoors) + (" ").repeat(this.body) + ("[]").repeat(this.frontDoors) + "\\"
        };
        this.chassis = {
            component : ("-o").repeat(this.rearAxle) + ("-").repeat(this.middle) + ("o-").repeat(this.frontAxle) + "'"
        };
    }            
}

function testCars(length, doors) {
    var car = new Car(length, doors);
    var canvas = document.getElementById("result");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    //var value = car.body.component + "<br>" + car.chassis.component;
    ctx.fillText(car.top.component, 90, 50);
    ctx.fillText(car.body.component, 90, 82);
    ctx.fillText(car.chassis.component, 90, 110);

    //var value = car.body.component + car.chassis.component;
    // $("#result").empty();
    // $("#result").append("<div>" + car.top.component  + "</div>");
    // $("#result").append("<div>" + car.body.component  + "</div>");
    // $("#result").append("<div>" + car.chassis.component  + "</div>");

}



// function updateResult(result) {
//     $("#result").empty();
//     $("#result").append(result);
//     console.log("here: " + element);

//     if (element) {
//         element.innerText = result;
//         console.log("here: " + element);

//     }
// }

testCars(15,3);

//console.log(testCars(7,1));

});
