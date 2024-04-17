import React, { useState, useEffect } from 'react';

function App() {
  const [pyodide, setPyodide] = useState(null);
  const [codesStr, setCodesStr] = useState('');
  const [base, setBase] = useState('');
  const [result, setResult] = useState('');
  const [generatorMatrix, setGeneratorMatrix] = useState('');
  const [parameters, setParameters] = useState({ k: '', n: '', d: '' });

  useEffect(() => {
    async function loadPyodide() {
      const loadedPyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/"
      });
      await loadedPyodide.loadPackage('numpy');
      loadedPyodide.runPython('import numpy as np')
      loadedPyodide.runPython(`
        import numpy as np

        def is_linear(codes_str, base):
            codes = codes_str.split(", ")
            for i in range(len(codes)):
                for j in range(i + 1, len(codes)):
                    if not is_valid_codeword(codes[i], codes[j], base, codes):
                        return False
            return True

        def is_valid_codeword(code1, code2, base, codes):
            int_code1 = int(code1, base)
            int_code2 = int(code2, base)
            sum_code = int_code1 ^ int_code2
            sum_code_str = format(sum_code, '0' + str(len(code1)) + 'b')
            return sum_code_str in codes
        
        
        def find_basis(code, base):
            codes = code.split(", ")
            basis = []
        
            for codeword in codes:
                codeword_list = [int(digit) for digit in codeword]
                if np.all(np.array(codeword_list) == 0):
                    continue
        
                if not basis:
                    basis.append(codeword_list)
                    continue
        
                independent = True
                for basis_codeword in basis:
                    # Verificar independencia considerando solo la adición simple en lugar de combinaciones
                    if np.array_equal(np.mod(np.array(codeword_list) + np.array(basis_codeword), base), np.zeros(len(codeword_list))):
                        independent = False
                        break
        
                if independent:
                    basis.append(codeword_list)
        
            return basis
        def get_parameters(basis):
            if not basis:
                return 0, 0, 0  # Regresa valores nulos si la base está vacía
            k = len(basis)
            n = len(basis[0])
            d = min(sum(row) for row in basis) if basis else 0  # Manejar el caso de base vacía
        
            return k, n, d
      `);
      setPyodide(loadedPyodide);
    }

    loadPyodide();
  }, []);

  const handleCheckLinearity = async (event) => {
    event.preventDefault();
    if (pyodide) {
      const linearResult = pyodide.runPython(`
        is_linear("${codesStr}", ${base})
      `);
      setResult(linearResult ? "Su código es lineal" : "Su código no es lineal");
    }
  };

  const handleGenerateMatrix = async () => {
    const basis1 = await pyodide.runPython(`
      find_basis('${codesStr}', ${base})
    `);
  
    if (basis1.length > 0) {
      const { k, n, d } = await pyodide.runPython(`
        get_parameters(${basis1})
      `);
  
      setGeneratorMatrix(basis1);
      setParameters({ k, n, d });
    } else {
      setGeneratorMatrix("No se pudo encontrar una base válida.");
      setParameters({ k: 0, n: 0, d: 0 });
    }
  };
  

  return (
    <div className="App">
      <h1>Verificador de Linealidad de Códigos</h1>
      <form onSubmit={handleCheckLinearity}>
        <input
          type="text"
          value={codesStr}
          onChange={e => setCodesStr(e.target.value)}
          placeholder="Introduce los códigos, ej: 011, 110, 000, 101"
        />
        <input
          type="number"
          value={base}
          onChange={e => setBase(e.target.value)}
          placeholder="Base numérica"
        />
        <button type="submit">Verificar Linealidad</button>
        <button onClick={handleGenerateMatrix}>Generar Matriz y Parámetros</button>
      </form>
      {result && <h3>{result}</h3>}
      {generatorMatrix && <p>Matriz Generadora: {generatorMatrix}</p>}
      {parameters.k && <p>Parámetros - k: {parameters.k}, n: {parameters.n}, d: {parameters.d}</p>}
    </div>
  );
}

export default App;
