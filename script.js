//hva som skjer når man klikker


import  { createBoard } from './script2.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 5

const board = (createBoard(BOARD_SIZE,NUMBER_OF_MINES))
const brettElement = document.querySelector('.board')
const flaggIgjen = document.getElementById("flagg")

console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        brettElement.append(tile.element)
    })
})
brettElement.style.setProperty('--size', BOARD_SIZE)
flaggIgjen.textContent = NUMBER_OF_MINES