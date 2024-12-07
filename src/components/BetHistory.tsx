import React from 'react';
import { Clock, Trophy } from 'lucide-react';
import type { Bet } from '../types/lottery';

interface BetHistoryProps {
  bets: Bet[];
}

export function BetHistory({ bets }: BetHistoryProps) {
  if (bets.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Your Bets
        </h2>
      </div>

      <div className="space-y-4">
        {bets.map((bet) => (
          <div
            key={bet.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {new Date(bet.timestamp).toLocaleString()}
                </span>
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                bet.status === 'completed' ? 'bg-green-100 text-green-800' :
                bet.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Numbers</p>
                <p className="text-lg font-bold">{bet.combination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Draw Time</p>
                <p className="text-lg font-bold">{bet.drawTime}</p>
              </div>
            </div>

            <div className="flex justify-between mt-2 pt-2 border-t">
              <div>
                <p className="text-sm text-gray-500">Bet Amount</p>
                <p className="font-medium">₱{bet.amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Potential Win</p>
                <p className="font-medium text-green-600">₱{bet.potentialWin.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}