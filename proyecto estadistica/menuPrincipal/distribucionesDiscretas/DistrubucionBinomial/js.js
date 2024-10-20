// Función para calcular la probabilidad binomial
function calcularBinomial() {
    let n = parseInt(document.getElementById('n').value);
    let p = parseFloat(document.getElementById('p').value);
    let k = parseInt(document.getElementById('k').value);
  
    if (isNaN(n) || isNaN(p) || isNaN(k)) {
      document.getElementById('resultado').innerText = "Por favor, ingresa valores válidos.";
      return;
    }
  
    let coef = factorial(n) / (factorial(k) * factorial(n - k));
    let prob = coef * Math.pow(p, k) * Math.pow(1 - p, n - k);
  
    document.getElementById('resultado').innerText =
      `La probabilidad de obtener ${k} éxitos en ${n} ensayos es: ${prob.toFixed(4)}`;
  
    // Generar el gráfico después del cálculo
    generarGrafico(n, p);
  }
  
  // Función para calcular factorial
  function factorial(num) {
    if (num < 0) return 1;
    return num === 0 || num === 1 ? 1 : num * factorial(num - 1);
  }
  
  // Función para generar el gráfico usando Chart.js
  function generarGrafico(n, p) {
    const labels = [];
    const data = [];
  
    for (let k = 0; k <= n; k++) {
      let coef = factorial(n) / (factorial(k) * factorial(n - k));
      let prob = coef * Math.pow(p, k) * Math.pow(1 - p, n - k);
      labels.push(k);
      data.push(prob.toFixed(4)); // Redondeamos a 4 decimales
    }
  
    const ctx = document.getElementById('graficoBinomial').getContext('2d');
    if (window.myChart) {
      window.myChart.destroy();  // Destruir gráfico previo si existe
    }
  
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Distribución Binomial',
          data: data,
          backgroundColor: '#3d84a8',
          borderColor: '#3d84a8',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Función para reiniciar el formulario y el gráfico
  function reiniciarFormulario() {
    document.getElementById('binomialForm').reset();
    document.getElementById('resultado').innerText = '';
    if (window.myChart) {
      window.myChart.destroy();
    }
  }
  
  
  // Función para volver a la página anterior
  function volver() {
          // Agrega una animación de salida
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';

  setTimeout(function() {
    window.location.href = '../index.html';  // O redirigir a una página específica con window.location.href = 'url';
}, 300); // Tiempo de espera para la animación

    
  }
  