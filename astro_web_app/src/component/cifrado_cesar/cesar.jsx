
import { createComponent } from '@lit/react';
import {MdSwitch} from '@material/web/switch/switch'
import './selector.css'
import React, { useState } from 'react';
import CifradoCesar from './cifrar.jsx';
import DesCifradoCesar from './descifrar.jsx';


export const Switch = createComponent({
  tagName: 'md-switch',
  elementClass: MdSwitch,
  react: React,
  events: {
    onChange: 'selected', 
  },
});

function Selector() { 
  // Estado para controlar qué componente mostrar
  const [st, setSt] = useState(false);

  const toggleSt = () => {
    setSt(!st);
  };

  // Determina las clases de los elementos <h2> en función del estado del interruptor
  const cifrarClass = st ? 'inactive' : 'active';
  const descifrarClass = st ? 'active' : 'inactive';

  return (
    <>
    <section className='test'>
      <h2 className={cifrarClass}>Cifrar</h2>
      <Switch selected={st} onClick={toggleSt} />
      <h2 className={descifrarClass}>Descifrar</h2>
    </section>
    {st ? <DesCifradoCesar /> : <CifradoCesar />}
    </>
  );
} 

export default Selector;
