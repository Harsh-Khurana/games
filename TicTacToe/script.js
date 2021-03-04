const blocks = document.getElementsByClassName('block'),
    message = document.querySelector('.message');

// v -> tracks moves played so far
// -1 -> no move made at this position
const v = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

// checks if the pattern is winning one or not
const checkEquality = (i, j, movei, movej) =>{
    while(i < 3 && j < 3){
        if(v[i][j] == -1 || (i+movei < 3 && j+movej < 3 && v[i][j] != v[i+movei][j+movej])){
            return false;
        }
        i += movei;
        j += movej;
    }
    return true;
}

// checks all the winning patterns
const didWin = () =>{
    return checkEquality(0, 0, 0, 1) ||
            checkEquality(1, 0, 0, 1) ||
            checkEquality(2, 0, 0, 1) ||
            checkEquality(0, 0, 1, 0) ||
            checkEquality(0, 1, 1, 0) ||
            checkEquality(0, 2, 1, 0) ||
            checkEquality(0, 0, 1, 1) ||
            checkEquality(0, 2, 1, -1);
}

// prints the message on draw or if someone wins the game
const printMessage = (s) =>{
    message.innerText = s + ', page will reload in few seconds';
    setTimeout(()=>{
        location.reload()
    }, 5000);
}

// turn handles the player turn 0 or 1 corrosponds to O && X resp.
// finished checks whether someone wins and game has ended
// total_moves counts the total moves played, if they are 9 then game is a draw
let turn = 1, finished = false, total_moves = 0;

for(let block of blocks){
    block.addEventListener('click', (e)=>{
        // checks whether the game is already finished
        if(finished) return;
        // retrives the target cell as a string from id of cell/block clicked
        let blockNo = e.target.id.slice(-2);
        let i = parseInt(blockNo[0]), j = parseInt(blockNo[1]);
        // if the block is empty then fill it with cur move
        if(v[i][j] === -1){
            v[i][j] = turn;
            total_moves++;
        }else{
            alert('wrong move');
            return;
        }
        // if its player1's turn then block become X and O otherwise
        if(turn === 1){
            e.target.innerText = 'X'
            turn = 0;
        }else{
            e.target.innerText = 'O'
            turn = 1;
        }
        finished = didWin();
        if(finished) printMessage(`Player ${turn+1} wins the game`)
        else if(total_moves === 9) printMessage(`It's a draw`)
    })
}