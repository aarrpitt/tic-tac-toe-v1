//alert('hello');
var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

//following function calls turn function
function turnClick(square) {
    if(typeof origBoard[square.target.id]=='number'){
        turn(square.target.id, huPlayer)
        if(!checkTie()) turn(bestSpot(),aiPlayer);
    }
	
}
//this function gets the id of the square box that got clicked and changes the text on that id to whatever sign player has
function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
    let gameWon=checkWin(origBoard,player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(board, player){
    //reduce function used to bring all elements of board filled till now
    let plays=board.reduce((a,e,i)=>
    //a-accumulator, it is the value you will get in the end
    //e==element int the board,i=index
    
    (e===player)?(a.concat(i)):a,[]);
    let gameWon=null;
    //we traverse through each index to see if player has got any winning pattern
    for(let [index,win] of winCombos.entries()){
        if(win.every(elem=>plays.indexOf(elem)>-1)){
            gameWon={index:index,player:player};
            break;
        }
    }
    return gameWon;
    }
//if we won all winning blokcs wiill be colored blue by first loop
// second loop se you will stop clicking further after winning the game
function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=gameWon.player==huPlayer?"blue":"red";
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false);
    }

    declareWinner(gameWon.player==huPlayer?"You win!":"You lose :(");
    }

    //bestSpot


    function declareWinner(who){
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText=who;

    }
    function emptySquares(){
        return origBoard.filter(s=> typeof s=='number');
    }
    function bestSpot(){
        return minimax(origBoard,aiPlayer).index;
    }

    function checkTie(){
        if(emptySquares().length==0){
            for(var i=0;i<cells.length;i++){
                cells[i].style.backgroundColor="green";
                cells[i].removeEventListener('click',turnClick,false);
            
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;}

    function minimax(newBoard, player) {
        var availSpots = emptySquares();
    
        if (checkWin(newBoard, huPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
    
            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }
    
            newBoard[availSpots[i]] = move.index;
    
            moves.push(move);
        }
    
        var bestMove;
        if(player === aiPlayer) {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        return moves[bestMove];
    }
    //minmax algorithm- acche se pdhlo





