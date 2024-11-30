import React, { useState, useEffect } from 'react';
import { getTrades, addTrade } from '../services/api';
import ReusableTable from './common/ReusableTable';

const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    pair_id: '',
    trade_type: '',
    native_price: '',
    usd_price: '',
    quantity: '',
    trade_timestamp: '',
    wallet_id: '',
  });

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    const data = await getTrades();
    setTrades(data);
  };

  const handleAddTrade = async () => {
    await addTrade(newTrade);
    setNewTrade({
      pair_id: '',
      trade_type: '',
      native_price: '',
      usd_price: '',
      quantity: '',
      trade_timestamp: '',
      wallet_id: '',
    });
    fetchTrades();
  };

  const columns = [
    { key: 'pair_id', label: 'Pair ID' },
    { key: 'trade_type', label: 'Trade Type' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'usd_price', label: 'USD Price' },
  ];

  return (
    <div>
      <h1>Trades</h1>
      <ReusableTable columns={columns} data={trades} />
      <div>
        <h3>Add Trade</h3>
        <input
          type="text"
          placeholder="Pair ID"
          value={newTrade.pair_id}
          onChange={(e) => setNewTrade({ ...newTrade, pair_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Trade Type"
          value={newTrade.trade_type}
          onChange={(e) => setNewTrade({ ...newTrade, trade_type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newTrade.quantity}
          onChange={(e) => setNewTrade({ ...newTrade, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="USD Price"
          value={newTrade.usd_price}
          onChange={(e) => setNewTrade({ ...newTrade, usd_price: e.target.value })}
        />
        <button onClick={handleAddTrade}>Add Trade</button>
      </div>
    </div>
  );
};

export default Trades;
