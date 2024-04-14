import React, { useState, useEffect } from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { MdSlider } from '@material/web/slider/slider';
import init, { descifrar_cesar } from "../../wasm/pkg/hola_wasm.js";
import './cesar.css'



export const OutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextField,
  react: React,
  events: {
    onChange: 'input', 
  },
});



export const Slider = createComponent({
  tagName: 'md-slider',
  elementClass: MdSlider,
  react: React,
  events: {
    onChange: 'input', 
  },
});

function CifradoCesar() {
  const [clave, setClave] = useState(10);
  const [mensaje, setMensaje] = useState('');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    if (mensaje !== '') {
      init().then(() => {
        const mensajeDesCifrado = descifrar_cesar(mensaje, clave);
        setResultado(mensajeDesCifrado);
      });
    } else {
      // Si el texto está vacío, limpiar el resultado también
      setResultado('');
    }
  }, [mensaje, clave]); // Dependencias: ejecutar cifrado cada vez que cambien `texto` o `clave`

  return (  
    <>

      <OutlinedTextField 
        label="Texto a descifrar" 
        type="text"
        value={mensaje} 
        onChange={(event) => setMensaje(event.target.value)}
      />

      <Slider
      labeled
      min="0" 
      max="100" 
      value={clave} 
      onChange={(event) => setClave(event.target.value)}
      />

      <h4>El texto descifrado con clave N {clave} es:</h4>
      <h3 className='contenedor'>{resultado}</h3>

    </>
  );
}

export default CifradoCesar;
