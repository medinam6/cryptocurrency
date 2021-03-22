function random(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function createBoard(row, col, bombs){
    let board = [];
    let mineLocation = [];

    for (let x = 0; x < row; x++) {
      let subCol = [];
      for (let y = 0; y < col; y++) {
        subCol.push({
          value: 0,
          x: x,
          y: y,
          className: 'cells'
        });
      }
      board.push(subCol);
    }

    let minesCount = 0;
    while (minesCount < bombs) {
      let x = random(0, row - 1);
      let y = random(0, col - 1);
      if (board[x][y].value === 0) {
        board[x][y].value = "X";
        mineLocation.push([x, y]);
        minesCount++;
      }
    }
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (board[i][j].value === "X") {
          continue;
        }
        if (i > 0 && board[i - 1][j].value === "X") {
          board[i][j].value++;
        }
        if (
          i > 0 &&
          j < col - 1 &&
          board[i - 1][j + 1].value === "X"
        ) {
          board[i][j].value++;
        }
        if (j < col - 1 && board[i][j + 1].value === "X") {
          board[i][j].value++;
        }
        if (
          i < row - 1 &&
          j < col - 1 &&
          board[i + 1][j + 1].value === "X"
        ) {
          board[i][j].value++;
        }
        if (i < row - 1 && board[i + 1][j].value === "X") {
          board[i][j].value++;
        }
        if (
          i < row - 1 &&
          j > 0 &&
          board[i + 1][j - 1].value === "X"
        ) {
          board[i][j].value++;
        }
        if (j > 0 && board[i][j - 1].value === "X") {
          board[i][j].value++;
        }
        if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
          board[i][j].value++;
        }
      }
    }
    return { board, mineLocation };
  };