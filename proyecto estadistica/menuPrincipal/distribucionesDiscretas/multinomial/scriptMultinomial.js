

let chartInstance = null; // Almacena la instancia del gráfico

function crearCamposCategorias() {
    const numCategorias = parseInt(document.getElementById('numCategorias').value);
    const probabilidadesInputs = document.getElementById('probabilidadesInputs');
    const exitosInputs = document.getElementById('exitosInputs');
    probabilidadesInputs.innerHTML = '';
    exitosInputs.innerHTML = '';

    for (let i = 1; i <= numCategorias; i++) {
        probabilidadesInputs.innerHTML += `
            <div class="form-group">
                <label for="probabilidad${i}">Probabilidad (p${i}):</label>
                <input type="number" id="probabilidad${i}" name="probabilidad${i}" required step="0.01" min="0" max="1">
            </div>
        `;
        exitosInputs.innerHTML += `
            <div class="form-group">
                <label for="exito${i}">Éxitos Deseados (x${i}):</label>
                <input type="number" id="exito${i}" name="exito${i}" required min="0">
            </div>
        `;
    }
    document.getElementById('btnAccion').textContent = "Calcular";
    document.getElementById('camposCategorias').style.display = 'block';
}

function calcularMultinomial() {
    const n = parseInt(document.getElementById('numEnsayos').value);
    const numCategorias = parseInt(document.getElementById('numCategorias').value);

    const probabilidades = [];
    const exitos = [];
    let sumaProbabilidades = 0;

    for (let i = 1; i <= numCategorias; i++) {
        const p = parseFloat(document.getElementById(`probabilidad${i}`).value);
        const x = parseInt(document.getElementById(`exito${i}`).value);
        probabilidades.push(p);
        exitos.push(x);
        sumaProbabilidades += p;
    }

    // Verifica que la suma de probabilidades sea 1
    if (Math.abs(sumaProbabilidades - 1) > 0.01) {
        alert('La suma de las probabilidades debe ser igual a 1.');
        return;
    }

    // Verifica que la suma de éxitos sea igual a n
    const sumaExitos = exitos.reduce((a, b) => a + b, 0);
    if (sumaExitos !== n) {
        alert('La suma de los éxitos deseados debe ser igual al número de ensayos (n).');
        return;
    }

    const probabilidad = calcularProbabilidadMultinomial(n, exitos, probabilidades);
    mostrarResultado(probabilidad);
    graficarResultados(exitos, probabilidades);
}

function calcularProbabilidadMultinomial(n, exitos, probabilidades) {
    const coeficienteMultinomial = calcularCoeficienteMultinomial(exitos, n);
    let probabilidad = coeficienteMultinomial;

    for (let i = 0; i < exitos.length; i++) {
        probabilidad *= Math.pow(probabilidades[i], exitos[i]);
    }

    return probabilidad;
}

function calcularCoeficienteMultinomial(exitos, n) {
    let factorialN = factorial(n);
    let factorialProducto = 1;

    for (let x of exitos) {
        factorialProducto *= factorial(x);
    }

    return factorialN / factorialProducto;
}

function factorial(num) {
    if (num < 0) return 0; // Manejar valores negativos
    if (num <= 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
        resultado *= i;
    }

    return resultado;
}

function mostrarResultado(probabilidad) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h2>Probabilidad: ${probabilidad.toFixed(10)}</h2>`;
}

function graficarResultados(exitos, probabilidades) {
    const ctx = document.getElementById('graficoMultinomial').getContext('2d');

    // Elimina el gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: exitos.map((_, index) => `Categoría ${index + 1}`),
            datasets: [{
                label: 'Éxitos Deseados',
                data: exitos,
                backgroundColor: 'rgba(61, 132, 168, 0.6)',
                borderColor: 'rgba(61, 132, 168, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function reiniciarFormulario() {
    document.getElementById('multinomialForm').reset();
    document.getElementById('camposCategorias').style.display = 'none';
    document.getElementById('resultado').innerHTML = '';


      // Volvemos a la configuración inicial del botón
      document.getElementById('btnAccion').textContent = "Generar Campos";
      camposGenerados = false; // Resetea el estado de los campos generados

    if (chartInstance) {
        chartInstance.destroy();
    }
}

function volver() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    setTimeout(function() {
        window.location.href = '../index.html'; // Ajusta esta ruta según sea necesario
    }, 300);
}
