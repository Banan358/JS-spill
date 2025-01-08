//hva som skjer når man klikker


import  { 

    createBoard, 
    markTile, 
    TILE_STATUSES, 
    revealTile, 
    checkWin,
    checkLose

} from './funksjoner_og_logikk.js'

const BOARD_SIZE = 11
const NUMBER_OF_MINES = 5

const board = (createBoard(BOARD_SIZE,NUMBER_OF_MINES))
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