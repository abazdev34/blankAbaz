import React, { useState } from 'react';

const SendInventory = ({ onSend, inventory }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && amount && inventory[item] >= Number(amount)) {
      onSend(item, Number(amount));
      setItem('');
      setAmount('');
    } else {
      alert('Жетиштүү товар жок!');
    }
  };

  return (
    <div className="send-inventory">
      <h2>Товар жөнөтүү</h2>
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
        <button type="submit">Жөнөтүү</button>
      </form>
    </div>
  );
};

export default SendInventory;