import React, { useState, useEffect } from 'react';
import { FaTruck, FaWarehouse } from 'react-icons/fa';

const initialState = {
  лук: 0, перец: 0, помидор: 0, чеснок: 0, петурушка: 0,
  кинза: 0, халопеньно: 0, майонез: 0, вода: 0, чеснокмолотый: 0,
  черныйперец: 0, оригана: 0, соль: 0, кумин: 0, горошек: 0,
  морковь: 0, гуруч: 0, масло: 0, койэти: 0
};

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(initialState);
  const [receiveAmount, setReceiveAmount] = useState({});
  const [sendAmount, setSendAmount] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    const savedHistory = localStorage.getItem('history');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('history', JSON.stringify(history));
  };

  const handleReceiveChange = (item, value) => {
    setReceiveAmount(prev => ({ ...prev, [item]: parseInt(value) || 0 }));
  };

  const handleSendChange = (item, value) => {
    setSendAmount(prev => ({ ...prev, [item]: parseInt(value) || 0 }));
  };

  const handleReceive = () => {
    const newInventory = { ...inventory };
    Object.keys(receiveAmount).forEach(item => {
      newInventory[item] += receiveAmount[item];
    });
    setInventory(newInventory);
    addToHistory('Кабыл алынды', receiveAmount);
    setReceiveAmount({});
  };

  const handleSend = () => {
    const newInventory = { ...inventory };
    Object.keys(sendAmount).forEach(item => {
      newInventory[item] = Math.max(0, newInventory[item] - sendAmount[item]);
    });
    setInventory(newInventory);
    addToHistory('Жөнөтүлдү', sendAmount);
    setSendAmount({});
  };

  const addToHistory = (type, amounts) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      type,
      amounts
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [inventory, history]);

  return (
    <div className="inventory-management">
      <h1>Товарларды башкаруу</h1>
      <div className="inventory-list">
        {Object.keys(inventory).map(item => (
          <div key={item} className="inventory-item">
            <span>{item}: {inventory[item]}</span>
            <input
              type="number"
              value={receiveAmount[item] || ''}
              onChange={(e) => handleReceiveChange(item, e.target.value)}
              placeholder="Кабыл алуу"
            />
            <input
              type="number"
              value={sendAmount[item] || ''}
              onChange={(e) => handleSendChange(item, e.target.value)}
              placeholder="Жөнөтүү"
            />
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="receive" onClick={handleReceive}>
          <FaWarehouse /> Кабыл алуу
        </button>
        <button className="send" onClick={handleSend}>
          <FaTruck /> Жөнөтүү
        </button>
      </div>
      <div className="history">
        <h2>Тарых</h2>
        {history.map(entry => (
          <div key={entry.id} className="history-entry">
            <span>{entry.date}</span>
            <span>{entry.type}</span>
            <ul>
              {Object.entries(entry.amounts).map(([item, amount]) => (
                <li key={item}>{item}: {amount}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style jsx>{`
        .inventory-management {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .inventory-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        .inventory-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        input {
          width: 60px;
          padding: 5px;
          margin: 0 5px;
        }
        .actions {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .receive, .send {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .receive {
          background-color: #4CAF50;
          color: white;
        }
        .send {
          background-color: #2196F3;
          color: white;
        }
        .receive svg, .send svg {
          margin-right: 5px;
        }
        .history {
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        .history-entry {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 4px;
        }
        .history-entry span {
          margin-right: 10px;
          font-weight: bold;
        }
        .history-entry ul {
          margin: 5px 0 0;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default InventoryManagement;