// IngredientCalculator.jsx
import React, { useState, useMemo } from 'react';
import { ingredientsData } from '../../data/index.jsx';

const IngredientCalculator = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDish, setSelectedDish] = useState('');
    const [multiplier, setMultiplier] = useState(1);
    const [result, setResult] = useState(null);
    const [totalWeight, setTotalWeight] = useState(0);

    const filteredDishes = useMemo(() => {
        return Object.keys(ingredientsData).filter(dishName =>
            dishName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleDishSelect = (dish) => {
        setSelectedDish(dish);
        setSearchTerm(dish);
    };

    const calculateIngredients = () => {
        const ingredients = ingredientsData[selectedDish];
        if (!ingredients) {
            alert("Тамак тандалган жок.");
            return;
        }

        const calculatedIngredients = {};
        let total = 0;

        for (const key in ingredients) {
            const weight = ingredients[key] * multiplier;
            calculatedIngredients[key] = weight;
            total += weight;
        }

        setResult(calculatedIngredients);
        setTotalWeight(total);
    };

    return (
        <div className="ingredient-calculator">
            <h1>Ингредиенттерди эсептөө</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Тамак издөө..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && filteredDishes.length > 0 && (
                    <ul className="search-results">
                        {filteredDishes.map(dish => (
                            <li 
                                key={dish}
                                onClick={() => handleDishSelect(dish)}
                            >
                                {dish}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="input-container">
                <input
                    type="number"
                    placeholder="Кобоюткуч"
                    value={multiplier}
                    onChange={(e) => setMultiplier(e.target.value)}
                />
                <button onClick={calculateIngredients}>
                    Эсептөө
                </button>
            </div>

            {result && (
                <div className="result-container">
                    <h2>Натыйжа:</h2>
                    <div className="table-container">
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
    );
};

export default IngredientCalculator;