


document.getElementById('start-button')?.addEventListener('click', function() {
  // Agrega una animación de salida
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';

  // Redirige después de la animación
  setTimeout(function() {
      window.location.href = 'distribuciones.html'; // Cambia el nombre de la página según sea necesario
  }, 500);
});

document.getElementById('discreta')?.addEventListener('click', function() {
  navigateWithAnimation('discreta'); // Maneja la navegación
});

document.getElementById('continua')?.addEventListener('click', function() {
  navigateWithAnimation('continua'); // Maneja la navegación
});

function navigateWithAnimation(option) {
  // Agrega una animación de salida
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';

  // Redirige después de la animación
  setTimeout(function() {
    if (option === 'discreta') {
      window.location.href = 'distribucionesDiscretas/index.html'; // Redirige a la página de distribución discreta
  } else if (option === 'continua') {
      window.location.href = 'distribucionesContinua/indexMenuContinua.html'; // Redirige a la página de distribución continua
  }
  }, 500);
}
