let currentPlayer = 'X';
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let gameActive = true;

const checkWin = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[Math.floor(a / 3)][a % 3] && gameBoard[Math.floor(a / 3)][a % 3] === gameBoard[Math.floor(b / 3)][b % 3] && gameBoard[Math.floor(a / 3)][a % 3] === gameBoard[Math.floor(c / 3)][c % 3]) {
      return gameBoard[Math.floor(a / 3)][a % 3];
    }
  }

  return null;
};

const checkDraw = () => {
  for (let row of gameBoard) {
    for (let cell of row) {
      if (!cell) {
        return false;
      }
    }
  }
  return true;
};

const endGame = (winner) => {
  gameActive = false;
  if (winner) {
    $('#message').text(`Player ${winner} wins!`);
  } else {
    $('#message').text(`The game is a draw.`);
  }
};

const makeMove = (row, col) => {
  if (!gameActive || gameBoard[row][col]) {
    return;
  }

  gameBoard[row][col] = currentPlayer;
  $('#game-board').find('.row').eq(row).find('.cell').eq(col).text(currentPlayer);

  const winner = checkWin();
  if (winner) {
    endGame(winner);
  } else if (checkDraw()) {
    endGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gameActive = true;

  $('#message').text('');
  $('.cell').text('');
};

$(document).ready(function() {
  $('.cell').click(function() {
    const row = $(this).parent().index();
    const col = $(this).index();
    makeMove(row, col);
  });

  $('button').click(function() {
    resetGame();
  });
});
