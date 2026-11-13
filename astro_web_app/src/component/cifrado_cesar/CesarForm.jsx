import { useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import init from '../../wasm/pkg/hola_wasm.js';
import { OutlinedTextField, Slider } from '../shared/material.js';
import './cesar.css';

const CLAVE_INICIAL = 10;
const CLAVE_MAXIMA = 100;

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: '2000',
};

// El módulo WebAssembly se inicializa una sola vez y se reutiliza.
let wasmListo;
const cargarWasm = () => {
  wasmListo ??= init();
  return wasmListo;
};

/**
 * Formulario común para cifrar o descifrar con el cifrado César (implementado en Rust/WASM).
 * @param {{
 *   transformar: (texto: string, clave: number) => string,
 *   etiqueta: string,
 *   descripcionResultado: string,
 *   mensajeCopiado: string,
 * }} props
 */
function CesarForm({ transformar, etiqueta, descripcionResultado, mensajeCopiado }) {
  const [clave, setClave] = useState(CLAVE_INICIAL);
  const [mensaje, setMensaje] = useState('');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    if (mensaje === '') {
      setResultado('');
      return;
    }

    let cancelado = false;
    cargarWasm()
      .then(() => {
        if (!cancelado) setResultado(transformar(mensaje, clave));
      })
      .catch((error) => {
        console.error('No se pudo cargar el módulo WebAssembly:', error);
        toastr.error('No se pudo procesar el texto');
      });

    return () => {
      cancelado = true;
    };
  }, [mensaje, clave, transformar]);

  const copiarResultado = () => {
    navigator.clipboard
      .writeText(resultado)
      .then(() => toastr.success(mensajeCopiado))
      .catch((error) => {
        console.error('Error al copiar texto:', error);
        toastr.error('No se pudo copiar el texto');
      });
  };

  return (
    <>
      <OutlinedTextField
        label={etiqueta}
        type="text"
        value={mensaje}
        onChange={(event) => setMensaje(event.target.value)}
      />
      <Slider
        labeled
        min="0"
        max={String(CLAVE_MAXIMA)}
        value={clave}
        onChange={(event) => setClave(Number(event.target.value))}
      />
      <h4>{descripcionResultado} con clave N {clave} es:</h4>
      <h3
        className="contenedor"
        title="Haz clic para copiar"
        onClick={copiarResultado}
        style={{ cursor: 'pointer' }}
      >
        {resultado}
      </h3>
    </>
  );
}

export default CesarForm;
