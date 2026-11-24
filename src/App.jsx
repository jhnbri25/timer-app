import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 4. useState to track elapsed time (in seconds) and whether the timer is running
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 4. useEffect to manage the interval and clean it up when needed
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function clears the interval when paused, reset, or unmounted
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // 1. Start button handler: begins or resumes counting
  const handleStart = () => {
    setIsRunning(true);
  };

  // 2. Pause button handler: stops counting and keeps the current time
  const handlePause = () => {
    setIsRunning(false);
  };

  // 3. Reset button handler: stops the timer and returns it to zero
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="container">
      <h1>CS Elective 1 - React Timer</h1>
      <p className="subtitle">Elapsed Time Tracker</p>

      <div className="timer-display">
        <span className="time-value">{seconds}</span>
        <span className="time-unit">seconds</span>
      </div>

      <p className={`status-text ${isRunning ? 'running' : 'stopped'}`}>
        Status: {isRunning ? 'Running' : seconds > 0 ? 'Paused' : 'Ready'}
      </p>

      <div className="button-group">
        <button
          className="btn start-btn"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="btn pause-btn"
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button
          className="btn reset-btn"
          onClick={handleReset}
          disabled={seconds === 0 && !isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;