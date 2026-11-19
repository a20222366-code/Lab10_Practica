// ============ 1. CATÁLOGO DE CAMPOS ============
// Lista de todos los campos que se pueden mostrar. Cada uno dice cómo sacar su valor de un registro de la API.
const CAMPOS = [ // Arreglo de objetos, uno por campo
    { key: "foto", etiqueta: "Foto", obtener: u => u.picture.thumbnail, esImagen: true }, // Foto: es una URL y se dibuja como <img>

    { key: "nombre", etiqueta: "Nombre", obtener: u => u.name.first }, // Nombre: está en name.first del registro



    //key: internamente se llama nombre.
    // etiqueta: visualmente aparecerá como Nombre.
    // obtener: para conseguir el nombre, entra al objeto del usuario (u) y busca name.first.

    { key: "apellido", etiqueta: "Apellido", obtener: u => u.name.last }, // Apellido: está en name.last

    { key: "genero", etiqueta: "Género", obtener: u => u.gender }, // Género: está en gender (male/female)

    { key: "email", etiqueta: "Email", obtener: u => u.email }, // Email: está en email

    { key: "pais", etiqueta: "País", obtener: u => u.location.country }, // País: está en location.country

    { key: "ciudad", etiqueta: "Ciudad", obtener: u => u.location.city }, // Ciudad: está en location.city

    { key: "telefono", etiqueta: "Teléfono", obtener: u => u.phone }, // Teléfono: está en phone

    { key: "edad", etiqueta: "Edad", obtener: u => String(u.dob.age) } // Edad: está en dob.age; se pasa a texto para poder filtrarla
];

// ============ 2. ESTADO DE LA APLICACIÓN ============
let usuarios = []; // Aquí se guardan los 100 registros que devuelve la API
let seleccionados = []; // Campos elegidos, en orden de columnas: [{ key, tipo }] donde tipo es "TXT" o "CBO"
let activo = null; // key del campo resaltado en la caja derecha (el que moverán U y D)
let filtros = {}; // Valor escrito/elegido en cada filtro: { nombre: "ar", pais: "India", ... }

// ============ 3. FUNCIONES AUXILIARES ============
function obtenerCampo(key) { // Devuelve el objeto del catálogo a partir de su key
    return CAMPOS.find(c => c.key === key); // Busca en CAMPOS el que tenga esa key
}

// ============ 4. CONSUMIR LA API ============
async function cargarUsuarios() { // async permite usar await para esperar la respuesta
    try { // Intenta traer los datos
        const respuesta = await fetch("https://randomuser.me/api/?results=100"); // Pide 100 usuarios a la API

        const datos = await respuesta.json(); // Convierte la respuesta de texto JSON a objeto JavaScript

        usuarios = datos.results; // La API guarda los registros en la propiedad "results"

        dibujarDisponibles(); // Dibuja la caja izquierda (una sola vez)

        dibujarSeleccionados(); // Dibuja la caja derecha (al inicio está vacía)

        dibujarTabla(); // Dibuja la tabla (al inicio sin columnas)

    } catch (error) { // Si algo falla (sin internet, etc.)
        console.log("Error al consumir la API: " + error); // Muestra el error en la consola del navegador
    }
}

// ============ 5. CAJA IZQUIERDA: DISPONIBLES ============
function dibujarDisponibles() { // Crea una fila con checkbox por cada campo

    const contenedor = document.getElementById("listaDisponibles"); // Obtiene el div de la caja izquierda

    contenedor.innerHTML = ""; // Lo vacía por si se llama dos veces

    CAMPOS.forEach(campo => { // Recorre cada campo del catálogo

        const fila = document.createElement("div"); // Crea el div de la fila

        fila.className = "item"; // Le pone la clase CSS "item"

        const nombre = document.createElement("span"); // Crea el texto con el nombre del campo

        nombre.textContent = campo.etiqueta; // Escribe la etiqueta (Foto, Nombre, ...)

        const check = document.createElement("input"); // Crea el checkbox

        check.type = "checkbox"; // Lo define como checkbox

        //check.checked
        //Es una propiedad del checkbox que indica si está marcado o no.
        // Si está marcado: true.
        // Si está desmarcado: false.
        check.addEventListener("change", () => alternarCampo(campo.key, check.checked)); // Al marcar/desmarcar llama a alternarCampo

        fila.appendChild(nombre); // Mete el nombre dentro de la fila

        fila.appendChild(check); // Mete el checkbox dentro de la fila

        contenedor.appendChild(fila); // Mete la fila en la caja izquierda

    });
}

function alternarCampo(key, marcado) { // Se ejecuta cuando se marca o desmarca un checkbox

    if (marcado) { // Si se marcó el checkbox
        seleccionados.push({ key: key, tipo: "TXT" }); // Lo agrega AL FINAL con filtro de texto por defecto
    } else { // Si se desmarcó

        seleccionados = seleccionados.filter(s => s.key !== key); // Lo quita de la lista de seleccionados

        delete filtros[key]; // Borra el filtro que tuviera escrito

        if (activo === key) { activo = null; } // Si estaba resaltado, deja de estarlo
    }

    dibujarSeleccionados(); // Redibuja la caja derecha

    dibujarTabla(); // Redibuja la tabla con las nuevas columnas
}

// ============ 6. CAJA DERECHA: ORDEN Y TIPO ============
function dibujarSeleccionados() { // Dibuja los campos elegidos con su combobox TXT/CBO

    const contenedor = document.getElementById("listaSeleccionados"); // Obtiene el div de la caja derecha

    contenedor.innerHTML = ""; // Lo vacía para dibujarlo desde cero

    seleccionados.forEach(sel => { // Recorre los campos elegidos en su orden actual

        const campo = obtenerCampo(sel.key); // Busca sus datos en el catálogo

        const fila = document.createElement("div"); // Crea la fila

        fila.className = "item" + (sel.key === activo ? " activo" : ""); // Añade la clase "activo" si es el campo resaltado

        fila.addEventListener("click", () => { // Al hacer clic en la fila...

            activo = sel.key; // ...este campo pasa a ser el resaltado

            dibujarSeleccionados(); // Redibuja para mostrar el resaltado

        });


        const nombre = document.createElement("span"); // Crea el texto con el nombre

        nombre.textContent = campo.etiqueta; // Escribe la etiqueta del campo

        const combo = document.createElement("select"); // Crea el combobox de tipo de filtro

        if (campo.esImagen) { // La foto no se puede filtrar

            combo.innerHTML = "<option>---</option>"; // Muestra solo un guion

            combo.disabled = true; // Lo deshabilita

        } else { // Para los demás campos

            combo.innerHTML = "<option value='TXT'>TXT</option><option value='CBO'>CBO</option>"; // Dos opciones: texto o combobox

            combo.value = sel.tipo; // Selecciona el tipo que tiene guardado el campo

            combo.addEventListener("click", e => e.stopPropagation()); // Evita que abrir el combo dispare el clic de la fila

            combo.addEventListener("change", () => { // Cuando el usuario cambia TXT <-> CBO

                sel.tipo = combo.value; // Guarda el nuevo tipo

                delete filtros[sel.key]; // Limpia el filtro anterior porque ya no aplica

                dibujarTabla(); // Redibuja la tabla con el nuevo tipo de filtro

            }); // Fin del change

        } // Fin del if/else

        fila.appendChild(nombre); // Mete el nombre en la fila

        fila.appendChild(combo); // Mete el combobox en la fila

        contenedor.appendChild(fila); // Mete la fila en la caja derecha

    });
}

// ============ 7. BOTONES U Y D ============
function moverActivo(delta) { // delta = -1 sube una posición, +1 baja una posición

    const indice = seleccionados.findIndex(s => s.key === activo); // Busca en qué posición está el campo resaltado

    if (indice === -1) { return; } // Si no hay ninguno resaltado, no hace nada

    const nuevo = indice + delta; // Calcula la nueva posición

    if (nuevo < 0 || nuevo >= seleccionados.length) { return; } // Si se sale de los límites, no hace nada

    const item = seleccionados.splice(indice, 1)[0]; // Saca el campo de su posición actual

    seleccionados.splice(nuevo, 0, item); // Lo inserta en la nueva posición

    dibujarSeleccionados(); // Redibuja la caja derecha con el nuevo orden

    dibujarTabla(); // Redibuja la tabla con las columnas reordenadas
}

document.getElementById("btnUp").addEventListener("click", () => moverActivo(-1)); // Botón U: sube el campo
document.getElementById("btnDown").addEventListener("click", () => moverActivo(1)); // Botón D: baja el campo

// ============ 8. TABLA ============
function dibujarTabla() { // Dibuja cabecera y cuerpo
    dibujarCabecera(); // Primero las columnas y sus filtros
    dibujarCuerpo(); // Luego las filas
}

function dibujarCabecera() { // Dibuja nombres de columna + filtro de cada una

    const thead = document.getElementById("cabecera"); // Obtiene el <thead>

    thead.innerHTML = ""; // Lo vacía

    const tr = document.createElement("tr"); // Crea la fila de cabecera

    seleccionados.forEach(sel => { // Recorre las columnas elegidas en orden

        const campo = obtenerCampo(sel.key); // Datos del campo en el catálogo

        const th = document.createElement("th"); // Crea la celda de cabecera

        const titulo = document.createElement("div"); // Crea un div para el nombre

        titulo.textContent = campo.etiqueta; // Escribe el nombre de la columna

        th.appendChild(titulo); // Lo mete en la celda

        if (!campo.esImagen) { // La foto no lleva filtro

            if (sel.tipo === "TXT") { // Filtro de tipo texto

                const input = document.createElement("input"); // Crea la caja de texto

                input.type = "text"; // Es de tipo texto

                input.placeholder = "Filtro..."; // Texto de ayuda

                input.value = filtros[sel.key] || ""; // Conserva lo escrito antes si había algo

                input.addEventListener("input", () => { // Cada vez que el usuario escribe una letra

                    filtros[sel.key] = input.value; // Guarda el texto del filtro

                    dibujarCuerpo(); // Redibuja SOLO las filas (así el input no pierde el foco)

                }); // Fin del input

                th.appendChild(input); // Mete el input en la celda

            } else { // Filtro de tipo combobox (CBO)

                const combo = document.createElement("select"); // Crea el combobox

                const todos = document.createElement("option"); // Opción para no filtrar

                todos.value = ""; // Valor vacío = sin filtro

                todos.textContent = "Todos"; // Texto visible

                combo.appendChild(todos); // La añade al combobox

                const valores = [...new Set(usuarios.map(u => campo.obtener(u)))].sort(); // Valores únicos de ese campo, ordenados A-Z

                valores.forEach(v => { // Por cada valor único

                    const op = document.createElement("option"); // Crea una opción

                    op.value = v; // Su valor

                    op.textContent = v; // Su texto visible

                    combo.appendChild(op); // La añade al combobox

                }); // Fin del recorrido de valores

                combo.value = filtros[sel.key] || ""; // Conserva la opción elegida antes

                combo.addEventListener("change", () => { // Cuando el usuario elige una opción

                    filtros[sel.key] = combo.value; // Guarda la opción elegida

                    dibujarCuerpo(); // Redibuja las filas filtradas

                }); // Fin del change

                th.appendChild(combo); // Mete el combobox en la celda

            } // Fin del if TXT/CBO

        } // Fin del if de la foto

        tr.appendChild(th); // Mete la celda en la fila de cabecera

    }); // Fin del recorrido de columnas

    thead.appendChild(tr); // Mete la fila de cabecera en el <thead>

} // Fin de dibujarCabecera

function dibujarCuerpo() { // Dibuja las filas aplicando todos los filtros

    const tbody = document.getElementById("cuerpo"); // Obtiene el <tbody>

    tbody.innerHTML = ""; // Lo vacía

    if (seleccionados.length === 0) { return; } // Si no hay columnas elegidas, no dibuja nada

    const filtrados = usuarios.filter(u => { // Se queda solo con los usuarios que cumplen TODOS los filtros

        return seleccionados.every(sel => { // every = tiene que cumplirse en todas las columnas

            const filtro = filtros[sel.key]; // Valor del filtro de esa columna

            if (!filtro) { return true; } // Si está vacío, esa columna no filtra

            const valor = obtenerCampo(sel.key).obtener(u); // Valor real del usuario en esa columna

            if (sel.tipo === "CBO") { return valor === filtro; } // Combobox: debe ser igual a la opción elegida

            return valor.toLowerCase().includes(filtro.toLowerCase()); // Texto: contiene lo escrito, sin distinguir mayúsculas

        }); // Fin del every

    }); // Fin del filter


    filtrados.forEach(u => { // Por cada usuario que pasó los filtros

        const tr = document.createElement("tr"); // Crea una fila

        seleccionados.forEach(sel => { // Por cada columna elegida, en orden

            const campo = obtenerCampo(sel.key); // Datos del campo

            const td = document.createElement("td"); // Crea la celda

            if (campo.esImagen) { // Si es la foto

                const img = document.createElement("img"); // Crea una imagen

                img.src = campo.obtener(u); // Su origen es la URL de la foto

                td.appendChild(img); // La mete en la celda

            } else { // Si es texto

                td.textContent = campo.obtener(u); // Escribe el valor en la celda

            } // Fin del if

            tr.appendChild(td); // Mete la celda en la fila

        }); // Fin del recorrido de columnas

        tbody.appendChild(tr); // Mete la fila en el <tbody>

    });

}

// ============ 9. INICIO ============
cargarUsuarios(); // Al abrir la página, trae los datos y dibuja todo