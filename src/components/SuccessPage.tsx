import React, { useEffect } from 'react';
import { CheckCircle, Trophy } from 'lucide-react';
import type { Bet } from '../types/lottery';
import { playSuccessSound } from '../utils/sound';

interface SuccessPageProps {
  bet: Bet;
  onComplete: () => void;
}

export function SuccessPage({ bet, onComplete }: SuccessPageProps) {
  useEffect(() => {
    playSuccessSound();
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-gray-800 rounded-xl shadow-2xl p-6 transform animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">Bet Placed Successfully!</h2>
          
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-lg font-mono text-white">{bet.combination}</p>
            </div>
            <p className="text-sm text-gray-300">
              Draw Time: {bet.drawTime}
            </p>
          </div>

          <div className="text-green-400 font-medium">
            Potential Win: ₱{bet.potentialWin.toFixed(2)}
          </div>

          <p className="text-gray-400 text-sm animate-pulse">
            Your receipt will be displayed shortly...
          </p>
        </div>
      </div>
    </div>
  );
}