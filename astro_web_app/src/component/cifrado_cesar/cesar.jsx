import { useState } from 'react';
import { Switch } from '../shared/material.js';
import CifradoCesar from './cifrar.jsx';
import DesCifradoCesar from './descifrar.jsx';
import './selector.css';

function Selector() {
  // false = cifrar, true = descifrar
  const [descifrando, setDescifrando] = useState(false);

  const alternarModo = () => {
    setDescifrando((actual) => !actual);
  };

  return (
    <>
      <section className="test">
        <h2 className={descifrando ? 'inactive' : 'active'}>Cifrar</h2>
        <Switch selected={descifrando} onClick={alternarModo} />
        <h2 className={descifrando ? 'active' : 'inactive'}>Descifrar</h2>
      </section>
      {descifrando ? <DesCifradoCesar /> : <CifradoCesar />}
    </>
  );
}

export default Selector;
