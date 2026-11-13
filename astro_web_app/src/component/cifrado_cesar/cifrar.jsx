import { cifrar_cesar } from '../../wasm/pkg/hola_wasm.js';
import CesarForm from './CesarForm.jsx';

function CifradoCesar() {
  return (
    <CesarForm
      transformar={cifrar_cesar}
      etiqueta="Texto a cifrar"
      descripcionResultado="El texto cifrado"
      mensajeCopiado="Mensaje cifrado copiado con éxito"
    />
  );
}

export default CifradoCesar;
