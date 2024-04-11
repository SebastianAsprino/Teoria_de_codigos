// src/components/CifradoCesarReact.jsx
import React, { useState, useEffect } from 'react';
import init, { cifrar_cesar } from "../../wasm/pkg/hola_wasm.js";

import "@material/web/slider/slider"



function CifradoCesar() {
  const [texto, setTexto] = useState('');
  const [clave, setClave] = useState(0);
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    if (texto !== '') {
      init().then(() => {
        const mensajeCifrado = cifrar_cesar(texto, clave);
        setResultado(mensajeCifrado);
      });
    } else {
      // Si el texto está vacío, limpiar el resultado también
      setResultado('');
    }
  }, [texto, clave]); // Dependencias: ejecutar cifrado cada vez que cambien `texto` o `clave`

  return (  
    <div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Introduce el texto"
      />
      {/* <input
        type="number"
        value={clave}
        onChange={(e) => setClave(parseInt(e.target.value, 10))}
        placeholder="Introduce la clave"
      /> */}
     <input
      type="range"
      min={0} // Establece el valor mínimo del slider, ajústalo según tus necesidades
      max={100} // Establece el valor máximo del slider, ajústalo según tus necesidades
      value={clave}
      onChange={(e) => setClave(parseInt(e.target.value, 10))}
      step={1} // Establece el paso para el slider
      />
        <md-slider
        min={0}
        max={300}
        value= {clave}
        labeled 
        valuable = {clave}
      > 

      </md-slider>
      <p>El texto cifrado de "{texto}" con clave {clave} es:</p>
      <p>{resultado}</p>

<md-slider labeled min="0" max="300" value="50"></md-slider>
    </div>
  );
}

export default CifradoCesar;

