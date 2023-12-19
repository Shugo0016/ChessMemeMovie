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

// Player setup for logo images and names
let whitePlayerName = "Stockfish";
let blackPlayerName = "ChatGPT";
let whitePlayerLogo;
let blackPlayerLogo;

let spawnHistory = [];
let lastSpawn = null;

// Variables for piece Images
let whitePawn, blackPawn, whiteKnight, blackKnight, whiteRook, blackRook,
  whiteQueen, blackQueen, whiteKing, blackKing, whiteBishop, blackBishop, 
  naniQueen;

let offsetX;
let offsetY;
let historyY;

let isNextButtonPressed = false;
let isPrevButtonPressed = false;

let scrollOffset = 0;
let dragging = false;
let startY;

let player;


// Variables for Sound Effects
let moveSound, regularMoveSound, castleMoveSound, capturedMoveSound, SpawnMoveSound, 
naniMoveSound, backMoveSound, nahMoveSound, darthSound, betrayalMoveSound, victorySound;

let moveHistory = [];
let moves = [ // All moves made in ChatGpt vs Stockfish
  { from: [6, 4], to: [4, 4] }, // 1
  { from: [1, 4], to: [3, 4] }, // 2
  { from: [7, 6], to: [5, 5] }, // 3
  { from: [0, 1], to: [2, 2] }, // 4
  { from: [7, 5], to: [3, 1] }, // 5
  { from: [1, 0], to: [2, 0] },
  { from: [3, 1], to: [4, 0] },
  { from: [0, 6], to: [2, 5] },
  {
    castling: true,
    king: { from: [7, 4], to: [7, 6] },
    rook: { from: [7, 7], to: [7, 5] }
  }, // 9
  {
    castling: true,
    king: { from: [0, 4], to: [0, 6] },
    rook: { from: [0, 7], to: [0, 5] },
    captured: { position: [0, 5], piece: 'B' } // Captured piece during castling
  }, // 10
  {
    from: [4, 0], to: [2, 2],
    captured: { position: [2, 2], piece: 'N' }
  },
  {
    from: [1, 3], to: [2, 2],
    captured: { position: [2, 2], piece: 'b' }
  },
  { from: [7, 5], to: [7, 4] },
  { from: [6, 3], to: [5, 3] },
  {
    spawn: { value: true, position: [2, 3], piece: "P" } // 15
  },
  { from: [7, 1], to: [6, 3] },
  { from: [2, 5], to: [1, 3] },
  { from: [6, 3], to: [7, 5] },
  { from: [1, 3], to: [2, 5] },
  { from: [7, 2], to: [3, 6] },
  { from: [1, 7], to: [2, 7] },
  { from: [3, 6], to: [4, 7] },
  { from: [1, 6], to: [3, 6] },
  {
    from: [5, 5], to: [3, 6],
    captured: { position: [3, 6], piece: "P" }
  },
  {
    from: [2, 7], to: [3, 6],
    captured: { position: [3, 6], piece: "n" }
  },
  {
    from: [4, 7], to: [3, 6],
    captured: { position: [3, 6], piece: "P" }
  },
  {
    from: [2, 5], to: [3, 6],
    captured: { position: [3, 6], piece: "b" }
  },
  { from: [5, 3], to: [4, 3] },
  {
    from: [3, 4], to: [4, 3],
    captured: { position: [4, 3], piece: "p" }
  },
  { from: [6, 5], to: [4, 5] },
  { from: [0, 3], to: [4, 7] },
  {
    from: [4, 5], to: [3, 6],
    captured: { position: [3, 6], piece: "N" }
  },
  { from: [4, 7], to: [7, 7] },
  {
    from: [7, 6], to: [7, 7],
    captured: { position: [7, 7], piece: "Q" }
  },
  {
    spawn: { value: true, position: [5, 5], piece: "N" }
  },
  {
    from: [7, 3], to: [5, 5],
    captured: { position: [5, 5], piece: "N" }
  },
  {
    spawn: { value: true, position: [5, 5], piece: "QN" }
  },
  {
    from: [6, 6], to: [5, 5],
    captured: { position: [5, 5], piece: "Q" }
  },
  {
    spawn: { value: true, position: [2, 5], piece: "N" }
  },
  {
    from: [3, 6], to: [2, 5],
    captured: { position: [2, 5], piece: "N" }
  },
  {
    spawn: { value: true, position: [2, 5], piece: "P" }
  },
  { from: [7, 5], to: [5, 6] },
  { from: [0, 6], to: [0, 7] },
  { from: [7, 0], to: [7, 3] },
  { from: [0, 5], to: [0, 6] },
  {
    from: [7, 3], to: [4, 3],
    captured: { position: [4, 3], piece: "P" }
  },
  {
    from: [0, 6], to: [4, 3],
    captured: { position: [4, 3], piece: "r" }
  },
  { from: [7, 4], to: [6, 4] },
  { from: [4, 3], to: [7, 6] },
  {
    from: [7, 7], to: [7, 6],
    captured: { position: [7, 6], piece: "R" }
  },
  {
    spawn: { value: true, position: [6, 6], piece: "R" }
  },
  {
    from: [6, 4], to: [6, 6],
    captured: { position: [6, 6], piece: "R" }
  },
  { from: [0, 7], to: [1, 6] },
  { from: [5, 6], to: [3, 7] },
  { from: [1, 6], to: [0, 7] },
  {
    from: [3, 7], to: [2, 5],
    captured: { position: [2, 5], piece: "P" }
  },
  {
    spawn: { value: true, position: [2, 5], piece: "P" },
    captured: { position: [2, 5], piece: "n" }
  },
  { from: [6, 1], to: [4, 1] },
  { from: [2, 0], to: [3, 0] },
  {
    from: [4, 1], to: [3, 0],
    captured: { position: [3, 0], piece: "P" }
  },
  {
    from: [1, 1], to: [3, 0],
    captured: { position: [3, 0], piece: "p" }
  },
  { from: [7, 6], to: [6, 5] },
  { from: [0, 7], to: [1, 4] },
  { from: [6, 7], to: [4, 7] },
  {
    spawn: { value: true, position: [3, 7], piece: "P" }
  },
  { from: [6, 6], to: [0, 6] },
  {
    from: [0, 0], to: [0, 6],
    captured: { position: [0, 6], piece: "r" }
  },
  { from: [6, 5], to: [5, 4] },
  { from: [1, 4], to: [1, 3] },
  { from: [5, 4], to: [4, 3] },
  {
    from: [1, 3], to: [2, 2],
    captured: { position: [2, 2], piece: "P" }
  },
  { from: [4, 3], to: [5, 3] },
  { from: [2, 2], to: [3, 3] },
  {
    from: [4, 4], to: [3, 3],
    captured: { position: [3, 3], piece: "K" }
  },

];
let currentMoveIndex = -1; // tracks the current move

const chatMessages = {
  0: "Hi I'm Stockfish :)",
  1: "Yolo BOZO",
  2: "Good Luck Have Fun",
  3: "GG's Old man",
  9: "TO EZ HERE A HANDICAP",
  10: "Uhm, alright\nBishop Takes Knight",
  11: "PATHETIC\nPAWN TAKES BISHOP",
  13: "LMAO TO EZ STILL\nI SKIP MY MOVE PUNK",
  14: "ACTUALLY NVM\nSpawn PAWN D6",
  15: "You can't just say\nSpawn Pawn d6?\n Knight to d2 ",
  16: "UR MAD CAUSE BAD",
  23: "Knight takes Pawn g5",
  24: "STUPPID\nPawn Takes Knight G5",
  25: "Bishop Takes Pawn g5",
  26: "UR BAD\nKNIGHT TAKES BISHOP G5\nTO EZ",
  27: "Uhh, the Knight does\nnot move like that",
  28: "WHATEVER KID\nI MAKE THE RULES",
  30: "QUEEN TO H4!!!",
  31: "You litterally teleported\nthrough your piece\nPawn takes Knight g5",
  32: "SO MADDDDDD\nQUUEN TO H1",
  33: "King takes Queen h1\n???????",
  34: "ALL PART OF THE PLAN\nKNIGHT BACK TO F3\nGOTTEM",
  35: "Doesn't really do anything\nQueenn takes Knight f3",
  36: "YOU ACTIVATED\nMY TRAP CARD\nQueen TAKES QUEEN F3",
  37: "what? That's just...\n Pawn takes Queen f3",
  38: "GONNA CRY ABOUT IT\n????????",
  39: "I have no words\nPawn takes Knight f6",
  40: "MY PAWN KNOW\n PAWN REPLACES PAWN f6",
  41: "Why do I bother",
  45: "Rook Takes Pawn d4",
  46: "PFFFFFFFFF\nROOK TAKES ROOK D4",
  47: "ROOKS DON'T WORK\nLIKE THAT\n ROOK TO E2",
  48: "HAHAHAHAHA\n ROOK TO G1",
  49: "KING TAKES ROOK G1",
  50: "GOTCHU ROOK SPAWN\nG2",
  51: "WHATTTTTTT\nWHY EVEN DO THAT\n ROOK TAKES ROOK G2",
  52: "I do WHAT I DO",
  55: "Knight Takes Pawn f6",
  56: "THAT'S ACTUALLY\nMY PAWN ON F6",
  57: "...",
  60: "YOINK",
  61: "...",
  62: "KING TO E7",
  63: "So you're just\nblatantly cheating",
  64: "IMMA DO MY OWN THING",
  65: "BRO",
  66: "HHAHAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHA",
  70: "MINNNNNEE",
  71: "WHAT THE HELL\nIS GOING ON",
  72: "KING TO D5\nTHIS GAME IS MINE\nWAIT A SEC",
  73: "SCREW YOU CHATGPT\nPAWN TAKES KING\nGG SUCKER",
};

function preload() {

  whitePlayerLogo = loadImage('OtherPictures/StockFishLogo.png', () => {
    console.log("Stockfish Logo loaded successfully");
  }, (err) => {
    console.error("Failed to load Stockfish Logo", err);
  });

  blackPlayerLogo = loadImage('OtherPictures/ChatGPTLogo.png', () => {
    console.log("GPT Logo loaded successfully");
  }, (err) => {
    console.error("Failed to load GPT Logo", err);
  });


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

  naniQueen = loadImage('ChessPieces/naniQueen.png', () => {
    console.log("nani Queen loaded successfully");
  }, (err) => {
    console.error("Failed to load naniQueen", err);
  });

  moveSound = loadSound('SoundEffects/screamingEmoji.mp3', () => {
    console.log("Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load sound", err);
  });

  regularMoveSound = loadSound('SoundEffects/ChessMove.mp3', () => {
    console.log("Sound ChessMove loaded successfully");
  }, (err) => {
    console.error("Failed to load ChessMove sound", err);
  });

  castleMoveSound = loadSound('SoundEffects/CastleMove.mp3', () => {
    console.log("Sound CastleMove loaded successfully");
  }, (err) => {
    console.error("Failed to load CastleMove sound", err);
  });

  capturedMoveSound = loadSound('SoundEffects/CaptureSound.mp3', () => {
    console.log("Capture Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load Capture sound", err);
  });

  SpawnMoveSound = loadSound('SoundEffects/HuhSound.mp3', () => {
    console.log("Spawn Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load Spawn sound", err);
  });

  teleportMoveSound = loadSound('SoundEffects/TeleportSound.mp3', () => {
    console.log("Tele Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load tele sound", err);
  });

  naniMoveSound = loadSound('SoundEffects/naniSound.mp3', () => {
    console.log("nani Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load nani sound", err);
  });

  nahMoveSound = loadSound('SoundEffects/NahSound.mp3', () => {
    console.log("nah Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load nah sound", err);
  });

  betrayalMoveSound = loadSound('SoundEffects/BetrayalSound.mp3', () => {
    console.log("Betrayal Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load Betrayal sound", err);
  });

  darthSound = loadSound('SoundEffects/darthSound.mp3', () => {
    console.log("darth Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load darth sound", err);
  });

  victorySound = loadSound('SoundEffects/VictorySound.mp3', () => {
    console.log("victory Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load victory sound", err);
  });


  backMoveSound = loadSound('SoundEffects/69Sound.mp3', () => {
    console.log("back Sound loaded successfully");
  }, (err) => {
    console.error("Failed to load back sound", err);
  });

}

let pieceImages;

function setup() {

  createCanvas(1000, 1000);
  offsetX = (width - 400) / 2;
  offsetY = (height - 400) / 2;
  historyY = offsetY;

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
    'QN': naniQueen,
  };

  drawBoard();
}

function drawButtons() {
  let nextButtonX = offsetX + 230;
  let prevButtonX = offsetX + 130;
  let buttonY = offsetY + 525;
  let buttonWidth = 80;
  let buttonHeight = 40;

  // Next button appearance
  if (isNextButtonPressed) {
    fill(150); // Darker color to indicate pressing
  } else {
    fill(200); // Regular color
  }
  rect(nextButtonX, buttonY, buttonWidth, buttonHeight);

  // Prev button appearance
  if (isPrevButtonPressed) {
    fill(150); // Darker color to indicate pressing
  } else {
    fill(200); // Regular color
  }
  rect(prevButtonX, buttonY, buttonWidth, buttonHeight);

  // Text properties
  fill(0); // Black color for text
  textSize(16);
  textAlign(CENTER, CENTER);

  // Draw the text on the buttons
  text('Next Move', nextButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  text('Prev Move', prevButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}


function drawBoard() {
  background(48, 46, 43); // Redraw the background

  let numSquares = 8;
  let naniQueenSizeMultiplier = 1.75;
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
    let numberPosStr = str(8 - i);
    text(numberPosStr, offsetX - 20, offsetY + i * squareSize + squareSize / 2);

    // Set fill color for top numbers
    if (i % 2 == 0) {
      fill(126, 151, 92);
    } else {
      fill(255);
    }
    text(letters[i], offsetX + i * squareSize + squareSize / 2, offsetY + 420);
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
      if (piece === 'QN') {  // If the piece is the naniQueen
        let naniQueenWidth = squareSize * naniQueenSizeMultiplier;
        let naniQueenHeight = squareSize * naniQueenSizeMultiplier;
        let xPosition = i * squareSize + offsetX - (naniQueenWidth - squareSize) / 2;
        let yPosition = j * squareSize + offsetY - (naniQueenHeight - squareSize) / 2;
        image(naniQueen, xPosition, yPosition, naniQueenWidth, naniQueenHeight);
      }
      else if (piece) {
        let pieceImage = pieceImages[piece];
        if (pieceImage) {
          image(pieceImage, i * squareSize + offsetX, j * squareSize + offsetY, squareSize, squareSize);
        }
      }
    }
  }
  let maxScroll = max(0, moveHistory.length * 20 - 400);
  scrollOffset = constrain(scrollOffset, -maxScroll, 0);

  let historyX = offsetX + 420;
  let historyY = offsetY;
  let lineHeight = 20;
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);

  for (let i = 0; i < moveHistory.length; i++) {
    let move = moveHistory[i];
    let yPosition = historyY + i * lineHeight + scrollOffset;
    if (yPosition >= historyY - lineHeight && yPosition < historyY + 400) {
      if (i <= 13) {
        if (i % 2 == 0 || i == 13) {
          fill(255);
        }
        else {
          fill(0);
        }
      }
      else {
        if (i % 2 == 1) {
          fill(255);
        }
        else {
          fill(0);
        }
      }
      text((i + 1) + ". " + move.notation, historyX, yPosition);
      text((i + 1) + ". " + move.notation, historyX, yPosition);

      // Initialize a variable to adjust the x position for the second image if needed
      let xAdjust = 0;
  
      // Check and display the captured image
      if (move.capturedImage) {
        image(move.capturedImage, historyX + textWidth((i + 1) + ". " + move.notation), yPosition - 5, 20, 20);
        xAdjust = 25; // Adjust this value as needed based on your layout
      }
  
      // Check and display the spawned image
      if (move.spawnImage) {
        // Use xAdjust to shift the spawn image right if a captured image was also displayed
        image(move.spawnImage, historyX + textWidth((i + 1) + ". Spawned:"), yPosition - 5, 20, 20);
      }
    }
  }

  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);

  // Draw the name
  let logoWidth = 40; // Width of the logo
  let logoHeight = 40; // Height of the logo
  let logoX = (width / 2) + 80; // X position
  let logoY = (offsetY + 150) / 2; // Y position

  text(blackPlayerName, width / 2, (offsetY + 200) / 2);
  image(blackPlayerLogo, logoX, logoY, logoWidth, logoHeight);
  fill(255);

  text(whitePlayerName, width / 2, (height - (offsetY + 150) / 2));
  image(whitePlayerLogo, logoX, (height - (offsetY + 200) / 2), logoWidth + 13, logoHeight + 13);

  noFill();
  rect(offsetX, offsetY, 400, 400); // Draw the outline around the chessboard
  drawButtons();
  let chatMessage = chatMessages[currentMoveIndex];
  if (chatMessage) {
    if(currentMoveIndex <= 13) {
      player = currentMoveIndex % 2 === 0 ? "white" : "black";
    }
    else {
      player = currentMoveIndex % 2 === 0 ? "black" : "white";
    }
    
    drawChatBubble(chatMessage, player);
  }
}

function drawChatBubble(message, player) {
  let x, y;
  const bubbleWidth = 200; 
  const bubbleHeight = 100; 
  const logoWidth = 40; 
  const logoOffset = 100; 

  if (player === "white") {

    x = (width / 2) + logoWidth + logoOffset;
    y = (height - (offsetY + 150) / 2) - bubbleHeight / 2 + 20;
  } else {
   
    x = (width / 2) + logoWidth + logoOffset;
    y = (offsetY + 150) / 2 - bubbleHeight / 2;
  }
  fill(255); 
  rect(x, y, bubbleWidth, bubbleHeight, 20);
  fill(0); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text(message, x + bubbleWidth / 2, y + bubbleHeight / 2);
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
  let nextButtonX = offsetX + 230;
  let prevButtonX = offsetX + 130;
  let buttonY = offsetY + 525;
  let buttonWidth = 80;
  let buttonHeight = 40;

  // Check if Next button is pressed
  isNextButtonPressed = mouseX > nextButtonX && mouseX < nextButtonX + buttonWidth &&
    mouseY > buttonY && mouseY < buttonY + buttonHeight;

  // Check if Prev button is pressed
  isPrevButtonPressed = mouseX > prevButtonX && mouseX < prevButtonX + buttonWidth &&
    mouseY > buttonY && mouseY < buttonY + buttonHeight;


  if (isNextButtonPressed) {
    if (currentMoveIndex < moves.length - 1) {
      currentMoveIndex++;
      performMove(moves[currentMoveIndex]);
    }
  }
  if (isPrevButtonPressed) {
    if (currentMoveIndex >= 0) {
      undoMove(moves[currentMoveIndex]);
      currentMoveIndex--;
    }
  }
  if (mouseY > offsetY && mouseY < offsetY + 400) {
    dragging = true;
    startY = mouseY - scrollOffset;
  }
}

function mouseDragged() {
  if (dragging) {
    let newY = mouseY - startY;
    scrollOffset = newY;
    drawBoard(); // Redraw the board with updated scrollOffset
  }
}

function mouseReleased() {
  dragging = false;
  isNextButtonPressed = false;
  isPrevButtonPressed = false;
}

function draw() {
  drawBoard();
  drawButtons();

  if (currentMoveIndex >= 0 && currentMoveIndex < moves.length) {
    let move = moves[currentMoveIndex];
    if (move.castling) {
      drawArrow(move.king.from[1], move.king.from[0], move.king.to[1], move.king.to[0]);
    } else if (move.spawn && move.spawn.value) {
      drawSpawnCircle(move.spawn.position[1], move.spawn.position[0]);
    } else if (!move.spawn) {
      drawArrow(move.from[1], move.from[0], move.to[1], move.to[0]);
    }
  }
}

// Performs next move
function performMove(move) {

  let capturedImage = null;
  let spawnImage = null;

  // console.log("Performing move:", currentMoveIndex);

  if (currentMoveIndex === 9) {
    moveSound.play();
  }
  else if (currentMoveIndex === 14 ) {
    SpawnMoveSound.play();
  }
  else if (currentMoveIndex === 26 || currentMoveIndex === 30 || currentMoveIndex === 32 
    || currentMoveIndex === 46 || currentMoveIndex === 48 || currentMoveIndex === 60 
    || currentMoveIndex === 62 || currentMoveIndex === 66) {
    teleportMoveSound.play();
  }
  else if(currentMoveIndex === 36) {
    naniMoveSound.play();
  }
  else if(currentMoveIndex === 38 || currentMoveIndex === 64 || currentMoveIndex === 34) {
    backMoveSound.play();
  }
  else if(currentMoveIndex === 40 || currentMoveIndex === 56) {
    nahMoveSound.play();
  }
  else if(currentMoveIndex === 50) {
    darthSound.play()
  }
  else if (currentMoveIndex === 70) {
    betrayalMoveSound.play();
  }
  else if(currentMoveIndex === 73) {
    victorySound.play();
  }
  else if (move.castling) {
    castleMoveSound.play();
  }
  else {
    regularMoveSound.play();
  }
 
  let moveNotation = getMoveNotation(move);
  if (move.captured) {
    capturedImage = pieceImages[move.captured.piece];
  }
  if (move.spawn) {
    spawnImage = pieceImages[move.spawn.piece];
  }
  moveHistory.push({ notation: moveNotation, capturedImage: capturedImage , spawnImage: spawnImage});

  let totalContentHeight = moveHistory.length * 20;
  scrollOffset = max(400 - totalContentHeight, scrollOffset);

  if (move.castling) {
    // Handle castling move
    moveKingAndRookForCastling(move.king, move.rook);
  }
  else if (move.spawn && move.spawn.value) {
    spawnPiece(move.spawn);
  }
  else {
    // Standard move handling
    let piece = board[move.from[0]][move.from[1]];

    // Handle capturing a piece
    if (move.captured) {
      capturedMoveSound.play();
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
  spawnHistory.push({
    position: [spawnLocationX, spawnLocationY],
    previousPiece: board[spawnLocationX][spawnLocationY] // Store the piece originally at the spawn location
  });

  board[spawnLocationX][spawnLocationY] = pieceToSpawn.piece;
}

// Undoes Spawn Piece 
function undoSpawnPiece() {
  if (spawnHistory.length > 0) {
    let lastSpawn = spawnHistory.pop(); // Get the last spawn move
    let spawnLocationX = lastSpawn.position[0];
    let spawnLocationY = lastSpawn.position[1];
    board[spawnLocationX][spawnLocationY] = lastSpawn.previousPiece;
  }
}

// Converts move on array to move on board
function getMoveNotation(move) {
  if (!move) return '';

  if (move.castling) {
    let castleMoveUnique;
    if (move.king.to[1] === 6) {
      castleMoveUnique = 'O-O'; // Kingside castling
    } else if (move.king.to[1] === 2) {
      castleMoveUnique = 'O-O-O'; // Queenside castling
    }
    if (move.captured) {
      castleMoveUnique = castleMoveUnique + " Captured: ";
    }
    return castleMoveUnique;
  }

  if (move.spawn) {
    let spawnCol = String.fromCharCode('a'.charCodeAt(0) + move.spawn.position[1]);
    let spawnRow = 8 - move.spawn.position[0];
    if (move.captured) {
      return `Spawned:     at ${spawnCol}${spawnRow} Captured: `;
    }
    return `Spawned:     at ${spawnCol}${spawnRow}`;
  }
  else if (move.captured) {
    let fromCol = String.fromCharCode('a'.charCodeAt(0) + move.from[1]);
    let fromRow = 8 - move.from[0];
    let toCol = String.fromCharCode('a'.charCodeAt(0) + move.to[1]);
    let toRow = 8 - move.to[0];
    return `${fromCol}${fromRow} to ${toCol}${toRow} Captured: `;
  }

  let fromCol = String.fromCharCode('a'.charCodeAt(0) + move.from[1]);
  let fromRow = 8 - move.from[0];
  let toCol = String.fromCharCode('a'.charCodeAt(0) + move.to[1]);
  let toRow = 8 - move.to[0];

  return `${fromCol}${fromRow} to ${toCol}${toRow}`;
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

// Undoes Move
function undoMove(move) {

  moveHistory.pop();

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

// Undoes Castling move
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

// Draws arrow on board to show where piece is moving to. 
function drawArrow(fromX, fromY, toX, toY) {
  push();

  let squareSize = 400 / 8;
  let startX = offsetX + fromX * squareSize + squareSize / 2;
  let startY = offsetY + fromY * squareSize + squareSize / 2;
  let endX = offsetX + toX * squareSize + squareSize / 2;
  let endY = offsetY + toY * squareSize + squareSize / 2;

  stroke(255, 140, 0, 150); // Orange, semi-transparent
  strokeWeight(4);
  fill(255, 140, 0, 150);

  line(startX, startY, endX, endY);
  let angle = atan2(endY - startY, endX - startX);
  translate(endX, endY);
  rotate(angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function drawSpawnCircle(x, y) {
  let squareSize = 400 / 8;
  let circleX = offsetX + x * squareSize + squareSize / 2;
  let circleY = offsetY + y * squareSize + squareSize / 2;
  let circleRadius = squareSize ; // Adjust the size as needed

  push(); // Save the current drawing state
  stroke(255, 140, 0, 150); // Orange, semi-transparent
  strokeWeight(6);
  noFill();
  ellipse(circleX, circleY, circleRadius);
  pop(); // Restore the drawing state
}

