//styling, dice don't roll on gameover

$(document).ready(function(){

        board = [[2,38],[7,14],[8,31],[15,26],[21,42],[28,84],[36,44],[51,67],[71,91],[78,98],[87,94],[16,6],[46,25],[49,11],[62,19],[64,60],[74,53],[89,68],[92,88],[95,75],[99,80]];
                
        function Player(board) {
            this.position = 0;
            this.drawPlayer = function(ctx, val) {
                var x; var y;
                if (val===1) {
                    ctx.fillStyle = '#0d1800';
                }
                else if (val===2) {
                    ctx.fillStyle = '#cd3ed7';
                }
                if (this.position<1) {
                    y=-50;
                    x=-50;
                }
                else if (this.position>0 && this.position<11) {
                    y=535.8;
                    x=28.2 + (56.4*(this.position-1));
                }
                else if (this.position>10&&this.position<21) {
                    y=479.4;
                    x=535.8-(56.4*(this.position-11));
                }
                else if (this.position>20 && this.position<31) {
                    y=423;
                    x=28.2 + (56.4*(this.position-21));
                }
                else if (this.position>30 && this.position<41) {
                    y=366.6;
                    x=535.8-(56.4*(this.position-31));
                }
                else if (this.position>40 && this.position<51) {
                    y=310.2;
                    x=28.2 + (56.4*(this.position-41));
                }
                else if (this.position>50 && this.position<61) {
                    y=253.8;
                    x=535.8-(56.4*(this.position-51));
                }
                else if (this.position>60 && this.position<71) {
                    y=197.4;
                    x=28.2 + (56.4*(this.position-61));
                }
                else if (this.position>70 && this.position<81) {
                    y=141;
                    x=535.8-(56.4*(this.position-71));
                }
                else if (this.position>80 && this.position<91) {
                    y=84.6;
                    x=28.2 + (56.4*(this.position-81));
                }
                else if (this.position>90 && this.position<101) {
                    y=28.2;
                    x=535.8-(56.4*(this.position-91));
                }
                if (val===1) {
                    y=y-5;
                }
                if (val===2) {
                    y=y+5;
                }
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, 2 * Math.PI);
                ctx.fill();
            }

            this.move =function(roll) {
                if (this.position+roll<100) {
                    this.position = this.position+roll; 
                }
                // else if (this.position+roll>100) {
                //     var backSpace = this.position+roll-100;
                //     this.position = 100-backSpace;
                // }
                else if (this.position+roll>=100) {
                    this.position = 100;
                    gameOver();
                }

            }
            this.checkBoard = function(board, dialogue) {
                
                for (var i= 0; i<board.length; i++) {
                    if (this.position===board[i][0]) {
                        this.position=board[i][1];
                        if (i<=10) {
                            $("#roll-jump").html("<p>Wow! " + dialogue + " found a ladder.</p>");
                        }
                        else if (i>10) {
                            $("#roll-jump").html("<p>Oops! " + dialogue + " landed on a snake.</p>");
                        }
                    }
                }
            }
        }

        function playGame() {
            
            this.player1 = new Player(board);
            this.player2 = new Player(board);
            this.player1Turn = true;
            this.gameover = false;
            this.play= function(die1, die2) {
            
                var dialogue = "";
                if (this.player1Turn) {
                    this.nowRolling = this.player1;
                    dialogue = "Player 1 ";
                }
                else {
                    this.nowRolling = this.player2;
                    if (!computer) {
                        dialogue = "Player 2 ";
                    }
                    else {
                        dialogue = "Computer ";
                    }
                }

                function movingPiece(obj) {
                    var moving=0;
                    var myVar = setInterval(frame, 400);
                    
                    function frame() {
                        console.log(moving, die1+die2);
                        if (obj.nowRolling.position>=100 || moving>=(die1 + die2)) {
                            clearInterval(myVar);
                            obj.nowRolling.checkBoard(board, dialogue);
                            obj.drawBoard();
                            playerInfo(obj);
                            console.log("end of movement, computer player on: " + computer);
                            if (computer && (dialogue === "Player 1 ") && (die1!==die2)) {
                                console.log("check computer, player one turn: " + obj.player1Turn);
                                setTimeout(function(){ checkTurn(); }, 1500);
                            }
                            else if (computer && (dialogue === "Computer ") && (die1===die2)) {
                                console.log("check computer, player one turn: " + obj.player1Turn);
                                setTimeout(function(){ checkTurn(); }, 1500);
                            }
                        }
                        else {
                            obj.nowRolling.move(1);
                            obj.drawBoard();
                            moving++;
                            
                        }
                    }
                }

                movingPiece(this);
                
                function playerInfo(obj) {
                    if (die1!==die2 || obj.nowRolling.position===100) {
                        obj.player1Turn = !obj.player1Turn;
                        if (dialogue === "Player 1 ") {
                            $("#player-id").empty();
                            $("#player-id").append("<span>2<span>");
                        }
                        else if ((dialogue === "Player 2 ") || (dialogue === "Computer ")) {
                            $("#player-id").empty();
                            $("#player-id").append("<span>1</span>");
                        }
                    }  
                    if (obj.gameover===true) {
                        $("#roll-message").html("<p>Game over!</p>");
                    } 
                    else if (obj.player1.position!==100 && obj.player2.position!==100) {
                        $("#roll-message").html("<p>" + dialogue + "is on square " + obj.nowRolling.position + "</p>");
                    
                    }    
                    else if (obj.nowRolling.position===100) {
                        obj.gameover=true;
                        $("#roll-message").html("<p>" + dialogue + "Wins!</p>");
                    } 
                }
            }
            this.drawBoard = function() {
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, 564, 564);
                this.player1.drawPlayer(ctx, 1);
                this.player2.drawPlayer(ctx, 2);
            }
        }

    let game = new playGame();          
    var computer = false;
    game.drawBoard();

    function gameOver() {
        $("#roll").off('click');
        $("#roll-result").html("<p>&nbsp;</p>");
    }

    function diceRoll() {
        $("#roll-result").html("<p>&nbsp;</p>");
        $("#roll-jump").html("<p>&nbsp;</p>");
        var diceOne;
        var diceTwo;

        function rollResult() {
            diceOne = Math.floor(Math.random() * 6) + 1;
            diceTwo = Math.floor(Math.random() * 6) + 1;
            
            $("#roll-result").html("<p>Roll result: "+ diceOne + " and " + diceTwo + ".</p>");
            game.play(diceOne, diceTwo);
        }
        setTimeout(function(){ rollResult(); }, 800);        
    }

    function checkTurn() {
        if (!game.gameover) {
            console.log("computer player rolls");
            diceRoll();
        };
    }

    $("#roll").on('click', function() { diceRoll() } );

    $(".replay-button").click(function() {
        $("#roll").off('click');
        $("#roll-result").html("<p>&nbsp;</p>");
        $("#roll-jump").html("<p>&nbsp;</p>");
        $("#roll-message").html("<p>&nbsp;</p>");
        $("#player-id").empty();
        $("#player-id").append("<span>1</span>");
        for (var item in game) delete game[item];
        computer = false;
        $("#computerPlayer").html("<div>One Player__</div>");
        game = new playGame();
        game.drawBoard();
        $("#roll").on('click',  function() { diceRoll() } );
    });

    $("#computerPlayer").click(function() {
        computer = !computer;
        console.log(computer);
        if (computer===true) {
            $("#computerPlayer").html("<div>One Player✔</div>");
        }
        else if (computer===false) {
            $("#computerPlayer").html("<div>One Player__</div>");
        }
    });

    $("#directions").click(function(){
        $('.hover_bkgr_fricc').show();
     });
     $('.hover_bkgr_fricc').click(function(){
         $('.hover_bkgr_fricc').hide();
     });
     $('.popupCloseButton').click(function(){
         $('.hover_bkgr_fricc').hide();
     });

});