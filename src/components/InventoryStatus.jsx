import React from 'react';

const InventoryStatus = ({ inventory }) => {
  return (
    <div className="inventory-status">
      <h2>Товар абалы</h2>
      <ul>
        {Object.entries(inventory).map(([item, amount]) => (
          amount > 0 ? ( // Эгер товардын саны 0дан чоң болсо, анда көрсөт
            <li key={item}>{item}: {amount}</li>
          ) : null // Эгер 0 болсо, эч нерсе көрсөтпөйт
        ))}
      </ul>
    </div>
  );
};

export default InventoryStatus;