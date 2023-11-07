    let NUM_ROWS = 8;
    let NUM_COLS = NUM_ROWS;
    const BEGIN_PERCENT = 82;
    const EASY_PERCENT = 92;
    const MEDIUM_PERCENT = 82;
    const HARD_PERCENT = 72;
    const BEGIN_DIFFICULTY = 'begin';
    const EASY_DIFFICULTY = 'easy';
    const MEDIUM_DIFFICULTY = 'medium';
    const HARD_DIFFICULTY = 'hard';
    const STATE_UNSELECTED = 0;
    const STATE_SELECTED = 1;
    const STATE_MARKED = 2;
    const DEFAULT_DIFFICULTY = MEDIUM_DIFFICULTY;
    var distance;
    var minutes;
    var seconds;
    var hours;
    let firstLevelScore, secondLevelScore;
    var remainingSecs;
    let board = new Array(NUM_ROWS);
    let tableCells = new Array(NUM_ROWS + 1);
    const tbody = document.getElementById('game-table-body');
    const timerText = document.getElementById("timerText");
    let proceedModal = document.getElementById("proceedModal");
    //proceedModal.showModal();
    let percentSpots = undefined;
    let currentSelectState = undefined;
    let key = "medium";
    let level = MEDIUM_DIFFICULTY;
    var totalTime = 900; // 10k seconds
    var now = new Date();
    var spentSeconds = 0;
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('giveup').addEventListener('click', giveupActions);
    //document.getElementById('solve').addEventListener('click', solve);
    // document.getElementById('start-easy').addEventListener('click',
    //     () => start(EASY_DIFFICULTY));
    // document.getElementById('start-medium').addEventListener('click',
    //     () => start(MEDIUM_DIFFICULTY));
    // document.getElementById('start-hard').addEventListener('click',
    //     () => start(HARD_DIFFICULTY));
    function getParameters(){
        let url = window.location.href;
        let paramString = url.split('?')[1];
        console.log(paramString)
        let queryString = new URLSearchParams(paramString);
        if(paramString  == undefined){
            makeTable();
            start(DEFAULT_DIFFICULTY);
        }
        else{
            for(let pair of queryString.entries()) {
                console.log("Key is:" + pair[0]);
                console.log("Value is:" + pair[1]);
                level = pair[1];
                console.log("Level:"+level);
                if(level == EASY_DIFFICULTY){
                    level = EASY_DIFFICULTY;
                    NUM_ROWS = 8;
                    NUM_COLS = NUM_ROWS;
                    board = new Array(NUM_ROWS);
                    tableCells = new Array(NUM_ROWS + 1);
                    makeTable();
                    start(EASY_DIFFICULTY);
                }
                else if(level == BEGIN_DIFFICULTY){
                    level = BEGIN_DIFFICULTY;
                    NUM_ROWS = 6;
                    NUM_COLS = NUM_ROWS;
                    board = new Array(NUM_ROWS);
                    tableCells = new Array(NUM_ROWS + 1);
                    makeTable();
                    start(BEGIN_DIFFICULTY);
                }
                else{
                    level = HARD_DIFFICULTY;
                    NUM_ROWS = 12;
                    NUM_COLS = NUM_ROWS;
                    board = new Array(NUM_ROWS);
                    tableCells = new Array(NUM_ROWS + 1);
                    makeTable();
                    start(HARD_DIFFICULTY);
                }
            }
        }  
    }
    
    getParameters();

function startTimer() {
    var startTime = new Date().getTime(); // Get the current time when starting the timer

    var x = setInterval(function() {
        // var now = new Date().getTime();
        // var distance = countDownDate - now;


        // // Calculate remaining minutes and seconds
        // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // var seconds = Math.floor((distance % (1000 * 60) / 1000));

        // // Display the result in the element with id "timerText"
        // timerText.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        var now = new Date().getTime();
        var elapsed = now - startTime; // Calculate the elapsed time in milliseconds

        // Calculate elapsed minutes and seconds
        var minutes = Math.floor(elapsed / (1000 * 60));
        var seconds = Math.floor((elapsed / 1000) % 60);

        // Display the elapsed time in the element with id "timerText"
        timerText.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (distance < 0) {
            clearInterval(x);
            timerText.innerHTML = "00:00";
            // Handle timer expiration here
            if(level == MEDIUM_DIFFICULTY){
                // document.getElementById("dialogHeading").innerHTML = "<p>Level Failed!! Try Easy One. </p>";
                // proceedModal.showModal();
                key = "medium";
                localStorage.firstLevelScore = 0;
                localStorage.keyLevel = key;
                window.location = "gameOver.html"
                // document.getElementById("yesButton").addEventListener("click",function(e){
                //   window.location = "index.html?level=easy"
                // })
              }
              else if(level == EASY_DIFFICULTY){
                key = "easy";
                localStorage.firstLevelScore = 0;
                localStorage.keyLevel = key;
                window.location = "gameOver.html"
              }
              else{
                key = "hard";
                localStorage.firstLevelScore = 0;
                localStorage.keyLevel = key;
                window.location = "gameOver.html"
              }
            //   else{
            //     document.getElementById("dialogHeading").innerHTML = "<p>GameOver!! Do you want to play again? </p>";
            //     proceedModal.showModal();
            //     key = "hard";
            //     document.getElementById("yesButton").addEventListener("click",function(e){
            //       window.location = "index.html"
            // Handle timer expiration here
            //     })
            //   }
        }
    }, 1000);
}

    startTimer();

    function start(difficulty) {
        switch (difficulty) {
            case BEGIN_DIFFICULTY:
                percentSpots = BEGIN_PERCENT;
                break;
            case EASY_DIFFICULTY:
                percentSpots = EASY_PERCENT;
                break;
            case MEDIUM_DIFFICULTY:
                percentSpots = MEDIUM_PERCENT;
                break;
            case HARD_DIFFICULTY:
                percentSpots = HARD_PERCENT;
                break;
            default:
                start(DEFAULT_DIFFICULTY);
                break;
        }

        makeGame();
        setHints();
        reset();
    }

    
    
    function applyCellSizeClass(difficultyClass) {
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let tableCell = tableCells[i][j];
                tableCell.classList.add(difficultyClass);
            }
        }
    }
    
    

    function giveupActions(){
        //game over if user is giving up 
        if(level == MEDIUM_DIFFICULTY){
            //firstLevelScore = "--:--";
            firstLevelScore = 0;
            key = "medium";
            localStorage.firstLevelScore = firstLevelScore;
            localStorage.keyLevel = key;
            window.location = "gameOver.html"
            // document.getElementById("dialogHeading").innerHTML = "<p>Level Failed!! Try Easy One. </p>";
            // proceedModal.showModal();
            // document.getElementById("yesButton").addEventListener("click",function(e){
            //     window.location = "index.html?level=easy"
            // })
        }
        else if(level == EASY_DIFFICULTY){
            //firstLevelScore = "--:--";
            firstLevelScore = 0;
            key = "easy";
            localStorage.firstLevelScore = firstLevelScore;
            localStorage.keyLevel = key;
            window.location = "gameOver.html"
        }
        else if(level == BEGIN_DIFFICULTY){
            //firstLevelScore = "--:--";
            firstLevelScore = 0;
            key = "begin";
            localStorage.firstLevelScore = firstLevelScore;
            localStorage.keyLevel = key;
            window.location = "gameOver.html"
        }
        else{
            //firstLevelScore = "--:--";
            firstLevelScore = 0;
            key = "hard";
            localStorage.firstLevelScore = firstLevelScore;
            localStorage.keyLevel = key;
            window.location = "gameOver.html"
        }
        // else{
        //     secondLevelScore = "--:--";
        //     localStorage.secondLevelScore = secondLevelScore;
        //     key = "hard";
        //     document.getElementById("dialogHeading").innerHTML = "<p>GameOver!! Do you want to play again? </p>";
        //     proceedModal.showModal();
        //     document.getElementById("yesButton").addEventListener("click",function(e){
        //       localStorage.keyLevel = key;
        //       window.location = "gameOver.html"
        //     })          
        // }
    }

    function setHints() {
        // horizontal
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            let row = [];
            let count = 0;
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let cell = board[i - 1][j - 1];
                if (cell.isSpot) {
                    count++;
                } else if (count > 0) {
                    row.push(count);
                    count = 0;
                }
            }

            if (count > 0) {
                row.push(count);
            }

            let infoCell = tableCells[i][0];
            while (infoCell.firstChild) {
                infoCell.removeChild(infoCell.firstChild);
            }
            let div = document.createElement('div');

            row.forEach(num => {
                let span = document.createElement('span');
                span.innerHTML = num;
                div.appendChild(span);
            });
            infoCell.appendChild(div);
        }

        // vertical
        for (let j = 1; j < NUM_COLS + 1; j++) {
            let col = [];
            let count = 0;
            for (let i = 1; i < NUM_ROWS + 1; i++) {
                let cell = board[i - 1][j - 1];

                if (cell.isSpot) {
                    count++;
                } else if (count > 0) {
                    col.push(count);
                    count = 0;
                }
            }

            if (count > 0) {
                col.push(count);
            }
            let infoCell = tableCells[0][j];
            while (infoCell.firstChild) {
                infoCell.removeChild(infoCell.firstChild);
            }

            let div = document.createElement('div');
            col.forEach(num => {
                let span = document.createElement('span');
                span.innerHTML = num;
                div.appendChild(span);
            });
            infoCell.appendChild(div);
        }

        // click listeners
        let spans = document.querySelectorAll('.info-cell span');
        spans.forEach(span => {
            span.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('checked')) {
                    target.classList.remove('checked');
                } else {
                    target.classList.add('checked');
                }
            });
        });
    }

    function checkForWin() {
        
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let tableCell = tableCells[i][j];
                let cell = board[i - 1][j - 1];
                if ((cell.isSpot && cell.selectedState !== STATE_SELECTED) ||
                    (!cell.isSpot && cell.selectedState === STATE_SELECTED)) {
                    return;
                }
            }
        }

        // give enough time for css of last cell to update
        setTimeout(() => {
            // let remainingMin = 15 - parseInt(minutes);
            // let remainingSecs = 60 - parseInt(seconds);
            if(level == MEDIUM_DIFFICULTY){                            
                //firstLevelScore = remainingMin +":" +remainingSecs;
                key = "medium";
                localStorage.firstLevelScore = spentSeconds;
                localStorage.keyLevel = key;
                window.location = "gameOver.html"
                // document.getElementById("dialogHeading").innerHTML = "<p>Awesome!! Try Hard One. </p>";
                // proceedModal.showModal();
                // document.getElementById("yesButton").addEventListener("click",function(e){
                //     window.location = "index.html?level=hard"
                //     key = "hard";
                // }) 
            }
            else if(level == BEGIN_DIFFICULTY){
                //firstLevelScore = remainingMin +":" +remainingSecs;
                localStorage.firstLevelScore = spentSeconds;
                key = "begin";
                localStorage.keyLevel = key;
                window.location = "gameOver.html";
             
            }
            else if(level == EASY_DIFFICULTY){
                //firstLevelScore = remainingMin +":" +remainingSecs;
                localStorage.firstLevelScore = spentSeconds;
                key = "easy";
                localStorage.keyLevel = key;
                window.location = "gameOver.html";
                // document.getElementById("dialogHeading").innerHTML = "<p>Awesome!! Try Medium One. </p>";
                // proceedModal.showModal();
                // document.getElementById("yesButton").addEventListener("click",function(e){
                //     window.location = "index.html"
                //     key = "medium";
                // }) 
            }
            else{
                //firstLevelScore = remainingMin +":" +remainingSecs;
                key = "hard";
                localStorage.keyLevel = key;
                localStorage.firstLevelScore = spentSeconds;   
                window.location = "gameOver.html";             
                // document.getElementById("dialogHeading").innerHTML = "<p>Great Job!! Do you want to start it again? </p>";
                // proceedModal.showModal();
                // document.getElementById("yesButton").addEventListener("click",function(e){
                //     localStorage.keyLevel = key;
                //     window.location = "gameOver.html"
                // })
            }
            
        }, 50);
    }

    // updates game cells, not info cells
    function updateTable() {
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let tableCell = tableCells[i][j];
                let cell = board[i - 1][j - 1];
                if (cell.selectedState === STATE_SELECTED) {
                    tableCell.classList.add("checked");
                    tableCell.classList.remove("marked")
                } else if (cell.selectedState === STATE_MARKED) {
                    tableCell.classList.add("marked");
                    tableCell.classList.remove("checked")
                } else {
                    tableCell.classList.remove("checked");
                    tableCell.classList.remove("marked");
                }
            }
        }
    }

    function makeGame() {
        for (let i = 0; i < NUM_ROWS; i++) {
            board[i] = new Array(NUM_COLS);
            for (let j = 0; j < NUM_COLS; j++) {
                board[i][j] = {
                    selectedState: STATE_UNSELECTED,
                    isSpot: Math.random() >= 1 - (percentSpots / 100)
                }
            }
        }
    }

    // function makeTable() {
    //     let mouseoverListener = e => {
    //         let tableCell = e.target;
    //         let row = tableCell.dataset.row;
    //         let col = tableCell.dataset.col;
    //         if (row >= 0 && col >= 0 && e.buttons === 1 && currentSelectState !== undefined) {
    //             e.preventDefault();
    //             let cell = board[row][col];
    //             cell.selectedState = currentSelectState;
    //             updateTable();
    //             checkForWin();
    //         }
    //     };

    //     for (let i = 0; i < NUM_ROWS + 1; i++) {
    //         tableCells[i] = new Array(NUM_COLS + 1);
    //         let row = document.createElement('tr');

    //         for (let j = 0; j < NUM_COLS + 1; j++) {
    //             let cell = document.createElement('td');
    //             let isInfoCell = i === 0 || j === 0;
    //             cell.setAttribute('data-row', i - 1);
    //             cell.setAttribute('data-col', j - 1);
    //             let cellClass = isInfoCell ? 'info-cell' : 'game-cell';
    //             cell.setAttribute('class', cellClass);
    //             cell.addEventListener('mouseover', mouseoverListener);
    //             tableCells[i][j] = cell;
    //             row.appendChild(cell);
    //         }

    //         tbody.appendChild(row);
    //     }

    //     document.addEventListener('mousedown', e => {
    //         let tableCell = e.target;
    //         let row = tableCell.dataset.row;
    //         let col = tableCell.dataset.col;

    //         if (row >= 0 && col >= 0) {
    //             e.preventDefault();
    //             let cell = board[row][col];
    //             switch (cell.selectedState) {
    //                 case STATE_UNSELECTED:
    //                     cell.selectedState = STATE_SELECTED;
    //                     break;
    //                 case STATE_SELECTED:
    //                     cell.selectedState = STATE_MARKED;
    //                     break;
    //                 case STATE_MARKED:
    //                     cell.selectedState = STATE_UNSELECTED;
    //                     break;
    //             }
    //             currentSelectState = cell.selectedState;
    //             updateTable();
    //             checkForWin();
    //         } else {
    //             currentSelectState = undefined;
    //         }
    //     });
    // }

    function makeTable() {
        let mouseoverListener = e => {
            let tableCell = e.target;
            let row = tableCell.dataset.row;
            let col = tableCell.dataset.col;
            if (row >= 0 && col >= 0 && e.buttons === 1 && currentSelectState !== undefined) {
                e.preventDefault();
                let cell = board[row][col];
                cell.selectedState = currentSelectState;
                updateTable();
                checkForWin();
            }
        };
    
        for (let i = 0; i < NUM_ROWS + 1; i++) {
            tableCells[i] = new Array(NUM_COLS + 1);
            let row = document.createElement('tr');
    
            for (let j = 0; j < NUM_COLS + 1; j++) {
                let cell = document.createElement('td');
                let isInfoCell = i === 0 || j === 0;
                cell.setAttribute('data-row', i - 1);
                cell.setAttribute('data-col', j - 1);
                
                // Apply different classes based on the selected level
                let cellClass = 'game-cell';
                if (isInfoCell) {
                    cellClass = 'info-cell';
                } else if (level === BEGIN_DIFFICULTY) {
                    cellClass = 'begin-cell';
                } else if (level === EASY_DIFFICULTY) {
                    cellClass = 'easy-cell';
                } else if (level === MEDIUM_DIFFICULTY) {
                    cellClass = 'medium-cell';
                } else if (level === HARD_DIFFICULTY) {
                    cellClass = 'hard-cell';
                }
    
                cell.setAttribute('class', cellClass);
                cell.addEventListener('mouseover', mouseoverListener);
                tableCells[i][j] = cell;
                row.appendChild(cell);
            }
    
            tbody.appendChild(row);
        }
    
        // document.addEventListener('mousedown', e => {
        //     let tableCell = e.target;
        //     let row = tableCell.dataset.row;
        //     let col = tableCell.dataset.col;
    
        //     if (row >= 0 && col >= 0) {
        //         e.preventDefault();
        //         let cell = board[row][col];
        //         switch (cell.selectedState) {
        //             case STATE_UNSELECTED:
        //                 cell.selectedState = STATE_SELECTED;
        //                 break;
        //             case STATE_SELECTED:
        //                 cell.selectedState = STATE_MARKED;
        //                 break;
        //             case STATE_MARKED:
        //                 cell.selectedState = STATE_UNSELECTED;
        //                 break;
        //         }
        //         currentSelectState = cell.selectedState;
        //         updateTable();
        //         checkForWin();
        //     } else {
        //         currentSelectState = undefined;
        //     }
        // });

        document.addEventListener('mousedown', e => {
        let tableCell = e.target;
        let row = tableCell.dataset.row;
        let col = tableCell.dataset.col;

        if (row >= 0 && col >= 0) {
            e.preventDefault();
            let cell = board[row][col];
            switch (cell.selectedState) {
                case STATE_UNSELECTED:
                    cell.selectedState = STATE_SELECTED;
                    break;
                case STATE_SELECTED:
                    cell.selectedState = STATE_MARKED;
                    break;
                case STATE_MARKED:
                    cell.selectedState = STATE_UNSELECTED;
                    break;
            }
            currentSelectState = cell.selectedState;

            // Add this line for debugging
            console.log('Selected State:', currentSelectState);

            updateTable();
            checkForWin();
        } else {
            currentSelectState = undefined;
        }
    });

    }
    

    function reset() {
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let cell = board[i - 1][j - 1];
                cell.selectedState = STATE_UNSELECTED;
            }
        }

        updateTable();
    }

    function solve() {
        for (let i = 1; i < NUM_ROWS + 1; i++) {
            for (let j = 1; j < NUM_COLS + 1; j++) {
                let cell = board[i - 1][j - 1];
                cell.selectedState = cell.isSpot ? STATE_SELECTED : STATE_UNSELECTED;
            }
        }
        updateTable();
        checkForWin();
    }   
