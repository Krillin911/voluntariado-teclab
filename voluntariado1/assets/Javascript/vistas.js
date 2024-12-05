// Función para obtener parámetros de la URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

// Mostrar detalles del producto
document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();
    const modalBody = document.getElementById('modalBody');

    // Verificar si los parámetros existen antes de mostrarlos
    if (params.nombre && params.imagen && params.precio && params.marca && params.descripcion) {
        modalBody.innerHTML = `
            <div class="d-flex align-items-start">
                <div class="image-container me-3">
                    <img src="${params.imagen}" class="img-fluid rounded" alt="${params.nombre}" id="mainImage" data-bs-toggle="modal" data-bs-target="#imageModal">
                </div>
                <div class="details">
                    <h5 class="text-secondary">${params.nombre}</h5>
                    <p class="text-muted"><strong>Marca:</strong> ${params.marca}</p>
                    <p class="text-muted"><strong>Descripción:</strong> ${params.descripcion}</p>
                    <p class="lead" style="font-size: 1.6rem; font-weight: bold;"> $${params.precio}</p>

                    <div class="mb-3">
                        <label for="talleSelect" class="form-label">Selecciona un talle:</label>
                        <select id="talleSelect" class="form-select">
                            <option value="">-- Selecciona un talle --</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <button class="btn btn-danger" id="btnTeGusta">¿Te gusta?</button>
                    <button class="btn btn-danger" id="btnNoTeGusta">¿No te gusta?</button>
                    <div class="whatsapp-button mt-3">
                        <a href="https://wa.me/1234567890" target="_blank" class="btn btn-success">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"> Enviar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <hr style="border: 1px solid #343a40; margin: 20px 0;">
        `;

        // Agregar evento al botón "Te gusta"
        document.getElementById('btnTeGusta').addEventListener('click', () => {
            mostrarPulgares('👍'); // Pulgar hacia arriba
        });

        // Agregar evento al botón "No te gusta"
        document.getElementById('btnNoTeGusta').addEventListener('click', () => {
            mostrarPulgares('👎'); // Pulgar hacia abajo
        });

        // Agregar imágenes adicionales al modal
        const imagenes = JSON.parse(params.imagenes); 
        console.log(params); // Verifica los parámetros

        const modalImages = imagenes.map((img) => `
            <div class="col">
                <img src="${img}" class="img-fluid rounded" alt="${params.nombre}" style="cursor:pointer;" onclick="openImage('${img}')">
            </div>
        `).join('');

        const modalContent = document.createElement('div');
        modalContent.className = 'row';
        modalContent.innerHTML = modalImages;

        // Agregar el contenido de las imágenes adicionales al modal
        const modalImagesContainer = document.createElement('div');
        modalImagesContainer.className = 'mt-3';
        modalImagesContainer.appendChild(modalContent);
        modalBody.appendChild(modalImagesContainer);
    } else {
        modalBody.innerHTML = '<p class="text-danger">Detalles del producto no disponibles.</p>';
    }
});

// Función para abrir una imagen en un modal
function openImage(src) {
    const modalImage = document.createElement('img');
    modalImage.src = src;
    modalImage.className = 'img-fluid';
    modalImage.style.maxWidth = '100%';
    modalImage.style.height = 'auto';

    const imageModal = document.createElement('div');
    imageModal.className = 'modal fade';
    imageModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Imagen Detallada</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${modalImage.outerHTML}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(imageModal);
    const newModalInstance = new bootstrap.Modal(imageModal);
    newModalInstance.show();

    // Eliminar el modal después de cerrarlo
    imageModal.addEventListener('hidden.bs.modal', () => {
        imageModal.remove();
    });
}

// Función para mostrar pulgares en la pantalla
function mostrarPulgares(tipo) {
    const cantidadPulgares = 100; // Número de pulgares a mostrar
    const contenedor = document.createElement('div');
    contenedor.classList.add('pulgares-container');

    for (let i = 0; i < cantidadPulgares; i++) {
        const pulgar = document.createElement('span');
        pulgar.innerHTML = tipo; // Emoji de pulgar
        pulgar.style.position = 'absolute';
        pulgar.style.fontSize = '2rem';
        pulgar.style.transition = 'transform 0.5s, opacity 0.5s';
        pulgar.style.opacity = '1';

        // Posición aleatoria
        pulgar.style.left = `${Math.random() * 100}vw`;
        pulgar.style.top = `${Math.random() * 100}vh`;

        // Anima el pulgar
        setTimeout(() => {
            pulgar.style.opacity = '0';
            pulgar.style.transform = 'translateY(-50px)'; // Movimiento hacia arriba
        }, 100);

        contenedor.appendChild(pulgar);
    }

    document.body.appendChild(contenedor);

    // Eliminar contenedor después de 5 segundos
    setTimeout(() => {
        contenedor.remove();
    }, 5000);
}







