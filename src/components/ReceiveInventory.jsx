import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import './ReceiveInventory.scss';

const ReceiveInventory = ({ onReceive }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [tempItems, setTempItems] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAdd = () => {
    if (item && amount) {
      setTempItems(prev => [...prev, { item, amount: Number(amount) }]);
      setItem('');
      setAmount('');
      setIsSaved(false);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleConfirmReceipt = () => {
    tempItems.forEach(({ item, amount }) => {
      onReceive(item, amount);
    });
    setTempItems([]);
    setIsSaved(false);
  };

  return (
    <div className="receive-inventory">
      <h2>Получение товара</h2>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Название продукта"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
        required
      />
      <button className="add-button" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />Чтобы добавить
      </button>
      {tempItems.length > 0 && !isSaved && (
        <button className="save-button" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} /> Сохранить
        </button>
      )}
      {isSaved && (
        <div className="confirm-section">
          <p>Товар сохранен. Принятие должно быть подтверждено.</p>
          <button className="confirm-button" onClick={handleConfirmReceipt}>
            <FontAwesomeIcon icon={faCheck} />
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

export default ReceiveInventory;