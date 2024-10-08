

const SavedResults = ({ savedResults, clearSavedResults }) => {
  return (
    <div className='saved-results'>
      <h2>Сакталган натыйжалар:</h2>
      {savedResults.length === 0 ? (
        <p>Сакталган натыйжалар жок.</p>
      ) : (
        <>
          <button onClick={clearSavedResults}>Бардык сакталган натыйжаларды тазалоо</button>
          {savedResults.map((saved) => (
            <div key={saved.id}>
              <h3>Натыйжа {saved.id}:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ингредиент</th>
                    <th>Масса (кг)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(saved.ingredients).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Жалпы салмак: {saved.totalWeight.toFixed(3)} кг</h4>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SavedResults;