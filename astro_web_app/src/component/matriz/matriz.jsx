import { useState } from 'react';
import { isLinear } from './islineal';

/** Formulario básico (sin Material Web) que indica si un código es lineal. */
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

