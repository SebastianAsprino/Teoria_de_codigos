import {isLinear} from './islineal'
import { getParameters, findBasis } from './generar_matriz'
import { generateCodewordsFromString, getParameterGCode } from './generar_codigo'



let codeLineal = "011, 110, 000, 101"
let codeNotLineal = "011, 110, 000, 100"
console.log(codeLineal,codeNotLineal)
console.log(isLinear(codeLineal,2))
console.log(isLinear(codeNotLineal,2))


  if (isLinear(codeLineal,2)) {
    let basis1 = findBasis(codeLineal,2)
    const [k, n, d] = getParameters(basis1);
    console.log(`k: ${k}, n: ${n}, d: ${d}`);
    console.log(getParameters(basis1));
    console.log('Matriz generadora: ',basis1)


  }else{
    console.log("No es un codigo Lineal")
  }

  if (isLinear(codeNotLineal,2)) {
    let basis2 = findBasis(codeNotLineal,2)
    const [k, n, d] = getParameters(basis2);
    console.log(`k: ${k}, n: ${n}, d: ${d}`);
    console.log(getParameters(basis2));
    console.log('Matriz generadora: ',basis2)


  }else{
    console.log("No es un codigo Lineal")
  }
  console.log("genera codigo desde matriz")
  // generateCodewordsFromString, getParameterGCode
  const [q,N,K,M,codigos] = getParameterGCode("101,011")
  console.log(`q: ${q}, N: ${N}, K: ${K}, M: ${M}, codigos: ${codigos}`);
  console.log(getParameterGCode("101,011"));


  let test= generateCodewordsFromString("101,011",N,q)
  console.log(test)

  console.log("imprimir la codigo")
  for (let code of codigos) {
    console.log(code);
  }
  
  



// MyComponent.jsx

import { useEffect, useState} from 'react';
 // Asegúrate de ajustar la ruta de importación según la estructura de tu proyecto

function MyComponent() {
  const [result, setResult] = useState('');
  const [codesStr, setCodesStr] = useState('');
  const [base, setBase] = useState('');

  const checkIfLinear = () => {
    if (isLinear(codesStr, base)) {
      setResult("El código es lineal.");
    } else {
      setResult("El código no es lineal.");
    }
  };

  return (
<div>
      <div>
      <h2>Códigos (separados por comas):</h2>
          <input
            type="text"
            value={codesStr}
            onChange={(e) => setCodesStr(e.target.value)}
          />
      </div>
      <div>
        <h2>Base:</h2>

          
          <input
            type="text"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />

      </div>
      <button onClick={checkIfLinear}>Verificar Código</button>
      <p>{result}</p>
    </div>
  );
}

export default MyComponent;

