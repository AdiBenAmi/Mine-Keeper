'use strict'

function countNeighbors(cellI, cellJ, mat) {
    var minesAroundCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue /// if I am in this location keep going
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) minesAroundCount++ 
        }
    }   
    return minesAroundCount
}


function cellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    cell.isShown = true

    if (cell.isMine) console.log ('game over') //later its gameover

    console.log('Cell clicked: ', elCell, i, j)
    if ( cell.isShown) {   
        elCell.classList.remove('hide')
    }

    // Support selecting a cell
    elCell.classList.add('selected')

    // Only a single cell should be selected at a time
    
    if (gElSelectedCell) {
        gElSelectedCell.classList.remove('selected')
    }
    gElSelectedCell = (gElSelectedCell === elCell) ? null : elCell  
}