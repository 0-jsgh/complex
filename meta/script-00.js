document.addEventListener('DOMContentLoaded', () => {
    const polarForm = document.getElementById('polar-form');
    const rectangularForm = document.getElementById('rectangular-form');
    const rectangularResult = document.getElementById('rectangular-result');
    const polarResult = document.getElementById('polar-result');

    // Convertir de polar a rectangular
    polarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const magnitud = parseFloat(document.getElementById('magnitud').value);
        const angulo = parseFloat(document.getElementById('angulo').value);

        const anguloRad = angulo * (Math.PI / 180); // Convertir a radianes
        const parteReal = magnitud * Math.cos(anguloRad);
        const parteImaginaria = magnitud * Math.sin(anguloRad);

        if (parteImaginaria>0){
            rectangularResult.textContent = `${parseFloat(parteReal.toFixed(12))} +${parseFloat(parteImaginaria.toFixed(12))}i`;
        }
        else{
            rectangularResult.textContent = `${parseFloat(parteReal.toFixed(12))} -${parseFloat(-parteImaginaria.toFixed(12))}i`;  
        };
    });

    // Convertir de rectangular a polar
    rectangularForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const real = parseFloat(document.getElementById('real').value);
        const imaginary = parseFloat(document.getElementById('imaginary').value);

        const magnitud = Math.sqrt(real * real + imaginary * imaginary);
        const anguloRad = Math.atan2(imaginary, real);
        const angulo = anguloRad * (180 / Math.PI); // Convertir a grados

        polarResult.textContent = `${parseFloat(magnitud.toFixed(12))} ∠ ${parseFloat(angulo.toFixed(12))}°`;
    });
});
