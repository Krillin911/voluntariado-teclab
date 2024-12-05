// Cargar favoritos desde localStorage
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
mostrarFavoritos(favoritos, 'favoritos');

function mostrarFavoritos(favoritos, contenedorID) {
    const contenedor = document.getElementById(contenedorID);
    contenedor.innerHTML = '';

    // Verificar si hay favoritos
    if (favoritos.length === 0) {
        // Mostrar SweetAlert si no hay productos en favoritos
        Swal.fire({
            title: 'Sin productos',
            text: 'No hay productos en favoritos.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
        return;
    }


    favoritos.forEach((producto, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('col-md-5', 'tarjeta-producto', 'mb-4');

        // Agregar la imagen del producto
        const imagen = document.createElement('img');
        imagen.src = producto.imagen; 
        imagen.alt = producto.nombre;
        imagen.style.width = '100px'; // Ajusta el tamaño según sea necesario
        imagen.style.height = 'auto'; // Mantener la proporción
        tarjeta.appendChild(imagen);

        const nombre = document.createElement('h3');
        nombre.textContent = producto.nombre;
        tarjeta.appendChild(nombre);

        const precio = document.createElement('p');
        precio.textContent = `$${producto.precio}`;
        precio.style.color = 'darkred'; // 
        precio.style.fontSize = '1.2em'; // 
        tarjeta.appendChild(precio);

        // Agregar evento para redireccionar al hacer clic en la tarjeta
        tarjeta.addEventListener('click', () => {
            window.location.href = `vista.html?nombre=${encodeURIComponent(producto.nombre)}&imagen=${encodeURIComponent(producto.imagen)}&precio=${producto.precio}&marca=${encodeURIComponent(producto.marca)}&descripcion=${encodeURIComponent(producto.descripcion)}`;
        });

        // Botón para eliminar el producto de favoritos
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-favorito', 'btn', 'btn-danger', 'mr-2');
        botonEliminar.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el clic en eliminar redirija
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Este producto se eliminará de tus favoritos!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarFavorito(index);
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado de tus favoritos.',
                        'success'
                    );
                }
            });
        });
        tarjeta.appendChild(botonEliminar);

        contenedor.appendChild(tarjeta);
    });

    // Botón para eliminar todos los favoritos
    const botonEliminarTodo = document.createElement('button');
    botonEliminarTodo.textContent = 'Eliminar Todos';
    botonEliminarTodo.classList.add('btn', 'btn-warning', 'mt-3');
    botonEliminarTodo.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Todos los productos se eliminarán de tus favoritos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar todos'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTodosFavoritos();
                Swal.fire(
                    'Eliminados!',
                    'Todos los productos han sido eliminados de tus favoritos.',
                    'success'
                );
            }
        });
    });
    contenedor.appendChild(botonEliminarTodo);
}

function eliminarFavorito(index) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.splice(index, 1); // Eliminar el favorito seleccionado
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Actualizar localStorage
    mostrarFavoritos(favoritos, 'favoritos'); // Volver a mostrar los favoritos
}

function eliminarTodosFavoritos() {
    localStorage.removeItem('favoritos'); // Eliminar todos los favoritos
    mostrarFavoritos([], 'favoritos'); // Mostrar mensaje de que no hay favoritos
}
