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
            answer = answer + (" ".repeat(n-1) + '|' + '\n').repeat(Math.floor(n/3));
            return answer.slice(0,-1);
        }

        $('#tree-input').click(function(){
            var rows = parseInt($("#rows-input").val().trim());
            var decor = $("#symbols-input").val().trim();
            console.log(rows,decor);
            customChristmasTree(rows, decor);
            $("#rows-input").val('');
            $("#symbols-input").val('');
        });

});