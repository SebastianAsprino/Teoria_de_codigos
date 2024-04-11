// src/components/CifradoCesarReact.jsx
import React, { useState } from 'react';
import init, { cifrar_cesar } from "../../wasm/pkg/hola_wasm.js";

function CifradoCesarReact() {
  const [texto, setTexto] = useState('');
  const [clave, setClave] = useState(0);
  const [resultado, setResultado] = useState('');

  const cifrarTexto = () => {
    init().then(() => {
      const mensajeCifrado = cifrar_cesar(texto, clave);
      setResultado(mensajeCifrado);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Introduce el texto"
      />
      <input
        type="number"
        value={clave}
        onChange={(e) => setClave(parseInt(e.target.value, 10))}
        placeholder="Introduce la clave"
      />
      <button onClick={cifrarTexto}>Cifrar</button>
      <p>El texto cifrado de "{texto}" con clave {clave} es: {resultado}</p>
    </div>
  );
}

export default CifradoCesarReact;
