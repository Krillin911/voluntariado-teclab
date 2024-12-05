

// Función para cargar los productos desde el archivo JSON
function cargarProductos(url, contenedorID, limite = 8) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            const productosLimitados = data.slice(0, limite);
            mostrarProductosConImagenes(productosLimitados, contenedorID);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Función para mostrar los productos
function mostrarProductosConImagenes(productos, contenedorID) {
    const contenedor = document.getElementById(contenedorID);
    contenedor.innerHTML = '';

    productos.forEach((producto, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('col-md-3', 'mb-4', 'rounded'); // Añadiendo clase de borde

        const contenedorCarrusel = document.createElement('div');
        contenedorCarrusel.classList.add('carousel', 'slide');
        contenedorCarrusel.setAttribute('id', `carousel-${index}`);
        contenedorCarrusel.setAttribute('data-ride', 'carousel');
        contenedorCarrusel.setAttribute('data-interval', 'false');

        const indicadores = document.createElement('ol');
        indicadores.classList.add('carousel-indicators');
        producto.imagenes.forEach((_, imgIndex) => {
            const indicador = document.createElement('li');
            indicador.setAttribute('data-target', `#carousel-${index}`);
            indicador.setAttribute('data-slide-to', imgIndex);
            if (imgIndex === 0) indicador.classList.add('active');
            indicadores.appendChild(indicador);
        });
        contenedorCarrusel.appendChild(indicadores);

        const inner = document.createElement('div');
        inner.classList.add('carousel-inner');
        producto.imagenes.forEach((img, imgIndex) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (imgIndex === 0) item.classList.add('active');

            const imagen = document.createElement('img');
            imagen.src = img;
            imagen.alt = producto.nombre;
            imagen.classList.add('d-block', 'w-100'); // Asegura que la imagen ocupe todo el ancho

            item.appendChild(imagen);
            inner.appendChild(item);
        });
        contenedorCarrusel.appendChild(inner);

        // Agregar controles del carrusel
        const controlPrev = document.createElement('a');
        controlPrev.classList.add('carousel-control-prev');
        controlPrev.setAttribute('href', `#carousel-${index}`);
        controlPrev.setAttribute('role', 'button');
        controlPrev.setAttribute('data-slide', 'prev');
        controlPrev.innerHTML = `
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        `;
        contenedorCarrusel.appendChild(controlPrev);

        const controlNext = document.createElement('a');
        controlNext.classList.add('carousel-control-next');
        controlNext.setAttribute('href', `#carousel-${index}`);
        controlNext.setAttribute('role', 'button');
        controlNext.setAttribute('data-slide', 'next');
        controlNext.innerHTML = `
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        `;
        contenedorCarrusel.appendChild(controlNext);

        // Crear elementos para el nombre, marca y precio
        const infoProducto = document.createElement('div');
        infoProducto.classList.add('text-center', 'mt-2');

        const nombre = document.createElement('h5');
        nombre.textContent = producto.nombre;

        const marca = document.createElement('p');
        marca.textContent = `Marca: ${producto.marca}`;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.precio.toFixed(3)}`; // Formato de precio
        precio.style.color = 'darkgreen'; // 
        precio.style.fontSize = '1.2em'; // 

        infoProducto.appendChild(nombre);
        infoProducto.appendChild(marca);
        infoProducto.appendChild(precio);
        

        tarjeta.appendChild(contenedorCarrusel);
        tarjeta.appendChild(infoProducto); // Añadir información del producto a la tarjeta
        contenedor.appendChild(tarjeta);
    });
}

// Cargar productos al iniciar
window.onload = () => {
    cargarProductos('./assets/javascript/productosDestacados.json', 'contenedor-productos');
};
