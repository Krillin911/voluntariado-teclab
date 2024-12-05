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
            icon: 'info',
            title: 'Iniciando sesión',
            text: 'Por favor, espera...',
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
                localStorage.setItem('loggedInUser', JSON.stringify({ nombre: userInfo.nombre, apellido: userInfo.apellido }));
                // Redirigir a la página principal
                window.location.href = '../index.html';
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos.'
        });
    }
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
});


