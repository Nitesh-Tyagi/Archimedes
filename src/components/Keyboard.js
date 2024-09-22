import React from 'react';
import { keyboardLayout } from '../data/keyboardLayout';

const Keyboard = ({ onKeyPress }) => {
  return (
    <div className="bg-gray-200 p-2 rounded w-full h-full text-4xl ">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-1 mb-1 min-h-20">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`flex items-center justify-center m-0.5 rounded ${
                key.colspan > 1 ? `flex-[${key.colspan}]` : 'flex-1'
              } ${
                ['⏎', '⌫'].includes(key.label)
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => onKeyPress(key.label)}
            >
              {key.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
