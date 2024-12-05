async function cargarProductos() {
    try {
        const response = await fetch('../assets/javascript/productos.json'); 
        if (!response.ok) throw new Error('Error al cargar el JSON');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos.'
        });
        return []; // Retornar un array vacío en caso de error
    }
}

async function filtrarProductosPorAccesorio() {
    const productos = await cargarProductos();
    const productosContainer = document.getElementById('productos-imagenes');

    // Limpiar el contenedor de productos
    productosContainer.innerHTML = '';

    // Filtrar productos donde deporte es "zapatillas"
    const productosFiltrados = productos.filter(producto => producto.deporte === 'zapatillas');

    // Mostrar los productos filtrados
    productosFiltrados.forEach(producto => {
        const primeraImagen = producto.imagenes ? producto.imagenes[0] : ''; // Asegúrate de que exista la propiedad 'imagenes'
        const productoDiv = document.createElement('div');
        productoDiv.className = 'col-md-3'; // Ajusta según el diseño
        productoDiv.innerHTML = `
            <div class="card mb-4" style="height: 500px;" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-deporte="${producto.deporte}" data-imagen="${primeraImagen}" data-descripcion="${producto.descripcion}">
                <img src="${primeraImagen}" class="card-img-top" alt="${producto.nombre}" style="height: 280px; object-fit: cover;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text" style="font-weight: bold; font-size: 1.2em;color:red">Precio: $${producto.precio.toFixed(3)}</p>
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
            // Redirigir a la vista del producto, incluyendo todas las imágenes
            window.location.href = `vista.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${producto.precio}&marca=${encodeURIComponent(producto.deporte)}&imagen=${encodeURIComponent(primeraImagen)}&descripcion=${encodeURIComponent(producto.descripcion)}&imagenes=${encodeURIComponent(JSON.stringify(producto.imagenes))}`;
        });

        // Agregar evento al botón de agregar a favoritos
        const botonFavorito = productoDiv.querySelector('.agregar-favorito');
        botonFavorito.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el click en el botón active el evento de la tarjeta
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

// Cargar productos al iniciar
window.onload = async () => {
    await filtrarProductosPorAccesorio();
};
