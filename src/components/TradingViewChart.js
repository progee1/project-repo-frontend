import React, { useEffect } from 'react';

function TradingViewChart() {
  useEffect(() => {
    // Create script tag for TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // Initialize widget after script loads
      new window.TradingView.widget({
        autosize: true,
        symbol: 'BTCUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_top_toolbar: true,
        container_id: 'tradingview-widget',
      });
    };

    document.getElementById('tradingview-widget-container').appendChild(script);

    // Cleanup on unmount
    return () => {
      const container = document.getElementById('tradingview-widget-container');
      container.innerHTML = '';
    };
  }, []);

  return (
    <section id="tradingview-chart" className="section">
      <h2>Bitcoin Trading Chart</h2>
      <div
        id="tradingview-widget-container"
        style={{ height: '400px', width: '100%' }}
      ></div>
    </section>
  );
}

export default TradingViewChart;
