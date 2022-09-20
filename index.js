const gameBoard = (() => {
    let boxes = []
    const cells = document.querySelectorAll('.box')

    function box(cell, symbol, location) {
        this.cell = cell
        this.symbol = symbol
        this.location = location
    }
    
    for (let i = 0; i < 9; i++ ) {
        boxes.push( new box(cells[i], '', i))
    }


    return{boxes}
})();

const gameController = (() => {


    for (let i = 0; i < 9; i++ ) {
        gameBoard.boxes[i].cell.addEventListener('click', play)
    }

 /*    gameBoard.boxes.cells.forEach((box) => {
        box.addEventListener('click', play)
    }) */
    /* stores player info */
    let players = [
    {
        name: 'player',
    }, 
    {
        name: 'computer',

    }]
    /* stores turn info */
    let _currentTurn = ''
    const controlTurn  = () => {
        if(_currentTurn == '') {
            Math.random() > 0.5 ? _currentTurn = players[0] : _currentTurn = players[1]
            if (_currentTurn == players[0]) {
                players[0].symbol = 'X'
                players[1].symbol = 'O'
            } else {
                players[0].symbol = 'O'
                players[1].symbol = 'X'
            }
        } else if (_currentTurn != '') {
            _currentTurn == players[0] ? _currentTurn = players[1] : _currentTurn = players[0]
        }
    }

    function play(event) {
        if (_currentTurn == players[0]) {
            if(gameBoard.boxes[event.target.id].symbol == '') {
                event.target.textContent = players[0].symbol
                gameBoard.boxes[event.target.id].symbol = players[0].symbol
                console.log(_currentTurn)
                controlTurn()
                computerMove()
                checkwinner()
            }
        }
    }

    const computerMove = () => {
        let emptyBox = gameBoard.boxes.filter(box => box.symbol === '')
        if (emptyBox.length != 0) {
            let choice = emptyBox[Math.floor(Math.random() * emptyBox.length)]
            choice.cell.textContent = players[1].symbol
            gameBoard.boxes[choice.cell.id].symbol = players[1].symbol
            console.log(_currentTurn)
            controlTurn()
            checkwinner()
            console.log(_currentTurn)
        }
    };

    function firstMove() {
        if (_currentTurn == players[1]) {
            computerMove()
        }    
    }

    function checkwinner() {
        if (gameBoard.boxes[0].symbol != '' && gameBoard.boxes[0].symbol == gameBoard.boxes[1].symbol && gameBoard.boxes[0].symbol == gameBoard.boxes[2].symbol) {
            gameOver(determinewinner(0))
        } else if (gameBoard.boxes[3].symbol != '' && gameBoard.boxes[3].symbol == gameBoard.boxes[4].symbol && gameBoard.boxes[3].symbol == gameBoard.boxes[5].symbol) {
            gameOver(determinewinner(3))
        } else if (gameBoard.boxes[6].symbol != '' && gameBoard.boxes[6].symbol == gameBoard.boxes[7].symbol && gameBoard.boxes[6].symbol == gameBoard.boxes[8].symbol) {
            gameOver(determinewinner(6))
        } else if (gameBoard.boxes[0].symbol != '' && gameBoard.boxes[0].symbol == gameBoard.boxes[3].symbol && gameBoard.boxes[0].symbol == gameBoard.boxes[6].symbol) {
            gameOver(determinewinner(0))
        } else if (gameBoard.boxes[1].symbol != '' && gameBoard.boxes[1].symbol == gameBoard.boxes[4].symbol && gameBoard.boxes[1].symbol == gameBoard.boxes[7].symbol) {
            gameOver(determinewinner(1))
        } else if (gameBoard.boxes[2].symbol != '' && gameBoard.boxes[2].symbol == gameBoard.boxes[5].symbol && gameBoard.boxes[2].symbol == gameBoard.boxes[8].symbol) {
            gameOver(determinewinner(2))
        } else if (gameBoard.boxes[0].symbol != '' && gameBoard.boxes[0].symbol == gameBoard.boxes[4].symbol && gameBoard.boxes[0].symbol == gameBoard.boxes[8].symbol) {
            gameOver(determinewinner(0))
        } else if (gameBoard.boxes[2].symbol != '' && gameBoard.boxes[2].symbol == gameBoard.boxes[4].symbol && gameBoard.boxes[2].symbol == gameBoard.boxes[6].symbol) {
            gameOver(determinewinner(2))
        } else {
            let emptyBox = gameBoard.boxes.filter(box => box.symbol === '')
        if (emptyBox.length == 0) {
            gameOver('Tie')
        }
        } 
    }

    function determinewinner(number) {
        if (gameBoard.boxes[number].symbol == players[0].symbol) {
            return 'Player Wins'
        } else {
            return 'Computer Wins'
        }
    }

    function gameOver(player) {
     let popup = document.querySelector('.gameend')
     const winner = document.querySelector('.gameend p')
     winner.textContent = player
     popup.show()
     document.querySelector('.Restart').addEventListener('click', () => popup.close())
     reset()
    }

    function reset() {
        _currentTurn = ''
        for (let i = 0; i < 9; i++) {
            gameBoard.boxes[i].symbol = ''
            gameBoard.boxes[i].cell.textContent = ''
        }
        controlTurn()
        firstMove()
    }
    controlTurn()
    firstMove()
    return {controlTurn, _currentTurn}

})();