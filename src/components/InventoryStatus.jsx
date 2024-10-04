import React from 'react';

const InventoryStatus = ({ inventory }) => {
  return (
    <div className="inventory-status">
      <h2>Товар абалы</h2>
      <ul>
        {Object.entries(inventory).map(([item, amount]) => (
          <li key={item}>{item}: {amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryStatus;