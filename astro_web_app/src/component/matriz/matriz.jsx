import {isLinear} from './islineal'


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

