
//Estructura general para consumir una API

//async: Indica que la función es asíncrona.
//La usamos porque cuando consultas una API,
// la respuesta puede tardar unos segundos.
//JavaScript necesita poder esperar esa respuesta
// sin bloquear toda la página.


//const sirve para declarar una variable
//cuyo valor no podrás reasignar después.

//Ejemplo: const nombre = "Juan";
//Si intentas hacer esto: nombre = "Pedro";
//JavaScript dará un error porque estás intentando
//reasignar una constante.


//DIFERENCIA CON LET:
//let: permite cambiar el valor
//Se utiliza cuando sabes que el valor de
//una variable puede cambiar.



//await significa esperar a que termine una operación
//asíncrona para continuar con la siguiente instrucción
//de esa función.


//fetch() es una función de JavaScript que permite realizar
//peticiones HTTP a una dirección (URL), por ejemplo, a una API.
//fetch() sirve para solicitar información a un servidor.


//.json() lee el contenido JSON de la respuesta y lo
//convierte en un valor JavaScript
//(normalmente un objeto o un arreglo).

async function cargarDatos() {
    try {
        const respuesta = await fetch("URL_DE_LA_API");

        const datos = await respuesta.json();

        console.log(datos);

    } catch (error) {
        console.log("Error al consumir la API:", error);
    }
}



//Ejemplos para type:
name_variable.type = "text";      // Caja de texto
name_variable.type = "checkbox";  // Casilla de selección
name_variable.type = "radio";     // Botón de opción
name_variable.type = "number";    // Campo numérico







// ¿Qué es addEventListener()? Significa agregar
// un escuchador de eventos.

// En palabras sencillas: le dices a JavaScript:
//«Estate atento a lo que haga el usuario con este
// elemento y, cuando suceda algo, ejecuta una acción».

// Por ejemplo, imagina que tienes un botón:
  <button id="miBoton">Haz clic</button>
//Y en JavaScript:
const boton = document.getElementById("miBoton");
boton.addEventListener("click", () => {
    alert("¡Hiciste clic!");
});

//¿Qué sucede?
//1. JavaScript encuentra el botón.
//2. addEventListener() se queda atento.
//3. El usuario hace clic.
//4. Se ejecuta la instrucción alert().










//appendChild significa agregar un hijo. Pero
//¿qué es un hijo en HTML?
//En HTML, cuando un elemento está dentro de otro,
// se dice que es su hijo (child).

// Mira este ejemplo:
<div>
    <span>Nombre</span>
</div>

//Aquí:
// <div> es el elemento padre.
// <span> es el elemento hijo porque está dentro del <div>.

//¿Entonces qué hace appendChild()?
// Imagina que tienes estos elementos creados en JavaScript:

const fila = document.createElement("div");
const nombre = document.createElement("span");

nombre.textContent = "Nombre";

//Todavía están separados.
// Cuando escribes:
fila.appendChild(nombre);

//Le estás diciendo a JavaScript: «Agrega el elemento
// nombre como hijo de fila». El resultado será:

<div>
    <span>Nombre</span>
</div>



//¿Qué hace push()?
// push() es un método de JavaScript que permite agregar elementos al final de un arreglo.
//Por ejemplo:

let frutas = [];

frutas.push("Manzana");
frutas.push("Pera");
frutas.push("Uva");

//¿Qué sucede?
// Después de cada push():
// 1. frutas.push("Manzana"): Manzana
// 2. frutas.push("Pera"): Manzana, Pera
// 3. frutas.push("Uva"): Manzana, Pera, Uva
// Al final tenemos: ["Manzana", "Pera", "Uva"]



//¿Qué hace filter()?
// Ahora viene el segundo método.
// filter() sirve para crear un nuevo arreglo que
// contiene solamente los elementos que cumplen una condición.

//Vamos con un ejemplo sencillo:

let numeros = [10, 20, 30, 40, 50];
let resultado = numeros.filter(n => n > 25);

//¿Qué estamos diciendo?
//numeros: el arreglo que queremos revisar.
//filter(): revisa todos los elementos.
//n: representa cada número.
//n > 25: es la condición que debe cumplir.



//textContent es una propiedad de JavaScript que permite
//leer o modificar el texto que hay dentro de un elemento HTML.

//splice() es un método de JavaScript que permite eliminar,
//insertar o reemplazar elementos dentro de un arreglo.

//Su estructura general es: arreglo.splice(posicion, cantidad);
//Tiene dos parámetros:
//posicion: desde dónde quieres empezar.
//cantidad: cuántos elementos quieres eliminar.

//Mira estos tres ejemplos:
//1. Eliminar
let frutas = ["Manzana", "Pera", "Uva"];
frutas.splice(1, 1);
//Elimina 1 elemento desde la posición 1.
//Resultado:
["Manzana", "Uva"]

//2. Insertar
let frutas = ["Manzana", "Uva"];
frutas.splice(1, 0, "Pera");
//Inserta Pera en la posición 1 sin eliminar nada.
//Resultado:
["Manzana", "Pera", "Uva"]

//3. Reemplazar
let frutas = ["Manzana", "Pera", "Uva"];
frutas.splice(1, 1, "Naranja");
//Elimina Pera e introduce Naranja en su lugar.
//Resultado:
["Manzana", "Naranja", "Uva"]






// ¿Qué hace map()?
// map() permite recorrer un arreglo y construir
// otro arreglo con el resultado de transformar cada elemento.
// Imagina que tienes:
const numeros = [1, 2, 3, 4];
//Quieres multiplicar cada número por 2.
const resultado = numeros.map(n => n * 2);
//Resultado:
[2, 4, 6, 8]


//¿Qué hace new Set()?
// Set es una estructura de JavaScript que almacena
// valores únicos, es decir, no permite duplicados.
//Ejemplo:
const paises = new Set([
    "Perú",
    "España",
    "Perú",
    "México",
    "España"
]);
//¿Qué consigue? Elimina los repetidos.
//Por tanto:
new Set(["Perú", "España", "Perú"]);
//Guarda únicamente: Perú y España


//¿Qué significa ...?
//Son tres puntos y se llaman operador spread (expansión).
//Permiten expandir los elementos de una estructura iterable,
//como un Set, dentro de un nuevo arreglo.

//Ejemplo:
const paises = new Set(["Perú", "España", "México"]);
const resultado = [...paises];
//Resultado:
["Perú", "España", "México"]
//¡Ahora volvemos a tener un arreglo!
//Visualmente:
//Set: Perú, España, México (sin repetidos)
//Arreglo: ["Perú", "España", "México"]


//¿Qué hace .sort()? sort() sirve para ordenar
//los elementos de un arreglo.
//Por ejemplo:
const paises = ["Perú", "España", "México"];
paises.sort();
//Resultado:
["España", "México", "Perú"]
//Por defecto, ordena los textos alfabéticamente según sus valores Unicode.









