import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

function About() {
  return (
    <section>
      <h2>About the Company</h2>
      <p>We are a leading Bitcoin investment firm committed to transparency and innovation.</p>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section>
      <h2>What We Do</h2>
      <p>We help clients invest in Bitcoin securely and track their investments with cutting-edge tools.</p>
    </section>
  );
}

function TradingViewChart() {
  return (
    <section>
      <h2>TradingView Chart</h2>
      <iframe
        title="TradingView Bitcoin Chart"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_01&symbol=BITSTAMP%3ABTCUSD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=progee1.github.io&utm_medium=widget&utm_campaign=chart"
        style={{ width: "100%", height: "400px", border: "none" }}
        allowFullScreen
      ></iframe>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <h2>Contact Us</h2>
      <p>Email: contact@bitcoininvestmentapp.com</p>
      <p>Phone: +1 234 567 8901</p>
      <p>Address: 123 Bitcoin St, Crypto City</p>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1>Bitcoin Investment App</h1>
        <nav>
          <NavLink to="/" style={({ isActive }) => ({ marginRight: 15, color: isActive ? "blue" : "black" })} end>
            About
          </NavLink>
          <NavLink to="/what-we-do" style={({ isActive }) => ({ marginRight: 15, color: isActive ? "blue" : "black" })}>
            What We Do
          </NavLink>
          <NavLink to="/chart" style={({ isActive }) => ({ marginRight: 15, color: isActive ? "blue" : "black" })}>
            TradingView Chart
          </NavLink>
          <NavLink to="/contact" style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>
            Contact
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/chart" element={<TradingViewChart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "10px", fontSize: "0.9rem", color: "#555" }}>
        &copy; {new Date().getFullYear()} Bitcoin Investment App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
