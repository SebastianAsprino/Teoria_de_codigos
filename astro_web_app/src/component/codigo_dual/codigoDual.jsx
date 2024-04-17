import React, { useState, useEffect } from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
// import {isLinear} from './islineal'
// import { getParameters, findBasis } from './generar_matriz'
// import {getDualCode} from './dual'
import {MdFilledButton} from '@material/web/button/filled-button';



// const matrixStr = '110,101,011';
// const base = 2;

// getDualCode(matrixStr, base);



// const G = "1100,0011"


// getDualCode(G,2)


// export const OutlinedTextField = createComponent({
//   tagName: 'md-outlined-text-field',
//   elementClass: MdOutlinedTextField,
//   react: React,
//   events: {
//     onChange: 'input', 
//   },
// });



export const FilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
  events: {
    onChange: 'onclick', 
  },
});



const Codedual = () => {



  return (
    <div> 
      <h2>Codigo dual</h2>
      <md-filled-button onclick="window.location.href='https://colab.research.google.com/drive/1xt0gHHE9YOMlyMDDb1JLEH-l95jPTk5D#scrollTo=ALJrQMJJ96N8&line=6&uniqifier=1'">identificar autodualidad / auto-ortogonalidad</md-filled-button>
    </div>
  );
};

export default Codedual;
