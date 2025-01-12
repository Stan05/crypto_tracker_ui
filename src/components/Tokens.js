import React, { useState, useEffect } from 'react';
import { getTokens, addToken } from '../services/api';
import ReusableTable from './common/ReusableTable';

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState({ name: '', symbol: '', address: '' });

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    const data = await getTokens();
    setTokens(data);
  };

  const handleAddToken = async () => {
    await addToken(newToken);
    setNewToken({ name: '', symbol: '', address: '' });
    fetchTokens(); // Refresh the token list
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'address', label: 'Address' },
  ];
  return (
    <div>
      <h1>Tokens</h1>
      <ReusableTable columns={columns} data={tokens} />
      <div>
        <h3>Add Token</h3>
        <input
          type="text"
          placeholder="Name"
          value={newToken.name}
          onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Symbol"
          value={newToken.symbol}
          onChange={(e) => setNewToken({ ...newToken, symbol: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newToken.address}
          onChange={(e) => setNewToken({ ...newToken, address: e.target.value })}
        />
        <button onClick={handleAddToken}>Add Token</button>
      </div>
    </div>
  );
};

export default Tokens;
