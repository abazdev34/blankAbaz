import React from 'react';

const SendHistory = ({ history }) => {
  return (
    <div className="send-history">
      <h2>Жөнөтүү тарыхы</h2>
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

export default SendHistory;
