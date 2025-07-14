// generate cells instead of doing via html

const obj = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
};

const ship = [
  { location: ["06", "16", "26"], hits: ['','',''] },
  { location: ["24", "34", "44"], hits: ['','',''] },
  { location: ["10", "11", "12"], hits: ['','',''] },
];

let counter = 0;
const positions = [];

const grid = document.querySelector(".grid");
const inputField = document.querySelector("input");
const messageArea = document.querySelector("#messageArea");

function generateGrid() {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${i}${j}`);
      grid.appendChild(cell);
    }
  }
}

generateGrid();

const view = {
  displayMessage(update) {
    messageArea.innerHTML = update;
  },
  displayHit(id) {
    const cell = document.getElementById(`${id}`);
    cell.classList.add("hit");
  },
  displayMiss(inputField) {
    const cell = document.querySelector(`#${inputField}`);
    cell.classList.add("miss");
  },

  confirmAlreadyHit(id){
        const cell = document.getElementById(`${id}`);
        if(cell.classList.contains('hit')||cell.classList.contains('miss')){
            return true;
        }

        return false;
  },
  clearInput(){
    inputField.value = '';
  }
};

function generateLocations(orientation, row, column) {
  if (ship.find((val) => val.location.includes(`${row}${column}`))) {
    generateLocations(
      Number(!orientation),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7)
    );
  } else {
  }

  console.log(row, column, orientation);
}

// generateLocations(
//   Math.floor(Math.random() * 2),
//   Math.floor(Math.random() * 7),
//   Math.floor(Math.random() * 7)
// );

function checkInput(input){
    const letterCheck = /^[A-Z][0-6]$/ig.test(input)
    if(letterCheck) return obj[input[0]]+input[1]
    displayMessage('Please enter a valid input')
    return false
}

inputField.addEventListener('input',function(e){
    // console.log(e)
    //   const event  = e;
// const v = this.value
if(this.value.length==2){

   const value= checkInput(inputField.value)
   if(view.confirmAlreadyHit(value)){
    view.displayMessage('This cell has already been selected choose another!')
   }
   else if (value){
    for (let i = 0; i < ship.length; i++) {
        const currentShip = ship[i]
        const position = currentShip.location.indexOf(value)
        if(position!=-1){
            currentShip.hits[position] = 'hit'
            view.displayHit(value)
                view.displayMessage('Hit')

            break;
        }
    }
   }
}
})
