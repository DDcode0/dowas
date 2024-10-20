document.getElementById('start-button').addEventListener('click', function() {
    // Agrega una animación de salida
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    // Redirige después de la animación
    setTimeout(function() {
        window.location.href = 'menuPrincipal/index.html'; // Cambia el nombre de la página según sea necesario
    }, 500);
});
