// Define the pieces and board
let board = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

let offsetX;
let offsetY;

let moves = [ // All moves made in ChatGpt vs Stockfish
  {from: [6, 4], to: [4, 4]},
  {from: [1, 4], to: [3, 4]},
  {from: [7, 6], to: [5, 5]},
  {from: [0, 1], to: [2, 2]},
  {from: [7, 5], to: [3, 1]},
  {from: [1, 0], to: [2, 0]},
  {from: [3, 1], to: [4, 0]},
  {from: [0, 6], to: [2, 5]},
  {
    castling: true,
    king: { from: [7, 4], to: [7, 6] }, 
    rook: { from: [7, 7], to: [7, 5] }  
  },
  {
    castling: true,
    king: { from: [0, 4], to: [0, 6] },
    rook: { from: [0, 7], to: [0, 5]},
    captured: { position: [0, 5], piece: 'B' } // Captured piece during castling
  },
  {
    from: [4, 0], to: [2, 2] ,
    captured: { position: [2, 2], piece: 'N'}
  }

];
let currentMoveIndex = -1; // tracks the current move

function setup() {
  createCanvas(820, 820);
  offsetX = (width - 400) / 2; 
  offsetY = (height - 400) / 2;
  drawBoard();
}

function drawButtons() {
  let nextButtonX = offsetX + 500; 
  let buttonY = offsetY + 450; 
  fill(200);
  rect(nextButtonX, buttonY, 80, 40); 
  text('Next', nextButtonX + 40, buttonY + 20);

  let prevButtonX = offsetX + 400;
  rect(prevButtonX, buttonY, 80, 40); 
  text('Prev', prevButtonX + 40, buttonY + 20);
}

function drawBoard() {
  background(48, 46, 43); // Redraw the background

  let numSquares = 8;
  let squareSize = 400 / numSquares;
  let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let offsetX = (width - 400) / 2;
  let offsetY = (height - 400) / 2;

  textSize(16);
  textAlign(CENTER, CENTER);

  // Draw the letters and numbers outside of the main loop
  for (let i = 0; i < numSquares; i++) {
    // Set fill color for side letters
    if (i % 2 == 0) {
      fill(126, 151, 92);
    } else {
      fill(255);
    }
    text(letters[i], offsetX - 20, offsetY + i * squareSize + squareSize / 2);

    // Set fill color for top numbers
    if (i % 2 == 0) {
      fill(126, 151, 92);
    } else {
      fill(255);
    }
    let numberPosStr = str((i + 2) - 1);
    text(numberPosStr, offsetX + i * squareSize + squareSize / 2, offsetY - 20);
  }
  // Draw the squares and pieces
  for (let i = 0; i < numSquares; i++) {
    for (let j = 0; j < numSquares; j++) {
      // Draw the squares
      if ((i + j) % 2 == 0) {
        fill(255);
      } else {
        fill(126, 151, 92);
      }
      rect(i * squareSize + offsetX, j * squareSize + offsetY, squareSize, squareSize);
      let piece = board[j][i];
      if (piece) {
        fill(0); 
        text(piece, i * squareSize + offsetX + squareSize / 2, j * squareSize + offsetY + squareSize / 2);
      }
    }
  }
  noFill();
  rect(offsetX, offsetY, 400, 400); // Draw the outline around the chessboard
  drawButtons();
}

// Move Piece
function movePiece(currentRow, currentCol, newRow, newCol) {
  // Get the piece from the current position
  let piece = board[currentRow][currentCol];

  // Check if the piece exists and the new position is within the board
  if (piece && newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
    board[newRow][newCol] = piece;
    board[currentRow][currentCol] = '';
  }
}

// Checks if button was pressed
function mousePressed() {
  let buttonY = offsetY + 450;
  let nextButtonX = offsetX + 500;
  let prevButtonX = offsetX + 400;

  // Next button pressed
  if (mouseX > nextButtonX && mouseX < nextButtonX + 80 &&
      mouseY > buttonY && mouseY < buttonY + 40) {
    if (currentMoveIndex < moves.length - 1) {
      currentMoveIndex++;
      performMove(moves[currentMoveIndex]);
    }
  }

  // Previous button pressed
  if (mouseX > prevButtonX && mouseX < prevButtonX + 80 &&
      mouseY > buttonY && mouseY < buttonY + 40) {
    if (currentMoveIndex >= 0) {
      undoMove(moves[currentMoveIndex]);
      currentMoveIndex--;
    }
  }
}

// Performs next move
function performMove(move) {
  if (move.castling) {
    // Handle castling move
    moveKingAndRookForCastling(move.king, move.rook);

    // Handle rook capturing a piece during castling
    if (move.capture) {
      board[move.capture.position[0]][move.capture.position[1]] = ''; // Capture the piece
    }
  } else {
    // Standard move handling
    let piece = board[move.from[0]][move.from[1]];
    board[move.to[0]][move.to[1]] = piece;
    board[move.from[0]][move.from[1]] = '';
  }
  drawBoard(); 
}



// Moves Rook and King in one move when button is pressed
function moveKingAndRookForCastling(kingMove, rookMove) {
  let kingPiece = board[kingMove.from[0]][kingMove.from[1]];
  board[kingMove.to[0]][kingMove.to[1]] = kingPiece;
  board[kingMove.from[0]][kingMove.from[1]] = '';

  let rookPiece = board[rookMove.from[0]][rookMove.from[1]];
  board[rookMove.to[0]][rookMove.to[1]] = rookPiece;
  board[rookMove.from[0]][rookMove.from[1]] = '';
}

function undoMove(move) {
  if (move.castling) {
    // Undo castling move
    undoKingAndRookForCastling(move.king, move.rook);

    // If there was a capture during castling, restore the captured piece
    if (move.captured) {
      board[move.captured.position[0]][move.captured.position[1]] = move.captured.piece;
    }
  } else {
    // Undo a standard move
    let piece = board[move.to[0]][move.to[1]];
    board[move.from[0]][move.from[1]] = piece;

    if (move.captured) {
      board[move.to[0]][move.to[1]] = move.captured;
    } else {
      board[move.to[0]][move.to[1]] = '';
    }
  }
  drawBoard(); 
}




function undoKingAndRookForCastling(kingMove, rookMove) {
  // Move the king back to its original position
  let kingPiece = board[kingMove.to[0]][kingMove.to[1]];
  board[kingMove.from[0]][kingMove.from[1]] = kingPiece;
  board[kingMove.to[0]][kingMove.to[1]] = '';

  // Move the rook back to its original position
  let rookPiece = board[rookMove.to[0]][rookMove.to[1]];
  board[rookMove.from[0]][rookMove.from[1]] = rookPiece;
  board[rookMove.to[0]][rookMove.to[1]] = '';
}


