import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { MdSlider } from '@material/web/slider/slider';



// Crea un componente de React que envuelve el componente web MdOutlinedTextField
export const OutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextField,
  react: React,
  events: {
    // Utiliza el evento 'input' para actualizar en cada pulsación de tecla
    onChange: 'input', 
  },
});

export const Slider = createComponent({
  tagName: 'md-slider',
  elementClass: MdSlider,
  react: React,
  events: {
    // Utiliza el evento 'input' para actualizar en cada pulsación de tecla
    onChange: 'input', 
  },
});


function App() {
  const [value, setValue] = useState('');
  const [clave,setClave] = useState(10)



  return (
    <>
      <OutlinedTextField 
        label="Introduce un número" 
        type="tel"
        value={value} 
        onChange={(event) => setValue(event.target.value)}
      />
      <p>El doble es: {value}</p>

      <Slider
      labeled
      min="0" 
      max="100" 
      value={clave} 
      onChange={(event) => setClave(event.target.value)}
      />


    <p>esto es el valor del slider: {clave}</p>
    </>
    
  );
}

export default App;
