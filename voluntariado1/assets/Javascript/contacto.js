
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la redirección

        const formData = new FormData(this);

        fetch('https://formsubmit.co/cristianalderete911@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('successMessage').style.display = 'block'; // Muestra el mensaje de éxito
                this.reset(); // Reinicia el formulario
            } else {
                throw new Error('Error en el envío del formulario');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
