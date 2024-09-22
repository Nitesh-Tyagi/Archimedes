import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import { evaluate } from 'mathjs';

function App() {
  const [equations, setEquations] = useState(['', '', '', '']);
  const [currentEquationIndex, setCurrentEquationIndex] = useState(0);
  const [solutions, setSolutions] = useState(['', '', '', '']);
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  const handleKeyPress = (key) => {
    let newEquations = [...equations];
    if (key === '⌫') {
      newEquations[currentEquationIndex] = newEquations[currentEquationIndex].slice(0, -1);
    } else if (key === '⏎') {
      // Move to the next equation
      setCurrentEquationIndex((prevIndex) => (prevIndex + 1) % 4);
    } else if (key === 'x²') {
      newEquations[currentEquationIndex] += '^2';
    } else if (key === 'xⁿ') {
      newEquations[currentEquationIndex] += '^';
    } else if (key === '√') {
      newEquations[currentEquationIndex] += 'sqrt(';
    } else if (key === 'ⁿ√') {
      newEquations[currentEquationIndex] += 'root(';
    } else if (key === 'log') {
      newEquations[currentEquationIndex] += 'log(';
    } else if (key === 'logₙ') {
      newEquations[currentEquationIndex] += 'log(';
    } else if (key === 'ln') {
      newEquations[currentEquationIndex] += 'ln(';
    } else if (key === 'π') {
      newEquations[currentEquationIndex] += 'pi';
    } else if (key === 'e') {
      newEquations[currentEquationIndex] += 'e';
    } else if (key === '×') {
      newEquations[currentEquationIndex] += '*';
    } else if (key === '÷') {
      newEquations[currentEquationIndex] += '/';
    } else if (key === '()') {
      newEquations[currentEquationIndex] += '(';
    } else {
      newEquations[currentEquationIndex] += key;
    }
    setEquations(newEquations);

    solveEquations(newEquations);
  };

  const solveEquations = (eqs) => {
    let newSolutions = eqs.map((eq) => {
      try {
        const result = evaluate(eq);
        return result.toString();
      } catch {
        return '';
      }
    });
    setSolutions(newSolutions);
  };

  const handleEquationClick = (index) => {
    setCurrentEquationIndex(index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main content */}
      <div className="flex-grow p-4 overflow-auto pb-40">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl mb-4">Algebra Calculator</h1>

          {/* Display Equations */}
          <div className="mb-4">
            {equations.map((eq, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  index === currentEquationIndex ? 'bg-gray-700' : 'bg-gray-800'
                }`}
                onClick={() => handleEquationClick(index)}
              >
                Equation {index + 1}: {eq}
              </div>
            ))}
          </div>

          {/* Display Solutions */}
          <div className="mb-4">
            <h2 className="text-xl mb-2">Solutions:</h2>
            {solutions.map((sol, index) => (
              <div key={index} className="p-2 mb-2 bg-gray-900 rounded">
                Solution {index + 1}: {sol}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ width: '98vw', marginBottom: '1vw'}}
        >
      <button
        onClick={() => setKeyboardVisible(!keyboardVisible)}
        className="px-4 py-2 bg-gray-700 rounded text-3xl "
        style={{ width: '98vw', marginBottom: '1vw' }}
      >
        {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
      </button>


      {keyboardVisible && (
          <Keyboard onKeyPress={handleKeyPress} />
      )}
      </div>
    </div>
  );

}

export default App;
