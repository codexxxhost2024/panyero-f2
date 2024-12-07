import React from 'react';
import { Ticket, Calendar, Clock } from 'lucide-react';
import type { Bet } from '../types/lottery';

interface BetReceiptProps {
  bet: Bet;
  onClose: () => void;
}

export function BetReceipt({ bet, onClose }: BetReceiptProps) {
  if (!bet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ticket className="w-6 h-6" />
              <h3 className="text-xl font-bold">Betting Receipt</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                {new Date(bet.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{bet.drawTime}</span>
            </div>
          </div>

          <div className="text-center py-6">
            <div className="text-4xl font-mono font-bold text-gray-800">
              {bet.combination}
            </div>
            <p className="text-sm text-gray-500 mt-2">Your Numbers</p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Bet Amount:</span>
              <span className="font-semibold">₱{bet.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Win:</span>
              <span className="font-semibold text-green-600">
                ₱{bet.potentialWin.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="text-xs text-gray-500">Receipt ID</div>
            <div className="font-mono text-sm">{bet.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}