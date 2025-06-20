import React, { useState, useEffect, useRef } from 'react';


const BarcodeScanner = () => {
  // Продукттар базасы
  const products = {
    '1235678': { name: 'Слайдер', icon: '🍔' },
    '23447': { name: 'Тако', icon: '🌮' }
  };

  // Заказ көлөмү
  const targetOrder = {
    '1235678': 5, // 5 слайдер
    '23447': 6    // 6 тако
  };

  // State
  const [currentOrder, setCurrentOrder] = useState({
    '1235678': 0,
    '23447': 0
  });
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [showScanResult, setShowScanResult] = useState(false);
  
  const scannerRef = useRef(null);
  const inputRef = useRef(null);

  // Камера сканерин баштоо
  const startCamera = async () => {
    if (isScanning) return;

    try {
      // Камера уруксатын сураш
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      setIsScanning(true);
      showScanResultMessage('✅ Камера иштеп жатат! Штрих-кодду көрсөтүңүз.', 'success');
      
      // Симуляция үчүн камера көрүнүшү
      setTimeout(() => {
        setShowScanResult(false);
      }, 3000);
      
    } catch (error) {
      console.error('Камера катасы:', error);
      
      let errorMessage = '';
      if (error.name === 'NotAllowedError') {
        errorMessage = `🚫 Камера уруксаты жок!
        
📋 Оңдоо жолдору:
1️⃣ Браузердин адрес тилкесинде камера символун басып "Уруксат берүү" тандаңыз
2️⃣ Браузерди жаңылап, кайрадан аракет кылыңыз  
3️⃣ Колдо киргизүү менен иштесе да болот!`;
      } else if (error.name === 'NotFoundError') {
        errorMessage = '📷 Камера табылган жок! Камера туташтырылганын текшериңиз.';
      } else {
        errorMessage = `❌ Камера катасы: ${error.message}\n\nКолдо киргизүү менен иштеңиз!`;
      }
      
      alert(errorMessage);
    }
  };

  // Камераны токтотуу
  const stopCamera = () => {
    setIsScanning(false);
    setShowScanResult(false);
  };

  // Штрих-кодду иштетүү
  const processBarcode = (barcode) => {
    if (products[barcode]) {
      if (currentOrder[barcode] < targetOrder[barcode]) {
        setCurrentOrder(prev => ({
          ...prev,
          [barcode]: prev[barcode] + 1
        }));
        
        playSuccessSound();
        showScanResultMessage(`✅ ${products[barcode].name} кошулду!`, 'success');
        
      } else {
        alert(`${products[barcode].name} толук сканерленди! (${targetOrder[barcode]}/${targetOrder[barcode]})`);
      }
    } else {
      alert('Белгисиз штрих-код: ' + barcode);
      showScanResultMessage(`❌ Белгисиз код: ${barcode}`, 'error');
    }
  };

  // Скан нтийжасын көрсөтүү
  const showScanResultMessage = (message, type) => {
    setScanResult(message);
    setShowScanResult(true);
    setTimeout(() => {
      setShowScanResult(false);
    }, 2000);
  };

  // Ийгиликтүү добушу
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch(e) {
      console.log('Добуш ойнотууда ката');
    }
  };

  // Колдо сканерлөө
  const scanProduct = () => {
    const barcode = barcodeInput.trim();
    
    if (!barcode) {
      alert('Штрих-кодду киргизиңиз!');
      return;
    }

    processBarcode(barcode);
    setBarcodeInput('');
    inputRef.current?.focus();
  };

  // Заказды тазалоо
  const clearOrder = () => {
    if (window.confirm('Заказды тазалагыңыз келеби?')) {
      setCurrentOrder({
        '1235678': 0,
        '23447': 0
      });
    }
  };

  // Enter басканда сканерлөө
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      scanProduct();
    }
  };

  // Прогресс эсептөө
  const calculateProgress = () => {
    const totalScanned = Object.values(currentOrder).reduce((sum, count) => sum + count, 0);
    const totalNeeded = Object.values(targetOrder).reduce((sum, count) => sum + count, 0);
    return Math.round((totalScanned / totalNeeded) * 100);
  };

  const progressPercent = calculateProgress();
  const isOrderComplete = progressPercent >= 100;

  // Заказ бүткөндө камераны токтотуу
  useEffect(() => {
    if (isOrderComplete && isScanning) {
      stopCamera();
      setTimeout(() => {
        alert('🎉 Куттуктайбыз! Заказ толук даяр! 🎉');
      }, 500);
    }
  }, [isOrderComplete, isScanning]);

  return (
    <div className="barcode-scanner">
      <div className="container">
        <h1 className="title">🛍️ Заказ Башкаруу Системасы</h1>
        
        {/* Продукттар тизмеси */}
        <div className="products-list">
          <h3>Продукттар тизмеси:</h3>
          <div className="product-item">🍔 Слайдер - Код: 1235678</div>
          <div className="product-item">🌮 Тако - Код: 23447</div>
        </div>

        {/* Камера сканери */}
        <div className="camera-section">
          <h3>📷 Камера Сканери</h3>
          <div className="camera-warning">
            <strong>💡 Кеңеш:</strong> Эгер камера иштебесе, төмөнкү "Колдо киргизүү" бөлүмүн колдонуңуз!
          </div>
          <div className="camera-controls">
            <button 
              onClick={startCamera} 
              disabled={isScanning}
              className="camera-btn start-btn"
            >
              📷 Камераны Баштоо
            </button>
            <button 
              onClick={stopCamera} 
              disabled={!isScanning}
              className="camera-btn stop-btn"
            >
              ⏹️ Токтотуу
            </button>
          </div>
          
          {isScanning && (
            <div className="camera-container">
              <div className="scanner-container" ref={scannerRef}>
                <div className="scan-overlay"></div>
                <div className="camera-placeholder">
                  📷 Камера иштеп жатат...
                  <br />
                  <small>Штрих-кодду кызыл чөйрөгө багыттаңыз</small>
                </div>
              </div>
            </div>
          )}
          
          {showScanResult && (
            <div className="scan-result">
              {scanResult}
            </div>
          )}
        </div>

        {/* Колдо киргизүү */}
        <div className="scanner-section">
          <h3>⌨️ Колдо Штрих-код Киргизүү</h3>
          <div className="manual-warning">
            <strong>✅ Бул ар дайым иштейт!</strong> Камера керек эмес - штрих-кодду териптен киргизиңиз.
          </div>
          <div className="input-group">
            <input 
              type="text" 
              ref={inputRef}
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="scanner-input" 
              placeholder="Штрих-кодду киргизиңиз (мисал: 1235678)..." 
              autoFocus
            />
            <button onClick={scanProduct} className="scan-btn">
              🔍 Сканерлөө
            </button>
            <button onClick={clearOrder} className="clear-btn">
              🗑️ Тазалоо
            </button>
          </div>
        </div>

        {/* Учурдагы заказ */}
        <div className="order-section">
          <h3>📋 Учурдагы заказ</h3>
          <div className="order-list">
            {Object.entries(targetOrder).map(([barcode, needed]) => {
              const product = products[barcode];
              const scanned = currentOrder[barcode];
              const isComplete = scanned >= needed;
              
              return (
                <div 
                  key={barcode} 
                  className={`order-item ${isComplete ? 'complete' : ''}`}
                >
                  <div className="item-info">
                    <span className="item-name">
                      {product.icon} {product.name}
                    </span>
                  </div>
                  <div className="item-count">
                    {scanned}/{needed}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Прогресс */}
        <div className="progress-section">
          <h3>📈 Заказ прогресси</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className={`progress-text ${isOrderComplete ? 'ready' : ''}`}>
            {isOrderComplete ? '🎉 ЗАКАЗ ДАЯР! 🎉' : `${progressPercent}% даяр`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;