import React, { useState, useEffect } from 'react';
import alertSound from "../../assets/zvuk6.mp3";


const Timer_ovoshi = () => {
  const [timeLeft, setTimeLeft] = useState(36 * 60); // 36 минута
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [isSoundEnabled, setSoundEnabled] = useState(true);

  const beep = new Audio(alertSound);

  // Эскертүүлөр
  const steps = [
    { time: 18, action: 'Аралаштырыңыз!', type: 'mix' },
    { time: 5, action: 'Аралаштырыңыз!', type: 'mix' },
    { time: 0, action: 'Даяр болду!', type: 'done' }
  ];

  // Үн эффектин ойнотуу
  const playAlert = () => {
    if (isSoundEnabled) {
      try {
        beep.currentTime = 0;
        beep.play();
        
        // 20 секунд бою кайталап ойнотуу
        let playCount = 0;
        const interval = setInterval(() => {
          playCount++;
          if (playCount < 10) { // 2 секундда бир жолу ойнотот (20 секунд ичинде 10 жолу)
            beep.currentTime = 0;
            beep.play();
          } else {
            clearInterval(interval);
          }
        }, 2000);
      } catch (err) {
        console.error('Үндү ойнотууда ката:', err);
      }
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const step = steps.find(s => s.time === minutes);
    
    if (step) {
      setActiveStep(step.type);
      playAlert();
      setTimeout(() => {
        setActiveStep(null);
      }, 20000);
    }
  }, [timeLeft, isSoundEnabled]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const increaseTime = () => {
    setTimeLeft(prevTime => prevTime + 60);
  };

  const decreaseTime = () => {
    setTimeLeft(prevTime => Math.max(prevTime - 60, 0));
  };

  return (
    <div className="timer">
      <div className="timer__header">
        <h1>Таймер</h1>
        <div className="timer__display">{formatTime(timeLeft)}</div>
      </div>

      <div className="timer__controls">
        <button className="timer__button" onClick={increaseTime}>+1 мүнөт</button>
        <button className="timer__button" onClick={decreaseTime}>-1 мүнөт</button>
        <button 
          className={`timer__button ${isRunning ? 'timer__button--disabled' : ''}`}
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Баштоо
        </button>
        <button 
          className="timer__button timer__button--reset"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(36 * 60);
            setActiveStep(null);
          }}
        >
          Кайра баштоо
        </button>
        <button
          className={`timer__button timer__button--sound ${!isSoundEnabled ? 'timer__button--sound-off' : ''}`}
          onClick={() => setSoundEnabled(!isSoundEnabled)}
        >
          {isSoundEnabled ? '🔊' : '🔈'}
        </button>
      </div>

      {activeStep && (
        <div className={`timer__alert timer__alert--${activeStep}`}>
          {steps.find(s => s.type === activeStep)?.action}
        </div>
      )}

      <div className="timer__steps">
        {steps.map((step, index) => {
          const minutes = Math.floor(timeLeft / 60);
          const isCompleted = minutes < step.time;
          const isActive = step.type === activeStep;

          return (
            <div
              key={index}
              className={`
                timer__step
                ${isCompleted ? 'timer__step--completed' : ''}
                ${isActive ? 'timer__step--active' : ''}
              `}
            >
              <div className="timer__step-time">{step.time} мүнөт</div>
              <div className="timer__step-action">{step.action}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timer_ovoshi;