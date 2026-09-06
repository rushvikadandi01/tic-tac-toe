// ===============================
// TactiXO - Tic Tac Toe
// ===============================


// ===============================
// DOM ELEMENTS
// ===============================

const dashboard = document.getElementById("dashboard");
const gameScreen = document.getElementById("gameScreen");

const boardElement = document.getElementById("board");
const boxes = document.querySelectorAll(".box");

const turnText = document.getElementById("turnText");
const modeText = document.getElementById("modeText");

const winnerPopup = document.getElementById("winnerPopup");
const resultIcon = document.getElementById("resultIcon");
const winnerMessage = document.getElementById("winnerMessage");
const resultDescription = document.getElementById("resultDescription");

const playerModeButton =
    document.getElementById("playerModeButton");

const aiModeButton =
    document.getElementById("aiModeButton");

const resetButton =
    document.getElementById("resetButton");

const headerResetButton =
    document.getElementById("headerResetButton");

const backButton =
    document.getElementById("backButton");

const newGameButton =
    document.getElementById("newGameButton");

const popupDashboardButton =
    document.getElementById("popupDashboardButton");


// ===============================
// GAME VARIABLES
// ===============================

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let turnO = true;

let gameOver = false;

let gameMode = "pvp";

let aiThinking = false;


// ===============================
// WINNING PATTERNS
// ===============================

const winningPatterns = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// ===============================
// START GAME
// ===============================

function startGame(mode) {

    gameMode = mode;

    dashboard.style.display = "none";

    gameScreen.style.display = "flex";

    if (mode === "ai") {

        modeText.textContent = "Player vs AI";

    } else {

        modeText.textContent = "Player vs Player";

    }

    resetGame();
}


// ===============================
// PLAYER MODE BUTTON
// ===============================

playerModeButton.addEventListener("click", () => {

    startGame("pvp");

});


// ===============================
// AI MODE BUTTON
// ===============================

aiModeButton.addEventListener("click", () => {

    startGame("ai");

});


// ===============================
// BOX CLICK
// ===============================

boxes.forEach((box, index) => {

    box.addEventListener("click", () => {

        // Game finished
        if (gameOver) {
            return;
        }

        // AI is currently thinking
        if (aiThinking) {
            return;
        }

        // In AI mode, player is O
        if (gameMode === "ai" && !turnO) {
            return;
        }

        // Already occupied
        if (board[index] !== "") {
            return;
        }


        // ===============================
        // PLAYER MOVE
        // ===============================

        board[index] = turnO ? "O" : "X";

        updateBoard();


        // Check winner
        if (checkWinner()) {
            return;
        }


        // Check draw
        if (isDraw()) {
            return;
        }


        // Change turn
        turnO = !turnO;

        updateTurn();


        // ===============================
        // AI TURN
        // ===============================

        if (gameMode === "ai" && !turnO) {

            aiThinking = true;

            disableBoard();

            turnText.textContent =
                "🤖 AI is thinking...";


            // Small delay for natural gameplay
            setTimeout(() => {

                aiMove();

            }, 150);
        }

    });

});


// ===============================
// UPDATE BOARD
// ===============================

function updateBoard() {

    boxes.forEach((box, index) => {

        box.textContent = board[index];

        box.classList.remove("x", "o");

        if (board[index] === "X") {

            box.classList.add("x");

        }

        if (board[index] === "O") {

            box.classList.add("o");

        }

    });

}


// ===============================
// UPDATE TURN
// ===============================

function updateTurn() {

    if (gameOver) {
        return;
    }


    if (gameMode === "ai") {

        if (turnO) {

            turnText.textContent =
                "⭕ Your Turn";

        } else {

            turnText.textContent =
                "❌ AI's Turn";

        }

    } else {

        if (turnO) {

            turnText.textContent =
                "⭕ Player O's Turn";

        } else {

            turnText.textContent =
                "❌ Player X's Turn";

        }

    }

}


// ===============================
// DISABLE BOARD
// ===============================

function disableBoard() {

    boxes.forEach(box => {

        box.style.pointerEvents = "none";

    });

}


// ===============================
// ENABLE BOARD
// ===============================

function enableBoard() {

    boxes.forEach(box => {

        box.style.pointerEvents = "auto";

    });

}


// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            showWinner(board[a]);

            return true;
        }

    }

    return false;
}


// ===============================
// CHECK DRAW
// ===============================

function isDraw() {

    if (board.every(cell => cell !== "")) {

        showDraw();

        return true;
    }

    return false;
}


// ===============================
// SHOW WINNER
// ===============================

function showWinner(winner) {

    gameOver = true;

    aiThinking = false;


    if (gameMode === "ai") {

        if (winner === "O") {

            resultIcon.textContent = "🎉";

            winnerMessage.textContent =
                "You Win!";

            resultDescription.textContent =
                "Amazing! You defeated the AI.";

        } else {

            resultIcon.textContent = "🤖";

            winnerMessage.textContent =
                "AI Wins!";

            resultDescription.textContent =
                "Good game! Try again and beat the AI.";

        }

    } else {

        resultIcon.textContent = "🏆";

        winnerMessage.textContent =
            `Player ${winner} Wins!`;

        resultDescription.textContent =
            `Congratulations! Player ${winner} won the game.`;

    }


    winnerPopup.style.display = "flex";

    enableBoard();
}


// ===============================
// SHOW DRAW
// ===============================

function showDraw() {

    gameOver = true;

    aiThinking = false;

    resultIcon.textContent = "🤝";

    winnerMessage.textContent =
        "It's a Draw!";

    resultDescription.textContent =
        "No winner this time. Try another game!";

    winnerPopup.style.display = "flex";

    enableBoard();
}


// ===============================
// CLOSE POPUP
// ===============================

function closePopup() {

    winnerPopup.style.display = "none";

}


// ===============================
// RESET GAME
// ===============================

function resetGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    turnO = true;

    gameOver = false;

    aiThinking = false;

    closePopup();

    updateBoard();

    enableBoard();

    updateTurn();

}


// ===============================
// AI MOVE
// ===============================

function aiMove() {

    if (gameOver) {

        aiThinking = false;

        return;
    }


    const bestMove = getBestMove();


    if (bestMove !== -1) {

        board[bestMove] = "X";

        updateBoard();

    }


    aiThinking = false;


    // AI wins
    if (checkWinner()) {

        return;

    }


    // Draw
    if (isDraw()) {

        return;

    }


    // Player's turn
    turnO = true;

    updateTurn();

    enableBoard();

}


// ===============================
// GET BEST AI MOVE
// ===============================

function getBestMove() {

    let bestScore = -Infinity;

    let bestMove = -1;


    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = "X";


            const score = minimax(
                board,
                0,
                false
            );


            board[i] = "";


            if (score > bestScore) {

                bestScore = score;

                bestMove = i;

            }

        }

    }


    return bestMove;
}


// ===============================
// MINIMAX
// ===============================

function minimax(
    currentBoard,
    depth,
    isMaximizing
) {

    const result =
        getGameResult(currentBoard);


    // AI wins
    if (result === "X") {

        return 10 - depth;

    }


    // Player wins
    if (result === "O") {

        return depth - 10;

    }


    // Draw
    if (result === "draw") {

        return 0;

    }


    // ===============================
    // AI MAXIMIZING
    // ===============================

    if (isMaximizing) {

        let bestScore = -Infinity;


        for (
            let i = 0;
            i < currentBoard.length;
            i++
        ) {

            if (currentBoard[i] === "") {

                currentBoard[i] = "X";


                const score = minimax(
                    currentBoard,
                    depth + 1,
                    false
                );


                currentBoard[i] = "";


                bestScore = Math.max(
                    bestScore,
                    score
                );

            }

        }


        return bestScore;

    }


    // ===============================
    // PLAYER MINIMIZING
    // ===============================

    else {

        let bestScore = Infinity;


        for (
            let i = 0;
            i < currentBoard.length;
            i++
        ) {

            if (currentBoard[i] === "") {

                currentBoard[i] = "O";


                const score = minimax(
                    currentBoard,
                    depth + 1,
                    true
                );


                currentBoard[i] = "";


                bestScore = Math.min(
                    bestScore,
                    score
                );

            }

        }


        return bestScore;

    }

}


// ===============================
// GAME RESULT FOR MINIMAX
// ===============================

function getGameResult(currentBoard) {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;


        if (
            currentBoard[a] !== "" &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[b] === currentBoard[c]
        ) {

            return currentBoard[a];

        }

    }


    if (
        currentBoard.every(
            cell => cell !== ""
        )
    ) {

        return "draw";

    }


    return null;

}


// ===============================
// RESET BUTTON
// ===============================

resetButton.addEventListener("click", () => {

    resetGame();

});


// ===============================
// HEADER RESET
// ===============================

headerResetButton.addEventListener("click", () => {

    resetGame();

});


// ===============================
// BACK TO DASHBOARD
// ===============================

backButton.addEventListener("click", () => {

    gameScreen.style.display = "none";

    dashboard.style.display = "flex";

    closePopup();

    resetGame();

});


// ===============================
// NEW GAME
// ===============================

newGameButton.addEventListener("click", () => {

    closePopup();

    resetGame();

});


// ===============================
// POPUP DASHBOARD
// ===============================

popupDashboardButton.addEventListener("click", () => {

    closePopup();

    gameScreen.style.display = "none";

    dashboard.style.display = "flex";

    resetGame();

});


// ===============================
// INITIAL GAME SETUP
// ===============================

resetGame();
