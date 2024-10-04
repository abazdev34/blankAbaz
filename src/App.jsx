import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/header'
import IngredientCalculator from './components/home/IngredientCalculatorManager'

import Dish from './components/home'

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route
					path='/IngredientCalculator'
					element={<IngredientCalculator />}
				/>
				<Route path='/dishes' element={<Dish/>}/>
			</Routes>
		</div>
	)
}

export default App
