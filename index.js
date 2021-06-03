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
    let inRoundClick = 1;
            
    function clearBoard(){
        for (i in board){
            inRoundClick = 1;
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
    let twoPlayer = document.getElementById('twoPlayer');
    let manVMachine = document.getElementById('manVMachine');
   
    playerSelect.addEventListener('click', function(event) {
        clearBoard();
        let pOneScore = document.getElementById('player1score');
        let pTwoScore = document.getElementById('player2score');
        pOneScore.textContent='';
        pTwoScore.textContent='';
        let clicked = event.target.textContent;
        p1 = player(emojiChooser(),'');
        p2 = player(emojiChooser(),'');
        while (p2.avatar === p1.avatar){
            p1.avatar = emojiChooser();
        };
        if (clicked === 'Man v. Machine'){
            p2.avatar = String.fromCodePoint(0x1F916);
            player2.textContent = p2.avatar;
            twoPlayer.classList.remove('active');
            manVMachine.classList.add('active');
        };
        if (clicked === '2 player'){
            twoPlayer.classList.add('active');
            manVMachine.classList.remove('active');
        }
    });

    let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let mark;
    //creates robo A.I.
    function roboDefense(){
        let randomBox = Math.floor(Math.random() * (board.length-1));
        while (board[randomBox] !== ''){
            randomBox = Math.floor(Math.random() * (board.length-1));
        }
        boxId = randomBox;
        mark = p2.avatar;
        clicked = document.querySelector("div[boxId="+CSS.escape(boxId)+"]");
        markBoard();
    }
    //creates round display
        let display = document.createElement('div');
        let displayMessage = document.createElement('div');
        console.log
        display.appendChild(displayMessage);
        display.classList.add('display');
        
        let newGame = document.createElement('div')
        newGame.textContent ='Play again.';
        newGame.classList.add('newGame');
        newGame.addEventListener('click', function(event) {
            clearBoard();
            display.classList.add('ghost');
            if ((p2.avatar === String.fromCodePoint(0x1F916)) && (round + inRoundClick)%2!==0){
                roboDefense();
            };

            
        });
        //creates win checker
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
                    displayMessage.textContent = `${mark} wins!`;
                    display.appendChild(newGame);
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    
                    if (mark === p1.avatar){
                        pOneScore.textContent += trophy;
                    } else {
                        pTwoScore.textContent += trophy;
                    }
                    break;
                } else if (inRoundClick == 9){
                    round++
                    displayMessage.textContent = "It's a tie.";
                    display.classList.remove('ghost');
                    boardArea.appendChild(display);
                    display.appendChild(newGame);
                }; 
            };
        };
        let boxId;
        let clicked;
        function markBoard(){
            console.log("it's in the function!")
            board.splice(boxId,1,mark);
            clicked.textContent = mark;
            console.log("text of clicked:"+clicked.textContent);
            player1.classList.toggle('active');
            player2.classList.toggle('active');
            checkForWin(winningCombos);
            inRoundClick ++;
            console.log(board);
        };
        console.log(p2.avatar);
            boardArea.addEventListener('click', function(event) {
                clicked = event.target;
                console.log('clicked: '+clicked.getAttribute('boxId'));
                boxId = clicked.getAttribute('boxId');
                //checks to make sure box is empty
                if (board[boxId]===''){
                    //checks to see whose turn it is
                    if ((round + inRoundClick)%2===0){
                        console.log(p1.avatar);
                        mark = p1.avatar;
                        markBoard();
                        if(p2.avatar === String.fromCodePoint(0x1F916)){
                            roboDefense();
                        }
                    } else {
                        mark = p2.avatar;
                        markBoard();
                    }
                    }
                })     
    })();
           