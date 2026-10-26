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
const listaEspejo = document.querySelector('#lista-espejo');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {
  // TODO: Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  // TODO: Una vez pasada la espera, ocultar el div #loading-state
  loadingState.style.display = 'none';

  // TODO: Invocar a la función pintarTareas()
  pintarTareas();
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {
  // TODO: Limpiar el contenedor listaContenedor (innerHTML = '')
  listaContenedor.innerHTML = '';

  // TODO: Filtrar el array 'tareas' según el 'filtroActual' usando .filter()
  let tareasFiltradas = tareas.filter((tarea) => {
    if (filtroActual === 'Pendientes') {
      return tarea.completada === false;
    }

    if (filtroActual === 'Completadas') {
      return tarea.completada === true;
    }

    return true;
  });

  // TODO: Recorrer el array filtrado y crear dinámicamente un elemento <li> por cada tarea
  tareasFiltradas.forEach((tarea) => {
    const elementoTarea = document.createElement('li');

    // TODO: Configurar las clases CSS según la prioridad y el estado (completada)
    elementoTarea.classList.add('item-tarea');
    elementoTarea.classList.add(tarea.prioridad);

    if (tarea.completada) {
      elementoTarea.classList.add('completada');
    }

    const textoTarea = document.createElement('span');
    textoTarea.textContent = tarea.titulo;

    // TODO: Añadir un botón dentro de cada <li> para poder alternar el estado (Completada/Pendiente)
    const botonEstado = document.createElement('button');

    // Identificar la tarea asociada al botón para utilizar la delegación de eventos
    botonEstado.setAttribute('data-id', tarea.id);

    if (tarea.completada) {
      botonEstado.textContent = 'Marcar pendiente';
    } else {
      botonEstado.textContent = 'Marcar completada';
    }

    elementoTarea.appendChild(textoTarea);
    elementoTarea.appendChild(botonEstado);

    // TODO: Inyectar el <li> resultante en listaContenedor usando .appendChild()
    listaContenedor.appendChild(elementoTarea);
  });

  // 4.1. RENDERIZADO DE LA LISTA ESPEJO
  // La lista espejo muestra todas las tareas, independientemente del filtro seleccionado
  listaEspejo.innerHTML = '';

  tareas.forEach((tarea) => {
    const elementoEspejo = document.createElement('li');

    elementoEspejo.classList.add('item-tarea');
    elementoEspejo.classList.add(tarea.prioridad);

    if (tarea.completada) {
      elementoEspejo.classList.add('completada');
    }

    const textoEspejo = document.createElement('span');
    textoEspejo.textContent = tarea.titulo;

    elementoEspejo.appendChild(textoEspejo);
    listaEspejo.appendChild(elementoEspejo);
  });
}

// 5. MANEJO DE EVENTOS: DELEGACIÓN DE EVENTOS EN LOS BOTONES DE LAS TAREAS
// Un único escuchador en listaContenedor gestiona los clics de todos sus botones
listaContenedor.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const idTarea = Number(event.target.getAttribute('data-id'));

    tareas = tareas.map((tarea) => {
      if (tarea.id === idTarea) {
        return {
          ...tarea,
          completada: !tarea.completada
        };
      }

      return tarea;
    });

    // Actualizar la lista principal y la lista espejo
    pintarTareas();
  }
});

// 6. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // TODO: Capturar los valores de los inputs de forma segura
  const titulo = inputTitulo.value.trim();
  const prioridad = selectPrioridad.value;

  if (titulo === '') {
    return;
  }

  // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  const nuevaTarea = {
    id: Date.now(),
    titulo: titulo,
    prioridad: prioridad,
    completada: false
  };

  // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  tareas = [...tareas, nuevaTarea];

  // TODO: Volver a invocar pintarTareas() y resetear el formulario
  pintarTareas();
  formulario.reset();
});

// 7. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach((boton) => {
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

