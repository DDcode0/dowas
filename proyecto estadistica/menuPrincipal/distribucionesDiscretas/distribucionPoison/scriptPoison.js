// Función para calcular la probabilidad de Poisson
function calcularPoisson() {
    let lambda = parseFloat(document.getElementById('lambda').value);
    let k = parseInt(document.getElementById('k').value);

    if (isNaN(lambda) || isNaN(k)) {
        document.getElementById('resultado').innerText = "Por favor, ingresa valores válidos.";
        return;
    }

    // Cálculo de la distribución de Poisson
    let poissonProb = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
    let poissonProbPercentage = (poissonProb * 100).toFixed(2); // Convertir a porcentaje y redondear a 2 decimales

    // Mostrar el resultado en forma decimal y porcentaje
    document.getElementById('resultado').innerText =
        `La probabilidad de obtener ${k} éxitos con una tasa de éxito promedio de ${lambda} es: ${poissonProb.toFixed(4)} (${poissonProbPercentage}%)`;

    // Generar gráfico después del cálculo
    generarGraficoPoisson(lambda);
}

// Función para calcular el factorial
function factorial(num) {
    if (num < 0) return 1;
    return num === 0 || num === 1 ? 1 : num * factorial(num - 1);
}

// Función para generar el gráfico usando Chart.js
function generarGraficoPoisson(lambda) {
    const labels = [];
    const data = [];

    for (let k = 0; k <= 15; k++) {  // Limitar a 15 para mantener gráficos legibles
        let poissonProb = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
        labels.push(k);
        data.push(poissonProb.toFixed(4)); // Redondeamos a 4 decimales
    }

    const ctx = document.getElementById('graficoPoisson').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();  // Destruir gráfico previo si existe
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribución de Poisson',
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
    document.getElementById('poissonForm').reset();
    document.getElementById('resultado').innerText = '';
    if (window.myChart) {
        window.myChart.destroy();
    }
}

// Función para volver a la página anterior
function volver() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    setTimeout(function() {
        window.location.href = '../index.html';  // O redirigir a una página específica con window.location.href = 'url';
    }, 300);
}
