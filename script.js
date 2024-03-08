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




function GameEngine(p1 = "player11", p2 = "player22") {
  players = [{
    name: p1,
    token: "X"
  },
  {
    name: p2,
    token: "O"
  }];
  console.log("ile razy game engine")
  board = Gameboard();

  let activePlayer = players[0];

  const switchTurns = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  
  const playRound = (row, column) => {
    console.log(`Droping token ${getActivePlayer().name} into row ${row} and column ${column}`)
    board.dropToken(row, column, getActivePlayer().token)
    
    board1 = board.printBoard();
    const arr = board1.map(row => row.find(elem => elem === ""))
    console.log("remis", arr)

    if(!!board1[0][0] && board1[0][0] === board1[1][1] && board1[1][1] === board1[2][2]){
      console.log (`Player ${getActivePlayer().name} won`)
      ScoreHandler().getWinner(getActivePlayer().token, getActivePlayer().name, players)

    }else if (!!board1[0][2] && board1[0][2] === board1[1][1] && board1[1][1] === board1[2][0]){
      console.log (`Player ${getActivePlayer().name} won`)
      ScoreHandler().getWinner(getActivePlayer().token, getActivePlayer().name, players)
    }else if (arr[0] === undefined && arr[1] === undefined && arr[2] === undefined){
      ScoreHandler().getDraw(players);
    }
    

    for(let i = 0; i < board1.length; i++){
      if (!!board1[i][0] && board1[i][0] === board1[i][1] && board1[i][1] === board1[i][2]){
        console.log (`Player ${getActivePlayer().name} won`)
        ScoreHandler().getWinner(getActivePlayer().token, getActivePlayer().name, players)
      }else if (!!board1[0][i] && board1[0][i] === board1[1][i] && board1[1][i] === board1[2][i]){
        console.log (`Player ${getActivePlayer().name} won`)
        ScoreHandler().getWinner(getActivePlayer().token, getActivePlayer().name, players)
      }
    }


    switchTurns();
    printNewRound();

  };

  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard };

}


function DisplayHandler(playerName1, playerName2) {
  const game = GameEngine(playerName1, playerName2);
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
    e.preventDefault();
    const buttonRow = e.target.dataset.row;
    const buttonColumn = e.target.dataset.column;
    

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
    const dialog = document.getElementById("number1");
    const closeButton = document.querySelector("dialog button");
    dialog.showModal();

    const form = document.getElementById("get-input")

    form.addEventListener("submit", e => {
      e.preventDefault()
      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;
      DisplayHandler(player1, player2)
      dialog.close();
      
    }
    
    )

    
  }

    const refresh = document.getElementById("refresh")
    const dialog2 = document.getElementById("number2")
    const winner = document.getElementById("winner")
  const getWinner = (token, name, players) => {
    // const player1Score = document.querySelector(".score-left")
    // const player2Score = document.querySelector(".score-right")
 
      winner.textContent=`The winner is ${name}`
      dialog2.showModal();
      refresh.addEventListener("click", () => location.reload());

     
    }
  
  const getDraw = (players) => {
    winner.textContent=`There is a draw between ${players[0].name} and ${players[1].name} `
    dialog2.showModal();
    refresh.addEventListener("click", () => location.reload());
  }

    // DisplayHandler(players[0].name, players[1].name)

  
  return {getInput, getWinner, getDraw}
  
}



ScoreHandler().getInput();