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

//this stage all mat is inside
function getEmptyLocations(board) {
    gEmptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
             gEmptyLocations.push({ i, j })
        }
    }
}

//get random int ex
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function drawNum(gNums) {
    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}