//module: only need one
const board = (()=>{
    let boardArea = document.getElementById('boardArea');
    for (i = 0; i < 9; i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('boardBox');
        newDiv.setAttribute('boxId', i);
        boardArea.appendChild(newDiv);
    }
})();
//factory: need more than one
const player = (avatar, score) =>{
        return{avatar, score};
    }

//module: only need one
const displayControl = (()=>{
    let board = ['','','','','','','','',''];
    let boardArea = document.getElementById('boardArea');
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    let round = 1;
    let inRoundClick = 0;
            
    function clearBoard(){
        for (i in board){
            inRoundClick = 0;
            board[i]='';
            let boxes = document.getElementsByClassName('boardBox');
            for (i=0; i<boxes.length; i++){
                boxes[i].textContent = '';
            }
        }

    };
    //controls player mode
    const emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
        0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
        0x1F431, 0x1F42A, 0x1F439, 0x1F424];
    function emojiChooser(){
        const selectRandom =  Math.floor(Math.random() * (emojis.length-1));
        return String.fromCodePoint(emojis[selectRandom])
    };
    let p1 = player(emojiChooser(),'');
    let p2 = player(emojiChooser(),'');

    let pOneScore = document.getElementById('player1score');
    let pTwoScore = document.getElementById('player2score');

    let playerSelect = document.getElementById('playerSelect');
    playerSelect.addEventListener('click', function(event) {
        clearBoard();
        let pOneScore = document.getElementById('player1score');
        let pTwoScore = document.getElementById('player2score');
        pOneScore.textContent='';
        pTwoScore.textContent='';
        let clicked = event.target.textContent;
        console.log(event.target.textContent);
        p1 = player(emojiChooser(),'');
        p2 = player(emojiChooser(),'');
        while (p2.avatar === p1.avatar){
            p1.avatar = emojiChooser();
        }
        if (clicked === 'Man v. Machine'){
            p2.avatar = String.fromCodePoint(0x1F916);
        }
    });

    //controls clicks on board
    boardArea.addEventListener('click', function(event) {
        let clicked = event.target;
        let boxId = clicked.getAttribute('boxId');
        let mark;
        if (board[boxId]===''){
            inRoundClick ++;
            if ((round + inRoundClick)%2===0){
                mark = p1.avatar;
            } else {
                mark = p2.avatar;
            }
            board.splice(boxId,1,mark);
            clicked.textContent = mark;
            player1.classList.toggle('active');
            player2.classList.toggle('active'); 
        }
        //write checkForWin
        let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

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
                    if(board[combo[i][j]]===mark){
                        count++
                        };
                };
                let trophy = String.fromCodePoint(0x1F3C6)
                if (count === 3){
                    round++
                    display.appendChild(newGame);
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    
                    if (mark === p1.avatar){
                        p1.score += trophy;
                        pOneScore.textContent = p1.score;
                    } else {
                        p2.score += trophy;
                        pTwoScore.textContent = p2.score;
                    }
                    break;
                } else if (inRoundClick == 9){
                    round++
                    display.textContent = "It's a tie.";
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    display.appendChild(newGame);
                }; 
            };
        };
        checkForWin(winningCombos);
    });
})();

//factory: may create many


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