import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [isFibonacci, setIsFibonacci] = useState(false);
  const [isApproachingThreshold, setIsApproachingThreshold] = useState(false);
  const [isThresholdExceeded, setIsThresholdExceeded] = useState(false);

  const fibonacciCheck = (num) => {
    if (num <= 1) return true;

    let prev = 0;
    let curr = 1;

    while (curr <= num) {
      if (curr === num) return true;
      const next = prev + curr;
      prev = curr;
      curr = next;
    }

    return false;
  };

  useEffect(() => {
    setIsFibonacci(fibonacciCheck(counter));
    
    const threshold = 10; // Defina o limiar desejado
    setIsApproachingThreshold(counter >= threshold - 3 && counter < threshold);
    setIsThresholdExceeded(counter >= threshold);
  }, [counter]);

  const incrementCounter = () => {
    if (!isThresholdExceeded) {
      setCounter(counter + 1);
    }
  };

  return (
    <div className="app">
      <h1>Contador Fibonacci</h1>
      <div className="counter">
        <div className={`counter-value ${isFibonacci ? 'fibonacci' : ''}`}>
          {counter}
        </div>
        {isApproachingThreshold && !isThresholdExceeded && (
          <div className="approaching-alert">
            Aproximando-se do limiar!
          </div>
        )}
        {isThresholdExceeded && (
          <div className="threshold-exceeded">
            Limite excedido! Não é possível incrementar mais.
          </div>
        )}
      </div>
      <button onClick={incrementCounter} disabled={isThresholdExceeded}>
        Incrementar
      </button>
    </div>
  );
};

export default App;
