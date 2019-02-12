$(document).ready(function(){
    //Battle Ships
    function damagedOrSunk (board, attack){
        var answer = { sunk : 0, damaged: 0, notTouched: 0, points: 0 };


        function Boat(num, length) {
            this.num = num;
            this.length = length;
            this.hits = 0;
            this.checkHit = function() {
                var hitSpace = board[board.length-attack[1]][attack[0]-1];
                console.log(hitSpace);
                if (hitSpace===num) {
                    this.length--;
                    this.hits++;
                    if (this.length===0) {
                        answer.sunk++
                        answer.points++
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

    var board = [ [0, 0, 0, 2, 0, 0], 
                  [3, 0, 1, 0, 2, 0],
                  [0, 3, 1, 0, 0, 2],
                  [0, 0, 1, 0, 0, 0] ];
        
    var attack = [3, 1];
    //console.log(damagedOrSunk(board, attack), "{ sunk: 1, damaged: 0 , notTouched: 0, points: 1 }");

    function Square(x, y) {
        this.x = x;
        this.y = y;
        this.show = true;
        this.val = 0;
        this.current = function() {
            if (this.show) {
                drawSquare(this.x, this.y, this.val);
            }
        }
    }

    function Game(board) {
        this.board = board;
        this.createBoard = function() {
            for (var row=0; row<board.length; row++) {
                for (var square=0; square<board[row].length; square++) {
                    let position = new Square(row, square);
                    position.val = board[row][square];
                    position.current();
                }
            }
        }
    }

    function drawSquare(posx, posy, val) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        if (val===1) {
            ctx.fillStyle = 'green';
        }
        else if (val===2) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = 'yellow';
        }
        var x = 50 + (posx*50);
        var y = 50 + (posy*50);
        ctx.fillRect(x, y, 50, 50);
    } 

    let temp = new Game(board);
    console.log(temp);
    temp.createBoard();

    // var canvas = document.getElementById("myCanvas");
    // var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#0077be";
    // ctx.fillRect(50, 50, 300, 200);

    var drawGrid = function(w, h) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = w;
        ctx.canvas.height = h;    
    
        for (x=0;x<=w;x+=50) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();            
        }
        for (y=0;y<=h;y+=50) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // var canvas = document.getElementById("myCanvas");
        // var ctx = canvas.getContext("2d");
        //console.log(ctx);
        ctx.fillStyle = "black";
        ctx.font = "35px Arial Black";
        ctx.fillText("A", 60, 40);
        ctx.fillText("B", 110, 40);
        ctx.fillText("C", 160, 40);
        ctx.fillText("D", 210, 40);
        ctx.fillText("E", 260, 40);
        ctx.fillText("F", 310, 40);
        ctx.fillText("1", 10, 90);
        ctx.fillText("2", 10, 140);
        ctx.fillText("3", 10, 190);
        ctx.fillText("4", 10, 240);
    };

    
    drawGrid(350, 250);

    
});
