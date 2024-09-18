window.onload = function () {
    const boxElements = document.getElementsByClassName("box");
    const messageDiv = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    let gameActive = true;

    for (const box of boxElements) {
        box.addEventListener("click", handleBoxClick);
    }

    resetButton.addEventListener("click", resetGame);

    function handleBoxClick(e) {
        if (!gameActive) return;

        const box = e.target;
        const id = parseInt(box.id);
        const row = Math.floor(id / 3);
        const col = id % 3;

        if (board[row][col] !== "") return;

        box.innerText = currentPlayer;
        board[row][col] = currentPlayer;

        if (checkWinner()) {
            displayWinner(currentPlayer);
            gameActive = false;
        } else if (checkTie()) {
            displayMessage("It's a Tie!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            displayMessage(`Player ${currentPlayer}'s turn`);
        }
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== ""
            ) {
                highlightWinner([i * 3, i * 3 + 1, i * 3 + 2]);
                return true;
            }

            if (
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                board[0][i] !== ""
            ) {
                highlightWinner([i, i + 3, i + 6]);
                return true;
            }
        }

        if (
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            board[0][0] !== ""
        ) {
            highlightWinner([0, 4, 8]);
            return true;
        }

        if (
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            board[0][2] !== ""
        ) {
            highlightWinner([2, 4, 6]);
            return true;
        }

        return false;
    }

    function checkTie() {
        return board.flat().every(cell => cell !== "");
    }

    function highlightWinner(winningIndices) {
        for (const index of winningIndices) {
            document.getElementById(index).classList.add("winner");
        }
    }

    function displayWinner(player) {
        displayMessage(`Player ${player} wins!`);
    }

    function displayMessage(message) {
        messageDiv.innerText = message;
    }

    function resetGame() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        currentPlayer = "X";
        gameActive = true;
        displayMessage(`Player ${currentPlayer}'s turn`);

        for (const box of boxElements) {
            box.innerText = "";
            box.classList.remove("winner");
        }
    }

    displayMessage(`Player ${currentPlayer}'s turn`);
};
