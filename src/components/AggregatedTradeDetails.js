import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAggregatedTrade } from '../services/api';
import ReusableTable from './common/ReusableTable';
import { formatNumber } from '../utils/numberUtils';

const AggregatedTradeDetails = () => {
  const { pair_id } = useParams();
  const navigate = useNavigate();
  const [aggregatedTrade, setAggregatedTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching details for pair_id:', pair_id);
    if (pair_id) {
      fetchAggregatedTrade(pair_id);
    }
  }, [pair_id]);

  const fetchAggregatedTrade = async (pairId) => {
    try {
      const data = await getAggregatedTrade(pairId); 
      setAggregatedTrade(data);
    } catch (err) {
      setError('Failed to fetch trade details.');
      console.error('Error fetching trade details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading trade details...</p>;
  if (error) return <p>{error}</p>;

  const tradeColumns = [
    { key: 'trade_type', label: 'Trade Type' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'usd_price', label: 'USD Price' },
    { key: 'native_price', label: 'Native Price' },
    { key: 'trade_timestamp', label: 'Timestamp' },
    { key: 'wallet_id', label: 'Wallet ID' },
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Back
      </button>
      <h1>{aggregatedTrade.pair} Details</h1>
      
      
      {/* Overview Section */}
      <div style={{ marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px' }}>Buy</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Sell</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>
                <strong>Total Bought Quantity:</strong> {aggregatedTrade.total_bought_quantity.toFixed(2)}
              </td>
              <td style={{ padding: '8px' }}>
                <strong>Total Sold Quantity:</strong> {aggregatedTrade.total_sold_quantity.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>
                <strong>Avg Buy Price (Native):</strong> {formatNumber(aggregatedTrade.average_buy_native_price.toExponential(2))}
              </td>
              <td style={{ padding: '8px' }}>
                <strong>Avg Sell Price (Native):</strong> {formatNumber(aggregatedTrade.average_sell_native_price.toExponential(2))}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>
                <strong>Avg Buy Price (USD):</strong> ${aggregatedTrade.average_buy_USD_price.toFixed(6)}
              </td>
              <td style={{ padding: '8px' }}>
                <strong>Avg Sell Price (USD):</strong> ${aggregatedTrade.average_sell_USD_price.toFixed(6)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PNL Section */}
      <div style={{ marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>
                <strong>PNL (%):</strong> {aggregatedTrade.pnl_percent.toFixed(2)}%
              </td>
              <td style={{ padding: '8px' }}>
                <strong>PNL (Native):</strong> {formatNumber(aggregatedTrade.pnl_native.toExponential(2))}
              </td>
              <td style={{ padding: '8px' }}>
                <strong>PNL (USD):</strong> ${aggregatedTrade.pnl_USD.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ padding: '8px' }}>
                <strong>Status:</strong> {aggregatedTrade.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Trades Table */}
      <h2>Trades</h2>
      <ReusableTable columns={tradeColumns} data={aggregatedTrade.trades} />
    </div>
  );
};

export default AggregatedTradeDetails;
