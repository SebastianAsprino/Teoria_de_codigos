import React, { useState } from 'react';
import calcularPotencia from './potencia';

function ComponentePotencia() {
  const [numero, setNumero] = useState('');
  const [resultado, setResultado] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setNumero(inputValue);

    // Verificar si el valor ingresado es un número antes de calcular
    if (!isNaN(inputValue)) {
      const potencia = calcularPotencia(Number(inputValue));
      setResultado(potencia);
    } else {
      setResultado(''); // Reiniciar el resultado si el valor no es un número
    }
  };

  return (
    <div>
      <input
        type="number"
        value={numero}
        onChange={handleChange}
        placeholder="Ingrese un número"
      />
      <div>
        {resultado !== '' && (
          <p>El número {numero} elevado a la potencia de {numero} es {resultado}.</p>
        )}
      </div>
    </div>
  );
}

export default ComponentePotencia;
