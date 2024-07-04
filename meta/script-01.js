document.addEventListener('DOMContentLoaded', () => {
    const rectangularForm = document.getElementById('rectangular-form');
    const polarForm = document.getElementById('polar-form');
    const rectangularResult = document.getElementById('rectangular-result');
    const polarResult = document.getElementById('polar-result');

    // Convertir de polar a rectangular
    function polarToRectangular(magnitude, angle) {
        const angleRad = angle * (Math.PI / 180); // Convertir a radianes
        const real = magnitude * Math.cos(angleRad);
        const imaginary = magnitude * Math.sin(angleRad);
        return { real, imaginary };
    }

    // Convertir de rectangular a polar
    function rectangularToPolar(real, imaginary) {
        const magnitude = Math.sqrt(real * real + imaginary * imaginary);
        const angle = Math.atan2(imaginary, real) * (180 / Math.PI); // Convertir a grados
        return { magnitude, angle };
    }

    // Operaciones con números complejos en formato rectangular
    function operateRectangular(a1, b1, a2, b2, operation) {
        let resultReal, resultImaginary;
        switch (operation) {
            case 'sum':
                resultReal = a1 + a2;
                resultImaginary = b1 + b2;
                break;
            case 'subtract':
                resultReal = a1 - a2;
                resultImaginary = b1 - b2;
                break;
            case 'multiply':
                resultReal = a1 * a2 - b1 * b2;
                resultImaginary = a1 * b2 + b1 * a2;
                break;
            case 'divide':
                const denom = a2 * a2 + b2 * b2;
                resultReal = (a1 * a2 + b1 * b2) / denom;
                resultImaginary = (b1 * a2 - a1 * b2) / denom;
                break;
            case 'para':
                // Z1 * Z2
                const realMul = a1 * a2 - b1 * b2;
                const imagMul = a1 * b2 + b1 * a2;
                
                // Z1 + Z2
                const realSum = a1 + a2;
                const imagSum = b1 + b2;
                
                // Z1 * Z2 / (Z1 + Z2)
                const denomParallel = realSum * realSum + imagSum * imagSum;
                resultReal = (realMul * realSum + imagMul * imagSum) / denomParallel;
                resultImaginary = (imagMul * realSum - realMul * imagSum) / denomParallel;
                break;
        }
        return { real: parseFloat(resultReal.toFixed(12)), imaginary: parseFloat(resultImaginary.toFixed(12)) };
    }

    // Operaciones con números complejos en formato polar
    function operatePolar(r1, theta1, r2, theta2, operation) {
        let resultMagnitude, resultAngle;
        switch (operation) {
            case 'sum':
            case 'subtract':
                // Convertir a rectangular para estas operaciones
                const rect1 = polarToRectangular(r1, theta1);
                const rect2 = polarToRectangular(r2, theta2);
                const rectResult = operateRectangular(rect1.real, rect1.imaginary, rect2.real, rect2.imaginary, operation);
                const polarResult = rectangularToPolar(rectResult.real, rectResult.imaginary);
                resultMagnitude = polarResult.magnitude;
                resultAngle = polarResult.angle;
                break;
            case 'multiply':
                resultMagnitude = r1 * r2;
                resultAngle = theta1 + theta2;
                break;
            case 'divide':
                resultMagnitude = r1 / r2;
                resultAngle = theta1 - theta2;
                break;
            case 'para':
                // Z1 * Z2
                const realMul = a1 * a2 - b1 * b2;
                const imagMul = a1 * b2 + b1 * a2;
                
                // Z1 + Z2
                const realSum = a1 + a2;
                const imagSum = b1 + b2;
                
                // Z1 * Z2 / (Z1 + Z2)
                const denomParallel = realSum * realSum + imagSum * imagSum;
                resultReal = (realMul * realSum + imagMul * imagSum) / denomParallel;
                resultImaginary = (imagMul * realSum - realMul * imagSum) / denomParallel;
                break;
        }
        return { magnitude: parseFloat(resultMagnitude.toFixed(12)), angle: parseFloat(resultAngle.toFixed(12)) };
    }

    // Manejar el formulario de operaciones en formato rectangular
    rectangularForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const real1 = parseFloat(document.getElementById('real1').value);
        const imaginary1 = parseFloat(document.getElementById('imaginary1').value);
        const real2 = parseFloat(document.getElementById('real2').value);
        const imaginary2 = parseFloat(document.getElementById('imaginary2').value);
        const operation = document.getElementById('operation-rectangular').value;

        const result = operateRectangular(real1, imaginary1, real2, imaginary2, operation);
        if (result.imaginary>0){
            rectangularResult.textContent = `${result.real} +${result.imaginary}i`;
        }
        else{
            rectangularResult.textContent = `${result.real} -${-result.imaginary}i`;    
        }
    });

    // Manejar el formulario de operaciones en formato polar
    polarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const magnitude1 = parseFloat(document.getElementById('magnitude1').value);
        const angle1 = parseFloat(document.getElementById('angle1').value);
        const magnitude2 = parseFloat(document.getElementById('magnitude2').value);
        const angle2 = parseFloat(document.getElementById('angle2').value);
        const operation = document.getElementById('operation-polar').value;

        const result = operatePolar(magnitude1, angle1, magnitude2, angle2, operation);
        polarResult.textContent = `${result.magnitude} ∠ ${result.angle}°`;
    });
});
