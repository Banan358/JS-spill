//hva som skjer når man klikker


import  { createBoard } from './script2.js'

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 2

const board = (createBoard(BOARD_SIZE,NUMBER_OF_MINES))
const brettElement = document.querySelector('.board')
brettElement.style.setProperty('--size', BOARD_SIZE)
board.forEach(row => {
    row.forEach(tile => {
        brettElement.append(tile.element)
    })
})