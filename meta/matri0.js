// script.js

// Función para crear la entrada de la matriz según el tamaño seleccionado
function createMatrixInput() {
    const size = parseInt(document.getElementById('matrixSize').value);
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('matrix-input');
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `matrix-${i}-${j}`;
            input.placeholder = String.fromCharCode(97 + j) + (i + 1); // a1, a2, a3, ..., b1, b2, b3, ...
            row.appendChild(input);
        }
        const resultInput = document.createElement('input');
        resultInput.type = 'text';
        resultInput.id = `result-${i}`;
        resultInput.placeholder = `R${i + 1}`;
        row.appendChild(resultInput);
        container.appendChild(row);
    }
}

// Función para obtener el valor de una entrada de la matriz como número complejo
function getComplexValue(id) {
    const value = document.getElementById(id).value.trim();
    try {
        return math.complex(value);
    } catch (e) {
        alert(`Error en la entrada de valor complejo: ${value}`);
        throw e;
    }
}

// Función para clonar una matriz
function cloneMatrix(matrix) {
    return matrix.map(row => row.slice());
}

// Función para calcular el determinante de una matriz compleja
function determinant(matrix) {
    return math.det(matrix);
}

// Función para resolver el sistema de ecuaciones usando el método de determinantes
function solve() {
    const size = parseInt(document.getElementById('matrixSize').value);
    const matrix = [];
    const results = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(getComplexValue(`matrix-${i}-${j}`));
        }
        matrix.push(row);
        results.push(getComplexValue(`result-${i}`));
    }

    // Calcular el determinante de la matriz original
    const detA = determinant(matrix);

    if (math.equal(detA, 0)) {
        alert('El sistema no tiene solución única (det(A) = 0).');
        return;
    }

    // Resolver el sistema de ecuaciones
    const solution = [];
    for (let i = 0; i < size; i++) {
        const clonedMatrix = cloneMatrix(matrix);
        for (let j = 0; j < size; j++) {
            clonedMatrix[j][i] = results[j];
        }
        const detAi = determinant(clonedMatrix);
        solution.push(math.divide(detAi, detA));
    }

    // Mostrar resultados en orden alfabético
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `<p>det(M): ${detA}</p>`;
    solution.forEach((val, index) => {
        const variableName = String.fromCharCode(65 + index); // A, B, C, D, ...
        resultContainer.innerHTML += `<p>${variableName} = ${val}</p>`;
    });
}
