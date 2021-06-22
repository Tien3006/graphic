/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */

// ||xs
// \/ y->

const SIZE = 8;

function createBoard() {
  const chessBoard = document.getElementById("chessBoard");
  for (let y = 0; y < SIZE; y++) {
    const row = document.createElement("div");
    row.className = "row";
    chessBoard.appendChild(row);
    for (let x = 0; x < SIZE; x++) {
      const square = document.createElement("div");
      square.id = x.toString() + y.toString();
      square.className = (x + y) % 2 ? "bblack" : "bwhite";

      // If the square should have a piece in it...
      if ((x + y) % 2 !== 0 && y !== 3 && y !== 4) {
        const img = document.createElement("img");
        if (y < 3) {
          img.id = square.id;
          img.src = "./img/black.jpeg";
        } else {
          img.id = square.id;
          img.src = "./img/white.jpeg";
        }
        img.className = "piece";
        img.setAttribute("draggable", "true");
        square.appendChild(img);
      }
      square.setAttribute("draggable", "false");
      row.appendChild(square);
    }
  }
}

createBoard();

const bblack = 2;
const wwhite = 1;
const Bblack = 4;
const Wwhite = 3;
// eslint-disable-next-line prefer-const
let theBoard = [
  [0, bblack, 0, bblack, 0, bblack, 0, bblack],
  [bblack, 0, bblack, 0, bblack, 0, bblack, 0],
  [0, bblack, 0, bblack, 0, bblack, 0, bblack],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [wwhite, 0, wwhite, 0, wwhite, 0, wwhite, 0],
  [0, wwhite, 0, wwhite, 0, wwhite, 0, wwhite],
  [wwhite, 0, wwhite, 0, wwhite, 0, wwhite, 0],
];

//displayBoard();
//createButtons1();
const chooseMoveX = {
  0: 0,
  leftUp: -1,
  rightUp: -1,
  leftDown: +1,
  rightDown: +1,
  leftUpJump: -1,
  rightUpJump: -1,
  leftDownJump: +1,
  rightDownJump: +1,
};
const chooseMoveY = {
  //all of those might be shortened
  0: 0,
  leftUp: -1,
  rightUp: +1,
  leftDown: -1,
  rightDown: +1,
  leftUpJump: -1,
  rightUpJump: +1,
  leftDownJump: -1,
  rightDownJump: +1,
};
const moveNames = {
  0: "leftUp",
  1: "rightUp",
  2: "leftDown",
  3: "rightDown",
};
const boardLength = 8;

function createButtons1() {
  console.log("clicked");
  for (let i = 1; i <= 64; i++) {
    const element = document.getElementById(i);
    if (
      element.className === "piece" ||
      element.className === "bblack" ||
      element.className === "bwhite"
    ) {
      element.addEventListener("click", (e) => {
        const startCordinates = calculateCoordinatesFromId(e.target.id);
        console.log("clicked");
        createButtons2(startCordinates);
      });
    }
    console.log(element.id);
  }
}
createButtons1();
function calculateCoordinatesFromId(id) {
  let currentId = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (currentId === id) {
        const location = [i, j];
        return location;
      }
      currentId++;
    }
  }
}

function calculateIdFromCoordinates(coordinates) {
  const id = 8 * coordinates[0] + coordinates[1];

  return id;
}

function createButtons2(startCoordinates) {
  // eslint-disable-next-line prefer-const
  let coordsToDraw = [[0, 0]];
  for (let i = 0; i < moveNames.length; i++) {
    const moveName = moveNames[i];
    const potentialCoordX = startCoordinates[0] + chooseMoveX[moveName];
    const potentialCoordY = startCoordinates[1] + chooseMoveY[moveName];
    if (theBoard[potentialCoordX][potentialCoordY] === 0) {
      coordsToDraw[0] = potentialCoordX;
      coordsToDraw[1] = potentialCoordY;
      // i++;
      const element = getElementById(calculateIdFromCoordinates(coordsToDraw));
      console.log(element);
      element.className = className.replace("temporary class"); //!!!!!!!!!!!!!!!!!!!!!!!!!!

      element.addEventListener("click", (e) => {
        const elementCoordinates = calculateCoordinatesFromId(e.target.id);
        const direction1 = elementCoordinates[0] - startCoordinates[0];
        const direction2 = elementCoordinates[1] - startCoordinates[1];
        moveThisToThat(
          startCoordinates[0],
          startCoordinates[1],
          direction1,
          direction2
        ); // compact this
        eventListenerCleaner();
        displayBoard();
        aiMove();
      });
    } else if (
      (theBoard[potentialCoordX][potentialCoordY] === wwhite || Wwhite) &&
      theBoard[potentialCoordX + chooseMoveX[moveName]][
        potentialCoordY + chooseMoveY[moveName]
      ] === 0
    ) {
      coordsToDraw[0] = potentialCoordX;
      coordsToDraw[1] = potentialCoordY;
      //k++;
      const element = getElementById(
        calculateIdFromCoordinates([
          coordsToDraw[0] + chooseMoveX[moveName],
          coordsToDraw[1] + chooseMoveY[moveName],
        ])
      ); // too long

      element.className = className.replace("temporary class"); //!!!!!!!!!!!!!!!!!!!!!!!!!!
      element.addEventListener("click", (e) => {
        const elementCoordinates = calculateCoordinatesFromId(e.target.id);
        const direction1 = elementCoordinates[0] - startCoordinates[0];
        const direction2 = elementCoordinates[1] - startCoordinates[1];
        moveThisToThatAgressively(
          startCoordinates[0],
          startCoordinates[1],
          direction1,
          direction2
        );
        eventListenerCleaner();
        displayBoard();
      });
    }
  }
}

function eventListenerCleaner() {
  for (let i = 0; i < 64; i++) {
    const element = document.getElementById(i);
    element.removeEventListener("click");
  }
}

function kingMe() {
  for (let j = 0; j < boardLength; j++) {
    if (theBoard[0][j] === wwhite) theBoard[0][j] = Wwhite;
    if (theBoard[7][j] === bblack) theBoard[7][j] = Bblack;
  }
}
//white turn version. do AI with this one
let possibleEnemyMoves = makeArray(8, 8, 4, 0);
let numberPossibilities = 0;
function aiMove() {
  // i forgot what i was supposed to put here :/

  let inputStartX = 0;
  let inputStartY = 0;

  console.log("enemy turn");
  console.table(theBoard);

  catalogueAllMoves();
  const randomNumber = Math.floor(Math.random() * numberPossibilities);
  let counter = 0;
  let chosenMove = 0;
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      for (let k = 0; k < 4; k++) {
        if (
          possibleEnemyMoves[i][j][k] !== 0 &&
          (theBoard[i][j] === bblack || Bblack) &&
          counter < randomNumber
        ) {
          //way too long
          counter++;
          inputStartX = i;
          inputStartY = j;
          chosenMove = possibleEnemyMoves[i][j][k];
        }
      }
    }
  }
  //now we have coords and move
  console.log(inputStartX);
  console.log(inputStartY);
  console.log(chosenMove);
  const checkX = inputStartX + chooseMoveX[chosenMove];
  const checkY = inputStartY + chooseMoveY[chosenMove];
  if (theBoard[checkX][checkY] === 0) {
    // eslint-disable-next-line no-constant-condition
    if (chosenMove === "leftUp" || "rightUp" || "rightDown" || "leftDown") {
      // this is 100% an antipattern
      moveThisToThat(
        inputStartX,
        inputStartY,
        chooseMoveX[chosenMove],
        chooseMoveY[chosenMove]
      );
      console.log("AI is not retarded ", chosenMove);
    } else {
      moveThisToThatAgressively(
        inputStartX,
        inputStartY,
        chooseMoveX[chosenMove],
        chooseMoveY[chosenMove]
      );
      console.log("AI is not retarded ", chosenMove);
    }
  }
}
//8 move variations. if any slot != 0 can move
/*
leftUpJump      		rightUpJump
  		leftUp   	rightUp
    			0
	  leftDown		rightDown
leftDownJump       		rightDownJump
*/

function catalogueAllMoves() {
  possibleEnemyMoves = makeArray(8, 8, 4, 0);
  numberPossibilities = 0;
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      let k = 0;
      if (theBoard[i + 1][j - 1] === 0 && i < boardLength && j > 0) {
        possibleEnemyMoves[i][j][k] = "leftDown";
        k++;
        numberPossibilities++;
      } else if (
        theBoard[i + 1][j - 1] === (wwhite || Wwhite) &&
        theBoard[i + 2][j - 2] === 0 &&
        i < boardLength - 1 &&
        j < 1
      ) {
        possibleEnemyMoves[i][j][k] = "leftDownJump";
        k++;
        numberPossibilities++;
      }
      if (theBoard[i + 1][j + 1] === 0 && i < boardLength && j < boardLength) {
        possibleEnemyMoves[i][j][k] = "rightDown";
        k++;
        numberPossibilities++;
      } else if (
        theBoard[i + 1][j + 1] === (wwhite || Wwhite) &&
        theBoard[i + 2][j + 2] === 0 &&
        i < boardLength - 1 &&
        j < boardLength - 1
      ) {
        possibleEnemyMoves[i][j][k] = "rightDownJump";
        k++;
        numberPossibilities++;
      }
      if (theBoard[i][j] === 4) {
        //kings
        if (theBoard[i - 1][j - 1] === 0 && i > 0 && j > 0) {
          possibleEnemyMoves[i][j][k] = "leftUp";
          k++;
          numberPossibilities++;
        } else if (
          theBoard[i - 1][j - 1] === (wwhite || Wwhite) &&
          theBoard[i + 2][j - 2] === 0 &&
          i > 1 &&
          j > 1
        ) {
          possibleEnemyMoves[i][j][k] = "leftUpJump";
          k++;
          numberPossibilities++;
        }
        if (theBoard[i - 1][j + 1] === 0 && i > 0 && j < boardLength) {
          possibleEnemyMoves[i][j][k] = "rightUp";

          numberPossibilities++;
        } else if (
          theBoard[i - 1][j - 1] === (wwhite || Wwhite) &&
          theBoard[i + 2][j - 2] === 0 &&
          i > 1 &&
          j < boardLength - 1
        ) {
          possibleEnemyMoves[i][j][k] = "rightUpJump";
          k++;
          numberPossibilities++;
        }
      }
    }
  }
}
//functiom moves piece
function moveThisToThat(startX, startY, right, down) {
  //right and down are +-1
  const endX = startX + right;
  const endY = startY + down;

  //base movement only if not killing
  const temp = theBoard[startX][startY];
  theBoard[startX][startY] = 0;
  theBoard[endX][endY] = temp;
  kingMe();
}

function moveThisToThatAgressively(startX, startY, right, down) {
  const endX = startX + right;
  const endY = startY + down;

  const temp = theBoard[startX][startY];
  theBoard[startX][startY] = 0;
  theBoard[endX][endY] = 0;
  theBoard[endX + right][endY + down] = temp;
  kingMe();
}

function makeArray(w, h, d, val) {
  const arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = [];
      for (let k = 0; k < d; k++) {
        arr[i][j][k] = val;
      }
    }
  }
  return arr;
}

function displayClass(type) {
  switch (type) {
    case wwhite:
      return "red-piece";
    case bblack:
      return "black-piece";
    case Wwhite:
      return "red-piece";
    case Bblack:
      return "black-piece";
  }
  return "noPieceHere";
}

function displayBoard() {
  let id = 0;
  for (let row = 0; row < 8; row++) {
    for (let square = 0; square < 8; square++) {
      const doc = document.getElementById(id);
      doc.className = className.replace(displayClass(theBoard[row][square]));
      id++;
      console.log(doc);
    }
  }
}
//displayBoard();
//class="noPieceHere"
//class="noPieceHere"
//class="black-piece"
