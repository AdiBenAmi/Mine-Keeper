'use strict'
var MINE = '💣'
var EMPTY = ' '
var SIZE = 4


var gBoard
var gGame
var gLevel
var gElSelectedCell = null

function onInit() {
    gLevel = {
        SIZE: SIZE,
        MINES: 2
    }

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gBoard = buildBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
}

function buildBoard() {
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = creatCell(board)
        }
    }
    //console.log(board)
    createMines(board) //after need to be change that it will creat after first click
    setMinesNegsCount(board)
    return board
}

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < SIZE; i++) {
        strHTML += `<tr class="cell-row" >\n`
        for (var j = 0; j < SIZE; j++) {
            const cell = gBoard[i][j]

            // For cell of type MINE add mine class
            var className = (cell.isMine) ? 'mine' : ''
            if (cell.isMarked) className += ' marked'

            // for cell class mine render MINE
            var cellInnerText = EMPTY
            if (cell.isMine) { cellInnerText = MINE
            } else {
                cellInnerText = cell.minesAroundCount
            }
            //console.log('cell.minesAroundCount:', cell.minesAroundCount)


            strHTML += `\t<td class="hide cell ${className}" 
                            onclick="cellClicked(this, ${i}, ${j})" > ${cellInnerText}
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    const elCells = document.querySelector('.board-cells')
    //console.log('elCells:', elCells)
    elCells.innerHTML = strHTML
}

function createMines(board) {
    //lets try manually
    // board[0][0].isMine = true
    // board[1][0].isMine = true

    
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

function hideContent() {

}

