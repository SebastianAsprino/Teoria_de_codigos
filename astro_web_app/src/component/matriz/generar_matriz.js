export function findBasis(code, base) {
  // Generate an array with the elements of the code
  const codes = code.split(", ");
  // Initialize an empty array that will represent the elements of the basis
  const basis = [];

  for (const codeword of codes) {
    // Separate each word into an array of its bits
    const codewordList = [...codeword].map(digit => parseInt(digit));

    // Do not include the 0 element in the basis
    if (codewordList.every(bit => bit === 0)) {
      continue;
    }

    // Include the first non-zero element in the code
    if (basis.length === 0) {
      basis.push(codewordList);
      continue;
    }

    // Validate that the word is linearly independent of those already part of the basis
    let independent = true;
    for (let i = 0; i < basis.length; i++) {
      for (let j = i + 1; j < basis.length; j++) {
        const linearCombination = basis[i].map((_, idx) => (codewordList[idx] - basis[i][idx] - basis[j][idx]) % base);
        if (linearCombination.every(bit => bit === 0)) {
          independent = false;
          break;
        }
      }
      if (!independent) {
        break;
      }
    }

    // If it is independent, add it to the basis
    if (independent) {
      basis.push(codewordList);
    }
  }

  return basis;
}

export function getParameters(basis) {
  // Dimension of the code = number of rows in G
  const k = basis.length;

  // n = number of columns in G
  const n = basis[0].length;

  // d = minimum distance of one word to another
  const d = Math.min(...basis.map(row => row.reduce((sum, bit) => sum + bit, 0)));

  return [k, n, d];
}

