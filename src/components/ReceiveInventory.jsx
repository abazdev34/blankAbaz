import React, { useState } from 'react';

const ReceiveInventory = ({ onReceive }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && amount) {
      onReceive(item, Number(amount));
      setItem('');
      setAmount('');
    }
  };

  return (
    <div className="receive-inventory">
      <h2>Товар кабыл алуу</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Товар аты"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Саны"
          required
        />
        <button type="submit">Кабыл алуу</button>
      </form>
    </div>
  );
};

export default ReceiveInventory;