import React, { useState, useEffect } from 'react';
import mixSound from '../../assets/vse.mp3';
import doneSound from '../../assets/kon.mp3';

const Timer_ovoshi = () => {
  const [timeLeft, setTimeLeft] = useState(36 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMixing, setIsMixing] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const alertBeep = new Audio(mixSound);
  const doneBeep = new Audio(doneSound);

  const steps = [
    { time: 18, action: 'Перемешайте!', type: 'mix', duration: 15, color: 'yellow' },
    { time: 5, action: 'Перемешайте!', type: 'mix', duration: 15, color: 'blue' },
    { time: 0, action: 'Финиш!', type: 'done', duration: 15, color: 'black' }
  ];

  const playAlert = (isDone = false) => {
    try {
      const sound = isDone ? doneBeep : alertBeep;
      sound.volume = volume;

      let playCount = 0;
      const maxPlays = 7;

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
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowFireworks(true);
      setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
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

  const getTimerClass = () => {
    if (!isRunning) return 'timer-circle';
    if (timeLeft === 0) return 'timer-circle finished';
    const currentMinute = Math.floor(timeLeft / 60);
    if (currentMinute <= 5) return 'timer-circle running blue';
    if (currentMinute <= 18) return 'timer-circle running yellow';
    return 'timer-circle running';
  };

  return (
    <div className="timer-container">
      <div className={getTimerClass()}>
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="timer-controls">
        <button
          className="timer-button reset"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(36 * 60);
            setActiveStep(null);
            setShowFireworks(false);
          }}
        >
          Сброс
        </button>
        <button
          className={`timer-button start ${isRunning ? 'disabled' : ''}`}
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Старт
        </button>
      </div>

      <div className="volume-control">
        <span>🔈</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
        <span>🔊</span>
      </div>

      {showFireworks && (
        <div className="fireworks">
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>
      )}
    </div>
  );
};

export default Timer_ovoshi;