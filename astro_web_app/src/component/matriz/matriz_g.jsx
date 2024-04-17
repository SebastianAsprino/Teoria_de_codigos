import React, { useState, useEffect } from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import {isLinear} from './islineal'
import { getParameters, findBasis } from './generar_matriz'
import {MdFilledButton} from '@material/web/button/filled-button';



export const OutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextField,
  react: React,
  events: {
    onChange: 'input', 
  },
});



export const FilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
  events: {
    onChange: 'onclick', 
  },
});



const CodeInfo = () => {
  
  const [codeLineal, setCodeLineal] = useState('');
  const [base, setBase] = useState(2); 
  const [logs, setLogs] = useState([]);

  
  const handleCodeLinealChange = (event) => {
    setCodeLineal(event.target.value);
  };

  
  const handleBaseChange = (event) => {
    setBase(parseInt(event.target.value, 10));
  };

  
  const handleProcessCodeLineal = () => {
    
    let logsArray = [];

    
    logsArray.push(`Código Lineal: ${codeLineal}`);

    
    if (isLinear(codeLineal, base)) {
      let basis1 = findBasis(codeLineal, base);
      const [k, n, d] = getParameters(basis1);
      
      
      logsArray.push(`k: ${k}, n: ${n}, d: ${d}`);
      
      
      logsArray.push('Matriz generadora:');
      basis1.forEach((row) => {
        
        logsArray.push(`[${row.join(', ')}]`);
      });
    } else {
      logsArray.push("No es un código lineal");
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


      <FilledButton onclick={handleProcessCodeLineal}>Cifrado Cesar</FilledButton>


      <div>
        {logs.map((log, index) => (
          <h4 key={index}>{log}</h4>
        ))}
      </div>
      <h2>Generar codigo a partir de matriz (Collab):</h2>
      <md-filled-button onclick="window.location.href='https://colab.research.google.com/drive/1xt0gHHE9YOMlyMDDb1JLEH-l95jPTk5D#scrollTo=4pcM0EAMa03l&line=5&uniqifier=1'">Generar Codigo</md-filled-button>
    </div>
  );
};

export default CodeInfo;
