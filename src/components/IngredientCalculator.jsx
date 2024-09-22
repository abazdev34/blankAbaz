import { useState } from 'react';

const ingredientsData = {
    пико: {
        лук: 0.125,
        перец: 0.250,
        помидор: 0.500,
        чеснок: 0.01875,
        петурушка: 0.01875,
        кинза: 0.01875,
        халопеньно: 0.0625,
    },
    соустако: {
        майонез: 9.400,
        вода: 1.700,
        чеснокмолотый: 0.015,
        черныйперец: 0.015,
        оригана: 0.020,
    },
    рисзапровка: {
        лук: 1000,
        морковь: 1000,
        кортошка: 1000,
        масло: 200,
        койэти: 1000,
    },
};

const IngredientCalculator = () => {
    const [dish, setDish] = useState('');
    const [multiplier, setMultiplier] = useState(1);
    const [result, setResult] = useState(null);
    const [totalWeight, setTotalWeight] = useState(0);

    const calculateIngredients = () => {
        const ingredients = ingredientsData[dish];
        if (!ingredients) {
            alert("Такой блюда нет.");
            return;
        }

        const calculatedIngredients = {};
        let total = 0; // Жалпы салмакты эсептөө

        for (const key in ingredients) {
            const weight = ingredients[key] * multiplier;
            calculatedIngredients[key] = weight;
            total += weight; // Жалпы салмакка кошуу
        }

        setResult(calculatedIngredients);
        setTotalWeight(total); // Жалпы салмакты жаңыртуу
    };

    return (
        <div>
            <h1>Ингредиенттерди эсептөө</h1>
            <select value={dish} onChange={(e) => setDish(e.target.value)}>
                <option value="">Тандоо...</option>
                <option value="пико">Пико</option>
                <option value="соустако">Соустако</option>
                <option value="рисзапровка">Рис Запровка</option>
            </select>
            <input
                type="number"
                placeholder="Кобоюткуч"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
            />
            <button onClick={calculateIngredients}>Эсептоо</button>

            {result && (
                <div>
                    <h2>Натыйжа:</h2>
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
                                    <td>{value.toFixed(3)}</td> {/* 3 ондук орунду көрсөтүү */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Жалпы салмак: {totalWeight.toFixed(3)} кг</h3> {/* Жалпы салмакты көрсөтүү */}
                </div>
            )}
        </div>
    );
};

export default IngredientCalculator;