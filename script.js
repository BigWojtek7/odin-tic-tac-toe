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
    if (board[row][column].getValue() === ""){
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
  let value = "";

  const addToken = (player) => value = player;

  const getValue = () => value;

  return {addToken, getValue};
}




function GameEngine() {
  players = [{
    name: "player one",
    token: "X"
  },
  {
    name: "player two",
    token: "O"
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

    if(!!board1[0][0] && board1[0][0] === board1[1][1] && board1[1][1] === board1[2][2]){
      console.log (`Player ${getActivePlayer().name} won`)
    }else if (!!board1[0][2] && board1[0][2] === board1[1][1] && board1[1][1] === board1[2][0]){
      console.log (`Player ${getActivePlayer().name} won`)
    }
    

    for(let i = 0; i < board1.length; i++){
      if (!!board1[i][0] && board1[i][0] === board1[i][1] && board1[i][1] === board1[i][2]){
        console.log (`Player ${getActivePlayer().name} won`)
      }else if (!!board1[0][i] && board1[0][i] === board1[1][i] && board1[1][i] === board1[2][i]){
        console.log (`Player ${getActivePlayer().name} won`)
      }
    }


    switchTurns();
    printNewRound();

  };

  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard };

}


function DisplayHandler() {
  const game = GameEngine();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateDisplay = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;

        if (column.getValue()=== "X"  ){
          cellButton.style.background = "green"
          cellButton.disabled = true;
        }else if (column.getValue()=== "O"){
          cellButton.style.background = "red"
          cellButton.disabled = true;
        }
        cellButton.textContent = column.getValue();

        boardDiv.appendChild(cellButton);
        

      });   
    });
  }

  function clickHandler(e){
    const buttonRow = e.target.dataset.row;
    const buttonColumn = e.target.dataset.column;
    
    console.log(e.target)
    console.log(e.currentTarget)
    if(!buttonRow) return;
    if(!buttonColumn) return;
  
    game.playRound(buttonRow, buttonColumn)
    updateDisplay()
  }
  
  boardDiv.addEventListener("click", clickHandler);
  updateDisplay();
  
}

function ScoreHandler(){

  const getInput = () => {
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");
    dialog.showModal();

    const form = document.getElementById("get-input")

    form.addEventListener("submit", e => {
      e.preventDefault()
      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;
      dialog.close();
      return player1, player2;
    }
    
    )

    console.log(player1, player2)

    // closeButton.addEventListener("click", () => dialog.close());
    
  }

  const getWinner = () => {
  }
  return {getInput}
}

ScoreHandler().getInput()

DisplayHandler()