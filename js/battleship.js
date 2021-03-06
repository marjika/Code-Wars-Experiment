$(document).ready(function(){
    //Battle Ships
     var stats = { hits : 0, misses: 0, sunk: 0, score: 0 };

     var temp;
            
     var boardList = [ [ [0, 0, 0, 2, 0, 0], [3, 0, 1, 0, 2, 0], [0, 3, 1, 0, 0, 2], [0, 0, 1, 0, 0, 0] ],
                       [ [3, 0, 0, 2, 2, 2], [3, 0, 0, 1, 0, 0], [3, 0, 0, 0, 1, 0], [3, 0, 0, 0, 0, 1] ],
                       [ [0, 1, 2, 0, 0, 0], [0, 1, 0, 2, 0, 0], [0, 1, 0, 0, 2, 0], [0, 0, 3, 3, 0, 2] ],
                       [ [0, 0, 0, 3, 0, 0], [0, 0, 3, 1, 1, 1], [0, 3, 0, 0, 2, 0], [3, 0, 0, 0, 2, 0] ],
                       [ [0, 0, 0, 0, 0, 0], [0, 0, 2, 1, 1, 1], [0, 0, 0, 2, 0, 0], [0, 0, 3, 3, 2, 0] ],
                       [ [0, 0, 0, 0, 1, 0], [0, 3, 3, 3, 3, 1], [0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 0] ],
                       [ [0, 0, 0, 0, 3, 0], [0, 0, 0, 3, 1, 0], [0, 0, 3, 2, 1, 0], [0, 3, 0, 2, 1, 0] ],
                       [ [0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [0, 1, 3, 3, 3, 3], [2, 2, 1, 0, 0, 0] ],
                       [ [0, 3, 0, 0, 1, 0], [0, 3, 2, 0, 1, 0], [0, 0, 0, 2, 1, 0], [0, 0, 0, 0, 2, 0] ],
                       [ [3, 0, 0, 0, 1, 0], [0, 3, 0, 0, 1, 0], [0, 0, 3, 0, 1, 0], [2, 2, 2, 0, 1, 0] ], ];

     
     var boards = [...boardList];
     var index = Math.floor(Math.random() * (boards.length));
     var board = boards[index];

        var boatArr = [[0, []], [0, []], [0, []]];

        //making boat array to check hits and score
        function createBoatArr() {
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j]===1) {
                        boatArr[0][0]++;
                        boatArr[0][1].push([j,i]);

                    }
                    else if (board[i][j]===2) {
                        boatArr[1][0]++;
                        boatArr[1][1].push([j,i]);
                    }
                    else if (board[i][j]===3) {
                        boatArr[2][0]++;
                        boatArr[2][1].push([j,i]);
                    }
                }
            }
        }

        //changes color of stats navbar when user sinks a ship
        function animate(){
            $("#stats-navbar").css('background-color', '#f78e1e');
            setTimeout(function(){ 
                $('#stats-navbar').css('background-color', '#333');
            }, 2000);
            console.log("animate ran");
        }
            
        //checks to see if hit is in boat array to calulate sunk
        function checkSunk([x,y]) {
            for (var b = 0; b<boatArr.length; b++) {
                for (var coord = 0; coord < boatArr[b][1].length; coord++) {
                    if (boatArr[b][1][coord][0]===x && boatArr[b][1][coord][1]===y) {
                        boatArr[b][0]--;
                        if (boatArr[b][0]===0) {
                            stats.sunk++;
                            animate();
                            $("#ships-sunk").html("<p>Sunk: " + stats.sunk + "</p>");
                            if (stats.sunk>=3) {
                                displayModal("You win!", true);
                            }
                        }
                    }
                }
            }
        }

        function calculateScore() {
            return (stats.hits - (stats.misses/2) + (stats.sunk*5));
        }
        
    //class for each individual square
    function Square(x, y) {
        this.x = x;
        this.y = y;
        this.show = false;
        this.val = 0;
        this.current = function() {
            if (this.show && this.val!==0) {
                drawSquare(this.x, this.y, this.val);
            }
            else if (this.show && this.val===0) {
                drawMiss(this.x, this.y);
            }
        }
    }

    //class for game creation and canvas draw
    function Game(board) {
        this.board = [];

        this.createBoard = function() {
            for (var row=0; row<board.length; row++) {
                for (var square=0; square<board[row].length; square++) {
                    let position = new Square(square, row);
                    position.val = board[row][square];
                    this.board.push(position);
                    position.current();
                }
            }
        }
        this.clearCanvas = function() {
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 350, 250);
        }
        this.redrawBoard = function() {
            drawGrid(350, 250);
            for (var pos=0; pos<this.board.length; pos++) {
                this.board[pos].current();
            }
        }
    }

    //class for play of actual game
    function Play(board) {
        this.game = new Game(board);
        this.checkHit = function(hit) {
            for (var pos=0; pos<this.game.board.length; pos++) {
                if (this.game.board[pos].x===hit[0] && this.game.board[pos].y===hit[1]) {
                    this.game.board[pos].show = true;
                }
            }
            checkStats();
        }
    }

    //draws the square for a hit
    function drawSquare(posx, posy, val) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        if (val===1) {
            ctx.fillStyle = '#AED9DA';
        }
        else if (val===2) {
            ctx.fillStyle = '#EDFAFD';
        }
        else {
            ctx.fillStyle = '#355155';
        }
        var x = 50 + (posx*50);
        var y = 50 + (posy*50);
        ctx.fillRect(x, y, 50, 50);
    } 

    //draws a square for a miss
    function drawMiss(posx, posy) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        var x = 55 + (posx*50);
        var y = 80 + (posy*50);
        ctx.fillStyle = "white";
        ctx.font = "15px Arial";
        ctx.fillText("MISS", x, y);
    }

    //clears and draws the board
    var drawGrid = function(w, h) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
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

    //creates and starts a new game
    function startGame() {
        boards.splice(index, 1);
        if (boards<1) {
            boards = [...boardList];
        }
        console.log(board);
        temp = new Play(board);
        createBoatArr();
        drawGrid(350, 250);
        temp.game.createBoard();
    }

    //when user enters a coordinate, error handling
    $('#hit-input').click(function(){
        if ($("#X-input").val()!==null && $("#Y-input").val()!==null) {
            var letterInput = ($("#X-input").val().trim()).toUpperCase();
            var xCoord=0;
            if (letterInput==="A") {
                xCoord = 0;
            }
            else if (letterInput==="B") {
                xCoord = 1;
            }
            else if (letterInput==="C") {
                xCoord = 2;
            }
            else if (letterInput==="D") {
                xCoord = 3;
            }
            else if (letterInput==="E") {
                xCoord = 4;
            }
            else if (letterInput==="F") {
                xCoord = 5;
            }
            else {
                displayModal("Please enter coodinates of a letter (A,B,C,D,E,F) and number (1,2,3,4)", false);            
            }
            var yCoord = (parseInt($("#Y-input").val().trim())-1);
            if (yCoord>3 || yCoord<0) {
                displayModal("Please enter coodinates of a letter (A,B,C,D,E,F) and number (1,2,3,4)", false);
            }
            temp.checkHit([xCoord, yCoord]);
            checkSunk([xCoord, yCoord]);
            temp.game.clearCanvas();
            temp.game.redrawBoard();
        }
        else {
            displayModal("Please enter a value for both coordinates.", false);
        }
        $("#X-input").val('Choose a letter');
        $("#Y-input").val('Choose a number');
    });

    //displays hits and misses
    function checkStats() {
        stats.misses = 0;
        stats.hits = 0;
        for (var pos=0; pos<temp.game.board.length; pos++) {
            if (temp.game.board[pos].show===true && temp.game.board[pos].val===0) {
               stats.misses++
               if (stats.misses>=8) {
                    displayModal("You lose!", true);
                }
            }
            else if (temp.game.board[pos].show===true && temp.game.board[pos].val>0) {
                stats.hits++
            }
       }
        $("#hits").html("<p>Hits: " + stats.hits + "</p>");
        $("#misses").html("<p>Misses: " + stats.misses + "</p>");
    }

    // Get the element that closes the modal
    var closeButton = document.getElementById("close");

    // When the user clicks on closeButton, close the modal
    closeButton.onclick = function() {
        $("#myModal").hide();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == $("#myModal")) {
            $("#myModal").hide();
        }
    }

    //displays modal for input error-handling, game win or loss
    function displayModal(text, gameOver) {
        if (!gameOver) {
            $("#modal-caption").html("<p>" + text + "</p>");
            $("#final-score").html("");
            $("#restart-button").hide();
            $("#myModal").show();
        }
        else {
            stats.score = calculateScore();
            $("#modal-caption").html("<p>" + text + "</p>");
            $("#final-score").html("<p>Your score: " + stats.score + "</p>");
            $("#restart-button").show();
            $("#myModal").show();
        }
    }

    //starts a new game
    $('#restart-button').click(function(){
        $("#myModal").hide();
        stats = { hits : 0, misses: 0, sunk: 0, score: 0 };
        $("#hits").html("<p>Hits: 0</p>");
        $("#misses").html("<p>Misses: 0</p>");
        $("#ships-sunk").html("<p>Sunk: 0</p>");
        boatArr = [[0, []], [0, []], [0, []]];
        index = Math.floor(Math.random() * boards.length);
        board = boards[index];
        startGame();
    });

    //modal handling for directions button
    $(".trigger_popup_fricc").click(function(){
        $('.hover_bkgr_fricc').show();
     });
     $('.hover_bkgr_fricc').click(function(){
         $('.hover_bkgr_fricc').hide();
     });
     $('.popupCloseButton').click(function(){
         $('.hover_bkgr_fricc').hide();
     });

    startGame();
  
});
