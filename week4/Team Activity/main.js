const board = document.querySelector('.board');
const reset = document.querySelector('#reset');
const jugador1 = 'X';
const jugador2 = 'O';
let jugadorInicial = jugador1;
let jugador1jugadas = [];
let jugador2jugadas = [];

function nuevaJugada(e) {
    if (e.target.innerHTML == "") {
        e.target.innerHTML = jugadorInicial;
        if (jugadorInicial === jugador1) {
            jugador1jugadas.push(e.target.id);
            jugadorInicial = jugador2;
        } else {
            jugador2jugadas.push(e.target.id);
            jugadorInicial = jugador1;
        }
    }
    checkWinner("Jugador 1", jugador1jugadas);
    checkWinner("Jugador 2", jugador2jugadas);
}

function checkWinner(jugador, jugadas) {
    if (jugadas.length >= 3) {
        for(const jugada of jugadas) {
            switch (jugada) {
                case '4':
                    if (jugadas.includes((parseInt(jugada) + 1).toString()) && jugadas.includes((parseInt(jugada) - 1).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    else if (jugadas.includes((parseInt(jugada) + 2).toString()) && jugadas.includes((parseInt(jugada) - 2).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    else if (jugadas.includes((parseInt(jugada) + 3).toString()) && jugadas.includes((parseInt(jugada) - 3).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    else if (jugadas.includes((parseInt(jugada) + 4).toString()) && jugadas.includes((parseInt(jugada) - 4).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    break;                    
                case '1' || '7':
                    if (jugadas.includes((parseInt(jugada) + 1).toString()) && jugadas.includes((parseInt(jugada) - 1).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    break;
                case '3' || '5':
                    if (jugadas.includes((parseInt(jugada) + 3).toString()) && jugadas.includes((parseInt(jugada) - 3).toString())) {
                        console.log(jugador, jugadas);
                        alert(jugador + ". You are the winner!");
                    }
                    break;
            }
        }
    }
}

function resetBtn() {
    for (let i = 0; i < board.children.length; i++) {
      board.children[i].innerText = '';
    }
    jugador1jugadas = [];
    jugador2jugadas = [];
}

board.addEventListener('touchend', nuevaJugada);
reset.addEventListener('click', resetBtn);