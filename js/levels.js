'use strict'

function onBigginer() {
    gLevel.SIZE = 4
    gLevel.MINES = 2
    gBoard = buildBoard()
    renderBoard()
    gGame.shownCount=0
    gGame.markedCount = 0

}

function onMedium() {
    gLevel.SIZE = 8
    gLevel.MINES = 14
    gBoard = buildBoard()
    renderBoard()
    gGame.shownCount=0
    gGame.markedCount = 0
}

function onExpert() {
    gLevel.SIZE = 12
    gLevel.MINES = 32
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.shownCount=0
    gGame.markedCount = 0

}