async function cargarProductos() {
    try {
        const response = await fetch('../assets/json/productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos: ' + response.statusText);
        }
        const productos = await response.json();
        console.log('Productos cargados:', productos);
        return productos;
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos.'
        });
    }
}

async function filtrarProductos() {
    try {
        const productos = await cargarProductos();
        const selectDeporte = document.getElementById('deporteSelect');
        const selectedValue = selectDeporte.value;
        const productosContainer = document.getElementById('productos-imagenes');

        // Limpiar el contenedor de productos
        productosContainer.innerHTML = '';

        // Filtrar productos según el deporte seleccionado, excluyendo "fútbol"
        const productosFiltrados = productos.filter(producto => {
            const esFutbol = producto.deporte === 'fútbol';
            return !esFutbol && (selectedValue === '' || producto.deporte === selectedValue);
        });

        console.log('Productos filtrados:', productosFiltrados);

        // Mostrar los productos filtrados
        productosFiltrados.forEach(producto => {
            const primeraImagen = producto.imagenes ? producto.imagenes[0] : '';
            const productoDiv = document.createElement('div');
            productoDiv.className = 'col-md-3'; // Ajusta según el diseño de la vista
            productoDiv.innerHTML = `
                <div class="card mb-4" style="height: 500px;" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-deporte="${producto.deporte}" data-imagen="${primeraImagen}" data-descripcion="${producto.descripcion}">
                    <img src="${primeraImagen}" class="card-img-top" alt="${producto.nombre}" style="height: 280px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text" style="font-weight: bold; font-size: 1.2em; color:red">Precio: $${producto.precio.toFixed(3)}</p>
                            <p class="card-text">Deporte: ${producto.deporte}</p> 
                        </div>
                        <button class="btn btn-warning agregar-favorito" data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}" data-deporte="${producto.deporte}" data-imagen="${primeraImagen}"
                        data-descripcion="${producto.descripcion}">⭐ Agregar a Favoritos</button>
                    </div>
                </div>
            `;
            productosContainer.appendChild(productoDiv);

            // Agregar evento de click a la tarjeta
            const card = productoDiv.querySelector('.card');
            card.addEventListener('click', () => {
                window.location.href = `vista.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${producto.precio}&marca=${encodeURIComponent(producto.marca)}&imagen=${encodeURIComponent(primeraImagen)}&descripcion=${encodeURIComponent(producto.descripcion)}&imagenes=${encodeURIComponent(JSON.stringify(producto.imagenes))}`;
            });

            // Agregar evento al botón de agregar a favoritos
            const botonFavorito = productoDiv.querySelector('.agregar-favorito');
            botonFavorito.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que el click en el botón active el evento de la tarjeta
                const productoFavorito = {
                    nombre: botonFavorito.getAttribute('data-nombre'),
                    precio: botonFavorito.getAttribute('data-precio'),
                    deporte: botonFavorito.getAttribute('data-deporte'), 
                    imagen: botonFavorito.getAttribute('data-imagen'),
                    descripcion: botonFavorito.getAttribute('data-descripcion')
                };
                agregarAFavoritos(productoFavorito);
            });
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos.'
        });
    }
}

// Función para agregar un producto a favoritos
function agregarAFavoritos(producto) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.some(fav => fav.nombre === producto.nombre)) {
        favoritos.push(producto);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `${producto.nombre} ha sido agregado a favoritos.`
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `${producto.nombre} ya está en favoritos.`
        });
    }
}

// Función para mostrar la vista previa de favoritos
function mostrarVistaPreviaFavoritos() {
    const vistaPrevia = document.getElementById('vista-previa-favoritos');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosContenido = document.getElementById('favoritos-contenido');

    // Limpiar contenido previo
    favoritosContenido.innerHTML = '';

    if (favoritos.length === 0) {
        favoritosContenido.innerHTML = '<p>No hay productos en favoritos.</p>';
    } else {
        favoritos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.innerHTML = `
                <div>
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="height: 50px; object-fit: cover;">
                    <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                </div>
            `;
            favoritosContenido.appendChild(productoDiv);
        });
    }

    // Mostrar u ocultar la vista previa
    vistaPrevia.style.display = vistaPrevia.style.display === 'none' ? 'block' : 'none';
}

// Cargar los productos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    await filtrarProductos(); // Cargar todos los productos inicialmente

    // Agregar evento al botón de favoritos
    document.getElementById('btn-favoritos').addEventListener('click', mostrarVistaPreviaFavoritos);
});

