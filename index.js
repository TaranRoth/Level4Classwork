const INVALID_CHARS = "<>@#*";

function init() {
    logOutputBox = document.getElementById("logoutput");
    logFormObject = document.getElementById("logform");
    log = "Log --";

    arrayOutput = document.getElementById("divout");

    randomList = [];

    var randomLength = getRandomInteger(50, 100);   

    for (var i = 0; i < randomLength; i++) {
        randomList[randomList.length] = getRandomInteger(-10, 10);
    }

    displayList();
}

function addMessage(msg) {
    /*
    if (isValid(msg)) log += "<br />" + msg;
    else log += "<br />Invalid Message Entered!";
    */

    log += "<br />" + validate(msg);
    display();
}

function display() {
    logOutputBox.innerHTML = log;
}

function isValid(msg) {
    for (var i = 0; i < INVALID_CHARS.length; i++) {
        if (msg.indexOf(INVALID_CHARS.charAt(i)) >= 0) return false;
    }
    return true;
}

function validate(msg) {
    for (var i = 0; i < INVALID_CHARS.length; i++) {
        var charIdx = msg.indexOf(INVALID_CHARS.charAt(i));
        while (charIdx >= 0 ) {
            msg = msg.substring(0, charIdx) + msg.substring(charIdx + 1);
            charIdx = msg.indexOf(INVALID_CHARS.charAt());
        }
    }

    return msg;
}

function displayList() {
    arrayOutput.innerHTML = "";

    for (var i = 0; i < randomList.length; i++) {
        arrayOutput.innerHTML += i + ": " randomList[i] + "<br />";
    }
}
