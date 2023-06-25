
window.addEventListener('load', function () {
    const body = document.querySelector('.container');
    var Settings = document.querySelector('.Settings');
    Settings.style.opacity = 0;
    const table = document.querySelector('table');
    table.style.opacity = 0;
    const rows = document.querySelectorAll('td');
    let scoreBoard = document.querySelector('.scoreboard');
    scoreBoard.style.opacity = 0;
    let main = document.querySelector('.main');
    let score1 = 0
    let score2 = 0
    // for load slow
    setTimeout(function () {
        table.classList.add('fade-in')
        Settings.innerHTML = `<h2>Welcome to Tic Tac Toe MyGame</h2>
                            <div class="round">
                                <p>How many rounds do you want to play?</p>
                                <input  type="text">
                            </div>
                            <div>
                                <p class="p-play">Play as:</p>
                                <label class="single"><input type="radio" name="play" id="single" value="Single" >Single Play</label>
                                <label><input type="radio" name="play" id="two" value="two" checked="">Two-Player<br></label>
                                <br>
                                <div class=shapes>
                                <label><input type="radio" name="player" id="rx" value="x" checked="">X (go first)&nbsp;</label>
                                <label><input type="radio" name="player" id="ro" value="o">O<br></label>
                                </div>
                                <lable><input class="start" type="submit" name="start" value="Start"></lable>
                            </div>`;
        Settings.classList.add('fade-in');

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.innerText = message;
            toast.classList.remove('hidden');

            setTimeout(function () {
                toast.classList.add('hidden');
            }, 3000);
        }
        const start = Settings.querySelector('.start');
        let round = Settings.querySelector('.round input');
        const radioX = Settings.querySelector('#rx');
        const radioO = Settings.querySelector('#ro');
        const shapes = Settings.querySelector('.shapes');
        const SPlayer = Settings.querySelector('#single');
        const TPlayer = Settings.querySelector('#two');
        // for hidden or visible radio
        SPlayer.addEventListener('click', function () {
            shapes.classList.add('hidden');
        });
        TPlayer.addEventListener('click', function () {
            shapes.classList.remove('hidden');
        })
        //for select player
        radioO.addEventListener('change', function () {
            currentPlayer = 'o';
        });
        radioX.addEventListener('change', function () {
            currentPlayer = 'x';
        });
        //for start game
        start.addEventListener('click', function () {
            if (round.value != 0) {
                nextPage()
            }
            else {
                showToast('Please enter how many rounds you play!!!');

            }
        });



        document.addEventListener('keydown', function (e) {
            if (e.key === "Enter" && round.value != 0) {
                e.preventDefault();
                nextPage();
            }
        });


        function nextPage() {
            scoreBoard.classList.add('padding');
            currentPlayer = radioX.checked ? 'x' : 'o';
            main.classList.remove('d-grid');
            scoreBoard.classList.remove('fade-out');
            Settings.classList.remove('fade-in');
            Settings.classList.add('fade-out');
            main.classList.add('d-grid2');
            scoreBoard.classList.add('fade-in');
            scoreBoard.innerHTML = `<h2>Tic Tac Toe</h2>
                                       <div>
                                       <p>Rounds of Game</p>
                                       <div class="round2">${round.value}</div>
                                       </div>
                                       <div>
                                            <p>Your Scores</p> 
                                            <p class="P1">Player X : ${score1}</p>
                                            <p class="P2">Player O :${score2}</p>
                                            <lable><input class="reset" type="submit" name="reset" value="Reset"></lable>
                                        </div>
                                        `;
            let matchRound = round.value;
            let restart = scoreBoard.querySelector('.reset')
            restart.addEventListener('click', function () {
                location.reload();
            })


            function startGame() {
                let round2 = scoreBoard.querySelector('.round2');   //get rounds
                playerAs = SPlayer.checked ? singlePlayer() : twoPlayer(); //who is turn
                // two player
                function twoPlayer() {
                    rows.forEach((item, index) => {
                        item.addEventListener('click', function () {
                            if (item.classList.length === 0) {
                                if (currentPlayer === 'x' && !item.classList.contains('cross') && !item.classList.contains('circle')) {
                                    item.classList.add('cross');
                                    currentPlayer = 'o';
                                    const winner = checkWinner();
                                    if (winner) {
                                        score1++
                                        let scoreP1 = scoreBoard.querySelector('.P1');
                                        scoreP1.innerHTML = `<p class="P1">Player X : ${score1}</p>`;
                                        setTimeout(resetGame, 300);
                                    }
                                } else if (currentPlayer === 'o' && !item.classList.contains('cross') && !item.classList.contains('circle')) {
                                    item.classList.add('circle');
                                    currentPlayer = 'x';
                                    const winner = checkWinner();
                                    if (winner) {
                                        score2++
                                        let scoreP2 = scoreBoard.querySelector('.P2');
                                        scoreP2.innerHTML = `<p class="P2">Player O : ${score2}</p>`;
                                        setTimeout(resetGame, 300);
                                    }
                                }
                                const isBoardFull = Array.from(rows).every(item => item.classList.contains('cross') || item.classList.contains('circle'));
                                if (isBoardFull && !checkWinner()) {
                                    setTimeout(resetGame, 200);
                                    console.log('The game is a draw!');
                                }
                            }
                        });
                    });
                }
                //single palyer
                function singlePlayer() {

                    rows.forEach((item, index) => {
                        item.addEventListener('click', function () {
                            if (item.classList.length === 0) {
                                currentPlayer = 'x';
                                item.classList.add('cross');
                                currentPlayer = 'o';
                                const winner = checkWinner();
                                if (winner) {
                                    score1++
                                    let scoreP1 = scoreBoard.querySelector('.P1');
                                    scoreP1.innerHTML = `<p class="P1">Player : ${score1}</p>`;
                                    setTimeout(resetGame, 300);

                                }
                                if (!isBoardFull()) {
                                    setTimeout(playComputerTurn, 300);
                                } else {
                                    console.log('The game is a draw!');
                                    setTimeout(resetGame, 300);
                                }
                            }
                        });
                    });
                }

                function playComputerTurn() {
                    const emptyCells = Array.from(rows).filter(item => !item.classList.contains('cross') && !item.classList.contains('circle'));
                    if (emptyCells.length > 0) {
                        const bestMove = getBestMove();
                        const randomCell = emptyCells[bestMove];
                        setTimeout(randomCell.classList.add('circle'), 300)
                        currentPlayer = 'x';
                        const winner = checkWinner();
                        if (winner) {
                            score2++
                            let scoreP2 = scoreBoard.querySelector('.P2');
                            scoreP2.innerHTML = `<p class="P2">Player O : ${score2}</p>`;
                            setTimeout(resetGame, 300);
                            return;
                        }
                        if (isBoardFull()) {
                            console.log('The game is a draw!');
                            setTimeout(resetGame, 300);
                        }
                    }
                }

                function getBestMove() {
                    let bestScore = -Infinity;
                    let bestMove;

                    const emptyCells = Array.from(rows).filter(item => !item.classList.contains('cross') && !item.classList.contains('circle'));
                    for (let i = 0; i < emptyCells.length; i++) {
                        const cell = emptyCells[i];
                        cell.classList.add('circle');
                        currentPlayer = 'x';
                        const score = minimax(0, false);
                        cell.classList.remove('circle');

                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = i;
                        }
                    }

                    return bestMove;
                }

                function minimax(depth, isMaximizing) {
                    const winner = checkWinner();
                    if (winner === 'x') {
                        return -1;
                    } else if (winner === 'o') {
                        return 1;
                    } else if (isBoardFull()) {
                        return 0;
                    }

                    if (isMaximizing) {
                        let bestScore = -Infinity;
                        const emptyCells = Array.from(rows).filter(item => !item.classList.contains('cross') && !item.classList.contains('circle'));
                        for (let i = 0; i < emptyCells.length; i++) {
                            const cell = emptyCells[i];
                            cell.classList.add('circle');
                            currentPlayer = 'x';
                            const score = minimax(depth + 1, false);
                            cell.classList.remove('circle');
                            bestScore = Math.max(score, bestScore);
                        }
                        return bestScore;
                    } else {
                        let bestScore = Infinity;
                        const emptyCells = Array.from(rows).filter(item => !item.classList.contains('cross') && !item.classList.contains('circle'));
                        for (let i = 0; i < emptyCells.length; i++) {
                            const cell = emptyCells[i];
                            cell.classList.add('cross');
                            currentPlayer = 'o';
                            const score = minimax(depth + 1, true);
                            cell.classList.remove('cross');
                            bestScore = Math.min(score, bestScore);
                        }
                        return bestScore;
                    }
                }

                //whene board is full
                function isBoardFull() {
                    return Array.from(rows).every(item => item.classList.contains('cross') || item.classList.contains('circle'));
                }
                //for close modal
                function closeModal() {
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                            location.reload();
                        }

                    }
                }
                // reset game and checked winner
                function resetGame() {
                    rows.forEach(item => {
                        item.classList.remove('cross', 'circle')
                    });
                    matchRound--
                    round2.innerHTML = `<div class="round2">${matchRound}</div>`
                    if (matchRound == 0) {
                        if (score1 > score2) {
                            body.innerHTML += `<div  class="winner modal">
                                                    <p>Player X is Winner</p>
                                                    <img src="image/winner.gif" alt="">
                                               </div>`;
                            modal = body.querySelector('.winner');
                            modal.style.display = "block";
                            closeModal()
                        }
                        else if (score1 < score2) {
                            body.innerHTML += `<div  class="winner modal">
                                                    <p>Player O is Winner</p>
                                                    <img src="image/winner.gif" alt="">
                                               </div>`;
                            modal = body.querySelector('.winner');
                            modal.style.display = "block";
                            closeModal()
                        }
                        else {
                            body.innerHTML += `<div  class="nowinner modal">
                                                    <img src="image/NoWinner.gif" alt="">
                                               </div>`;
                            modal = body.querySelector('.nowinner');
                            modal.style.display = "block";
                            closeModal()
                        }
                    }
                }
            }
            startGame();
        }
        //checked winner in every round
        function checkWinner() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // ردیف‌ها
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستون‌ها
                [0, 4, 8], [2, 4, 6] // قطرها
            ];

            for (let condition of winConditions) {
                const [a, b, c] = condition;
                const cellA = rows[a];
                const cellB = rows[b];
                const cellC = rows[c];

                if (
                    cellA.classList.contains('cross') &&
                    cellB.classList.contains('cross') &&
                    cellC.classList.contains('cross')
                ) {
                    return 'x';
                } else if (
                    cellA.classList.contains('circle') &&
                    cellB.classList.contains('circle') &&
                    cellC.classList.contains('circle')
                ) {
                    return 'o';
                }
            }

            return null;
        }
    }, 300);
});
