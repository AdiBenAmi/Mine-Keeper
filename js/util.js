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

    if (cell.isMarked) return
    if (cell.isMine) {
        setTimeout(gameOver, 200)
    }
        

    console.log('Cell clicked: ', elCell, i, j)
    if (cell.isShown) {
        elCell.classList.remove('hide')
        gGame.shownCount++
        checkVictry()
    }

    // Support selecting a cell
    elCell.classList.add('selected')

    // Only a single cell should be selected at a time

    if (gElSelectedCell) {
        gElSelectedCell.classList.remove('selected')
    }
    gElSelectedCell = (gElSelectedCell === elCell) ? null : elCell

}

function cellRightClicked(elCell, i, j) {
    const cell = gBoard[i][j]

    if (!cell.isMarked){
        //first right click
        //MODEL
        cell.isMarked = true
        console.log('Cell clicked: ', elCell, i, j)
        gGame.markedCount++
        checkVictry()
        console.log('gGame.markedCount:', gGame.markedCount)
    
        //DOM
        elCell.classList.remove('hide')
        elCell.innerText = FLAG
    } else {
        //for second click
        elCell.classList.add('hide')
        cell.isMarked = false
        gGame.markedCount--
        checkVictry()

    }
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    // console.log('empty:', emptyLocations)
    var randIdx = getRandomInt(0, emptyLocations.length + 1)
    return emptyLocations[randIdx]
}

//get random int ex
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

