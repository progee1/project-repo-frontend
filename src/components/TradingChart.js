import React, { useEffect, useRef } from 'react';

function TradingChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "BITSTAMP:BTCUSD",
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: false,
      autosize: true,
    });

    if (chartRef.current) {
      chartRef.current.innerHTML = '';
      chartRef.current.appendChild(script);
    }
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Live Bitcoin Price</h2>
      <div ref={chartRef} className="tradingview-widget-container" />
    </section>
  );
}

export default TradingChart;
