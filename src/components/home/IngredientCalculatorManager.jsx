import { useState } from 'react'
import { ingredientsData } from '../../data/index.jsx'
import './IngredientCalculator.scss'

const IngredientCalculator = () => {
  const [selectedDish, setSelectedDish] = useState('')
  const [result, setResult] = useState(null)
  const [totalWeight, setTotalWeight] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)

  const quickSelectDishes = [
    'курицаМ',
    'специКурица',
    'курицаМаринад',
    'рисЗапровка',
    'фаршМариновый',
    'специФарш',
    'соусТако',
    'пико',
    'фасоловаяПаста',
    'фасалВаренный',
  ]

  const handleDishSelect = (dish) => {
    setSelectedDish(dish)
  }

  const calculateIngredients = () => {
    setIsCalculating(true)
    const ingredients = ingredientsData[selectedDish]
    if (!ingredients) {
      alert('Тамак тандалган жок.')
      setIsCalculating(false)
      return
    }

    const calculatedIngredients = {}
    let total = 0

    for (const key in ingredients) {
      const weight = ingredients[key] * multiplier
      calculatedIngredients[key] = weight
      total += weight
    }

    setResult(calculatedIngredients)
    setTotalWeight(total)
    setTimeout(() => setIsCalculating(false), 300) // Имитация процесса вычисления
  }

  return (
    <div className='ingredient-calculator'>
      <h1>Техкарта заготовок</h1>
      <div className='quick-select'>
        {quickSelectDishes.map((dish) => (
          <button
            key={dish}
            onClick={() => handleDishSelect(dish)}
            className={selectedDish === dish ? 'active' : ''}
          >
            {dish}
          </button>
        ))}
      </div>
      <div className='input-container'>
        <input
          type='number'
          placeholder='Кобоюткуч'
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
        />
        <button 
          onClick={calculateIngredients}
          className={isCalculating ? 'calculating' : ''}
        >
          Эсептөө
        </button>
      </div>

      {result && (
        <div className='result-container'>
          <h2>Натыйжа:</h2>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Ингредиент</th>
                  <th>Масса (кг)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>Жалпы салмак: {totalWeight.toFixed(3)} кг</h3>
        </div>
      )}
    </div>
  )
}

export default IngredientCalculator