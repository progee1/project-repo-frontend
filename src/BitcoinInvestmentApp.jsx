import React, { useEffect, useState } from 'react';

const BitcoinInvestmentApp = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState('');

  // Simulate token presence (remove if you add real auth)
  const token = "demo-token";

  // Mock fetchBitcoinPrice inside component
  const fetchBitcoinPrice = async () => {
    // Simulate an API call delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(27000), 500); // fixed BTC price for demo
    });
  };

  useEffect(() => {
    if (!token) {
      setError('User not authenticated');
      return;
    }

    fetchBitcoinPrice().then(price => {
      if (price) {
        setBtcPrice(price);
      } else {
        setError('Failed to fetch BTC price');
      }
    });
  }, [token]);

  const handleCalculate = () => {
    const usd = parseFloat(usdAmount);
    if (!usd || isNaN(usd) || usd <= 0) {
      setError('Please enter a valid USD amount');
      return;
    }
    if (!btcPrice) {
      setError('BTC price not loaded');
      return;
    }

    const btc = usd / btcPrice;
    setBtcAmount(btc.toFixed(6));
    setPortfolio(prev => [...prev, { usd, btc: btc.toFixed(6) }]);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Bitcoin Investment Calculator</h1>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}

      <div style={{ maxWidth: 600, margin: '1rem auto', background: 'white', padding: '1rem', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <label>
          Current BTC Price (USD):
          <input
            type="text"
            value={btcPrice ? `$${btcPrice.toLocaleString()}` : 'Loading...'}
            disabled
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Amount in USD:
          <input
            type="number"
            placeholder="Enter USD amount"
            value={usdAmount}
            onChange={e => setUsdAmount(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4f46e5',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Calculate BTC
        </button>

        {btcAmount !== null && (
          <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.25rem', color: '#16a34a' }}>
            You will get {btcAmount} BTC
          </p>
        )}
      </div>

      {portfolio.length > 0 && (
        <div style={{ maxWidth: 600, margin: '2rem auto', background: 'white', padding: '1rem', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2>Your Portfolio</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {portfolio.map((entry, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <span>USD: ${entry.usd}</span>
                <span>BTC: {entry.btc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BitcoinInvestmentApp;
