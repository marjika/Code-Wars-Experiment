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
        }
        else {
            this.nowRolling = player2;
            dialogue = "Player 2 ";
        }
        this.nowRolling.move(die1 + die2);

        if (die1!==die2 || this.nowRolling.position===100) {
            this.player1Turn = !this.player1Turn;
        }  
        if (gameover===true) {
            return "Game over!";
        } 
        else if (player1.position!==100 && player2.position!==100) {
            return (dialogue + "is on square " + this.nowRolling.position);
        }    
        else if (this.nowRolling.position===100) {
            gameover=true;
            return (dialogue + "Wins!");
        } 
      
    }
};