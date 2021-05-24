//module: only need one
const gameBoard = (()=>{
    let boardArea = document.getElementById('boardArea');
    for (i = 0; i < 9; i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('boardBox');
        newDiv.setAttribute('boxId', i);
        boardArea.appendChild(newDiv);
    }
})();

//module: only need one
const game = (()=>{
    let gameBoard = ['','','','','','','','',''];
    let boardArea = document.getElementById('boardArea');
    let clickCount = 0;
    boardArea.addEventListener('click', function(event) {
        console.log(clickCount);
        let clicked = event.target;
        let boxId = clicked.getAttribute('boxId');

        let mark;
        if (gameBoard[boxId]===''){
            clickCount ++;
            if (clickCount%2===0){
                mark = 'O';
            } else {
                mark = 'X';
            }
            gameBoard.splice(boxId,1,mark);
            clicked.textContent = mark;
        }
       
        //write checkForWin
        let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        
        function clearBoard(){
            for (i in gameBoard){
                clickCount = 0;
                gameBoard[i]='';
                let boxes = document.getElementsByClassName('boardBox');
                for (i=0; i<boxes.length; i++){
                    boxes[i].textContent = '';
                }
            }

        }
        let display = document.createElement('div');
        display.textContent = `${mark} wins!`;
        display.classList.add('display');
        

        let newGame = document.createElement('div')
        newGame.textContent ='Play again.';
        newGame.classList.add('newGame');
        newGame.addEventListener('click', function(event) {
            clearBoard();
            display.classList.add('ghost');
        });


        function checkForWin(combo){
            for (i in combo){
                let count = 0;
                for (j = 0; j <combo[i].length; j++){
                    if(gameBoard[combo[i][j]]===mark){
                        count++
                        console.log('wincount: '+count);
                        };
                };
                if (count === 3){
                    display.appendChild(newGame);
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    break;
                } else if (clickCount == 9){
                    display.textContent = "It's a tie.";
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    display.appendChild(newGame);
                } 
            };
        };
        checkForWin(winningCombos);
        
    });
})();

//factory: may create many
const player = (name, mark) => {
    name: name;
    mark: mark;
};

/* pseudo code for a.i. player
check each winning combo.
    duplicate checkForWin and tweak to playToWin: 
    change first if to check for count = 2, and then play
    in the empty spot. 
    Else, play in random spot.

    let playerVersus = document.createElement('div')
        let twoPlayer = document.createElement('p');
        let againstAI = document.createElement('p');
        playerVersus.appendChild('twoPlayer');
        playerVersus.appendChild('againstAI');
        display.appendChild('playerVersus');
*/