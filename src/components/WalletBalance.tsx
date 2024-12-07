import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletBalanceProps {
  balance: number;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-gray-200">Wallet Balance</span>
        </div>
        <span className="text-lg font-bold text-white">₱{balance.toFixed(2)}</span>
      </div>
    </div>
  );
}