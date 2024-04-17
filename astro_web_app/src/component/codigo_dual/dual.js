import numeric from 'numeric-js';
import _ from 'lodash';

// let _ = require('lodash');
// let _ = require('lodash/core');

// const numeric = require('numeric');
// const _ = require('lodash');

function gaussianElimination(G) {
    const n = G.length;
    const k = G[0].length;
    let pivotRow = 0;

    for (let j = 0; j < k; j++) {
        // Find pivot row
        for (let i = pivotRow; i < n; i++) {
            if (G[i][j] === 1) {
                // Swap rows
                [G[pivotRow], G[i]] = [G[i], G[pivotRow]];
                break;
            }
        }

        // If no pivot found in this column, move to the next column
        if (G[pivotRow][j] !== 1) {
            continue;
        }

        // Perform row operations
        for (let i = 0; i < n; i++) {
            if (i !== pivotRow && G[i][j] === 1) {
                G[i] = numeric.mod(numeric.add(G[i], G[pivotRow]), 2);
            }
        }

        pivotRow += 1;
        if (pivotRow === n) {
            break;
        }
    }

    return G;
}

function generateCodewordsFromJS(matrix, n, base) {
    const G = matrix;
    const k = G.length;

    // Generate all possible binary combinations of length k
    const informationVectors = _.cartesian(...Array(k).fill(_.range(base)));

    // Initialize a set to store unique codewords
    const uniqueCodewords = new Set();

    // Generate codewords for each information vector
    informationVectors.forEach(m => {
        // Perform matrix multiplication to obtain the codeword
        const codeword = numeric.mod(numeric.dot(m, G), base);
        uniqueCodewords.add(JSON.stringify(codeword));
    });

    // Convert unique codewords to an array
    return Array.from(uniqueCodewords).map(JSON.parse);
}

function submatrixWithoutPivot(matrix) {
    const subMatrix = [];
    const pivotColumns = new Set();

    // Find pivot columns
    matrix.forEach(row => {
        for (let j = 0; j < row.length; j++) {
            if (row[j] === 1) {
                pivotColumns.add(j);
                break;
            }
        }
    });

    // Create sub-matrix without pivot columns
    matrix.forEach(row => {
        const newRow = row.filter((_, j) => !pivotColumns.has(j));
        subMatrix.push(newRow);
    });

    return subMatrix;
}

function getHMatrix(G_str, base) {
    const G = G_str.split(',').map(row => row.split('').map(Number));
    const GPrime = gaussianElimination([...G]);

    const k = GPrime.length;
    const n = GPrime[0].length;

    // Create identity matrix for the last portion of H
    const I = numeric.identity(n - k);

    // Calculate submatrix without pivot columns
    const subMatrix = submatrixWithoutPivot(GPrime);

    // Concatenate the submatrix and identity matrix to form H
    const H = numeric.concat([
        numeric.transpose(numeric.mod(subMatrix, base)),
        I
    ], 1);

    return H;
}

function getDualCode(matrizStr, base) {
    const H = getHMatrix(matrizStr, base);
    const n = H[0].length;
    const dualCodeWords = generateCodewordsFromJS(H, n, base);

    // Print each dual code word
    dualCodeWords.forEach(w => {
        console.log(w);
    });
}

// Ejemplo de uso:
const matrixStr = '110,101,011';
const base = 2;

getDualCode(matrixStr, base);

