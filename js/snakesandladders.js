$(document).ready(function(){

function SnakesLadders() {
    this.board = [[2,38],[7,14],[8,31],[15,26],[21,42],[28,84],[36,44],[51,67],[71,91],[78,98],[87,94],[16,6],[46,25],[49,11],[62,19],[64,60],[74,53],[89,68],[92,88],[95,75],[99,80]];

    function Player(board) {
        this.position = 0;
        this.board=board;
        this.move =function(roll) {
            if (this.position+roll<100) {
                this.position = this.position+roll;
                this.checkBoard(this.board);  
            }
            else if (this.position+roll>100) {
                var backSpace = this.position+roll-100;
                this.position = 100-backSpace;
                this.checkBoard(this.board);
            }
            else if (this.position+roll===100) {
                this.position = this.position+roll;
            }
        }
        this.checkBoard = function(board) {
            
            for (var i= 0; i<board.length; i++) {
                if (this.position===board[i][0]) {
                    this.position=board[i][1];
                }
            }
        }
    }
   
    let player1 = new Player(this.board);
    let player2 = new Player(this.board);
    this.player1Turn = true;
    var gameover = false;
                
    this.play= function(die1, die2) {
        
        var dialogue = "";
        if (this.player1Turn) {
            this.nowRolling = player1;
            dialogue = "Player 1 ";
            //$(".player-id").html("<span>1</span>");
        }
        else {
            this.nowRolling = player2;
            dialogue = "Player 2 ";
            //$(".player-id").html("<span>2<span>");
        }
        this.nowRolling.move(die1 + die2);

        if (die1!==die2 || this.nowRolling.position===100) {
            this.player1Turn = !this.player1Turn;
            // if (!this.player1Turn) {
            //     $(".player-id").html("<span>2<span>");
            // }
            // else {
            //     $(".player-id").html("<span>1</span>");
            // }
        }  
        if (gameover===true) {
            $("#roll-message").html("<p>Game over!</p>");
        } 
        else if (player1.position!==100 && player2.position!==100) {
            $("#roll-message").html("<p>" + dialogue + "is on square " + this.nowRolling.position + "</p>");
            drawPlayer(this.nowRolling.position, dialogue);
            //return (dialogue + "is on square " + this.nowRolling.position);
        }    
        else if (this.nowRolling.position===100) {
            gameover=true;
            $("#roll-message").html("<p>" + dialogue + "Wins!</p>");
        } 
      
    }
};
function drawPlayer(num, val) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 564, 564);
    var ctx = canvas.getContext('2d');
    var x; var y;
    if (val==="Player 1 ") {
        ctx.fillStyle = 'red';
    }
    else if (val==="Player 2 ") {
        ctx.fillStyle = 'blue';
    }
    if (num<11) {
        y=535.8;
        x=28.2 + (56.4*(num-1));
    }
    else if (num>10&&num<21) {
        y=479.4;
        x=535.8-(56.4*(num-11));
    }
    else if (num>20 && num<31) {
        y=423;
        x=28.2 + (56.4*(num-21));
    }
    else if (num>30&&num<41) {
        y=366.6;
        x=535.8-(56.4*(num-31));
    }
    else if (num>40 && num<51) {
        y=310.2;
        x=28.2 + (56.4*(num-41));
    }
    else if (num>50&&num<61) {
        y=253.8;
        x=535.8-(56.4*(num-51));
    }
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
}

let game = new SnakesLadders();
drawPlayer(1, "Player 1 ");
// console.log(game.play(1, 1));
// console.log(game.play(1, 5));
// console.log(game.play(6, 2));
// console.log(game.play(1, 1));

$("#roll").click(function() {
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    $("#roll-result").html("<p>You rolled "+ diceOne + " and " + diceTwo + ".</p>");
    game.play(diceOne, diceTwo);
    
});

});