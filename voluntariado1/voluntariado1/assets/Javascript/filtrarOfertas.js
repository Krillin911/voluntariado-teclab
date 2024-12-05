async function cargarProductos() {
    try {
        const response = await fetch('../assets/json/productos.json'); 
        if (!response.ok) throw new Error('Error al cargar el JSON');
        
        const data = await response.json();
        const container = document.getElementById('productos-container');
        const futbolProductos = data.filter(producto => producto.deporte === 'fútbol'); 

        container.innerHTML = ''; 

        futbolProductos.forEach(producto => {
            const primeraImagen = producto.imagenes[0]; // Solo mostrar la primera imagen
            const div = document.createElement('div');
            div.className = "producto card mb-4 col-md-3";
            div.innerHTML = `
                <img src="${primeraImagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="precio-original"><span style="text-decoration: line-through;">$${producto.precioOriginal.toLocaleString()}</span></p>
                    <p class="precio-descuento"><strong>$${producto.precioDescuento.toLocaleString()}</strong> <span class="descuento">(${producto.descuento})</span></p>
                    <p>Deporte: ${producto.deporte}</p>
                    <div class="mt-auto">
                        <button class="fav btn btn-warning mt-2" onclick="addToFavorites(event, ${producto.id}, '${producto.nombre}', '${primeraImagen}', ${producto.precioDescuento})">⭐ Agregar a Favorito</button>
                    </div>
                </div>
            `;
            container.appendChild(div);

            // Agregar evento de clic para redirigir a la vista del producto
            div.addEventListener('click', () => {
                window.location.href = `vista.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${producto.precioDescuento}&marca=${encodeURIComponent(producto.marca)}&imagen=${encodeURIComponent(primeraImagen)}&descripcion=${encodeURIComponent(producto.descripcion)}&imagenes=${encodeURIComponent(JSON.stringify(producto.imagenes))}`;
            });
        });
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos. Verifica la ruta del archivo o el formato del JSON.'
        });
    }
}

// Función para agregar a favoritos
function addToFavorites(event, id, nombre, imagen, precio) {
    event.stopPropagation(); // Evitar que el evento se propague
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const productoFavorito = { id, nombre, imagen, precio };

    if (!favoritos.some(prod => prod.id === id)) {
        favoritos.push(productoFavorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `${nombre} ha sido agregado a favoritos.`
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `${nombre} ya está en favoritos.`
        });
    }
}

// Mostrar productos favoritos
function mostrarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const container = document.getElementById('favoritos-container');
    container.innerHTML = ''; 

    if (favoritos.length === 0) {
        container.innerHTML = '<p>No hay productos en favoritos.</p>';
        Swal.fire({
            icon: 'info',
            title: 'Favoritos',
            text: 'No hay productos en favoritos.'
        });
    } else {
        favoritos.forEach(producto => {
            const div = document.createElement('div');
            div.className = "producto card mb-4 col-md-3";
            div.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="precio-descuento"><strong>$${producto.precio.toLocaleString()}</strong></p>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// Cargar los productos al iniciar
window.onload = async () => {
    await cargarProductos(); 
    mostrarFavoritos(); 
};

