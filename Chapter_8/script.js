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
  checkValidCell(row, column) {
    return row >= 0 && row <= 6 && column >= 0 && column <= 6;
  },
  generatePositions(orientation, row, column) {
    let possiblePositions = [];
    for (let i = 0; i <= 2; i++) {
      const values = [];
      for (let j = i - 2; j <= i; j++) {
        if (
          orientation &&
          j < 0 &&
          ship.checkValidCell(row - Math.abs(j), column) &&
          !ship.checkPositionIsTaken(`${row - Math.abs(j)}${column}`)
        ){

          values.push(row - Math.abs(j));
        }
        else if (
          orientation &&
          j >= 0 &&
          ship.checkValidCell(row + j, column) &&
          !ship.checkPositionIsTaken(`${row + j}${column}`)
        ){

          values.push(row + j);
        }
        else if (
          !orientation &&
          j < 0 &&
          ship.checkValidCell(row, column - Math.abs(j)) &&
          !ship.checkPositionIsTaken(`${row}${column - Math.abs(j)}`)
        ){

          values.push(column - Math.abs(j));
        }
        else if (
          !orientation &&
          j >= 0 &&
          ship.checkValidCell(row, column + j) &&
          !ship.checkPositionIsTaken(`${row}${column + j}`)
        ){

          values.push(column + j);
        }
        else {
          break;
        }
      }
      if (values.length == 3) possiblePositions.push(values);
    }

    return possiblePositions.length ? possiblePositions : false;
  },
  generateLocations(shipNumber) {
    let orientation = Math.floor(Math.random() * 2);
    let row = Math.floor(Math.random() * 7);
    let column = Math.floor(Math.random() * 7);
    let attempts = 0;
    let positions = ship.generatePositions(orientation, row, column) ;

    for (attempts; attempts < 50; attempts++) {
      console.log(attempts)
      console.log({orientation,row,column,shipNumber}
      )
      if (!positions &&attempts == 49) {
        alert('unable to positions ships reloading the board')
        window.location.reload();
      }
      if (positions) break;
      else if (ship.checkPositionIsTaken(row, column)) {
        orientation = Math.floor(Math.random() * 2);
        row = Math.floor(Math.random() * 7);
        column = Math.floor(Math.random() * 7);
      } else {
        positions = ship.generatePositions(orientation, row, column);
      }
    }
    const choice = positions[Math.floor(Math.random() * positions.length)];
    const shipPosition = [];
    for (let index = 0; index < choice.length; index++) {
      if (orientation) {
        shipPosition.push(`${choice[index]}${column}`);
        ship.positionTaken[`${choice[index]}${column}`] = true;
      } else {
        shipPosition.push(`${row}${choice[index]}`);
        ship.positionTaken[`${row}${choice[index]}`] = true;
      }
    }
    ship.shipPositions[shipNumber].location = shipPosition;
  },
};

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
  if (!value) {
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
console.log(ship.shipPositions)