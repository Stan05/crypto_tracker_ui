import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Wallets from './components/Wallets';
import Trades from './components/Trades';
import Tokens from './components/Tokens';
import Pairs from './components/Pairs';
import './App.css'
import AggregatedTrades from './components/AggregatedTrades';
import AggregatedTradeDetails from './components/AggregatedTradeDetails';

const App = () => {
  return (
    <Router>
      <div className="layout">
      <nav className="navbar">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Wallets</NavLink></li>
          <li><NavLink to="/trades" className={({ isActive }) => (isActive ? 'active' : '')}>Trades</NavLink></li>
          <li><NavLink to="/tokens" className={({ isActive }) => (isActive ? 'active' : '')}>Tokens</NavLink></li>
          <li><NavLink to="/pairs" className={({ isActive }) => (isActive ? 'active' : '')}>Pairs</NavLink></li>
          <li><NavLink to="/agg-trades" className={({ isActive }) => (isActive ? 'active' : '')}>Aggregated Trades</NavLink></li>
        </ul>
      </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Wallets />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/pairs" element={<Pairs />} />
            <Route path="/agg-trades" element={<AggregatedTrades />} />
            <Route path="/agg-trades/:pair_id" element={<AggregatedTradeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
