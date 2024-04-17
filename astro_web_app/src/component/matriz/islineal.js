export function isLinear(codesStr, base) {
  const codes = codesStr.split(", ");
  for (let i = 0; i < codes.length; i++) {
    for (let j = i + 1; j < codes.length; j++) {
      if (!isValidCodeword(codes[i], codes[j], base, codes)) {
        return false;
      }
    }
  }
  return true;
}

function isValidCodeword(code1, code2, base, codes) {
  // Convert the code words to base
  const intCode1 = parseInt(code1, base);
  const intCode2 = parseInt(code2, base);
  // Sum the words
  const sumCode = intCode1 ^ intCode2;
  // Convert back to the code base
  const sumCodeStr = sumCode.toString(base).padStart(code1.length, '0');
  // Return true if the resulting element is in the code, i.e., is closed under the sum
  return codes.includes(sumCodeStr);
}

const codesStr = "011, 110, 000, 101";
const base = 2;

export default {isLinear}


















