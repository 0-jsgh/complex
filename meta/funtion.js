function formatNumber(number, decimals) {
    return parseFloat(number.toFixed(decimals)).toString();
}

function calcularTrigonometria() {
    // Obtener los valores de los inputs
    const amplitud = parseFloat(document.getElementById('amplitud').value);
    const funcion = document.getElementById('funcion').value;
    const angulo = parseFloat(document.getElementById('angulo').value);
    const unidad = document.getElementById('unidad').value;

    // Convertir el ángulo a radianes si está en grados o pi
    let anguloRad;
    if (unidad === 'grados') {
        anguloRad = angulo * (Math.PI / 180);
    } else if (unidad === 'pi') {
        anguloRad = angulo * Math.PI;
    } else {
        anguloRad = angulo;
    }

    // Calcular el valor de la función trigonométrica
    let resultadoFuncion;
    switch (funcion) {
        case 'sin':
            resultadoFuncion = Math.sin(anguloRad);
            break;
        case 'cos':
            resultadoFuncion = Math.cos(anguloRad);
            break;
        case 'tan':
            resultadoFuncion = Math.tan(anguloRad);
            break;
        case 'cot':
            resultadoFuncion = 1 / Math.tan(anguloRad);
            break;
        case 'sec':
            resultadoFuncion = 1 / Math.cos(anguloRad);
            break;
        case 'csc':
            resultadoFuncion = 1 / Math.sin(anguloRad);
            break;
        default:
            resultadoFuncion = NaN;
    }

    // Calcular el resultado final
    const resultado = amplitud * resultadoFuncion;

    // Mostrar el resultado en el div de resultados
    document.getElementById('resultado').innerHTML = `Resultado: ${formatNumber(resultado, 12)}`;
}
