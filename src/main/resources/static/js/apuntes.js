
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