import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import googleTranslateElementInit from './translate';
import fetchBitcoinPrice from '@/api/fetchBitcoinPrice';

const BitcoinInvestmentApp = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [copyTraders, setCopyTraders] = useState([
    { name: 'Alice', returns: '12.5%' },
    { name: 'Bob', returns: '9.8%' },
    { name: 'Carlos', returns: '15.2%' }
  ]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('User not authenticated');
      return;
    }

    fetchBitcoinPrice(token).then(price => {
      if (price) {
        setBtcPrice(price);
      } else {
        setError('Failed to fetch BTC price');
      }
    });
  }, [token]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleCalculate = () => {
    const usd = parseFloat(usdAmount);
    if (!usd || isNaN(usd) || usd <= 0) {
      setError('Please enter a valid USD amount');
      return;
    }

    fetch(`${baseUrl}/investment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amountUsd: usd }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.btcAmount) {
          setBtcAmount(data.btcAmount.toFixed(6));
          setPortfolio(prev => [...prev, { usd, btc: data.btcAmount.toFixed(6) }]);
          setError('');
        } else {
          setError('Failed to calculate investment');
        }
      })
      .catch(() => setError('Failed to connect to backend'));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-10">
      <div id="google_translate_element" className="flex justify-end mb-4"></div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">

          <div className="mb-8">
            <iframe
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_7b0f7&symbol=BITSTAMP%3ABTCUSD&interval=1D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en"
              width="100%"
              height="400"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
              title="Bitcoin Chart"
            />
          </div>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-center">Bitcoin Investment Calculator</h1>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Current BTC Price (USD)</label>
                <Input value={btcPrice ? `$${btcPrice.toLocaleString()}` : 'Loading...'} disabled />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Amount in USD</label>
                <Input
                  type="number"
                  placeholder="Enter USD amount"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleCalculate}>
                Calculate BTC
              </Button>
              {btcAmount !== null && (
                <div className="text-center text-lg font-semibold">
                  You will get <span className="text-green-600">{btcAmount} BTC</span>
                </div>
              )}
            </CardContent>
          </Card>

          {portfolio.length > 0 && (
            <Card className="mt-6 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
                <ul className="space-y-2">
                  {portfolio.map((entry, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>USD: ${entry.usd}</span>
                      <span>BTC: {entry.btc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BitcoinInvestmentApp;
