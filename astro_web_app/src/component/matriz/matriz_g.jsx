import { useState } from 'react';
import { isLinear } from './islineal';
import { getParameters, findBasis } from './generar_matriz';
import { FilledButton, OutlinedTextField } from '../shared/material.js';

const BASE_INICIAL = 2;
const COLAB_GENERAR_CODIGO_URL =
  'https://colab.research.google.com/drive/1xt0gHHE9YOMlyMDDb1JLEH-l95jPTk5D#scrollTo=4pcM0EAMa03l&line=5&uniqifier=1';

/**
 * Comprueba si un código es lineal y, en ese caso, muestra sus parámetros [n, k, d]
 * y su matriz generadora.
 */
const CodeInfo = () => {
  const [codeLineal, setCodeLineal] = useState('');
  const [base, setBase] = useState(BASE_INICIAL);
  const [logs, setLogs] = useState([]);

  const handleCodeLinealChange = (event) => {
    setCodeLineal(event.target.value);
  };

  const handleBaseChange = (event) => {
    setBase(parseInt(event.target.value, 10));
  };

  const handleProcessCodeLineal = () => {
    const logsArray = [`Código Lineal: ${codeLineal}`];

    if (isLinear(codeLineal, base)) {
      const basis = findBasis(codeLineal, base);
      const [k, n, d] = getParameters(basis);

      logsArray.push(`k: ${k}, n: ${n}, d: ${d}`);
      logsArray.push('Matriz generadora:');
      basis.forEach((row) => {
        logsArray.push(`[${row.join(', ')}]`);
      });
    } else {
      logsArray.push('No es un código lineal');
    }

    setLogs(logsArray);
  };

  return (
    <div>
      <h2>Matriz Generadora</h2>

      <OutlinedTextField
        label="Ingresa Codigo Lineal"
        type="text"
        value={codeLineal}
        onChange={handleCodeLinealChange}
      />

      <OutlinedTextField
        label="Ingresa Base"
        type="number"
        value={base}
        onChange={handleBaseChange}
      />

      <FilledButton onClick={handleProcessCodeLineal}>Generar matriz</FilledButton>

      <div>
        {logs.map((log, index) => (
          <h4 key={index}>{log}</h4>
        ))}
      </div>
      <h2>Generar codigo a partir de matriz (Collab):</h2>
      <FilledButton href={COLAB_GENERAR_CODIGO_URL}>Generar Codigo</FilledButton>
    </div>
  );
};

export default CodeInfo;
