import React from 'react';
import { CheckCircle, CreditCard } from 'lucide-react';
import type { Bet } from '../types/lottery';

interface BetConfirmationProps {
  bet: Bet;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BetConfirmation({ bet, onConfirm, onCancel }: BetConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <CheckCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Confirm Your Bet</h3>
            <p className="text-sm text-gray-500 mt-2">Please review your bet details</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Numbers</p>
                <p className="text-lg font-bold">{bet.combination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Draw Time</p>
                <p className="text-lg font-bold">{bet.drawTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bet Amount</p>
                <p className="text-lg font-bold">₱{bet.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Potential Win</p>
                <p className="text-lg font-bold text-green-600">₱{bet.potentialWin.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <CreditCard className="w-5 h-5" />
              Pay Now
            </button>
            <button
              onClick={onCancel}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}