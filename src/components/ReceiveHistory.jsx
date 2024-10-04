import React from 'react';

const ReceiveHistory = ({ history }) => {
  return (
    <div className="receive-history">
      <h2>Кабыл алуу тарыхы</h2>
      <ul>
        {history.map(entry => (
          <li key={entry.id}>
            {entry.date}: {entry.item} - {entry.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveHistory;
