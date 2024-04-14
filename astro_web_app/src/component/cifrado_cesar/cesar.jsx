
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { MdSlider } from '@material/web/slider/slider';
import {MdSwitch} from '@material/web/switch/switch'
import '@material/web/switch/switch'
import './cesar.css'
import React, { useState } from 'react';
import CifradoCesar from './cifrar.jsx';
import DesCifradoCesar from './descifrar.jsx';

function Selector() { 
  // Estado para controlar qué componente mostrar
  const [modo, setModo] = useState('cifrar');  // 'cifrar' es el valor inicial

  // Función para cambiar el modo
  const toggleModo = () => {
    if (modo === 'cifrar') {
      setModo('descifrar');
    } else {
      setModo('cifrar');
    }
  };

  return (
    <>
    {/* <md-switch icons></md-switch>
<md-switch icons selected></md-switch>

<md-switch icons show-only-selected-icon></md-switch>
<md-switch icons show-only-selected-icon selected></md-switch>



<label>
  Wi-Fi
  <md-switch selected></md-switch>
</label>

<label for="switch">Bluetooth</label>
<md-switch id="switch"></md-switch> */}



      <button onClick={toggleModo}>
        Cambiar a {modo === 'cifrar' ? 'Descifrar' : 'Cifrar'}
      </button>
      {modo === 'cifrar' ? <CifradoCesar /> : <DesCifradoCesar />}
    </>
  );
}

export default Selector;
