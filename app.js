// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

// Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {
     await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  loadingState.style.display = 'none';
  pintarTareas();
  // TODO: Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
  // TODO: Una vez pasada la espera, ocultar el div #loading-state
  // TODO: Invocar a la función pintarTareas()
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {
     listaContenedor.innerHTML = '';
  let tareasFiltradas = tareas.filter((tarea) => {
    if (filtroActual === 'Pendientes') {
      return tarea.completada === false;
    }
    if (filtroActual === 'Completadas') {
      return tarea.completada === true;
    }
    return true;
  });

  tareasFiltradas.forEach((tarea) => {
    const elementoTarea = document.createElement('li');
    elementoTarea.classList.add('item-tarea');
    elementoTarea.classList.add(tarea.prioridad);

    if (tarea.completada) {
      elementoTarea.classList.add('completada');
    }

    const textoTarea = document.createElement('span');
    textoTarea.textContent = tarea.titulo;
    const botonEstado = document.createElement('button');

    if (tarea.completada) {
      botonEstado.textContent = 'Marcar pendiente';
    } else {
      botonEstado.textContent = 'Marcar completada';
    }

    botonEstado.addEventListener('click', () => {
      tareas = tareas.map((tareaActual) => {
        if (tareaActual.id === tarea.id) {
          return {
            ...tareaActual,
            completada: !tareaActual.completada
          };
        }
        return tareaActual;
      });
      pintarTareas();
    });
    elementoTarea.appendChild(textoTarea);
    elementoTarea.appendChild(botonEstado);
    listaContenedor.appendChild(elementoTarea);
  });
  // TODO: Limpiar el contenedor listaContenedor (innerHTML = '')
  // TODO: Filtrar el array 'tareas' según el 'filtroActual' usando .filter()
  // TODO: Recorrer el array filtrado y crear dinámicamente un elemento <li> por cada tarea
  // TODO: Configurar las clases CSS según la prioridad y el estado (completada)
  // TODO: Añadir un botón dentro de cada <li> para poder alternar el estado (Completada/Pendiente)
  // TODO: Inyectar el <li> resultante en listaContenedor usando .appendChild()
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // TODO: Capturar los valores de los inputs de forma segura
  // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  // TODO: Volver a invocar pintarTareas() y resetear el formulario
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (event) => {
    // Quitar clase active al botón anterior y ponérsela al pulsado
    document.querySelector('.btn-filtro.active').classList.remove('active');
    event.target.classList.add('active');
    // TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
    filtroActual = boton.getAttribute('data-filtro');
    // TODO: Invocar pintarTareas() para refrescar la pantalla
     pintarTareas();
  });
});

// Arrancar la aplicación
inicializarApp();