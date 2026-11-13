import { FilledButton } from '../shared/material.js';

// El cálculo del código dual se realiza en el cuaderno de Google Colab del proyecto.
const COLAB_CODIGO_DUAL_URL =
  'https://colab.research.google.com/drive/1xt0gHHE9YOMlyMDDb1JLEH-l95jPTk5D#scrollTo=ALJrQMJJ96N8&line=6&uniqifier=1';

const Codedual = () => (
  <div>
    <h2>Codigo dual</h2>
    <FilledButton href={COLAB_CODIGO_DUAL_URL}>
      identificar autodualidad / auto-ortogonalidad
    </FilledButton>
  </div>
);

export default Codedual;
