function formatNumber(number, decimals) {
    return parseFloat(number.toFixed(decimals)).toString();
}

function calcularImpedancia() {
    // Obtener los valores de los inputs
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const frecuencia = parseFloat(document.getElementById('frecuencia').value);
    const tipoFrecuencia = document.getElementById('tipo-frecuencia').value;
    const valorPrefix = parseFloat(document.getElementById('valor-prefix').value);

    // Ajustar el valor del elemento de acuerdo al prefijo seleccionado
    const valorAjustado = valor * valorPrefix;

    // Calcular la frecuencia angular en función del tipo de frecuencia
    let w0;
    if (tipoFrecuencia === 'lineal') {
        w0 = 2 * Math.PI * frecuencia;
    } else {
        w0 = frecuencia;
    }

    let resultado = '';

    if (tipo === 'resistencia') {
        resultado = `Impedancia: ${formatNumber(valorAjustado, 12)}`;
    } else if (tipo === 'inductancia') {
        const impedancia = formatNumber(w0 * valorAjustado, 12);
        resultado = `Impedancia: ${impedancia}i`;
    } else if (tipo === 'capacitancia') {
        const impedancia = formatNumber(-1 / (w0 * valorAjustado), 12);
        resultado = `Impedancia: ${impedancia}i`;
    }

    // Mostrar el resultado en el div de resultados
    document.getElementById('resultado').innerHTML = resultado;
}
