'use strict'

function onBigginer() {
    // console.log(' gGame.isFirstClick:',  gGame.isFirstClick)
    stopGame()
    gLevel.lives = 2
    gLevel.SIZE = 4
    gLevel.MINES = 2  
    onInit()

}

function onMedium() {
    // console.log(' gGame.isFirstClick:',  gGame.isFirstClick)
    // stopGame()
    gLevel.lives = 3
    gLevel.SIZE = 8
    gLevel.MINES = 14  
    onInit()
}

function onExpert() {
    // console.log(' gGame.isFirstClick:',  gGame.isFirstClick)
    // stopGame()
    gLevel.lives = 3
    gLevel.SIZE = 12
    gLevel.MINES = 32
    onInit()
}