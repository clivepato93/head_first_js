// generate cells instead of doing via html
const grid = document.querySelector('.grid');
function generateGrid(){

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            
            const cell = document.createElement('div')
            cell.setAttribute('id',`${i}${j}`)
            grid.appendChild(cell)
        }
        
    }
}

generateGrid()