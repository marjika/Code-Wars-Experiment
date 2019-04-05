$(document).ready(function(){

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
            //return answer.slice(0,-1);
        }

        $('#tree-input').click(function(){
            $("#result").empty();
            console.log($("#rows-input").val());
            if (Number.isInteger(Math.abs(Math.floor(parseInt($("#rows-input").val().trim()))))) {
                var rows = Math.abs(Math.floor(parseInt($("#rows-input").val().trim())));
                var decor = $("#symbols-input").val().trim();
                console.log(rows,decor);
                customChristmasTree(decor, rows);
                console.log(rows);
            }
            else {
                alert("Please enter an integer for the number of rows.")
            }        
            $("#rows-input").val('');
            $("#symbols-input").val('');
        });

});