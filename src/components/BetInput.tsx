import React, { useState } from 'react';
import { Coins } from 'lucide-react';

interface BetInputProps {
  onBetSubmit: (amount: number) => void;
  minBet: number;
  walletBalance: number;
}

export function BetInput({ onBetSubmit, minBet, walletBalance }: BetInputProps) {
  const [betAmount, setBetAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(betAmount);

    if (isNaN(amount) || amount < minBet) {
      setError(`Minimum bet amount is ₱${minBet}`);
      return;
    }

    if (amount > walletBalance) {
      setError('Insufficient wallet balance');
      return;
    }

    setError('');
    onBetSubmit(amount);
    setBetAmount('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBetAmount(value);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Coins className="w-5 h-5" />
          <span className="font-medium">Place Your Bet</span>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">₱</span>
          </div>
          <input
            type="text"
            value={betAmount}
            onChange={handleChange}
            placeholder={`Min bet: ₱${minBet}`}
            className={`
              w-full pl-8 pr-4 py-2 rounded-lg
              bg-gray-700 text-white placeholder-gray-400
              border-2 ${error ? 'border-red-500' : 'border-gray-600'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-colors
            `}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className={`
            w-full py-2 px-4 rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={!betAmount || Number(betAmount) < minBet}
        >
          Place Bet
        </button>
      </div>
    </form>
  );
}