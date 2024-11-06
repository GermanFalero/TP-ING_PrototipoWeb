document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    //  Simulo datos con roles
    const usuarios = {
        'cliente1': { password: 'password1', role: 'cliente' },
        'PedroRelampago': { password: '12345', role: 'cliente' },
        'empleado1': { password: 'password2', role: 'empleado' },
        'JoseCentellas': { password: '12345', role: 'empleado' },
        // Agrega más usuarios según sea necesario
    };

    // Verifico datos
    if (usuarios[username] && usuarios[username].password === password) {
        if (usuarios[username].role === 'cliente') {
            window.location.href = 'pagPrincipalCliente/mainCliente.HTML';
        } else if (usuarios[username].role === 'empleado') {
            window.location.href = 'pagPrincipalEmpleado/mainEmpleado.HTML';
        }
    } else {
        errorMessage.textContent = 'Datos incorrectos, inténtalo de nuevo.';
        errorMessage.style.color = 'red';
    }
});