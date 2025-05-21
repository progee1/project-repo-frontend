import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import googleTranslateElementInit from './translate';

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

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then(response => response.json())
      .then(data => {
        setBtcPrice(parseFloat(data.bpi.USD.rate.replace(',', '')));
      })
      .catch(error => console.error('Error fetching BTC price:', error));
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const handleCalculate = () => {
    const usd = parseFloat(usdAmount);
    if (!isNaN(usd) && usd > 0 && btcPrice) {
      const calculatedBtc = (usd / btcPrice).toFixed(6);
      setBtcAmount(calculatedBtc);
      setPortfolio(prev => [...prev, { usd, btc: calculatedBtc }]);
    } else {
      setBtcAmount(null);
    }
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

          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold mb-2">Learn About Our Company</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/5h-6KWUCbWA?si=3IOL4vOVxajqv54z"
                title="Company Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Our Services</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Crypto / Forex</li>
                <li>Real Estate</li>
                <li>Fixed Income</li>
                <li>Multi Asset</li>
                <li>Alternatives</li>
                <li>Stocks</li>
                <li>Planning Services</li>
                <li>NFP</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Investment Plans</h2>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>Starter Plan:</strong> Minimum $100 - Weekly returns up to 5%
                </li>
                <li>
                  <strong>Silver Plan:</strong> Minimum $1,000 - Weekly returns up to 7%
                </li>
                <li>
                  <strong>Gold Plan:</strong> Minimum $5,000 - Weekly returns up to 10%
                </li>
                <li>
                  <strong>Platinum Plan:</strong> Minimum $10,000 - Weekly returns up to 15%
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Investment License</h2>
              <p>
                We are licensed and compliant. Learn more about our government-recognized investment partnership:
                <br />
                <a
                  href="https://www.gov.uk/government/news/homes-england-invests-in-schroders-capitals-real-estate-impact-fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Investment License
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-bold">Contact Info</h2>
              <p>Email: contact@bitcoininvestments.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Crypto Lane, Blockchain City, NY 10001</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Copy Trading</h2>
              <p className="text-gray-700">Follow top-performing traders and copy their trades in real-time:</p>
              <ul className="space-y-2">
                {copyTraders.map((trader, index) => (
                  <li key={index} className="flex justify-between items-center border p-2 rounded">
                    <span className="font-medium">{trader.name}</span>
                    <span className="text-green-600">Returns: {trader.returns}</span>
                    <Button size="sm">Copy</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-center">Bitcoin Investment Calculator</h1>
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
