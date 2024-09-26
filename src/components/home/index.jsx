import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Typography } from '../buton.jsx';
import { ingredientsData } from "../../data/index.jsx";

const IngredientCalculatorManager = () => {
  const [dish, setDish] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [result, setResult] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [inventory, setInventory] = useState({
    лук: [], перец: [], помидор: [], чеснок: [], петурушка: [], кинза: [],
    халопеньно: [], майонез: [], вода: [], чеснокмолотый: [], черныйперец: [],
    оригана: [], соль: [], кумин: [], горошек: [], морковь: [], гуруч: [],
    масло: [], койэти: []
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  const calculateIngredients = () => {
    const ingredients = ingredientsData[dish];
    if (!ingredients) {
      alert("Мындай тамак жок.");
      return;
    }

    const calculatedIngredients = {};
    let total = 0;

    for (const [key, value] of Object.entries(ingredients)) {
      const weight = value * multiplier;
      calculatedIngredients[key] = weight;
      total += weight;

      // Ингредиенттин санын азайтуу
      setInventory(prev => {
        const updatedInventory = { ...prev };
        const currentAmount = updatedInventory[key].reduce((sum, item) => sum + item, 0);
        if (currentAmount >= weight) {
          let remainingWeight = weight;
          updatedInventory[key] = updatedInventory[key].map(item => {
            if (remainingWeight > 0) {
              const diff = Math.min(item, remainingWeight);
              remainingWeight -= diff;
              return Math.max(0, item - diff);
            }
            return item;
          }).filter(item => item > 0);
        } else {
          console.warn(`Жетишсиз ${key}: ${weight - currentAmount} кг керек`);
        }
        return updatedInventory;
      });
    }

    setResult(calculatedIngredients);
    setTotalWeight(total);
    localStorage.setItem('inventory', JSON.stringify(inventory));
  };

  const addIngredient = (ingredient, amount) => {
    if (!ingredient || !amount) {
      alert("Ингредиент жана салмак киргизиңиз.");
      return;
    }

    setInventory(prev => {
      const updatedInventory = { ...prev };
      updatedInventory[ingredient] = [...updatedInventory[ingredient], parseFloat(amount)];
      return updatedInventory;
    });
    localStorage.setItem('inventory', JSON.stringify(inventory));
    setNewIngredient('');
    setNewAmount('');
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Ингредиенттерди эсептөө жана башкаруу</Typography>

      <div className="mb-4">
        <Select
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          className="mb-2"
        >
          <option value="">Тандоо...</option>
          <option value="пико">Пико</option>
          <option value="соустако">Соустако</option>
          <option value="рисзапровка">Рис Запровка</option>
          <option value="плов">Плов</option>
        </Select>

        <Input
          type="number"
          placeholder="Көбөйтүүчү"
          value={multiplier}
          onChange={(e) => setMultiplier(parseFloat(e.target.value))}
          className="mb-2"
        />

        <Button onClick={calculateIngredients} className="mb-4">Эсептөө</Button>
      </div>

      {result && (
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">Натыйжа:</Typography>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Ингредиент</th>
                <th className="text-left">Масса (кг)</th>
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
          <Typography variant="body1" className="mt-2">Жалпы салмак: {totalWeight.toFixed(3)} кг</Typography>
        </div>
      )}

      <div>
        <Typography variant="h6" className="mb-2">Ингредиент кошуу</Typography>
        <Input
          type="text"
          placeholder="Ингредиент (мисалы: чеснок)"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Салмак (кг)"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          className="mb-2"
        />
        <Button onClick={() => addIngredient(newIngredient, newAmount)} className="mb-4">Кошуу</Button>

        {Object.keys(inventory).map(ingredient => (
          <div key={ingredient} className="mb-2">
            <Typography variant="body2">
              Учурдагы {ingredient}: {inventory[ingredient].reduce((sum, item) => sum + item, 0).toFixed(3)} кг
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientCalculatorManager;