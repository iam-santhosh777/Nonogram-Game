let NUM_ROWS = 6;
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
const DEFAULT_DIFFICULTY = BEGIN_DIFFICULTY;
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
let myModal = document.getElementById('myModal');
//let proceedModal = document.getElementById("proceedModal");
//proceedModal.showModal();
let firstBox = document.getElementById("firstBox");
let secondBox = document.getElementById("secondBox");
let thirdBox = document.getElementById("thirdBox");
let fourthBox = document.getElementById("fourthBox");
let fifthBox = document.getElementById("fifthBox");
let sixthBox = document.getElementById("sixthBox");
let arrowImage = document.getElementById("arrowImage1");
let arrowImage2 = document.getElementById("arrowImage2");
let arrowImage3 = document.getElementById("arrowImage3");
firstBox.showModal();
let percentSpots = undefined;
let currentSelectState = undefined;
let key = "begin";
let level = BEGIN_DIFFICULTY;
var totalTime = 10000; // 10k seconds
var now = new Date();
var spentSeconds = 0;

// Define the time duration in milliseconds for each dialog
const dialogDuration = 500; // (adjust as needed)

function getParameters(){
    let url = window.location.href;
    let paramString = url.split('?')[1];
    console.log(paramString)
    let queryString = new URLSearchParams(paramString);
    level = EASY_DIFFICULTY;
    NUM_ROWS = 6;
    NUM_COLS = NUM_ROWS;
    board = new Array(NUM_ROWS);
    tableCells = new Array(NUM_ROWS + 1);
    makeTable();
    start(EASY_DIFFICULTY); 
}

getParameters();

function startTimer(){
    
   // var countDownDate = new Date().getTime() + 15 * 60 * 1000;
    
    // var x = setInterval(function() {

    //     // Get today's date and time
        
    //     spentSeconds = spentSeconds + 1;
    //     //remainingSecs = totalTime - spentSeconds;
    //     // Find the distance between now and the count down date
    //     //distance = countDownDate - now;
        
    //     // Time calculations for hours, minutes and seconds
    //     // hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     // minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     // seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    //     // Display the result in the element with id="demo"
    //     //timerText.innerHTML =  minutes + ":" + seconds;
    //     timerText.innerHTML = "00:"+spentSeconds;
    //     // If the count down is finished, write some text
    //     if (remainingSecs < 0) {
    //       clearInterval(x);
    //       timerText.innerHTML = "00:00";
    //       if(level == MEDIUM_DIFFICULTY){
    //         // document.getElementById("dialogHeading").innerHTML = "<p>Level Failed!! Try Easy One. </p>";
    //         // proceedModal.showModal();
    //         key = "medium";
    //         localStorage.firstLevelScore = 0;
    //         localStorage.keyLevel = key;
    //         window.location = "gameOver.html"
    //         // document.getElementById("yesButton").addEventListener("click",function(e){
    //         //   window.location = "index.html?level=easy"
    //         // })
    //       }
    //       else if(level == EASY_DIFFICULTY){
    //         key = "easy";
    //         localStorage.firstLevelScore = 0;
    //         localStorage.keyLevel = key;
    //         window.location = "gameOver.html"
    //       }
    //       else{
    //         key = "hard";
    //         localStorage.firstLevelScore = 0;
    //         localStorage.keyLevel = key;
    //         window.location = "gameOver.html"
    //       }
    //     //   else{
    //     //     document.getElementById("dialogHeading").innerHTML = "<p>GameOver!! Do you want to play again? </p>";
    //     //     proceedModal.showModal();
    //     //     key = "hard";
    //     //     document.getElementById("yesButton").addEventListener("click",function(e){
    //     //       window.location = "index.html"
    //     //     })
    //     //   }
          
    //     }
    //   }, 1000);
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

    // All cells are correctly filled, open your modal dialog
    myModal.showModal();
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
            let cellClass = isInfoCell ? 'info-cell' : 'game-cell';
            cell.setAttribute('class', cellClass);
            cell.addEventListener('mouseover', mouseoverListener);
            tableCells[i][j] = cell;
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

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

document.getElementById("skipTut").addEventListener('click', ()=>{
    window.location= "intro.html";
});

function openFirstDialog() {
    firstBox.showModal();
}

function openSecondDialog() {
    firstBox.close();
    setTimeout(() => {
        secondBox.showModal();
        arrowImage.style.display = "block";
        arrowImage2.style.display = "block";
    }, dialogDuration);
}

function openThirdDialog() {
    secondBox.close();
    arrowImage.style.display = "none";
    arrowImage2.style.display = "none";
    setTimeout(() => {
        thirdBox.showModal();
        arrowImage3.style.display = "block";
    }, dialogDuration);
}

function openFourthDialog() {
    thirdBox.close();
    arrowImage3.style.display = "none";
    setTimeout(() => {
        fourthBox.showModal();
        arrowImage3.style.display = "block";
    }, dialogDuration);
}
function openFifthDialog() {
    fourthBox.close();
    arrowImage3.style.display = "block";
    
    // Add a click event listener to the table
    tbody.addEventListener("click", function tableClickHandler() {
        tbody.removeEventListener("click", tableClickHandler); // Remove the event listener after one click
        setTimeout(() => {
            fifthBox.showModal();

        }, dialogDuration);
    });
}

function openSixthDialog() {
    fifthBox.close();
    
    // Add a click event listener to the table
    tbody.addEventListener("click", function tableClickHandler() {
        tbody.removeEventListener("click", tableClickHandler); // Remove the event listener after one click
        setTimeout(() => {
            sixthBox.showModal();
            arrowImage3.style.display = "none";
        }, dialogDuration);
    });
}

function openMyModal() {
    sixthBox.close();
    setHints();
    reset(); 
}

function openLastDialog() {
    myModal.close();
    window.location = 'levelSelection.html';
}

document.getElementById("okBtn").addEventListener("click", openSecondDialog);
document.getElementById("okBtn2").addEventListener("click", openThirdDialog);
document.getElementById("okBtn3").addEventListener("click", openFourthDialog);
document.getElementById("okBtn4").addEventListener("click", openFifthDialog);
document.getElementById("okBtn5").addEventListener("click", openSixthDialog);
document.getElementById("okBtn6").addEventListener("click", openMyModal);
document.getElementById('lastOkBtn').addEventListener('click', openLastDialog);

// Initial dialog opening
openFirstDialog();
