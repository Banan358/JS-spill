//hva som skjer når man klikker


import  { createBoard, markTile, TILE_STATUSES, revealTile } from './funksjoner_og_logikk.js'

const BOARD_SIZE = 10
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
        }) 
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault() //hindrer menyen som vanligvis kommer fra høyreklikk
            markTile(tile)
            listFlaggLeft()
        }) 
    })
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