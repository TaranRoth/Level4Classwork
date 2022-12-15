const ORGANISM_LIST = ["Air;None;None", "Earth;None;None", "Fire;None;None", "Water;None;None", "Alcohol;Fire;Water", "Dust;Air;Earth", "Energy;Air;Fire", "Lava;Earth;Fire", "Swamp;Earth;Water", "Mud;Dust;Water", "Life;Energy;Swamp", "Bacteria;Life;Swamp", "Fire Elemental;Fire;Life", "Stone;Air;Lava", "Metal;Stone;Fire", "Electricity;Energy;Metal", "Oxygen;Water;Electricity"];
const ORGANISM_OFFSET = 4;
const NAME = 0, PARENT_1 = 1, PARENT_2 = 2;
const NONE = "None";
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

    outBox = document.getElementById("outbox");
    foodSelectionBox = document.getElementById("foodsell");
    duplicatesBox = document.getElementById("dupes");
    countBox = document.getElementById("count");

    foodList = ["Pizza", "Hamburger", "Sushi", "Guacamole", "Salmon", "Hamburger", "Guacamole", "Hamburger", "Salmon", "Sushi", "Guacamole", "Guacamole", "Hamburger", "Sushi"];
    dupesList = [];
    dupesCount = 0;

    display();
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
        arrayOutput.innerHTML += i + ": " + randomList[i] + "<br />";
    }
}

function display() {
    outBox.innerHTML = "0: " + foodList[0];
    for (var i = 1; i < foodList.length; i++) {
        outBox.innerHTML += "<br />" + i + ": " + foodList[i];
    }
    duplicatesBox.innerHTML = dupesList;
    countBox.innerHTML = dupesCount;
}

function addFood() {
    foodList.push(foodSelectionBox.value);
    display();
}

function countDuplicates(array, itm) {
    var itmCount = 0;

    for (var i = 0; i < array.length; i++) {
        if (itm == array[i]) itmCount++;
    }

    return itmCount;
}

function indexesOf(array, itm) {
    var idxList = [];
    for (var i = 0; i < array.length; i++) if (itm == array[i]) idxList.push(i);
    return idxList;
}

function getDupeList() {
    dupesList = indexesOf(foodList, foodSelectionBox.value);
    display();
}

function getDupeCount() {
    dupesCount = countDuplicates(foodList, foodSelectionBox.value);
    display();
}

function getOrganismData(organism, idx) {
    return organism.split(";")[idx];
}

function areParents(organism, parent1, parent2) {
    var firstParent = getOrganismData(organism, PARENT_1);
    var secondParent = getOrganismData(organism, PARENT_2);
    var parent1 = getOrganismData(parent1, NAME);
    var parent2 = getOrganismData(parent2, NAME);
    if (firstParent == parent1 || secondParent == parent1) {
        if (firstParent == parent2 || secondParent == parent1) {
            return true;
        }
    }

    return false;
}
