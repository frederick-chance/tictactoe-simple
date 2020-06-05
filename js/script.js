let board = document.getElementsByClassName("game-board");
let playerX = document.getElementById("player-x");
let playerO = document.getElementById("player-o");

let boardmoves = document.getElementById("game-board-moves");
let playerXmoves = document.getElementById("player-x-moves");
let playerOmoves = document.getElementById("player-o-moves");

let win = ["123", "456", "789", "147", "258", "369", "159", "357"];

let continueGame = true;

for (let square = 0; square < board.length; square++) {
    board[square].addEventListener("click", function () {
        if (isTurnValid(this)) {
            beginTurn();
            markSquare(this);
            endTurn(this);
        }
    });
}

function beginTurn() {
    if (!playerX.checked && !playerO.checked) {
        playerX.checked = true;
    }
}

function markSquare(square) {
    let mark = getPlayerMark();
    square.innerHTML = mark;
}

function endTurn(square) {
    updateBoardMoves(square);
    manageWinCondition();
    updateCurrentPlayer();
}

function updateCurrentPlayer() {
    if (continueGame) {
        if (playerX.checked) {
            playerX.checked = false;
            playerO.checked = true;
        } else {
            playerX.checked = true;
            playerO.checked = false;
        }
    }
}

function manageWinCondition() {
    let potentialWin;

    if (playerX.checked) {
        potentialWin = getWinConditions(playerXmoves);
    } else {
        potentialWin = getWinConditions(playerOmoves);
    }

    if (potentialWin.length > 0) {
        continueGame = false;
        showWinConditions(potentialWin);
        removeHover();
    }
}

function removeHover() {
    while (board.length) {
        board[0].classList.remove("game-board");
    }
}

function showWinConditions(conditions) {
    for (let i = 0; i < conditions.length; i++) {
        let condition = conditions[i];

        for (let j = 0; j < condition.length; j++) {
            highlightSquare(condition[j]);
        }
    }
}

function highlightSquare(id) {
    let square = document.getElementById("square-" + id);
    square.classList.add("winning-square");
}

function getWinConditions(moves) {
    let winConditions = [];

    for (let condition = 0; condition < win.length; condition++) {
        let expression = formatWinCondition(win[condition]);

        if (getWinConditionMatch(moves, expression).length == 3) {
            winConditions.push(getWinConditionMatch(moves, expression));
        }
    }

    return winConditions;
}

function getWinConditionMatch(moves, expression) {
    return Array.from(moves.value.matchAll(expression));
}

function formatWinCondition(condition) {
    return new RegExp("[" + condition + "]", "g");
}

function updateBoardMoves(square) {
    let mark = getPlayerMark();
    let quad = getQuadNumber(square);

    trackAllMoves(mark, quad);
    trackPlayerMoves(quad);
}

function trackAllMoves(mark, quad) {
    boardmoves.value += mark + quad + " ";
}

function trackPlayerMoves(quad) {
    if (playerO.checked) {
        playerOmoves.value += quad;
    } else {
        playerXmoves.value += quad;
    }
}

function isTurnValid(square) {
    return continueGame && square.innerHTML == "";
}

function getPlayerMark() {
    if (playerO.checked) {
        return playerO.value;
    } else {
        return playerX.value;
    }
}

function getQuadNumber(quadrant) {
    return quadrant.dataset.quadrant;
}