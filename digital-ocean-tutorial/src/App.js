import React, { useState, useEffect } from 'react';
import './App.css';
import goalImage from './goal.png';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [isFibonacci, setIsFibonacci] = useState(false);
  const [isApproachingThreshold, setIsApproachingThreshold] = useState(false);
  const [isThresholdExceeded, setIsThresholdExceeded] = useState(false);
  const [goalPosition, setGoalPosition] = useState(0);

  const fibonacciCheck = (num) => {
    if (num < 0) {
      return false; 
    }
  
    let a = 0;
    let b = 1;
  
    while (b <= num) {
      if (b === num) {
        return true;
      }
      
      const next = a + b;
      a = b;
      b = next;
    }
  
    return false;
  };

  const isPrimeNum = (num) => {
      if (num < 0) {
        return false;
      }
      
      if (num <= 3) {
        return true;
      }
      
      if (num % 2 === 0 || num % 3 === 0) {
        return false;
      }
      
      for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
          return false;
        }
      }
      
      return true; 
  }

  const isThreshold = (num) =>{
    return fibonacciCheck(num) && num > 10 && isPrimeNum(num);
  }



  useEffect(() => {
    setIsFibonacci(fibonacciCheck(counter));
    const threshold = 13;

    if(isThreshold(counter + 3)){
      setIsApproachingThreshold(true);
    }

    if(isThreshold(counter)){
      setIsThresholdExceeded(isThreshold(counter))
    }

    if (isFibonacci) {
      const newPosition = Math.min(100, goalPosition + 10);
      setGoalPosition(newPosition);
    }
  }, [counter, isFibonacci, goalPosition]);

  const incrementCounter = () => {
    if (!isThresholdExceeded) {
      setCounter(counter + 1);
    }
  };

  return (
    <div className="app">
      <h1>Fibonacci Counter</h1>
      <div className="counter">
        <div className="counter-value">
          {counter === -1
            ? 'Warning: Approaching the special Fibonacci number...'
            : counter}
        </div>
        <div className={`fibonacci-sign ${isFibonacci ? 'visible' : ''}`}>
          Fibonacci Number!
        </div>
      </div>
      {isApproachingThreshold && !isThresholdExceeded && (
        <div className="approaching-alert">
          Approaching the threshold!
        </div>
      )}
      {isThresholdExceeded && (
        <div className="threshold-exceeded">
          Threshold exceeded! Cannot increment further.
        </div>
      )}
      <div className="progress-bar">
        <div className="goal-container" style={{ left: `${goalPosition}%` }}>
          <img src={goalImage} alt="goal" className="goal" />
        </div>
      </div>
      <button onClick={incrementCounter} disabled={isThresholdExceeded}>
        Increment
      </button>
      <div className="right-content">
        <div className="info-box">
          <h2>What is the Fibonacci Sequence?</h2>
          <p>
            The Fibonacci Sequence is a series of numbers in which each number is the sum of the two preceding ones.
            For example, the sequence starts as 0, 1, 1, 2, 3, 5, 8, 13, and so on.
          </p>
        </div>
        <div className="info-box">
          <h2>What is the Threshold?</h2>
          <p>
            The threshold is the frist prime number from the Fibonacci Sequence above 10.
            If you want to restart the counter re-load the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
