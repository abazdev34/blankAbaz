import React, { useState, useEffect } from 'react';
import ReceiveInventory from './components/ReceiveInventory';
import SendInventory from './components/SendInventory';
import InventoryStatus from './components/InventoryStatus';
import ReceiveHistory from './components/ReceiveHistory';
import SendHistory from './components/SendHistory';
import './App.scss';

const App = () => {
  const [inventory, setInventory] = useState({});
  const [receiveHistory, setReceiveHistory] = useState([]);
  const [sendHistory, setSendHistory] = useState([]);

  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    const savedReceiveHistory = localStorage.getItem('receiveHistory');
    const savedSendHistory = localStorage.getItem('sendHistory');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    if (savedReceiveHistory) setReceiveHistory(JSON.parse(savedReceiveHistory));
    if (savedSendHistory) setSendHistory(JSON.parse(savedSendHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('receiveHistory', JSON.stringify(receiveHistory));
    localStorage.setItem('sendHistory', JSON.stringify(sendHistory));
  }, [inventory, receiveHistory, sendHistory]);

  const handleReceive = (item, amount) => {
    setInventory(prev => ({
      ...prev,
      [item]: (prev[item] || 0) + amount
    }));
    setReceiveHistory(prev => [
      { id: Date.now(), date: new Date().toLocaleString(), item, amount },
      ...prev
    ]);
  };

  const handleSend = (item, amount) => {
    setInventory(prev => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) - amount)
    }));
    setSendHistory(prev => [
      { id: Date.now(), date: new Date().toLocaleString(), item, amount },
      ...prev
    ]);
  };

  return (
    <div className="app">
      <h1>Товар башкаруу системасы</h1>
      <div className="app-container">
        <ReceiveInventory onReceive={handleReceive} />
        <SendInventory onSend={handleSend} inventory={inventory} />
        <InventoryStatus inventory={inventory} />
        <ReceiveHistory history={receiveHistory} />
        <SendHistory history={sendHistory} />
      </div>
    </div>
  );
};

export default App;