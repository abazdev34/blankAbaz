import { useState, useEffect } from 'react';
import { Route,  Routes } from 'react-router-dom';

import './App.scss';
import Header from './components/header'
import IngredientCalculator from './components/home/IngredientCalculatorManager'

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

  // Товарды жөнөтүү функциясы
 
  return (
    <div className="app">
    <Header/>

      <Routes>
        
     
        <Route path="/ingredient-calculator" element={<IngredientCalculator/>} />
      
        <Route path="/timer_2" element={<Timer_ovoshi/>} />
        


      </Routes>
    </div>
  );
};

export default App;