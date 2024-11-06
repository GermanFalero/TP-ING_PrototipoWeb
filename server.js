const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Definir usuarios predeterminados
const users = {
    cliente: { username: 'usuario', password: 'contraseña', role: 'cliente' },
    admin: { username: 'admin', password: 'adminpass', role: 'admin' }
};

// Página de inicio de sesión
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Manejo del inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica si el usuario existe y la contraseña es correcta
    const user = Object.values(users).find(u => u.username === username && u.password === password);

    if (user) {
        // Configura la sesión del usuario
        req.session.user = {
            username: user.username,
            role: user.role
        };

        // Redirige según el rol
        if (user.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/cliente');
        }
    } else {
        res.send(`<p>Datos incorrectos, inténtalo de nuevo. <a href="/">Volver</a></p>`);
    }
});

// Rutas para cliente y admin...
// Aquí irían tus rutas para '/cliente' y '/admin'

// Cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});