/* ARREGLO DE NÚMEROS */
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

/* VARIABLES */
let tarjetaVolteda = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerPar = null;
let segundoPar = null;

/* VARIABLES ESTADÍSTICAS */
let aciertos = 0;
let numAciertos = document.getElementById('aciertos');
let movimientos = 0;
let numMovimientos = document.getElementById('movimientos');

/* VARIABLES TEMPORIZADOR */
let temporizador = false;
let tiempo = 30;
let tiempoInicial = 30;
let reducirTiempo = document.getElementById('tiempo');

/* VARIABLES SONIDOS */
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let clickAudio = new Audio('./sounds/click.wav');


function destapar(id){

    if (temporizador == false){
        iniciarConteo();
        temporizador = true;
    }

    tarjetaVolteda++;

    if (tarjetaVolteda == 1){
        tarjeta1 = document.getElementById(id);
        primerPar = numbers[id];
        tarjeta1.innerHTML = `<img src="./images/${primerPar}.png" alt="">`;
        tarjeta1.disabled = true;

        clickAudio.play();
    }
    else if (tarjetaVolteda == 2){
        tarjeta2 = document.getElementById(id);
        segundoPar = numbers[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoPar}.png" alt="">`;
        tarjeta2.disabled = true;
        /* movimientos */
        movimientos++;
        numMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if (primerPar == segundoPar){
            rightAudio.play();

            tarjetaVolteda = 0;
            /* aciertos */
            aciertos++;
            numAciertos.innerHTML = `Aciertos: ${aciertos}`;
            /* aciertos = 8 */
            if (aciertos == 8){
                clearInterval(conteoRegresivo);
                let mensaje = document.getElementById('mensaje');
                let url = 'juego-memoria\index.html';
                mensaje.innerHTML = `<h2>FELICIDADES GANASTE!!</h2>`
                +`<p>Duración total: ${tiempoInicial-tiempo} segundos</p>`
                +`<p>Total Movimientos: ${movimientos}</p>`;
                mensaje.style.display = 'block';

                winAudio.play();
            }
        }
        else{
            setTimeout(()=>{
                tarjetaVolteda = 0;
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
            },250);

            wrongAudio.play();
        }
    }
}

function iniciarConteo(){
    conteoRegresivo = setInterval(()=>{
        tiempo--;
        reducirTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
        /* si llega tiempo = 0 */
        if (tiempo == 0){
            clearInterval(conteoRegresivo);
            bloquearTarjetas();
            let mensaje = document.getElementById('mensaje');
            mensaje.innerHTML = `<h2>HAS PERDIDO</h2>`
            +`<p>Te quedaste sin tiempo...</p>`
            +`<a href="../index.html">¿Quieres volver a jugar?</a>`;
            mensaje.style.display = 'block';

            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`;
        tarjeta.disabled = true;
    }
}