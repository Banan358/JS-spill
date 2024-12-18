//logic

const rute_status = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}


export function lagBrett(størrelse, antallBomber){
    const board = []
    for (let x = 0; x < størrelse; x++) {
        const row = []
        for (let y = 0; y < størrelse; y++) {
            const element = document.createElement('div')
            element.dataset.status = rute_status.HIDDEN
            const rute = {
                element,
                x,
                y
            }
            row.push(rute) 
        }
        board.push(row)
    }

    return board
}

