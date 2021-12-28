const board = document.querySelector('main');
const infoTexts = document.querySelectorAll('#info span');
const reload = document.querySelector('a');

const didPlayerWin = () =>{
    const moves = Array.from(document.querySelectorAll('main div')).map(move=>move.textContent);
    return(
        (moves[0] && moves[1] && moves[2] && (moves[0] === moves[1]) && (moves[1] === moves[2])) ||
        (moves[3] && moves[4] && moves[5] && (moves[3] === moves[4]) && (moves[4] === moves[5])) ||
        (moves[6] && moves[7] && moves[8] && (moves[6] === moves[7]) && (moves[7] === moves[8])) ||
        (moves[0] && moves[3] && moves[6] && (moves[0] === moves[3]) && (moves[3] === moves[6])) ||
        (moves[1] && moves[4] && moves[7] && (moves[1] === moves[4]) && (moves[4] === moves[7])) ||
        (moves[2] && moves[5] && moves[8] && (moves[2] === moves[5]) && (moves[5] === moves[8])) ||
        (moves[0] && moves[4] && moves[8] && (moves[0] === moves[4]) && (moves[4] === moves[8])) ||
        (moves[2] && moves[4] && moves[6] && (moves[2] === moves[4]) && (moves[4] === moves[6]))
    );
}

let i = 0;
board.addEventListener('click', e=>{
    if(e.target.textContent || isNaN(i)) return;
    e.target.textContent = (i%2 == 0) ? 'X' : 'O';
    i++;
    if(didPlayerWin()){
        infoTexts[(i+1)%2].classList.add('winner');
        infoTexts[i%2].classList.add('loser');
        reload.style.visibility = 'visible';
        i = NaN;
    }
})