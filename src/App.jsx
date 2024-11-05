import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import ReceiveInventory from './components/ReceiveInventory';
import SendInventory from './components/SendInventory';
import InventoryStatus from './components/InventoryStatus';
import ReceiveHistory from './components/ReceiveHistory';
import SendHistory from './components/SendHistory';
import './App.scss';
import Header from './components/header'
import IngredientCalculator from './components/home/IngredientCalculatorManager'
import Timer from './components/home/taimer'
import Timer_ovoshi from './components/home/ovoshi'

const App = () => {
  const [inventory, setInventory] = useState({});
  const [receiveHistory, setReceiveHistory] = useState([]);
  const [sendHistory, setSendHistory] = useState([]);

  // Локалдык сактоодон инвентаризацияны жүктөө
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    const savedReceiveHistory = localStorage.getItem('receiveHistory');
    const savedSendHistory = localStorage.getItem('sendHistory');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    if (savedReceiveHistory) setReceiveHistory(JSON.parse(savedReceiveHistory));
    if (savedSendHistory) setSendHistory(JSON.parse(savedSendHistory));
  }, []);

  // Инвентаризацияны жана тарыхты локалдык сактоого жазуу
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('receiveHistory', JSON.stringify(receiveHistory));
    localStorage.setItem('sendHistory', JSON.stringify(sendHistory));
  }, [inventory, receiveHistory, sendHistory]);

  // Товарды кабыл алуу функциясы
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

  // Товарды жөнөтүү функциясы
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
    <Header/>

      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <IngredientCalculator onReceive={IngredientCalculator} />
            
          </div>
        } />
     
        <Route path="/ingredient-calculator" element={<IngredientCalculator/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/timer_2" element={<Timer_ovoshi/>} />


      </Routes>
    </div>
  );
};

export default App;