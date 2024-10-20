let chartInstance = null; // Almacena la instancia del gráfico

function calcularNormal() {
    const media = parseFloat(document.getElementById('media').value);
    const desviacion = parseFloat(document.getElementById('desviacion').value);
    const tipoProbabilidad = document.getElementById('tipoProbabilidad').value;
    
    if (!validarEntradas(media, desviacion, tipoProbabilidad)) {
        return; // Si las validaciones fallan, salir de la función
    }
    
    let resultado;

    // Calculo de la probabilidad según el tipo
    switch (tipoProbabilidad) {
        case 'menor_igual':
            const valorX = parseFloat(document.getElementById('valorX').value);
            const zX = (valorX - media) / desviacion;
            resultado = calcularCDF(zX);
            document.getElementById('resultado').innerText = `P(X ≤ ${valorX}) = ${resultado.toFixed(5)}`;
            break;
        case 'mayor_igual':
            const valorXMayor = parseFloat(document.getElementById('valorX').value);
            const zXMayor = (valorXMayor - media) / desviacion;
            resultado = 1 - calcularCDF(zXMayor);
            document.getElementById('resultado').innerText = `P(X ≥ ${valorXMayor}) = ${resultado.toFixed(5)}`;
            break;
        case 'entre':
            const valorA = parseFloat(document.getElementById('valorA').value);
            const valorB = parseFloat(document.getElementById('valorB').value);
            const zA = (valorA - media) / desviacion;
            const zB = (valorB - media) / desviacion;
            resultado = calcularCDF(zB) - calcularCDF(zA);
            document.getElementById('resultado').innerText = `P(${valorA} < X < ${valorB}) = ${resultado.toFixed(5)}`;
            break;
        default:
            document.getElementById('resultado').innerText = 'Por favor selecciona un tipo de probabilidad válido.';
            return;
    }

    // Mostrar el gráfico
    dibujarGrafico(media, desviacion);
}

function validarEntradas(media, desviacion, tipoProbabilidad) {
    // Validar que la media sea un número
    if (isNaN(media)) {
        alert('Por favor, ingresa un valor válido para la media (μ).');
        return false;
    }

    // Validar que la desviación estándar sea mayor a 0
    if (isNaN(desviacion) || desviacion <= 0) {
        alert('La desviación estándar (σ) debe ser un número mayor a 0.');
        return false;
    }

    // Validaciones específicas según el tipo de probabilidad seleccionado
    if (tipoProbabilidad === 'menor_igual' || tipoProbabilidad === 'mayor_igual') {
        const valorX = parseFloat(document.getElementById('valorX').value);
        if (isNaN(valorX)) {
            alert('Por favor, ingresa un valor válido para X.');
            return false;
        }
    } else if (tipoProbabilidad === 'entre') {
        const valorA = parseFloat(document.getElementById('valorA').value);
        const valorB = parseFloat(document.getElementById('valorB').value);

        if (isNaN(valorA) || isNaN(valorB)) {
            alert('Por favor, ingresa valores válidos para a y b.');
            return false;
        }

        // Validar que a < b
        if (valorA >= valorB) {
            alert('El valor de a debe ser menor que el valor de b.');
            return false;
        }
    }

    // Si todas las validaciones son correctas
    return true;
}



function calcularCDF(z) {
    // Cálculo de la CDF usando la aproximación de la función de distribución normal
    return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function erf(z) {
    // Función de error
    let sign = (z >= 0) ? 1 : -1;
    z = Math.abs(z);
    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let p = 0.3275911;

    let t = 1.0 / (1.0 + p * z);
    let y = 1.0 - ((((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t) * Math.exp(-z * z);
    
    return sign * y;
}

function dibujarGrafico(media, desviacion) {
    const ctx = document.getElementById('graficoNormal').getContext('2d');
    
    // Destruir el gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    const data = {
        labels: [],
        datasets: [{
            label: 'Distribución Normal',
            data: [],
            backgroundColor: 'rgba(61, 132, 168, 0.5)',
            borderColor: 'rgba(61, 132, 168, 1)',
            borderWidth: 1,
        }],
    };

    // Crear valores para el gráfico
    for (let x = media - 4 * desviacion; x <= media + 4 * desviacion; x += 0.1) {
        let z = (x - media) / desviacion;
        data.labels.push(x.toFixed(1));
        data.datasets[0].data.push(calcularCDF(z));
    }

    // Crear el nuevo gráfico y guardar la instancia
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                        display: true,
                        text: 'Probabilidad Acumulada',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Valor de X',
                    }
                }
            }
        }
    });
}

function mostrarCamposAdicionales() {
    let tipoProbabilidad = document.getElementById('tipoProbabilidad').value;
    let camposAdicionales = document.getElementById('camposAdicionales');
    let campoValorX = document.getElementById('campoValorX');
    
    if (tipoProbabilidad === 'entre') {
        camposAdicionales.style.display = 'block';
        campoValorX.style.display = 'none'; // Oculta el campo valor X
        document.getElementById('valorX').required = false; // Campo valor X no es obligatorio
    } else {
        camposAdicionales.style.display = 'none';
        campoValorX.style.display = 'block'; // Muestra el campo valor X
        document.getElementById('valorX').required = true; // Asegura que el campo de valor X sea obligatorio
    }
}

function reiniciarFormulario() {
    document.getElementById('normalForm').reset();
    document.getElementById('resultado').innerText = '';
    const ctx = document.getElementById('graficoNormal').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }
}

function volver() {
    
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    setTimeout(function() {
        window.location.href = '../indexMenuContinua.html';  // O redirigir a una página específica con window.location.href = 'url';
    }, 300);
}
