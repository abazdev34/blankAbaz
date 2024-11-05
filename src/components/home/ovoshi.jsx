import React, { useState, useEffect } from 'react';
import mixSound from '../../assets/vse.mp3';  // Sound for mixing
import doneSound from '../../assets/kon.mp3';  // Sound for completion

const Timer_ovoshi = () => {
  const [timeLeft, setTimeLeft] = useState(36 * 60); // 36 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMixing, setIsMixing] = useState(false);
  const [scale, setScale] = useState(1); // For animation

  const alertBeep = new Audio(mixSound);
  const doneBeep = new Audio(doneSound);

  const steps = [
    { time: 18, action: 'Перемешайте!', type: 'mix', duration: 15 },
    { time: 5, action: 'Перемешайте!', type: 'mix', duration: 15 },
    { time: 0, action: 'Готово!', type: 'done', duration: 15 }
  ];

  const playAlert = (isDone = false) => {
    try {
      const sound = isDone ? doneBeep : alertBeep;
      sound.volume = volume;

      let playCount = 0;
      const maxPlays = 7; // 7 times in 15 seconds (every 2 seconds)

      const playSound = () => {
        if (playCount < maxPlays && !isMixing) {
          sound.currentTime = 0;
          sound.play();
          playCount++;
          setTimeout(playSound, 2000);
        }
      };

      playSound();
    } catch (err) {
      console.error('Ошибка воспроизведения звука:', err);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
        setScale(prevScale => (prevScale === 1 ? 1.2 : 1)); // Animate scale
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const step = steps.find(s => s.time === minutes && seconds === 0);

    if (step) {
      setActiveStep(step.type);
      playAlert(step.type === 'done');
      setTimeout(() => {
        setActiveStep(null);
      }, step.duration * 1000);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMixButton = () => {
    setIsMixing(true);
    alertBeep.pause();
    doneBeep.pause();
    alertBeep.currentTime = 0;
    doneBeep.currentTime = 0;
    setActiveStep(null);
    setTimeLeft(prevTime => prevTime + 20);
    setTimeout(() => setIsMixing(false), 1000);
  };

  return (
    <div className="timer">
      <div className="hexagon">
        <div className="timer__display" style={{ transform: `scale(${scale})` }}>
          {formatTime(timeLeft)}
        </div>
      </div>
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
      <div className="timer__controls">
        <button
          className={`timer__button timer__button--start ${isRunning ? 'disabled' : ''}`}
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Старт
        </button>
        {activeStep === 'mix' && (
          <button
            className="timer__button timer__button--mix"
            onClick={handleMixButton}
          >
            Перемешано
          </button>
        )}
      </div>
      <div className="timer__volume">
        <span>🔈</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="timer__volume-slider"
        />
        <span>🔊</span>
      </div>
      {activeStep && (
        <div className={`timer__alert timer__alert--${activeStep}`}>
          {steps.find(s => s.type === activeStep)?.action}
        </div>
      )}
    </div>
  );
};

export default Timer_ovoshi;