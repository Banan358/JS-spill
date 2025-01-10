//hva som skjer når man klikker


import  { 

    createBoard, 
    markTile, 
    TILE_STATUSES, 
    revealTile, 
    checkWin,
    checkLose

} from './funksjoner_og_logikk.js'

let BOARD_SIZE = 9
let NUMBER_OF_MINES = 10

const difficultySelect = document.getElementById('difficulty')

difficultySelect.addEventListener('change', vanskelighetsgrad)

function vanskelighetsgrad() {
    const selectedDifficulty = difficultySelect.value
    
    // Sett brettstørrelse og antall miner basert på vanskelighetsgrad
    if (selectedDifficulty === 'easy') {
        BOARD_SIZE = 9
        NUMBER_OF_MINES = 10
    } else if (selectedDifficulty === 'medium') {
        BOARD_SIZE = 17
        NUMBER_OF_MINES = 45
    } else if (selectedDifficulty === 'hard') {
        BOARD_SIZE = 23
        NUMBER_OF_MINES = 99
    }
    
    createNewBoard(BOARD_SIZE, NUMBER_OF_MINES)
}

let board = (createBoard(BOARD_SIZE,NUMBER_OF_MINES))
const brettElement = document.querySelector('.board')
const flaggIgjen = document.getElementById("flagg")

console.log(board)

//click er venstreklikk og contextmenu er høyreklikk
board.forEach(row => {
    row.forEach(tile => {
        brettElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameEnd()
        }) 
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault() //hindrer menyen som vanligvis kommer fra høyreklikk
            markTile(tile)
            listFlaggLeft()
        }) 
    }) // () => og e => er enklere måter å skrive funksjoner på som bare skal brukes på et sted i koden
})

function createNewBoard(boardSize, numberOfMines) {
    const newBoard = createBoard(boardSize, numberOfMines); 
    brettElement.innerHTML = ''; 

    newBoard.forEach(row => {
        row.forEach(tile => {
            brettElement.append(tile.element);
            tile.element.addEventListener('click', () => {
                revealTile(newBoard, tile);
                checkGameEnd();
            });
            tile.element.addEventListener('contextmenu', e => {
                e.preventDefault();
                markTile(tile);
                listFlaggLeft();
            });
        });
    });
    brettElement.style.setProperty('--size', boardSize)
    flaggIgjen.textContent = numberOfMines
    board = newBoard

    console.log('Før oppdatering:', board);
    board = newBoard;
    console.log('Etter oppdatering:', board);
}
brettElement.style.setProperty('--size', BOARD_SIZE)
flaggIgjen.textContent = NUMBER_OF_MINES


function listFlaggLeft() {
    const markedTilesCount = board.reduce((count, row ) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).
        length
    }, 0)

    flaggIgjen.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        brettElement.addEventListener('click', stopProp, {capture: true})
        brettElement.addEventListener('contextmenu', stopProp, {capture: true})
        clearInterval(klokkeinterval)
    }

    if(win) {
        //pop up skjerm der det står at du har vunnet
    }
    if(lose) {
        //pop up med tape og restart
        board.forEach(row =>{
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile() // gjør at selv de som er markerte vises når man taper
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}

const clock = document.getElementById("klokke")
let klokke = 0

function timer() {
    klokke++
    clock.innerHTML = klokke 
}
const klokkeinterval = setInterval(timer, 1000)
