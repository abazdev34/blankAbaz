// Timer.jsx
import React, { useState, useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const steps = [
    { time: 14.5, action: 'Добавьте масло (150г)', type: 'oil' },
    { time: 14, action: 'Добавьте лук (200г)', type: 'onion' },
    { time: 12, action: 'Добавьте болгарский перец (400г)', type: 'pepper' },
    { time: 9, action: 'Добавьте помидоры (500г)', type: 'tomato' },
    { time: 7, action: 'Добавьте томатную пасту (200г)', type: 'paste' },
    { time: 5, action: 'Добавьте воду (400г)', type: 'water' },
    { time: 4, action: 'Добавьте соль (20г) и соус Шрирача (50г)', type: 'spices' },
    { time: 3, action: 'Добавьте фасоль (2кг)', type: 'beans' },
    { time: 0, action: 'Блюдо готово!', type: 'done' }
  ];

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
    const minutes = timeLeft / 60;
    const step = steps.find(s => s.time === Math.floor(minutes * 2) / 2);
    
    if (step) {
      setCurrentStep(step.action);
      setShowAlert(true);
      const audio = new Audio('/api/placeholder/audio');
      audio.play().catch(() => {});
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app-wrapper">
      <div className="timer-container">
        <div className="timer-header">
          <h1>Таймер приготовления</h1>
          <div className="time-display">
            <span className="time-text">{formatTime(timeLeft)}</span>
          </div>
          
          <div className="button-container">
            <button
              className={`control-btn start ${isRunning ? 'disabled' : ''}`}
              onClick={() => setIsRunning(true)}
              disabled={isRunning}
            >
              Начать
            </button>
            <button 
              className="control-btn reset"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(15 * 60);
                setCurrentStep('');
              }}
            >
              Сбросить
            </button>
          </div>
        </div>

        <div className="steps-list">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${step.type} ${
                Math.floor(timeLeft / 60) === Math.floor(step.time)
                  ? 'current'
                  : timeLeft / 60 < step.time
                  ? 'pending'
                  : 'completed'
              }`}
            >
              <div className="step-time">{step.time} мин</div>
              <div className="step-action">{step.action}</div>
            </div>
          ))}
        </div>
      </div>

      {showAlert && (
        <div className="notification">
          <div className="notification-content">
            <div className="notification-title">Следующий шаг:</div>
            <div className="notification-text">{currentStep}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;