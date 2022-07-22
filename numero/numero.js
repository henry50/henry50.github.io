var inputRow;
var inputCol;
var allowInput = true;
var inputVal;
var answer;

function getRandomInt(min, max) {
    // Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAnswer(){
    result = [];
    for(i=0; i < 5; i++){
        result.push(getRandomInt(0, 9));
    }
    return result;
}

function initGame(){
    inputVal = [];
    answer = generateAnswer();
    inputRow = 1;
    inputCol = 1;
}

function inputValue(num){
    // Check the row is not full and input is not blocked
    if(inputCol <= 5 && allowInput){
        // Convert string to int
        value = parseInt(num);
        // Check if value parsed successfully
        if(!isNaN(value)){
            // Add to value array
            inputVal.push(value);
            // Show text in relevant box
            $(".col-"+inputRow+inputCol).text(value);
            inputCol++;
        }
    }
}

function inputDelete(){
    // Check row isn't empty
    if(inputCol != 1 && allowInput){
        inputCol--;
        // Remove num from array
        inputVal.pop();
        // Delete text in relevant box
        $(".col-"+inputRow+inputCol).text("");
    }
}

function inputOk(){
    if(inputCol > 5 && allowInput){
        allowInput = false; // Stop accepting input while calculating/showing result
        var result = calulcateMatches(inputVal);
        var matches = result.matches;
        var solved = result.solved;
        for(i=0;i<5;i++){
            var elem = $(".col-"+inputRow+(i+1));
            switch(matches[i]){
                case 0: // No match
                    elem.css("background-color", "grey");
                    break;
                case 1: // Partial match
                    elem.css("background-color", "#EAAA00");
                    break;
                case 2: // Exact match
                    elem.css("background-color", "green");
                    break;
            }
        }
        // Show message if solved
        if(solved){
            gameOver(true);
        } else if (inputRow < 6){
            // If the end has not been reached,
            // go to the next row and accept input again
            inputVal = [];
            inputCol = 1;
            inputRow++;
            allowInput = true;
        } else{
            gameOver(false);
        }
    }
}

function gameOver(success){
    if(success){
        if(inputRow == 1){
            score = inputRow + " guess";
        } else{
            score = inputRow + " guesses";
        }
        $(".finish-title").text("Well done!");
        $(".finish-score").html("You solved numero in <strong>" + score + "</strong>!");
    } else{
        $(".finish-title").text("Better luck next time!");
        $(".finish-score").html("The answer was <strong>" + answer.join("") + "</strong>.");
    }
    $(".finish-modal-background").show();
    $(".finish-modal").show();
    $(".topright-button").show();
}

function calulcateMatches(guess){
    // 0 - No match
    // 1 - Partial
    // 2 - Exact
    var result = [0,0,0,0,0];
    var nonExact = [];
    // Look for exact matches
    for(i=0; i<5; i++){
        if(guess[i] == answer[i]){
            result[i] = 2;
        } else{
            // Store non-exact matches for partial matching
            nonExact.push(answer[i]);
        }
    }
    // If there are no non-exact matches the puzzle is solved
    if(nonExact.length != 0){
        // Look for partial matches
        var currentPos;
        for(i=0; i<5; i++){
            currentPos = guess[i];
            // If there is not an exact match in this position
            if(result[i] != 2){
                if(nonExact.includes(currentPos)){
                    // Store partial match
                    result[i] = 1;
                    // Remove from non exacts
                    nonExact.splice(nonExact.indexOf(currentPos), 1);
                }
            }
        }
    } else{
        return {"matches":result, "solved":true};
    }
    return {"matches":result, "solved":false};
}

$(document).ready(function(){
    // Initialise game
    initGame();
    // Keyboard bindings
    document.onkeydown = function(e) {
        if(/[0-9]/.test(e.key)){
            inputValue(e.key);
        } else if(e.key == "Backspace"){
            inputDelete();
            e.preventDefault();
        } else if(e.key == "Enter"){
            inputOk();
            e.preventDefault();
        }
    };
    // Button bindings
    $(".input-value").click(function(){
        inputValue($(this).data("value"));
    });
    $(".input-del").click(inputDelete);
    $(".input-ok").click(inputOk);
    $(".replay-button").click(function(){
        window.location.reload(); // I can't be bothered to do it manually.
    });
    $(".finish-close").click(function(){
        $(".finish-modal-background").hide();
        $(".finish-modal").hide();
    });
});