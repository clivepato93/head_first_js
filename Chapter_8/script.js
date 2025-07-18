// Letter to number
const obj = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
};

const ship = {
  counter: 0,
  shipsLeft: 3,
  shipPositions: [
    { location: [], hits: [] },
    { location: [], hits: [] },
    { location: [], hits: [] },
  ],
  positionTaken: {},
  checkPositionIsTaken(position) {
    return !!this.positionTaken[position];
  },
  generatePositions(orientation, row, column) {
    let possiblePositions = [];

    if (orientation) {
      if (
        row - 2 >= 0 &&
        !ship.checkPositionIsTaken(`${row - 2}${column}`) &&
        !ship.checkPositionIsTaken(`${row - 1}${column}`)
      ) {
        possiblePositions.push([row - 2, row]);
      }
      if (
        row - 1 >= 0 &&
        row + 1 <= 6 &&
        !ship.checkPositionIsTaken(`${row - 1}${column}`) &&
        !ship.checkPositionIsTaken(`${row + 1}${column}`)
      ) {
        possiblePositions.push([row - 1, row + 1]);
      }

      if (
        row + 2 <= 6 &&
        !ship.checkPositionIsTaken(`${row + 1}${column}`) &&
        !ship.checkPositionIsTaken(`${row + 2}${column}`)
      ) {
        possiblePositions.push([row, row + 2]);
      }
    } else if (!orientation) {
      if (
        column - 2 >= 0 &&
        !ship.checkPositionIsTaken(`${row}${column - 2}`) &&
        !ship.checkPositionIsTaken(`${row}${column - 1}`)
      ) {
        possiblePositions.push([column - 2, column]);
      }
      if (
        column - 1 >= 0 &&
        column + 1 <= 6 &&
        !ship.checkPositionIsTaken(`${row}${column - 1}`) &&
        !ship.checkPositionIsTaken(`${row}${column + 1}`)
      ) {
        possiblePositions.push([column - 1, column + 1]);
      }

      if (
        column + 2 <= 6 &&
        !ship.checkPositionIsTaken(`${row}${column + 1}`) &&
        !ship.checkPositionIsTaken(`${row}${column + 2}`)
      ) {
        possiblePositions.push([column, column + 2]);
      }
    }
    return possiblePositions.length ? possiblePositions : false;
  },
  generateLocations(shipNumber) {
    let orientation = Math.floor(Math.random() * 2);
    let row = Math.floor(Math.random() * 7);
    let column = Math.floor(Math.random() * 7);
    let attempts = 0;
    let positions;

    for (attempts; attempts < 50; attempts++) {
      if (positions) break;
      else if (ship.checkPositionIsTaken(row, column)) {
        orientation = Math.floor(Math.random() * 2);
        row = Math.floor(Math.random() * 7);
        column = Math.floor(Math.random() * 7);
      } else {
        positions = ship.generatePositions(orientation, row, column);
      }
    }
    if (attempts == 50) {
      window.location.reload();
    }
    const [start, end] =
      positions[Math.floor(Math.random() * positions.length)];
    const shipPosition = [];
    for (let index = start; index <= end; index++) {
      if (orientation) {
        shipPosition.push(`${index}${column}`);
      } else {
        shipPosition.push(`${row}${index}`);
      }
      ship.positionTaken[`${index}${column}`] = true;
    }
    ship.shipPositions[shipNumber].location = shipPosition;
  },
};
const positions = [];

const grid = document.querySelector(".grid");
const inputField = document.querySelector("input");
const messageArea = document.querySelector("#messageArea");
const button = document.querySelector("button");

const view = {
  displayMessage(update) {
    messageArea.innerHTML = update;
  },
  displayHit(id) {
    const cell = document.getElementById(id);
    cell.classList.add("hit");
  },
  displayMiss(id) {
    const cell = document.getElementById(id);
    cell.classList.add("miss");
  },

  confirmAlreadyHit(id) {
    const cell = document.getElementById(id);
    if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
      return true;
    }

    return false;
  },
  clearInput() {
    inputField.value = "";
  },
  generateGrid() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${i}${j}`);
        grid.appendChild(cell);
      }
    }
  },
  checkInput(input) {
    const letterCheck = /^[A-G][0-6]$/gi.test(input);
    if (letterCheck) return obj[input[0]] + input[1];
    view.displayMessage("Please enter a valid input");
    return false;
  },
};



button.addEventListener("click", function (e) {
  e.preventDefault();

  const value = view.checkInput(inputField.value);
  if(!value){
    return false;
  }
  inputField.value = "";
  if (view.confirmAlreadyHit(value)) {
    view.displayMessage("This cell has already been selected choose another!");
  } else {
    ship.counter++;
    for (let i = 0; i < ship.shipPositions.length; i++) {
      const currentShip = ship.shipPositions[i];
      const position = currentShip.location.indexOf(value);
      if (position != -1) {
        currentShip.hits.push("hit");
        view.displayHit(value);
        if (currentShip.hits.length == 3) {
          view.displayMessage("You sunk my battleship!");
          ship.shipsLeft--;
          if (!ship.shipsLeft) {
            view.displayMessage("Game over!");
            inputField.disabled = true;
            button.disabled = true;
          }
        } else {
          view.displayMessage("Hit");
        }
        return;
      }
    }

    view.displayMiss(value);
    view.displayMessage("Miss");
    return;
  }
});

ship.generateLocations(0);
ship.generateLocations(1);
ship.generateLocations(2);
view.generateGrid();