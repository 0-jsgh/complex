function formatNumber(number, decimals) {
    return parseFloat(number.toFixed(decimals)).toString();
}

function calcularTrigonometriaInversa() {
    // Obtener los valores de los inputs
    const valor = parseFloat(document.getElementById('valor').value);
    const funcion = document.getElementById('funcion').value;
    const unidad = document.getElementById('unidad').value;

    // Calcular el valor de la función trigonométrica inversa
    let resultadoFuncion;
    switch (funcion) {
        case 'asin':
            resultadoFuncion = Math.asin(valor);
            break;
        case 'acos':
            resultadoFuncion = Math.acos(valor);
            break;
        case 'atan':
            resultadoFuncion = Math.atan(valor);
            break;
        case 'acot':
            resultadoFuncion = Math.atan(1 / valor);
            break;
        case 'asec':
            resultadoFuncion = Math.acos(1 / valor);
            break;
        case 'acsc':
            resultadoFuncion = Math.asin(1 / valor);
            break;
        default:
            resultadoFuncion = NaN;
    }

    let resultado;

    // Convertir el resultado según la unidad seleccionada
    if (unidad === 'grados') {
        resultado = `${formatNumber(resultadoFuncion * (180 / Math.PI), 12)}º`;
    } else if (unidad === 'pi') {
        resultado = `${formatNumber(resultadoFuncion / Math.PI, 12)}π`;
    } else {
        resultado = formatNumber(resultadoFuncion, 12);
    }

    // Mostrar el resultado en el div de resultados
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;
}
