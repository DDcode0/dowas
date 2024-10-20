const menuOptions = document.querySelectorAll('.menu-option');

menuOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        option.style.transform = 'scale(1.05)'; // Aumenta el tamaño de la opción
    });

    option.addEventListener('mouseleave', () => {
        option.style.transform = 'scale(1)'; // Restaura el tamaño
    });

    option.addEventListener('click', () => {
        animateAndNavigate(option.id); // Redirige a la URL basada en el ID
    });
});

// Manejo del botón "Regresar"
document.getElementById('back').addEventListener('click', function() {
    window.location.href = '../index.html';
});




// Función para redirigir con animación
function animateAndNavigate(optionId) {
    let url;

    // Determina la URL según el ID de la opción
    switch (optionId) {
        case 'binomial':
            url = 'DistrubucionBinomial/index.html'; // URL para Binomial
            break;
        case 'multinomial':
            url = 'multinomial/indexMultinomial.html'; // URL para Multinomial
            break;
        case 'poisson':
            url = 'distribucionPoison/indexPoison.html'; // URL para Poisson
            break;
        default:
            url = 'index.html'; // URL por defecto (si es necesario)
            break;
    }

      // Agrega una animación de salida
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';


    // Redirige después de un breve retraso
    setTimeout(function() {
        window.location.href = url; // Redirige a la URL especificada
    }, 300); // Tiempo de espera para la animación
};
