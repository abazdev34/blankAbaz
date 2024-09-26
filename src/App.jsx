
import IngredientCalculator from './components/IngredientCalculator';
import './App.scss';
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import IngredientCalculatorManager from './components/home'
function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
     
             
                <Route path="/services" element={<IngredientCalculator />} />
                
                <Route path="/" element={<IngredientCalculatorManager/>} />
            </Routes>
            
        </div>
    );
}

export default App;