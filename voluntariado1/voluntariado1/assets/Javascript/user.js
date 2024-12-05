// Función para cargar los datos del usuario desde localStorage
function cargarDatosUsuario() {
    const usuario = JSON.parse(localStorage.getItem('loggedInUser')); 

    if (usuario) {
        const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;
        document.querySelector('.dropdown-item-text').textContent = nombreUsuario; 
        // Ocultar enlaces de iniciar sesión y registrar
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
    } else {
        document.querySelector('.dropdown-item-text').textContent = 'Nombre del Usuario'; 
    }
}

// Función para registrar un nuevo usuario
function registerUser(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const dni = document.getElementById('dni').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    // Verificar si el usuario ya está registrado
    const existingUser = JSON.parse(localStorage.getItem('userInfo'));
    if (existingUser && existingUser.correo === correo) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Este correo ya está registrado.'
        });
        return;
    }

    // Guardar la información del usuario en localStorage
    const userInfo = {
        nombre,
        apellido,
        telefono,
        dni,
        correo,
        password
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro exitoso. La página se refrescará.'
    });

    // Redirigir a la página de inicio o refrescar
    window.location.reload();
}

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const correoLogin = document.getElementById('email').value;
    const passwordLogin = document.getElementById('passwordLogin').value;

    // Recuperar la información del usuario del localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.correo === correoLogin && userInfo.password === passwordLogin) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Inicio de sesión exitoso.'
        });
        localStorage.setItem('loggedInUser', JSON.stringify({ nombre: userInfo.nombre, apellido: userInfo.apellido }));

        // Redirigir a la página principal
        window.location.href = '../index.html';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos.'
        });
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    const currentSection = window.location.href; // Guardar la sección actual
    localStorage.removeItem('loggedInUser'); // Cambia 'usuario' por 'loggedInUser'
    document.querySelector('.dropdown-item-text').textContent = 'Nombre del Usuario'; // Resetea el texto
    document.getElementById('loginLink').style.display = 'block'; // Mostrar enlace de iniciar sesión
    document.getElementById('registerLink').style.display = 'block'; // Mostrar enlace de registrar

    Swal.fire({
        icon: 'info',
        title: 'Sesión Cerrada',
        text: 'Has cerrado sesión exitosamente.'
    }).then(() => {
        // Redirigir a la sección donde estaba el usuario
        window.location.href = currentSection; 
    });
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm'); 
    const loginForm = document.getElementById('loginForm'); 

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    cargarDatosUsuario(); // Llama a la función para cargar los datos del usuario
});
