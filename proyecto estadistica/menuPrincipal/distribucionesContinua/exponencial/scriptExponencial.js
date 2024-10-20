let chartInstance = null; // Almacena la instancia del gráfico

function calcularExponencial() {
    const lambda = parseFloat(document.getElementById('tasa').value);
    const tipoProbabilidad = document.getElementById('tipoProbabilidad').value;

    if (!validarEntradas(lambda, tipoProbabilidad)) {
        return; // Si las validaciones fallan, salir de la función
    }
    
    let resultado;

    switch (tipoProbabilidad) {
        case 'menor_igual':
            const valorX = parseFloat(document.getElementById('valorX').value);
            resultado = calcularCDFExponencial(lambda, valorX);
            document.getElementById('resultado').innerText = `P(X ≤ ${valorX}) = ${resultado.toFixed(5)}`;
            break;
        case 'mayor_igual':
            const valorXMayor = parseFloat(document.getElementById('valorX').value);
            resultado = 1 - calcularCDFExponencial(lambda, valorXMayor);
            document.getElementById('resultado').innerText = `P(X ≥ ${valorXMayor}) = ${resultado.toFixed(5)}`;
            break;
        case 'entre':
            const valorA = parseFloat(document.getElementById('valorA').value);
            const valorB = parseFloat(document.getElementById('valorB').value);
            resultado = calcularCDFExponencial(lambda, valorB) - calcularCDFExponencial(lambda, valorA);
            document.getElementById('resultado').innerText = `P(${valorA} < X < ${valorB}) = ${resultado.toFixed(5)}`;
            break;
        default:
            document.getElementById('resultado').innerText = 'Por favor selecciona un tipo de probabilidad válido.';
            return;
    }

    dibujarGrafico(lambda);
}

function validarEntradas(lambda, tipoProbabilidad) {
    if (isNaN(lambda) || lambda <= 0) {
        alert('Por favor, ingresa un valor válido para la tasa de ocurrencia (λ).');
        return false;
    }

    if (tipoProbabilidad === 'menor_igual' || tipoProbabilidad === 'mayor_igual') {
        const valorX = parseFloat(document.getElementById('valorX').value);
        if (isNaN(valorX) || valorX < 0) {
            alert('Por favor, ingresa un valor válido para X (X debe ser mayor o igual a 0).');
            return false;
        }
    } else if (tipoProbabilidad === 'entre') {
        const valorA = parseFloat(document.getElementById('valorA').value);
        const valorB = parseFloat(document.getElementById('valorB').value);

        if (isNaN(valorA) || isNaN(valorB) || valorA < 0 || valorB < 0) {
            alert('Por favor, ingresa valores válidos para a y b (ambos deben ser mayores o iguales a 0).');
            return false;
        }

        if (valorA >= valorB) {
            alert('El valor de a debe ser menor que el valor de b.');
            return false;
        }
    }

    return true;
}

function calcularCDFExponencial(lambda, x) {
    return 1 - Math.exp(-lambda * x);
}

function dibujarGrafico(lambda) {
    const ctx = document.getElementById('graficoExponencial').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    const data = {
        labels: [],
        datasets: [{
            label: 'Distribución Exponencial',
            data: [],
            backgroundColor: 'rgba(61, 132, 168, 0.5)',
            borderColor: 'rgba(61, 132, 168, 1)',
            borderWidth: 1,
        }],
    };

    for (let x = 0; x <= 10; x += 0.1) {
        data.labels.push(x.toFixed(1));
        data.datasets[0].data.push(calcularCDFExponencial(lambda, x));
    }

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
        campoValorX.style.display = 'none';
        document.getElementById('valorX').required = false;
    } else {
        camposAdicionales.style.display = 'none';
        campoValorX.style.display = 'block';
        document.getElementById('valorX').required = true;
    }
}

function reiniciarFormulario() {
    document.getElementById('exponencialForm').reset();
    document.getElementById('resultado').innerText = '';
    if (chartInstance) {
        chartInstance.destroy();
    }
}

function volver() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    setTimeout(function() {
        window.location.href = '../indexMenuContinua.html';
    }, 300);
}
