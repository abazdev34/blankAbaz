import React from 'react';

const ReceiveHistory = ({ history }) => {
  return (
    <div className="receive-history">
      <h2>история поставки</h2>
      <ul>
        {history.map(entry => (
          <li key={entry.id}>
            {entry.date}: {entry.item}  {entry.amount} принит шт
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveHistory;