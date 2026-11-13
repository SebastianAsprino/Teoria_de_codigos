import { descifrar_cesar } from '../../wasm/pkg/hola_wasm.js';
import CesarForm from './CesarForm.jsx';

function DesCifradoCesar() {
  return (
    <CesarForm
      transformar={descifrar_cesar}
      etiqueta="Texto a descifrar"
      descripcionResultado="El texto descifrado"
      mensajeCopiado="Mensaje descifrado copiado con éxito"
    />
  );
}

export default DesCifradoCesar;
