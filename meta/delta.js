// script.js

// Función para obtener el valor de una impedancia como número complejo
function getComplexValue(id) {
    const value = document.getElementById(id).value.trim();
    try {
        return math.complex(value);
    } catch (e) {
        alert(`Error en la entrada de valor complejo: ${value}`);
        throw e;
    }
}

// Función para realizar la conversión Delta a Estrella
function deltaToStar(z1, z2, z3) {
    const zSum = math.add(math.add(z1, z2), z3);
    const za = math.divide(math.multiply(z2, z3), zSum);
    const zb = math.divide(math.multiply(z1, z3), zSum);
    const zc = math.divide(math.multiply(z1, z2), zSum);
    return { za, zb, zc };
}

// Función para realizar la conversión Estrella a Delta
function starToDelta(za, zb, zc) {
    const z1 = math.divide(math.add(math.add(math.multiply(za, zb), math.multiply(zb, zc)), math.multiply(za, zc)), za);
    const z2 = math.divide(math.add(math.add(math.multiply(za, zb), math.multiply(zb, zc)), math.multiply(za, zc)), zb);
    const z3 = math.divide(math.add(math.add(math.multiply(za, zb), math.multiply(zb, zc)), math.multiply(za, zc)), zc);
    return { z1, z2, z3 };
}

// Función principal para manejar la conversión
function convert() {
    const conversionType = document.getElementById('conversionType').value;
    const impedance1 = getComplexValue('impedance1');
    const impedance2 = getComplexValue('impedance2');
    const impedance3 = getComplexValue('impedance3');
    let result;

    if (conversionType === 'deltaToStar') {
        result = deltaToStar(impedance1, impedance2, impedance3);
    } else {
        result = starToDelta(impedance1, impedance2, impedance3);
    }

    // Mostrar resultados
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    if (conversionType === 'deltaToStar') {
        resultContainer.innerHTML += `<p>Za: ${result.za}</p>`;
        resultContainer.innerHTML += `<p>Zb: ${result.zb}</p>`;
        resultContainer.innerHTML += `<p>Zc: ${result.zc}</p>`;
    } else {
        resultContainer.innerHTML += `<p>Za: ${result.z1}</p>`;
        resultContainer.innerHTML += `<p>Zb: ${result.z2}</p>`;
        resultContainer.innerHTML += `<p>Zc: ${result.z3}</p>`;
    }
}
