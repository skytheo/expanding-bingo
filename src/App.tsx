import React, { useEffect, useState } from 'react';

const App = () => {
  const [size, setSize] = useState(0)
  const [whoWon, setWhoWon] = useState(-1);
  const [moves, setMoves] = useState(0);
  const [player, setPlayer] = useState(0);
  const [board, setBoard] = useState<number[][]>([]);
  const [numPlayers, setNumPlayers] = useState(0);

  useEffect(() =>setBoard(Array.from({ length: size }, () => Array.from({ length: size }, () => -1))), [size]);
  
  const changeSize = (event:any) => {
    setSize(event.target.value);
  };

  const changeNumPlayers = (event:any) => {
    setNumPlayers(event.target.value)
  };
  
  function checkForWinner(){
    let winner = -1;
    for(let i=0;i<size;i++){
        let row=-1;
        let col=-1;
        for(let j=0;j<size;j++){
            if(j===0){
                row = board[i][j];
                col = board[j][i];
            }
            if(board[i][j]!==row){
                row = -1;
            }
            if(board[j][i]!==col){
                col = -1;
            }
            if(j === size -1 ){
                if(row > -1){
                    winner = row;
                } 
                else if(col > -1){
                    winner = col;                    
                }
            }
        }
    }
            
    let downR = -1;
    let upL = -1;
    for(let i=0, j =size-1;i<size&& j>=0;i++,j--){
        if(i === 0){
            downR = board[0][0];
            upL = board[0][size-1];
        }
        if(board[i][i]!== downR){
            downR = -1;
        }
        if(board[i][j]!== upL){
            upL = -1;
        }
        if(i===size-1){
            if(downR !== -1){
                winner = downR;
            }
            else if(upL !== -1){
                winner = upL;
            }
        }
    }

    if(moves === (size*size)){
        winner = Number.MAX_SAFE_INTEGER;
    }
    if(winner !== -1){
        setWhoWon(winner);
    }
  }
  
  function setCell(i: number, j:number){
    board[i][j] = player; 
    setPlayer(player === numPlayers -1 ? 0: player+1); 
    setMoves(moves+1);
    checkForWinner()
  }

  return (
    <>
    <div>
      <div>Players: <input type="number" onChange={changeNumPlayers} disabled={numPlayers > 0}/></div>
      <div>Size: <input type="number" onChange={changeSize} disabled={numPlayers ===0 || size > 0}/></div>
      {size > 0 && numPlayers > 0 && size >= numPlayers&& <p>Moves: {moves}</p>}
      {size < numPlayers && size > 0 && <p>You have a smaller board than number of players, not everyone will get to play, try another size.</p>}
    </div>
    {size > 0 && numPlayers > 0 && size >= numPlayers&&
      <>
        <div className="row">
          {board.map((row, i) => (
            <div>
              {row.map((cell, j) => {
                return (
                  <button onClick={() => { setCell(i, j); } } disabled={whoWon !== -1 || cell !== -1}> {cell === -1 ? ' -' : cell} </button>
                );
              })}
            </div>
          ))};
        </div>
          <div>
            {whoWon === -1 ?
              'Next Move' :
              whoWon === Number.MAX_SAFE_INTEGER ?
                'Game Over No One Wins' :
                'Game Over Player ' + player + ' Wins'}
          </div>
        </>
    }
    {whoWon !== -1 && <button onClick={() => {setSize(0); setMoves(0); setNumPlayers(0); setWhoWon(-1)}}>reset</button>}
  </>
  )
}

export default App;
