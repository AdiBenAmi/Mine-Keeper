'use strict'
var MINE = '💣'
var EMPTY = ' '
var FLAG = '🚩'
//var SIZE = 12
var LIVES = '❤️'
var TOTAL_LIVES


var gBoard
var gGame
var gLevel
var gTimer
var gEmptyLocations

console.log('gEmptyLocations:', gEmptyLocations)

gLevel = {
    SIZE: 12,
    MINES: 32, 
    lives: 3
}

gGame = {
    isOn: false,
    isFirstClick: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    livesCount: gLevel.lives,
    isVictory: false,
}


function onInit() {
    // gGame.isFirstClick = true
    gBoard = buildBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
    getEmptyLocations(gBoard)
    console.log('gEmptyLocations:', gEmptyLocations)
    
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.isVictory = false
    gGame.isFirstClick = true
    gGame.secsPassed = 0
    gGame.livesCount= gLevel.lives

    renderLives()
    renderSmileyBtn()

    //console.log('gGame.secsPassed:', gGame.secsPassed)

    const elTimer = document.querySelector('.timer-container')
    elTimer.innerText = gGame.secsPassed

}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = creatCell(board)
        }
    }
    //console.log(board)
    // addMines(board)
    // setMinesNegsCount(board)
    return board
}

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr class="cell-row" >\n`
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j]

            // For cell of type MINE add mine class
            var className = (cell.isMine) ? 'mine' : ''
            if (cell.isMarked) className += ' marked'

            // for cell class mine render MINE
            var cellInnerText = EMPTY
            if (cell.isMine) {
                cellInnerText = MINE
            } else {
                cellInnerText = cell.minesAroundCount
            }
            //console.log('cell.minesAroundCount:', cell.minesAroundCount)
            strHTML += `\t<td class="hide cell-${i}-${j} ${className}" 
                        oncontextmenu="onCellMarked(event,this,${i}, ${j})" onclick="onCellClicked(this, ${i}, ${j})" > ${cellInnerText}
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    const elCells = document.querySelector('.board-cells')
    //console.log('elCells:', elCells)
    elCells.innerHTML = strHTML
}

function renderLives() {
    var msg = 'Lives '
    var TOTAL_LIVES = LIVES.repeat(gGame.livesCount)
    console.log('TOTAL_LIVES:', TOTAL_LIVES)
    console.log(gGame.livesCount)
    console.log('gLevel.lives',gLevel.lives )

    if (gGame.livesCount === 0) msg = 'Maybe next time'
    // console.log('TOTAL_LIVES:', TOTAL_LIVES)
    var strHTML = `<h3>${msg} ${TOTAL_LIVES}</h3>`

    //DOM
    const elLives = document.querySelector('.lives-container')
    elLives.innerHTML = strHTML
}

function renderSmileyBtn() {
    var strHTML = `<img src="pic/happy.jpg"></img>`
    // console.log('isVictory:', isVictory)
    if (gGame.lives === 0) {
        //console.log('hello')
        strHTML = `<img src="pic/sad.jpeg"></img>`
    } else if (gGame.isVictory) {
        strHTML = `<img src="pic/win.png"></img>`
    }

    const elImg = document.querySelector('.restart-container')
    elImg.innerHTML = strHTML
}


function addMines(board) {
    //manually
    // board[0][0].isMine = true
    // board[1][0].isMine = true
    // board[2][0].isMine = true

    //randomly
    for (var i = 0; i < gLevel.MINES; i++) {
        var emptyLocation = drawNum(gEmptyLocations)
        console.log('emptyLocation:', emptyLocation)
        if (!emptyLocation) return
        board[emptyLocation.i][emptyLocation.j].isMine = true
    }
}

function creatCell() {
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
    }
    return cell
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
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
            // if (elCell.minesAroundCount === 0) {
            currCellNeg.isShown = true
            gGame.shownCount++
            // }
        }
    }
}

function gameOver() {
    console.log('game over')
    var elMines = document.querySelectorAll('.mine')
    for (var i = 0; i < elMines.length; i++) {
        elMines[i].classList.remove('hide')
    }
    stopGame()
}

function checkVictry() {
    // console.log('is it victory?')
    if (gGame.markedCount + gGame.shownCount === gLevel.SIZE ** 2) {
        console.log('YOU WON!!')
        gGame.isVictory = true
        renderSmileyBtn()
        if (gGame.isVictory) stopGame()
    }
}

function removeClassHide(elCell) {
    elCell.classList.remove('hide')
}

function setTimer() {
    gTimer = setInterval(() => {
        //MODEL
        gGame.secsPassed++
        // console.log('gGame.secsPassed', gGame.secsPassed)

        //DOM
        const elTimer = document.querySelector('.timer-container')
        elTimer.innerText = gGame.secsPassed
    }, 1000)
    //console.log('gGame.secsPassed:', gGame.secsPassed)
}

function stopGame() {
    console.log('game stopped')
    clearInterval(gTimer)
    gGame.isOn = false
    // gGame.isFirstClick = true
}




