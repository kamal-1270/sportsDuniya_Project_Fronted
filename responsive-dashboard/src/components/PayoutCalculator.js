import React, { useState, useEffect } from 'react';

// Custom Hook: usePayout
const usePayout = () => {
  const [payoutRates, setPayoutRates] = useState({});
  const [totalPayout, setTotalPayout] = useState(0);

  const setPayoutRate = (author, rate) => {
    setPayoutRates((prevRates) => ({
      ...prevRates,
      [author]: rate,
    }));
  };

  const calculateTotalPayout = (articles) => {
    const total = articles.reduce((sum, article) => {
      const rate = payoutRates[article.author] || 0;
      return sum + rate;
    }, 0);
    setTotalPayout(total);
  };

  return { payoutRates, totalPayout, setPayoutRate, calculateTotalPayout };
};

// PayoutCalculator Component
const PayoutCalculator = ({ articles }) => {
  const { payoutRates, totalPayout, setPayoutRate, calculateTotalPayout } = usePayout();
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [currentRate, setCurrentRate] = useState('');

  useEffect(() => {
    if (articles && calculateTotalPayout) {
      calculateTotalPayout(articles);
    }
  }, [articles, payoutRates, calculateTotalPayout]);

  const handleRateChange = () => {
    if (currentAuthor && currentRate) {
      setPayoutRate(currentAuthor, parseFloat(currentRate));
      setCurrentAuthor('');
      setCurrentRate('');
    }
  };

  return (
    <div className="payout-calculator">
      <h3>Payout Calculator</h3>
      <div className="input-group">
        <input
          type="text"
          placeholder="Author Name"
          value={currentAuthor}
          onChange={(e) => setCurrentAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Payout Rate"
          value={currentRate}
          onChange={(e) => setCurrentRate(e.target.value)}
        />
        <button onClick={handleRateChange}>Set Rate</button>
      </div>
      <div className="payout-summary">
        <h4>Total Payout: ₹ {totalPayout ? totalPayout.toFixed(2) : '0.00'}</h4>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(payoutRates).length > 0 ? (
              Object.entries(payoutRates).map(([author, rate]) => (
                <tr key={author}>
                  <th>{author}</th>
                  <th>₹ {rate.toFixed(2)}</th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No payout rates set.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Parent Component
const ParentComponent = () => {
  const articles = [
    { author: 'John Doe', length: 100 },
    { author: 'Jane Doe', length: 200 },
  ];

  return <PayoutCalculator articles={articles} />;
};

// Main Entry Point
const App = () => {
  return (
    <div className="app">
      <ParentComponent />
    </div>
  );
};

export default App;
