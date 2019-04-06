$(document).ready(function(){

    //function which draws the tree and displays it
    function customChristmasTree(chars,n){
        var answer = "";
        var charsIndex = 0;
        for (var i=0; i<n; i++) {
            answer = answer + " ".repeat(n-i-1);
            var charsStr = "";
            while (charsStr.length < ((i*2)+1)) {
                charsStr = charsStr + chars[charsIndex] + " ";
                charsIndex++;
                if (charsIndex>=chars.length){
                    charsIndex = 0;
                }
            }
            answer = answer + charsStr.slice(0, -1) + '\n';
        }
        answer = answer + (" ".repeat(n-1) + '|' + '\n').repeat(Math.floor(n/4));
        console.log(answer.slice(0,-1));
        $("#result").append(answer.slice(0,-1));
    }

    //Error handling and button click functioning
    $('#tree-input').click(function(){
        $("#result").empty();
        console.log($("#rows-input").val());
        if (Number.isInteger(Math.abs(Math.floor(parseInt($("#rows-input").val().trim()))))) {
            var rows = Math.abs(Math.floor(parseInt($("#rows-input").val().trim())));
            var decor = $("#symbols-input").val().trim();
            if (rows<34 && decor!=="") {
                customChristmasTree(decor, rows);
            }
            else {
                displayModal("Please enter an integer from 3 to 33 for the number of rows and some characters for decoration.")
            } 
        }
        else {
            displayModal("Please enter an integer for the number of rows.")
        }        
        $("#rows-input").val('');
        $("#symbols-input").val('');
    });

    //error-handling modal function
    function displayModal(text) {
        $("#modal-caption").html("<h3>" + text + "</h3>");
        $("#restart-button").show();
        $("#myModal").show();
    }

    // Get the element that closes the modal
    var closeButton = document.getElementById("close");

    // When the user clicks on closeButton, close the modal
    closeButton.onclick = function() {
        $("#myModal").hide();
    }

});