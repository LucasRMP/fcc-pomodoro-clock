import React, { useState, useEffect, useCallback } from 'react';

import { padNumber, parseTime } from '../../utils/stringManipulation';

import './styles.css';

const SEC = 1000;
const MIN = 60*SEC;

function App() {
  const [ breakLength, setBreakLength ] = useState(5);
  const [ sessionLength, setSessionLength ] = useState(25);
  const [ timeLeft, setTimeLeft ] = useState(25*MIN);

  const [ isRunning, setIsRunning ] = useState(false);
  const [ isSession, setIsSession ] = useState(true);

  const [ timeoutVar, setTimeoutVar ] = useState();

  useEffect(() => {

    setTimeoutVar(setTimeout(() => {
      if (isRunning && timeLeft > 0) 
        setTimeLeft(timeLeft-SEC/5)
      
      if (timeLeft === 0) 
        flip();
    }, SEC/5));
  }, [timeLeft, isRunning]);

  const changeBreak = (op) => {
    if (op === '-' && breakLength > 1) setBreakLength(breakLength - 1); 
    if (op === '+' && breakLength < 60) setBreakLength(breakLength + 1); 
    if (!isSession) {
      if (op === '-') setTimeLeft((breakLength-1)*MIN);
      if (op === '+') setTimeLeft((breakLength+1)*MIN);
    }
  }

  const changeSession = (op) => {
    if (op === '-' && sessionLength > 1) setSessionLength(sessionLength - 1); 
    if (op === '+' && sessionLength < 60) setSessionLength(sessionLength + 1); 
    if (isSession) {
      if (op === '-') setTimeLeft((sessionLength-1)*MIN);
      if (op === '+') setTimeLeft((sessionLength+1)*MIN);
    }
  };

  const flip = () => {
    // PLAY BEEP
    document.getElementById('beep').play();

    clearTimeout(timeoutVar);
    setIsSession(!isSession);

    if (!isSession) {
      setTimeLeft(sessionLength*MIN);

    }
    else {
      setTimeLeft(breakLength*MIN);
    }
  }

  const reset = () => {
    console.warn('RESET');
    console.log(timeoutVar);
    clearTimeout(timeoutVar);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25*MIN);
    setIsSession(true);
  }

  return (
    <div className="App">
      <h1>Pomodoro clock</h1>
      
      <div id="length-wrapper">

        <div id="break" className="length-block">
          <div id="break-label">Break Length</div>
          <button 
            id="break-decrement" 
            disabled={isRunning}
            onClick={() => { changeBreak('-') }}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div id="break-length">{breakLength}</div>
          <button 
            id="break-increment" 
            disabled={isRunning}
            onClick={() => { changeBreak('+') }}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>

        <div id="session" className="length-block">
          <div id="session-label">Session Length</div>
          <button 
            id="session-decrement" 
            disabled={isRunning}
            onClick={() => { changeSession('-') }}
          >
            <i className="fa fa-arrow-down fa-2x"></i>          
          </button>
          <div id="session-length">{sessionLength}</div>
          <button 
            id="session-increment" 
            disabled={isRunning}
            onClick={() => { changeSession('+') }}
          >
            <i className="fa fa-arrow-up fa-2x"></i>          
          </button>
        </div>

      </div>

      <div id="timer-wrapper">
        <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
        <div id="time-left">{parseTime(timeLeft)}</div>
      </div>

      <div id="timer-controller">
        <button 
          id="start_stop" 
          onClick={() => setIsRunning(!isRunning)}
        >
        {
          !isRunning ?
          <i className="fa fa-play fa-2x"></i>
          :
          <i className="fa fa-pause fa-2x"></i>
        }
        </button>
        <button id="reset" onClick={reset}>
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"></audio>
    </div>

  );
}

export default App;
