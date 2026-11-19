
//Leer entradas del formulario
const [filas, columnas] = document.getElementById("dim").value.split(",").map(Number); // "5,5" -> [5,5] como números
const palabras = document.getElementById("palabras").value.trim().toUpperCase().split(" "); // "perro gato" -> ["PERRO","GATO"]


//Matriz en memoria + tablero visual
let matriz = Array.from({ length: filas }, () => Array(columnas).fill(0)); // matriz de ceros: el "estado" real del juego

function dibujar() {                                       // convierte la matriz en celdas visibles

    const tablero = document.getElementById("tablero");    // contenedor

    tablero.innerHTML = "";                                // lo vacía para no duplicar

    tablero.style.display = "grid";                        // activa la cuadrícula CSS

    tablero.style.gridTemplateColumns = `repeat(${matriz[0].length}, 30px)`; // una columna de 30px por cada columna de la matriz

    for (let f = 0; f < matriz.length; f++) {              // recorre filas

        for (let c = 0; c < matriz[0].length; c++) {       // recorre columnas

            const celda = document.createElement("div");   // crea la celda

            celda.className = "celda";                     // clase CSS (tamaño y borde)

            celda.dataset.f = f;                           // guarda su fila en el propio elemento

            celda.dataset.c = c;                           // guarda su columna

            celda.style.background = matriz[f][c] === 1 ? "black" : "lightblue"; // color según el estado

            tablero.appendChild(celda);                    // la muestra
        }
    }
}


//Aleatorios
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // entero entre min y max, ambos incluidos
const letra = String.fromCharCode(65 + aleatorio(0, 25));                          // letra A-Z al azar


//Guardar y recuperar proceso
localStorage.setItem("partida", JSON.stringify({ matriz, pasos }));    // guarda objeto como texto
const guardado = JSON.parse(localStorage.getItem("partida"));          // null si no hay nada
if (guardado) { matriz = guardado.matriz; pasos = guardado.pasos; }    // restaura al abrir la página




//Temporizador
const id = setInterval(() => { /* un paso */ }, 500); // repite cada 500 ms
clearInterval(id);                                     // para detenerlo (al ganar o al pulsar "Detener")


//Logica hormiga
const DF = [-1, 0, 1, 0]; // cambio de fila para cada dirección: 0=arriba, 1=derecha, 2=abajo, 3=izquierda
const DC = [0, 1, 0, -1]; // cambio de columna para cada dirección
let hormiga = { f: 2, c: 2, dir: 1 }; // posición inicial (2,2) mirando a la derecha ("R")

function paso() {
    const { f, c } = hormiga;                      // posición actual
    if (matriz[f][c] === 0) {                      // hay MIGA (blanca)
        matriz[f][c] = 1;                          // deja FEROMONA (negra)
        hormiga.dir = (hormiga.dir + 1) % 4;       // gira 90° a la derecha
    } else {                                       // hay FEROMONA
        matriz[f][c] = 0;                          // deja MIGA
        hormiga.dir = (hormiga.dir + 3) % 4;       // gira 90° a la izquierda (+3 equivale a -1)
    }
    hormiga.f += DF[hormiga.dir];                  // avanza 1 en fila
    hormiga.c += DC[hormiga.dir];                  // avanza 1 en columna
    if (hormiga.f < 0 || hormiga.c < 0 || hormiga.f >= matriz.length || hormiga.c >= matriz[0].length) {
        ampliar();                                 // si se sale del tablero, hay que agrandarlo
    }
}


//Pupiletras
function colocarPalabra(palabra) {
    while (true) {                                                   // reintenta hasta encontrar un lugar libre
        const horizontal = Math.random() < 0.5;                      // 50% horizontal, 50% vertical
        const texto = Math.random() < 0.5 ? palabra : palabra.split("").reverse().join(""); // normal o invertida
        const f = aleatorio(0, filas - (horizontal ? 1 : texto.length)); // fila inicial que no se salga del tablero
        const c = aleatorio(0, columnas - (horizontal ? texto.length : 1)); // columna inicial que no se salga
        let cabe = true;                                             // asume que cabe
        for (let i = 0; i < texto.length; i++) {                     // revisa cada letra
            const ff = horizontal ? f : f + i;                       // fila de la letra i
            const cc = horizontal ? c + i : c;                       // columna de la letra i
            if (letras[ff][cc] !== null && letras[ff][cc] !== texto[i]) cabe = false; // choca con otra palabra
        }
        if (cabe) {                                                  // si cabe, la escribe
            for (let i = 0; i < texto.length; i++) {
                letras[horizontal ? f : f + i][horizontal ? c + i : c] = texto[i];
            }
            return;                                                  // termina
        }
    }
}



