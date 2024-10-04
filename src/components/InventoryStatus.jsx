import React from 'react';

const InventoryStatus = ({ inventory }) => {
  // Инвентаризациянын абалынын узундугун текшерүү
  const isEmpty = Object.keys(inventory).length === 0;

  return (
    <div className="inventory-status">
      <h2>Товар абалы</h2>
      {isEmpty ? (
        <p>Товар жок</p> // Эгер инвентаризация бош болсо, бул билдирүү көрсөтүлөт
      ) : (
        <ul>
          {Object.entries(inventory).map(([item, amount]) => (
            <li key={item}>{item}: {amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryStatus;