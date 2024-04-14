import React, { useState, useEffect } from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { MdSlider } from '@material/web/slider/slider';
import init, { cifrar_cesar } from "../../wasm/pkg/hola_wasm.js";



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
        const mensajeCifrado = cifrar_cesar(mensaje, clave);
        setResultado(mensajeCifrado);
      });
    } else {
      // Si el texto está vacío, limpiar el resultado también
      setResultado('');
    }
  }, [mensaje, clave]); // Dependencias: ejecutar cifrado cada vez que cambien `texto` o `clave`

  return (  
    <>
      <OutlinedTextField 
        label="Texto a cifrar" 
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
      <p>El texto cifrado de "{mensaje}" con clave {clave} es:</p>
      <p>{resultado}</p>

    </>
  );
}

export default CifradoCesar;

// import React, { useState } from 'react';

// const IncrementDecrementInput = () => {
//     // Estado para mantener el valor del input
//     const [value, setMensaje] = useState(0);

//     // Función para incrementar el valor
//     const handleIncrement = () => {
//         setMensaje(value + 1);
//     };

//     // Función para decrementar el valor
//     const handleDecrement = () => {
//         setMensaje(value - 1);
//     };

//     return (
//         <div>
//             {/* Botón de decremento */}
//             <button onClick={handleDecrement}>-1</button>

//             {/* Campo de entrada */}
//             <input
//                 type="text"
//                 value={value}
//                 readOnly
//             />

//             {/* Botón de incremento */}
//             <button onClick={handleIncrement}>+1</button>
//         </div>
//     );
// };

// export default IncrementDecrementInput;
