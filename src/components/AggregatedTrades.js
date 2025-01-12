import React, { useState, useEffect } from 'react';
import { getAggregatedTrades } from '../services/api';
import ReusableTable from './common/ReusableTable';
import { type } from '@testing-library/user-event/dist/type';

const AggregatedTrades = () => {
  const [trades, setTrades] = useState([]);
  const [filterPair, setFilterPair] = useState('');

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    const data = await getAggregatedTrades();
    setTrades(data.agg_trades); // Accessing `agg_trades` from the response
  };

  const handleFilterChange = (e) => {
    setFilterPair(e.target.value);
  };

  const filteredTrades = trades.filter((trade) =>
    trade.pair.toLowerCase().includes(filterPair.toLowerCase())
  );

  const displayedColumns = ['pair', 'available_quantity', 'pnl_percent', 'pnl_native', 'pnl_USD', 'status']

  const columns = [
    { key: 'pair', label: 'Pair' },
    { key: 'available_quantity', label: 'Available Quantity' , type: 'numeric'},
    { key: 'total_bought_quantity', label: 'Total Bought Quantity' },
    { key: 'average_buy_native_price', label: 'Avg Buy Price (Native)' },
    { key: 'average_buy_USD_price', label: 'Avg Buy Price (USD)' },
    { key: 'total_sold_quantity', label: 'Total Sold Quantity' },
    { key: 'average_sell_native_price', label: 'Avg Sell Price (Native)' },
    { key: 'average_sell_USD_price', label: 'Avg Sell Price (USD)' },
    { key: 'pnl_percent', label: 'PNL (%)' },
    { key: 'pnl_native', label: 'PNL (Native)' },
    { key: 'pnl_USD', label: 'PNL (USD)' },
    { key: 'status', label: 'Status' },
  ];

  const tooltips = {
    pair: (row) => `Full Pair Info: ${row.pair}`,
    available_quantity: (row) => `Details: ${row.available_quantity}`,
  };

  return (
    <div>
      <h1>Aggregated Trades</h1>

      {/* Filter by Pair */}
      <div>
        <input
          type="text"
          placeholder="Filter by Pair"
          value={filterPair}
          onChange={handleFilterChange}
        />
      </div>

      {/* Display Trades */}
      <ReusableTable columns={columns} data={filteredTrades} displayedColumns={displayedColumns} additionalData={tooltips}/>
    </div>
  );
};

export default AggregatedTrades;
