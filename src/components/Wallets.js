import React, { useState, useEffect } from 'react';
import { getWallets, addWallet } from '../services/api';
import ReusableTable from './common/ReusableTable';

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [newWallet, setNewWallet] = useState({ name: '', address: '', chain_id: '' });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    const data = await getWallets();
    setWallets(data);
  };

  const handleAddWallet = async () => {
    await addWallet(newWallet);
    setNewWallet({ name: '', address: '', chain_id: '' });
    fetchWallets();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'chain_id', label: 'Chain ID' },
  ];

  return (
    <div>
      <h1>Wallets</h1>
      <ReusableTable columns={columns} data={wallets} />
      <div>
        <h3>Add Wallet</h3>
        <input
          type="text"
          placeholder="Name"
          value={newWallet.name}
          onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newWallet.address}
          onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Chain ID"
          value={newWallet.chain_id}
          onChange={(e) => setNewWallet({ ...newWallet, chain_id: e.target.value })}
        />
        <button onClick={handleAddWallet}>Add Wallet</button>
      </div>
    </div>
  );
};

export default Wallets;
