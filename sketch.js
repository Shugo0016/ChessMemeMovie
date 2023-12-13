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

let lastSpawn = null;
let whitePawn, blackPawn, whiteKnight, blackKnight, whiteRook, blackRook,
    whiteQueen, blackQueen, whiteKing, blackKing, whiteBishop, blackBishop;

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
    from: [4, 0], to: [2, 2],
    captured: { position: [2, 2], piece: 'N'}
  },
  {
    from: [1, 3], to: [2, 2],
    captured: { position: [2,2], piece: 'b'}
  }, 
  {from: [7, 5], to: [7, 4]},
  {from: [6, 3], to: [5, 3]},
  {
    spawn: {value: true, position: [2, 3], piece: "P"}
  },
  {from: [7,1], to: [6,3]},
  {from: [2,5], to: [1,3]},
  {from: [6,3], to: [7,5]},
  {from: [1,3], to: [2,5]},
  {from: [7,2], to: [3,6]},
  {from: [1,7], to: [2,7]},
  {from: [3,6], to: [4,7]},
  {from: [1,6], to: [3,6]},
  {
    from: [5,5], to: [3,6],
    captured: {position: [3,6], piece: "P"}
  },
  {
    from: [2,7], to: [3,6],
    captured: {position: [3,6], piece: "n"}
  },
  {
    from: [4,7], to: [3,6],
    captured: {position: [3,6], piece: "P"}
  },
  {
    from: [2,5], to: [3,6],
    captured: {position: [3,6], piece: "b"}
  },
  {from: [5,3], to: [4,3]},
  {
    from: [3,4], to: [4,3],
    captured: {position: [4,3], piece: "P"}
  },
  {from: [6,5], to: [4,5]},
  {from: [0,3], to: [4,7]},
  {
    from: [4,5], to: [3,6],
    captured: {position: [3,6], piece: "N"}
  },
  {from: [4,7], to: [7,7]},
  {
    from: [7,6], to: [7,7],
    captured: {position: [7,7], piece: "Q"}
  },
  {
    spawn: {value: true, position: [5, 5], piece: "N"}
  },
  {
    from: [7,3], to: [5,5],
    captured: {position: [5,5], piece: "N"}
  },
  {
    spawn: {value: true, position: [5, 5], piece: "Q"}
  },
  {
    from: [6,6], to: [5,5],
    captured: {position: [5,5], piece: "Q"}
  },
  {
    spawn: {value: true, position: [2, 5], piece: "N"}
  },
  {
    from: [3,6], to: [2,5],
    captured: {position: [2,5], piece: "N"}
  },
  {
    spawn: {value: true, position: [2, 5], piece: "P"}
  },
  {from: [7,5], to: [5,6]},
  {from: [0,6], to: [0,7]},
  {from: [7,0], to: [7,3]},
  {from: [0,5], to: [0,6]},
  {
    from: [7,3], to: [4,3],
    captured: {position: [4,3], piece: "P"}
  },
  {
    from: [0,6], to: [4,3],
    captured: {position: [4,3], piece: "r"}
  },
  {from: [7,4], to: [6,4]},
  {from: [4,3], to: [7,6]},
  {
    from: [7,7], to: [7,6],
    captured: {position: [7,6], piece: "R"}
  },
  {
    spawn: {value: true, position: [6, 6], piece: "R"}
  },
  {
    from: [6,4], to: [6,6],
    captured: {position: [6,6], piece: "R"}
  },
  {from: [0,7], to: [1,6]},
  {from: [5,6], to: [3,7]},
  {from: [1,6], to: [0,7]},
  {
    from: [3,7], to: [2,5],
    captured: {position: [2,5], piece: "P"}
  },
  {
    spawn: {value: true, position: [2, 5], piece: "P"}
  },
  {from: [6,1], to: [4,1]},
  {from: [2,0], to: [3,0]},
  {
    from: [4,1], to: [3,0],
    captured: {position: [3,0], piece: "P"}
  },
  {
    from: [1,1], to: [3,0],
    captured: {position: [3,0], piece: "p"}
  },
  {from: [7,6], to: [6,5]},
  {from: [0,7], to: [1, 4]},
  {from: [6,7], to: [4, 7]},
  {
    spawn: {value: true, position: [3, 7], piece: "P"}
  },
  {from: [6,6], to: [0, 6]},
  {
    from: [0,0], to: [0,6],
    captured: {position: [0,6], piece: "r"}
  },
  {from: [6,5], to: [5, 4]},
  {from: [1,4], to: [1, 3]},
  {from: [5,4], to: [4, 3]},
  {
    from: [1,3], to: [2,2],
    captured: {position: [2,2], piece: "P"}
  },
  {from: [4,3], to: [5, 3]},
  {from: [2,2], to: [3, 3]},
  {
    from: [4,4], to: [3,3],
    captured: {position: [3,3], piece: "K"}
  },

];
let currentMoveIndex = -1; // tracks the current move

function preload() {
  whitePawn = loadImage('ChessPieces/WhitePawn.png', () => {
      console.log("White pawn loaded successfully");
  }, (err) => {
      console.error("Failed to load white pawn", err);
  });

  whiteKnight = loadImage('ChessPieces/WhiteKnight.png', () => {
    console.log("White Knight loaded successfully");
}, (err) => {
    console.error("Failed to load white knight", err);
});

whiteBishop = loadImage('ChessPieces/WhiteBishop.png', () => {
  console.log("White Bishop loaded successfully");
}, (err) => {
  console.error("Failed to load white bishop", err);
});

whiteRook = loadImage('ChessPieces/WhiteRook.png', () => {
  console.log("White Rook loaded successfully");
}, (err) => {
  console.error("Failed to load white rook", err);
});

whiteKing = loadImage('ChessPieces/WhiteKing.png', () => {
  console.log("White king loaded successfully");
}, (err) => {
  console.error("Failed to load white king", err);
});

whiteQueen = loadImage('ChessPieces/WhiteQueen.png', () => {
  console.log("White queen loaded successfully");
}, (err) => {
  console.error("Failed to load white queen", err);
});

blackPawn = loadImage('ChessPieces/BlackPawn.png', () => {
  console.log("black pawn loaded successfully");
}, (err) => {
  console.error("Failed to load black pawn", err);
});

blackQueen = loadImage('ChessPieces/BlackQueen.png', () => {
  console.log("black queen loaded successfully");
}, (err) => {
  console.error("Failed to load black queen", err);
});

blackKing = loadImage('ChessPieces/BlackKing.png', () => {
  console.log("black king loaded successfully");
}, (err) => {
  console.error("Failed to load black King", err);
});

blackRook = loadImage('ChessPieces/BlackRook.png', () => {
  console.log("black rook loaded successfully");
}, (err) => {
  console.error("Failed to load black Rook", err);
});

blackBishop = loadImage('ChessPieces/BlackBishop.png', () => {
  console.log("black bishop loaded successfully");
}, (err) => {
  console.error("Failed to load black bishop", err);
});

blackKnight = loadImage('ChessPieces/BlackKnight.png', () => {
  console.log("black knight loaded successfully");
}, (err) => {
  console.error("Failed to load black knight", err);
});

}

let pieceImages;

function setup() {
  createCanvas(820, 820);
  offsetX = (width - 400) / 2; 
  offsetY = (height - 400) / 2;

  pieceImages = {
    'P': blackPawn,
    'p': whitePawn,
    'N': blackKnight,
    'n': whiteKnight,
    'b': whiteBishop,
    'B': blackBishop,
    'q': whiteQueen,
    'Q': blackQueen,
    'k': whiteKing,
    'K': blackKing,
    'r': whiteRook,
    'R': blackRook,
    // ... add other mappings
  };

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
        // Draw the square
        if ((i + j) % 2 == 0) {
            fill(255);
        } else {
            fill(126, 151, 92);
        }
        rect(i * squareSize + offsetX, j * squareSize + offsetY, squareSize, squareSize);

        // Draw the piece
        let piece = board[j][i];
        
        if (piece) {
            let pieceImage = pieceImages[piece];
            console.log("Piece character:", piece);
            console.log("Image object:", pieceImages[piece]);
            if (pieceImage) {
                console.log("Piece Image", pieceImage);
                image(pieceImage, i * squareSize + offsetX, j * squareSize + offsetY, squareSize, squareSize);
            }
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
  console.log("Performing move:", move);
  if (move.castling) {
    // Handle castling move
    moveKingAndRookForCastling(move.king, move.rook);
  }
  else if (move.spawn && move.spawn.value) {
      console.log("Spawning piece:", move.spawn);
      spawnPiece(move.spawn);
      console.log("Board state after spawning:", board);
  }
  else {
    // Standard move handling
    let piece = board[move.from[0]][move.from[1]];

    // Handle capturing a piece
    if (move.captured) {
      // Remove the captured piece
      board[move.captured.position[0]][move.captured.position[1]] = '';
    }
    board[move.to[0]][move.to[1]] = piece;
    board[move.from[0]][move.from[1]] = '';
  }
  drawBoard(); 
}

// Spawns piece at specific location on the board 
function spawnPiece(pieceToSpawn) {
  let spawnLocationX = pieceToSpawn.position[0];
  let spawnLocationY = pieceToSpawn.position[1];

  // Store the current state before spawning the new piece
  lastSpawn = {
    position: [spawnLocationX, spawnLocationY],
    previousPiece: board[spawnLocationX][spawnLocationY] // Store the piece originally at the spawn location
  };

  board[spawnLocationX][spawnLocationY] = pieceToSpawn.piece;
}

function undoSpawnPiece() {
  if (lastSpawn) {
    let spawnLocationX = lastSpawn.position[0];
    let spawnLocationY = lastSpawn.position[1];
    board[spawnLocationX][spawnLocationY] = lastSpawn.previousPiece;
  }
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
  } else if (move.spawn && move.spawn.value) {
    // Undo spawn move
    undoSpawnPiece();
  } else {
    if (move.to && move.from) {
      let piece = board[move.to[0]][move.to[1]];
      board[move.from[0]][move.from[1]] = piece;

      if (move.captured) {
        board[move.to[0]][move.to[1]] = move.captured.piece;
      } else {
        board[move.to[0]][move.to[1]] = '';
      }
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


