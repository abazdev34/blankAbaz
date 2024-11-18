
import { Route,  Routes } from 'react-router-dom';

import './App.scss';
import Header from './components/header'
import IngredientCalculator from './components/home/IngredientCalculatorManager'

import Timer_ovoshi from './components/home/ovoshi'


const App = () => {

  // Локалдык сактоодон инвентаризацияны жүктөө

 
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