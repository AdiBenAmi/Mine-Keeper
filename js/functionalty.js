'use strict'


function onCellClicked(elCell, i, j) {
    if(!gGame.isOn) return
    const cell = gBoard[i][j]

    if (gGame.isFirstClick){
        setTimer()
        //remove first cell clicked from board
        removeFirstCellClicked(i,j)     
        gGame.isFirstClick = false
        addMines(gBoard)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        //cell that was removed needs to be hide after render
        var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
        elCurrCell.classList.remove('hide')
    }

    if (cell.isShown) return //the cell on second click is shown
    if (cell.isMarked) return

    if (!cell.isMarked) {
        cell.isShown = true
        removeClassHide(elCell)
        gGame.shownCount++
        checkVictry()

        if (cell.isMine) {
            elCell.style.backgroundColor = '#ff0000'
            gGame.livesCount--
            renderLives()
            renderSmileyBtn()
            
            if (gGame.livesCount === 0) {
                clearInterval(gTimer)
                gGame.isOn = false
                setTimeout(gameOver, 200)
            }   
        }
    }

    if (cell.minesAroundCount === 0 && !cell.isMine) {
        expandShown(gBoard, elCell, i, j)
    }
    // console.log('gGame.markedCount:', gGame.markedCount)
    // console.log('gGame.shownCount:', gGame.shownCount)
    checkVictry()
}

function onCellMarked(event, elCell, i, j) {
    event.preventDefault()
    const cell = gBoard[i][j]
    if (cell.isShown) return
    if (!cell.isMarked) {

        //first right click
        //MODEL
        cell.isMarked = true
        if (cell.isMine) {
            gGame.markedCount++
        }
        
        console.log('gGame.markedCount:', gGame.markedCount)

        //DOM
        elCell.classList.remove('hide')
        elCell.innerText = FLAG
    } else {
        //for second click
        //DOM
        elCell.classList.add('hide')
        elCell.innerText = cell.minesAroundCount
        //MODEL
        cell.isMarked = false

        if (cell.isMine) {
            gGame.markedCount--
        }
    }
    checkVictry()
}

function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue /// if I am in this location keep going
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) continue
            if (board[i][j].isShown) continue
            if (board[i][j].isMarked) continue
            // if (board[i][j]=== elCell) continue

            const currCellNeg = board[i][j]
            const elCurrCellNeg = document.querySelector(`.cell-${i}-${j}`)
            removeClassHide(elCurrCellNeg)
            currCellNeg.isShown = true
            gGame.shownCount++

            // if (currCellNeg.minesAroundCount === 0) {
            //     //maybe next time :)
            // }
        }
    }
}

function removeClassHide(elCell) {
    elCell.classList.remove('hide')
}

function removeFirstCellClicked(cellI, cellJ) {
    console.log('cellI:', cellI)
    console.log('cellJ:', cellJ)
    for (var i = 0; i<gEmptyLocations.length; i++) {
        var currLocation = gEmptyLocations[i]
        if (currLocation.i === cellI && currLocation.j === cellJ) {
            gEmptyLocations.splice(i, 1)
            return
        }
    }

}