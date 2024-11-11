import { useState, useEffect } from 'react'
import { ingredientsData } from '../../data/index.jsx'
import SavedResults from '../home/results.jsx'


const IngredientCalculator = () => {
  const [selectedDish, setSelectedDish] = useState('')
  const [result, setResult] = useState(null)
  const [totalWeight, setTotalWeight] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [savedData, setSavedData] = useState(() => {
    // Локал сторэжден маалыматтарды алуу
    const saved = localStorage.getItem('savedResults')
    return saved ? JSON.parse(saved) : []
  })

  // Маалыматтар өзгөргөндө локал сторэжди жаңыртуу
  useEffect(() => {
    localStorage.setItem('savedResults', JSON.stringify(savedData))
  }, [savedData])

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
    'овошиЖарыных',
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
    setTimeout(() => setIsCalculating(false), 300)
  }

  const saveResults = () => {
    if (!result || !selectedDish) return

    const newSavedResult = {
      id: Date.now(), // уникалдуу ID
      date: new Date().toISOString(),
      dishName: selectedDish,
      totalWeight: totalWeight,
      ingredients: result
    }

    setSavedData(prev => [newSavedResult, ...prev])
    
    // Жыйынтыктарды тазалоо
    setResult(null)
    setTotalWeight(0)
    setSelectedDish('')
    setMultiplier(1)
  }

  const handleDelete = (id) => {
    setSavedData(prev => prev.filter(item => item.id !== id))
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
          <h2>Результат:</h2>
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
          <button
            onClick={saveResults}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
          >
            Сактоо
          </button>
        </div>
      )}

      {/* Сакталган жыйынтыктарды көрсөтүү */}
      <SavedResults 
        savedData={savedData} 
        onDelete={handleDelete}
      />
    </div>
  )
}

export default IngredientCalculator