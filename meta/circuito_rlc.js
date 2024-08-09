function formatNumber(number, decimals) {
    return parseFloat(number.toFixed(decimals)).toString();
}

function calcularCircuito() {
    // Obtener los valores de los inputs
    const R = parseFloat(document.getElementById('R').value);
    const L = parseFloat(document.getElementById('L').value);
    const C = parseFloat(document.getElementById('C').value);
    const tipo = parseInt(document.getElementById('tipo').value);

    // Obtener los valores de los prefijos
    const RPrefix = parseFloat(document.getElementById('R-prefix').value);
    const LPrefix = parseFloat(document.getElementById('L-prefix').value);
    const CPrefix = parseFloat(document.getElementById('C-prefix').value);

    // Ajustar los valores de acuerdo a los prefijos seleccionados
    const RAdjusted = R * RPrefix;
    const LAdjusted = L * LPrefix;
    const CAdjusted = C * CPrefix;

    // Calcular frecuencia angular y factor de amortiguamiento
    const w_0 = 1 / Math.sqrt(LAdjusted * CAdjusted);
    let alpha;
    
    if (tipo === 1) {
        alpha = RAdjusted / (2 * LAdjusted);
    } else if (tipo === 2) {
        alpha = 1 / (2 * RAdjusted * CAdjusted);
    }

    // Formatear los resultados a 12 decimales y eliminar ceros innecesarios
    const w_0_formatted = formatNumber(w_0, 12);
    const alpha_formatted = formatNumber(alpha, 12);

    let resultado = '';
    if (alpha > w_0) {
        const s1 = formatNumber(-alpha - Math.sqrt(alpha**2 - w_0**2), 12);
        const s2 = formatNumber(-alpha + Math.sqrt(alpha**2 - w_0**2), 12);
        resultado = `Sobre amortiguado:<br>Frecuencia angular: ${w_0_formatted}<br>Factor de amortiguamiento: ${alpha_formatted}<br>S1: ${s1}<br>S2: ${s2}`;
    } else if (alpha === w_0) {
        resultado = `Críticamente amortiguado:<br>Frecuencia angular: ${w_0_formatted}<br>Factor de amortiguamiento: ${alpha_formatted}`;
    } else {
        const W_d = formatNumber(Math.sqrt(w_0**2 - alpha**2), 12);
        resultado = `Sub amortiguado:<br>Frecuencia angular: ${w_0_formatted}<br>Factor de amortiguamiento: ${alpha_formatted}<br>Frecuencia de amortiguamiento: ${W_d}`;
    }

    // Mostrar el resultado en el div de resultados
    document.getElementById('resultado').innerHTML = resultado;
}
