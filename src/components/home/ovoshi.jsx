import React, { useState, useEffect } from 'react';
import alertSound from '../../assets/alert.mp3';


const Timer_ovoshi = () => {
  const [timeLeft, setTimeLeft] = useState(36 * 60); // 36 минут
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [volume, setVolume] = useState(0.5); // Громкость от 0 до 1

  const beep = new Audio(alertSound);

  // Шаги приготовления
  const steps = [
    { time: 18, action: 'Перемешайте!', type: 'mix' },
    { time: 5, action: 'Перемешайте!', type: 'mix' },
    { time: 0, action: 'Готово!', type: 'done' }
  ];

  // Воспроизведение звука
  const playAlert = () => {
    try {
      beep.volume = volume;
      beep.currentTime = 0;
      beep.play();
      
      // Повторять в течение 20 секунд
      let playCount = 0;
      const interval = setInterval(() => {
        playCount++;
        if (playCount < 10) { // Играть каждые 2 секунды (10 раз за 20 секунд)
          beep.currentTime = 0;
          beep.play();
        } else {
          clearInterval(interval);
        }
      }, 2000);
    } catch (err) {
      console.error('Ошибка воспроизведения звука:', err);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
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
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    beep.volume = newVolume;
  };

  return (
    <div className="timer">
      <div className="timer__header">
        <h1>Таймер приготовления</h1>
        <div className="timer__display">{formatTime(timeLeft)}</div>
      </div>

      <div className="timer__controls">
        <button 
          className={`timer__button ${isRunning ? 'timer__button--disabled' : ''}`}
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Старт
        </button>
        <button 
          className="timer__button timer__button--reset"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(36 * 60);
            setActiveStep(null);
          }}
        >
          Сброс
        </button>
      </div>

      <div className="timer__volume">
        <span className="timer__volume-icon">🔈</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="timer__volume-slider"
        />
        <span className="timer__volume-icon">🔊</span>
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
              <div className="timer__step-time">{step.time} мин</div>
              <div className="timer__step-action">{step.action}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timer_ovoshi;