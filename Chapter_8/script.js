// generate cells instead of doing via html
// 0 5 4


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
counter:0,
shipPositions:[

  { location: [], hits: ['','',''] },
  { location: [], hits: ['','',''] },
  { location: [], hits: ['','',''] },
]   
}
;

const positions = [];

const grid = document.querySelector(".grid");
const inputField = document.querySelector("input");
const messageArea = document.querySelector("#messageArea");





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
  },
   generateGrid() {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${i}${j}`);
      grid.appendChild(cell);
    }
  }
}
};


view.generateGrid();

function positionTaken(position){
  // console.log(`testing if ${position} is taken`)
  for (let i = 0; i < ship.shipPositions.length; i++) {
    if(ship.shipPositions[i].location.length && ship.shipPositions[i].location.find(val=> val===position)) return true
    
  }
  return false
}

function generateLocations(orientation, row, column,shipNumber) {
  if (positionTaken(`${row}${column}`)) {
    console.log('recursive time '+ [orientation,row,column])
    generateLocations(
      Math.floor(Math.random()*2),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),shipNumber
    );
  } 
  else {
    let possiblePositions =[];
    if(orientation){
              if(row-2 >=0 && !positionTaken(`${row-2}${column}`)&& !positionTaken(`${row-1}${column}`)){
                possiblePositions.push([row-2,row])
              }
               if(row-1 >=0 && !positionTaken(`${row-1}${column}`)&& !positionTaken(`${row+1}${column}`)){
                possiblePositions.push([row-1,row+1])
              }

              if(row+2 <=6 && !positionTaken(`${row+1}${column}`)&& !positionTaken(`${row+2}${column}`)){
                possiblePositions.push([row,row+2])


              }

   
    }
    else if(!orientation){
      if(column-2 >=0 && !positionTaken(`${row}${column-2}`)&& !positionTaken(`${row}${column-1}`)){
                possiblePositions.push([column-2,column])
              }
               if(column-1 >=0 && !positionTaken(`${row}${column-1}`)&& !positionTaken(`${row}${column+1}`)){
                possiblePositions.push([column-1,column+1])
              }

              if(column+2 <=6 && !positionTaken(`${row}${column+1}`)&& !positionTaken(`${row}${column+2}`)){
                possiblePositions.push([column,column+2])


              }
       
        
      }

    if(!possiblePositions.length){
      generateLocations(
      Math.floor(Math.random()*2),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),shipNumber
    )
    return false
    }


    const choices = possiblePositions.filter(val=>val);
    const [start,end] =  choices[Math.floor(Math.random()*choices.length)]
    const shipPosition =[]
    for (let index = start; index <= end; index++) {
      // console.log(index)
      if(orientation){
        shipPosition.push(`${index}${column}`)
      }
      else{
        shipPosition.push(`${row}${index}`)
      }
      
    }
    ship.shipPositions[shipNumber].location =  shipPosition
 
  }
  // console.log(ship[shipNumber]);
  return true
}

function checkInput(input){
    const letterCheck = /^[A-Z][0-6]$/ig.test(input)
    if(letterCheck) return obj[input[0]]+input[1]
    displayMessage('Please enter a valid input')
    return false
}

inputField.addEventListener('input',function(e){
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

generateLocations(
  1,
  1,
  1,0
);

generateLocations(
  1,
  1,
  1,1
);


generateLocations(
  1,
  1,
  1,2
);