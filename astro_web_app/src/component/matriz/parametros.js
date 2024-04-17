 export default function getParameters(basis) {
  // Code dimension = number of rows in G
  const k = basis.length;

  // n = number of columns in G
  const n = basis[0].length;

  // d = minimum distance of a word to another
  const d = Math.min(...basis.map(row => row.reduce((sum, bit) => sum + bit, 0)));

  return { k, n, d };
}