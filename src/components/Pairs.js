import React, { useState, useEffect } from 'react';
import { getPairs, addPair } from '../services/api';
import ReusableTable from './common/ReusableTable';

const Pairs = () => {
  const [pairs, setPairs] = useState([]);
  const [newPair, setNewPair] = useState({
    symbol: '',
    base_token_id: '',
    quote_token_id: '',
    chain_id: '',
    dex_id: '',
    pair_address: '',
  });

  useEffect(() => {
    fetchPairs();
  }, []);

  const fetchPairs = async () => {
    const data = await getPairs();
    setPairs(data); // Store all pair data in the state
  };

  const handleAddPair = async () => {
    await addPair(newPair);
    setNewPair({
      symbol: '',
      base_token_id: '',
      quote_token_id: '',
      chain_id: '',
      dex_id: '',
      pair_address: '',
    });
    fetchPairs(); // Refresh the pair list
  };

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'chain_id', label: 'Chain' },
    { key: 'dex_id', label: 'DEX' },
    { key: 'pair_address', label: 'Address' },
  ];
  return (
    <div>
      <h1>Pairs</h1>
      <ReusableTable columns={columns} data={pairs}/>

      {/* Form for adding a new pair */}
      <div>
        <h3>Add Pair</h3>
        <input
          type="text"
          placeholder="Symbol"
          value={newPair.symbol}
          onChange={(e) => setNewPair({ ...newPair, symbol: e.target.value })}
        />
        <input
          type="number"
          placeholder="Base Token ID"
          value={newPair.base_token_id}
          onChange={(e) => setNewPair({ ...newPair, base_token_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quote Token ID"
          value={newPair.quote_token_id}
          onChange={(e) => setNewPair({ ...newPair, quote_token_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Chain ID"
          value={newPair.chain_id}
          onChange={(e) => setNewPair({ ...newPair, chain_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="DEX ID"
          value={newPair.dex_id}
          onChange={(e) => setNewPair({ ...newPair, dex_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pair Address"
          value={newPair.pair_address}
          onChange={(e) => setNewPair({ ...newPair, pair_address: e.target.value })}
        />
        <button onClick={handleAddPair}>Add Pair</button>
      </div>
    </div>
  );
};

export default Pairs;
