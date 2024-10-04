import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTruck } from '@fortawesome/free-solid-svg-icons';
import './SendInventory.scss';

const SendInventory = ({ onSend, inventory }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [tempItems, setTempItems] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAdd = () => {
    if (item && amount && inventory[item] >= Number(amount)) {
      setTempItems(prev => [...prev, { item, amount: Number(amount) }]);
      setItem('');
      setAmount('');
      setIsSaved(false);
    } else {
      alert('Жетиштүү товар жок!');
    }
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleConfirmSend = () => {
    tempItems.forEach(({ item, amount }) => {
      onSend(item, amount);
    });
    setTempItems([]);
    setIsSaved(false);
  };

  return (
    <div className="send-inventory">
      <h2>Товар жөнөтүү</h2>
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
      <button className="add-button" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} /> Кошуу
      </button>
      {tempItems.length > 0 && !isSaved && (
        <button className="save-button" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} /> Сохранить
        </button>
      )}
      {isSaved && (
        <div className="confirm-section">
          <p>Товарлар сакталды. Жөнөтүүнү тастыктоо керек.</p>
          <button className="confirm-button" onClick={handleConfirmSend}>
            <FontAwesomeIcon icon={faTruck} />
          </button>
        </div>
      )}
      <ul className="temp-items-list">
        {tempItems.map((tempItem, index) => (
          <li key={index}>{tempItem.item}: {tempItem.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default SendInventory;