import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Typography } from '../components/buton.jsx'; // Adjust the import path as necessary
import { ingredientsData } from "../data/index.jsx";

const IngredientCalculator = () => {
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

  return (
    <div>
      {/* Your component JSX here */}
    </div>
  );
};

export default IngredientCalculator;