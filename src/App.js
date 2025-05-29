import React from 'react';
import AboutCompany from './components/AboutCompany';
import WhatWeDo from './components/WhatWeDo';
import TradingViewChart from './components/TradingViewChart';
import CompanyContact from './components/CompanyContact';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitcoin Investment App</h1>
      </header>
      <main>
        <AboutCompany />
        <WhatWeDo />
        <TradingViewChart />
        <CompanyContact />
      </main>
      <footer>
        <p>© 2025 Bitcoin Investment App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
