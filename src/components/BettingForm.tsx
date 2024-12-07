import React, { useState } from 'react';
import { Clock, Ticket } from 'lucide-react';
import { DrawScheduleSelect } from './DrawScheduleSelect';
import { LotteryBallGrid } from './LotteryBallGrid';
import { getCombinationKey } from '../utils/validation';
import { FIXED_BET_AMOUNT, WINNING_PRIZE } from '../utils/constants';
import type { BettingStats } from '../types/lottery';

interface BettingFormProps {
  bettingStats: BettingStats;
  onSubmit: (combination: string, drawTime: string) => void;
}

export function BettingForm({ bettingStats, onSubmit }: BettingFormProps) {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstNumber) {
      newErrors.firstNumber = 'First number is required';
    }

    if (!secondNumber) {
      newErrors.secondNumber = 'Second number is required';
    }

    if (!drawTime) {
      newErrors.drawTime = 'Please select a draw time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const combination = getCombinationKey(firstNumber, secondNumber);
    const stats = bettingStats[combination];

    if (stats && !stats.isOpen) {
      setErrors({ form: 'This combination is currently closed for betting' });
      return;
    }

    onSubmit(combination, drawTime);
    clearForm();
  };

  const clearForm = () => {
    setFirstNumber('');
    setSecondNumber('');
    setDrawTime('');
    setErrors({});
  };

  const handleNumberSelect = (position: 'first' | 'second', number: string) => {
    if (position === 'first') {
      setFirstNumber(number);
    } else {
      setSecondNumber(number);
    }
    setErrors((prev) => ({ ...prev, [position + 'Number']: '' }));
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Ticket className="w-6 h-6 mr-2" />
          Place Your Bet
        </h1>
        <Clock className="w-6 h-6 text-gray-500" />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Date: {currentDate}</p>
      </div>

      <DrawScheduleSelect value={drawTime} onChange={setDrawTime} />

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">First Number</h3>
          <LotteryBallGrid
            selectedNumbers={firstNumber ? [firstNumber] : []}
            onNumberSelect={(number) => handleNumberSelect('first', number)}
            bettingStats={bettingStats}
            position="first"
          />
          {errors.firstNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.firstNumber}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Second Number</h3>
          <LotteryBallGrid
            selectedNumbers={secondNumber ? [secondNumber] : []}
            onNumberSelect={(number) => handleNumberSelect('second', number)}
            bettingStats={bettingStats}
            position="second"
          />
          {errors.secondNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.secondNumber}</p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-600">
          Bet Amount: <span className="font-semibold">₱{FIXED_BET_AMOUNT.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Potential Win: <span className="font-semibold">₱{WINNING_PRIZE.toFixed(2)}</span>
        </p>
      </div>

      {errors.form && (
        <p className="mt-4 text-sm text-red-600">{errors.form}</p>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Place Bet
        </button>
        <button
          type="button"
          onClick={clearForm}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear Form
        </button>
      </div>
    </form>
  );
}