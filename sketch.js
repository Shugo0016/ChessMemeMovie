function setup() {
  createCanvas(820, 820); // Canvas Size
  background(48, 46, 43); // Dark Background

  let numSquares = 8;
  let squareSize = 400 / numSquares; 

  let offsetX = (width - 400) / 2;
  let offsetY = (height - 400) / 2;

  textSize(16); // Set a larger text size
  fill(255); // Set a contrasting text color, e.g., red

  for (let i = 0; i < numSquares; i++) {
    let numberPosStr = str(i + 1); // Convert number to string
    text(numberPosStr, i * squareSize + offsetX, offsetY - 10); // Adjust Y position for visibility

    for (let j = 0; j < numSquares; j++) {
      if ((i + j) % 2 == 0) {
        fill(255);
      } else {
        fill(126, 151, 92);
      }
      rect(i * squareSize + offsetX, j * squareSize + offsetY, squareSize, squareSize);
    }
  }

  noFill();
  rect(offsetX, offsetY, 400, 400); // Draw the outline around the chessboard
}
