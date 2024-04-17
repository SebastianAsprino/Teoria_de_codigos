export function generateCodewordsFromString(matrixStr, n, base) {
  // Convert the matrix string to a JavaScript array
  const G = matrixStr.split(',').map(row => row.split('').map(Number));

  // Get the number of rows of G
  const k = G.length;

  // Generate all possible combinations of length k
  const informationVectors = Array.from(
    { length: Math.pow(base, k) },
    (_, i) => Array.from(
      { length: k },
      (_, j) => Math.floor(i / Math.pow(base, j)) % base
    )
  );

  // Initialize a set to store unique codewords
  const uniqueCodewords = new Set();

  // Generate codewords for each information vector
  for (const m of informationVectors) {
    // Perform matrix multiplication to obtain the codeword
    const codeword = m.reduce((acc, val, i) => {
      const row = G[i];
      return [...acc, row.reduce((sum, digit) => (sum + digit * val) % base, 0)];
    }, []);

    // Add the codeword to the set
    uniqueCodewords.add(codeword.toString());
  }

  return Array.from(uniqueCodewords);
}

export function getParameterGCode(matriz) {
  // Check if the string meets the criteria
  if (!/^\d+(,\d+)+$/.test(matriz) || !matriz.split(',').every(codeword => codeword.length === matriz.split(',')[0].length)) {
    console.log("The entered matrix does not meet the criteria.");
    return;
  }

  const codewords = matriz.split(',');

  const q = 1 + Math.max(...codewords.flatMap(codeword => codeword.split('').map(Number)));
  console.log("q =", q);

  const n = codewords[0].length;
  console.log("n =", n);

  const K = codewords.length;
  console.log("K =", K);

  const M = Math.pow(q, K);
  console.log("M =", M);

  // Generate code elements using itertools and sort them
  const codes = generateCodewordsFromString(matriz, n, q);
  return [q, n, K, M, codes];
}

