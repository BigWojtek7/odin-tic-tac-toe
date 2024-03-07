function Gameboard() {
  const rows = 3;
  const columns = 3;

  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }  


  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    if (board[row][column].getValue() === 0){
      board[row][column].addToken(player);
    }
  };

  const printBoard = () => {
    const boardWithTokens = board.map(row => row.map (cell => cell.getValue()))
    console.log(boardWithTokens);
    return boardWithTokens
  };

  return {getBoard, dropToken, printBoard};
}




function Cell() {
  let value = 0;

  const addToken = (player) => value = player;

  const getValue = () => value;

  return {addToken, getValue};
}




function GameEngine() {
  players = [{
    name: "player one",
    token: 1
  },
  {
    name: "player two",
    token: 2
  }];

  board = Gameboard();

  let activePlayer = players[0];

  const switchTurns = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

  const getActivePlayer = () => activePlayer;
  console.log(activePlayer.name)

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  
  const playRound = (row, column) => {
    console.log(`Droping token ${getActivePlayer().name} into row ${row} and column ${column}`)
    board.dropToken(row, column, getActivePlayer().token)

    board1 = board.printBoard()

    if(board1[0][0] !== 0 && board1[0][0] === board1[1][1] && board1[1][1] === board1[2][2]){
      console.log (`Player ${getActivePlayer().name} won`)
    }else if (board1[0][2] !== 0 && board1[0][2] === board1[1][1] && board1[1][1] === board1[2][0]){
      console.log (`Player ${getActivePlayer().name} won`)
    }
    

    for(let i = 0; i<3; i++){
      if (board1[i][0] !== 0 && board1[i][0] === board1[i][1] && board1[i][1] === board1[i][2]){
        console.log (`Player ${getActivePlayer().name} won`)
      }else if (board1[0][i] !== 0 && board1[0][i] === board1[1][i] && board1[1][i] === board1[2][i]){
        console.log (`Player ${getActivePlayer().name} won`)
      }
    }


    switchTurns();
    printNewRound();

  };

  printNewRound();

  return {playRound, getActivePlayer, board: board.getBoard()}

}


function DisplayHandler() {
  const game = GameEngine()

  const playerTurnDiv = document.querySelector(".turn")
  const boardDiv = document.querySelector(".board")

  const board = game.getBoard();
  const activePlayer = game.getActivePlayer();

  playerTurnDiv.textContent = `${activePlayer.name}'s turn`

  board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cellButton = document.createElement("button")
      cellButton.classList.add("cell")

      cellButton.dataset.row = rowIndex;
      cellButton.dataset.column = columnIndex;

      cellButton.textContent = column.getValue();

      boardDiv.appendChild(cellButton);

    });   
  });
}

DisplayHandler()