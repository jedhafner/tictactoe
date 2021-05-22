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
        let count = 0;
        let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
   
        function checkForWin(combo){
            for (i in combo){
                let count = 0;
                for (j = 0; j <combo[i].length; j++){
                    if(gameBoard[combo[i][j]]===mark){
                            count++
                        };
                    };
                    if (count === 3){
                        console.log('Winner!');
                        break;
                    } 
                };
            }
        checkForWin(winningCombos); 
    });
})();

//factory: may create many
const player = (name, mark) => {
    name: name;
    mark: mark;
};