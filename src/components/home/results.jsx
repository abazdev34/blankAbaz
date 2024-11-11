// SavedResults.jsx
import React from 'react';


const SavedResults = ({ savedData, onDelete }) => {
  return (
    <div className="saved-results">
      <h2>Сакталган жыйынтыктар</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Датасы</th>
              <th>Тамактын аты</th>
              <th>Жалпы салмак</th>
              <th>Аракеттер</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.dishName}</td>
                <td>{item.totalWeight.toFixed(3)} кг</td>
                <td>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="delete-btn"
                  >
                    Өчүрүү
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedResults;