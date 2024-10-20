let chartInstance = null; // Almacena la instancia del gráfico

function calcularUniforme() {
    const a = parseFloat(document.getElementById('limiteInferior').value);
    const b = parseFloat(document.getElementById('limiteSuperior').value);
    const tipoProbabilidad = document.getElementById('tipoProbabilidad').value;

    if (!validarEntradas(a, b, tipoProbabilidad)) {
        return; // Si las validaciones fallan, salir de la función
    }
    
    let resultado;

    switch (tipoProbabilidad) {
        case 'menor_igual':
            const valorX = parseFloat(document.getElementById('valorX').value);
            resultado = calcularCDFUniforme(a, b, valorX);
            document.getElementById('resultado').innerText = `P(X ≤ ${valorX}) = ${resultado.toFixed(5)}`;
            break;
        case 'mayor_igual':
            const valorXMayor = parseFloat(document.getElementById('valorX').value);
            resultado = 1 - calcularCDFUniforme(a, b, valorXMayor);
            document.getElementById('resultado').innerText = `P(X ≥ ${valorXMayor}) = ${resultado.toFixed(5)}`;
            break;
        case 'entre':
            const valorA = parseFloat(document.getElementById('valorA').value);
            const valorB = parseFloat(document.getElementById('valorB').value);
            resultado = calcularCDFUniforme(a, b, valorB) - calcularCDFUniforme(a, b, valorA);
            document.getElementById('resultado').innerText = `P(${valorA} ≤ X ≤ ${valorB}) = ${resultado.toFixed(5)}`;
            break;
        default:
            document.getElementById('resultado').innerText = 'Por favor selecciona un tipo de probabilidad válido.';
            return;
    }

    dibujarGrafico(a, b);
}

function validarEntradas(a, b, tipoProbabilidad) {
    if (isNaN(a) || isNaN(b) || a >= b) {
        alert('Por favor, ingresa valores válidos para a y b (a debe ser menor que b).');
        return false;
    }

    if (tipoProbabilidad === 'menor_igual' || tipoProbabilidad === 'mayor_igual') {
        const valorX = parseFloat(document.getElementById('valorX').value);
        if (isNaN(valorX) || valorX < a || valorX > b) {
            alert('Por favor, ingresa un valor válido para X (X debe estar entre a y b).');
            return false;
        }
    } else if (tipoProbabilidad === 'entre') {
        const valorA = parseFloat(document.getElementById('valorA').value);
        const valorB = parseFloat(document.getElementById('valorB').value);

        if (isNaN(valorA) || isNaN(valorB) || valorA < a || valorB > b || valorA >= valorB) {
            alert('Por favor, ingresa valores válidos para a y b (a debe ser menor que b).');
            return false;
        }
    }

    return true;
}

function calcularCDFUniforme(a, b, x) {
    if (x < a) return 0;
    if (x > b) return 1;
    return (x - a) / (b - a);
}

function dibujarGrafico(a, b) {
    const ctx = document.getElementById('graficoUniforme').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    const data = {
        labels: [],
        datasets: [{
            label: 'Distribución Uniforme',
            data: [],
            backgroundColor: 'rgba(61, 132, 168, 0.5)',
            borderColor: 'rgba(61, 132, 168, 1)',
            borderWidth: 1,
        }],
    };

    for (let x = a; x <= b; x += 0.1) {
        data.labels.push(x.toFixed(1));
        data.datasets[0].data.push(calcularCDFUniforme(a, b, x));
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
    document.getElementById('uniformeForm').reset();
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
